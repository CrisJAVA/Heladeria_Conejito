package com.heladeria.backend.service;

import com.heladeria.backend.config.PedidoWebSocketHandler;
import com.heladeria.backend.dto.PedidoRequest;
import com.heladeria.backend.dto.PedidoResponse;
import com.heladeria.backend.model.*;
import com.heladeria.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final MetodoEntregaRepository metodoEntregaRepository;
    private final MetodoPagoRepository metodoPagoRepository;
    private final ProductoRepository productoRepository;
    private final PedidoWebSocketHandler wsHandler;
    private final NotificacionService notificacionService;
    private final PuntosRepository puntosRepository;
    private final HistorialPuntosRepository historialPuntosRepository;
    private final NivelFidelizacionRepository nivelFidelizacionRepository;

    public PedidoService(PedidoRepository pedidoRepository,
                         UsuarioRepository usuarioRepository,
                         MetodoEntregaRepository metodoEntregaRepository,
                         MetodoPagoRepository metodoPagoRepository,
                         ProductoRepository productoRepository,
                         PedidoWebSocketHandler wsHandler,
                         NotificacionService notificacionService,
                         PuntosRepository puntosRepository,
                         HistorialPuntosRepository historialPuntosRepository,
                         NivelFidelizacionRepository nivelFidelizacionRepository) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.metodoEntregaRepository = metodoEntregaRepository;
        this.metodoPagoRepository = metodoPagoRepository;
        this.productoRepository = productoRepository;
        this.wsHandler = wsHandler;
        this.notificacionService = notificacionService;
        this.puntosRepository = puntosRepository;
        this.historialPuntosRepository = historialPuntosRepository;
        this.nivelFidelizacionRepository = nivelFidelizacionRepository;
    }

    @Transactional
    public PedidoResponse crearPedido(Long usuarioId, PedidoRequest request) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        MetodoEntrega entrega = metodoEntregaRepository.findById(request.getMetodoEntregaId())
                .orElseThrow(() -> new RuntimeException("Método de entrega no encontrado"));

        MetodoPago pago = metodoPagoRepository.findById(request.getMetodoPagoId())
                .orElseThrow(() -> new RuntimeException("Método de pago no encontrado"));

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setMetodoEntrega(entrega);
        pedido.setMetodoPago(pago);
        pedido.setDireccionEntrega(request.getDireccionEntrega());
        pedido.setNumeroOperacion(request.getNumeroOperacion());
        pedido.setNota(request.getNota());

        BigDecimal subtotal = BigDecimal.ZERO;

        for (PedidoRequest.DetalleRequest detReq : request.getDetalles()) {
            Long prodId = detReq.getProductoId();
            if (prodId == null || prodId <= 0) {
                throw new RuntimeException("ID de producto inválido");
            }
            Producto producto = productoRepository.findById(prodId)
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + prodId));

            if (!producto.getDisponible() || producto.getStock() < detReq.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + producto.getNombre());
            }

            producto.setStock(producto.getStock() - detReq.getCantidad());
            productoRepository.save(producto);

            BigDecimal precioUnitario = detReq.getPrecioUnitario();
            int cantidad = detReq.getCantidad();
            BigDecimal detSubtotal = precioUnitario.multiply(BigDecimal.valueOf(cantidad));
            subtotal = subtotal.add(detSubtotal);

            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedido);
            detalle.setProducto(producto);
            detalle.setCantidad(cantidad);
            detalle.setPrecioUnitario(precioUnitario);
            detalle.setSubtotal(detSubtotal);

            pedido.getDetalles().add(detalle);
        }

        pedido.setSubtotal(subtotal);
        pedido.setCostoEnvio(entrega.getCosto());
        pedido.setTotal(subtotal.add(entrega.getCosto()));

        pedido = pedidoRepository.save(pedido);

        Map<String, Object> wsData = new HashMap<>();
        wsData.put("tipo", "NUEVO_PEDIDO");
        wsData.put("pedidoId", pedido.getId());
        wsData.put("codigo", pedido.getCodigoPedido());
        wsData.put("cliente", pedido.getUsuario().getNombre());
        wsData.put("total", pedido.getTotal());
        wsHandler.notificarNuevoPedido(wsData);

        notificacionService.crearNotificacion(
                usuarioId,
                "Pedido creado",
                "Tu pedido " + pedido.getCodigoPedido() + " ha sido registrado correctamente",
                "PEDIDO",
                pedido.getId()
        );

        return toResponse(pedido);
    }

    @Transactional(readOnly = true)
    public List<PedidoResponse> listarMisPedidos(Long usuarioId) {
        return pedidoRepository.findByUsuarioIdOrderByCreatedAtDesc(usuarioId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PedidoResponse obtenerPedido(Long pedidoId, Long usuarioId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        if (!pedido.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes acceso a este pedido");
        }
        return toResponse(pedido);
    }

    @Transactional(readOnly = true)
    public List<PedidoResponse> listarTodos() {
        return pedidoRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public PedidoResponse actualizarEstado(Long pedidoId, String estado) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        pedido.setEstado(estado);
        pedido = pedidoRepository.save(pedido);

        if ("ENTREGADO".equals(estado)) {
            sumarPuntosPorPedido(pedido);
        }

        Map<String, Object> wsData = new HashMap<>();
        wsData.put("tipo", "CAMBIO_ESTADO");
        wsData.put("pedidoId", pedido.getId());
        wsData.put("codigo", pedido.getCodigoPedido());
        wsData.put("estado", estado);
        wsHandler.notificarCambioEstado(wsData);

        notificacionService.crearNotificacion(
                pedido.getUsuario().getId(),
                "Pedido actualizado",
                "Tu pedido " + pedido.getCodigoPedido() + " ahora está: " + estado,
                "ESTADO",
                pedido.getId()
        );

        return toResponse(pedido);
    }

    private void sumarPuntosPorPedido(Pedido pedido) {
        Long usuarioId = pedido.getUsuario().getId();
        Puntos puntos = puntosRepository.findByUsuarioId(usuarioId).orElse(null);
        if (puntos == null) return;

        NivelFidelizacion nivel = puntos.getNivel();
        int ptsPorSol = (nivel != null && nivel.getPuntosPorSoles() != null) ? nivel.getPuntosPorSoles() : 5;

        int puntosGanados = pedido.getTotal().multiply(BigDecimal.valueOf(ptsPorSol)).intValue();
        if (puntosGanados <= 0) return;

        puntos.setPuntosActuales(puntos.getPuntosActuales() + puntosGanados);
        puntos.setPuntosAcumulados(puntos.getPuntosAcumulados() + puntosGanados);

        NivelFidelizacion nuevoNivel = nivelFidelizacionRepository
                .findNivelByPuntos(puntos.getPuntosAcumulados()).orElse(null);
        if (nuevoNivel != null && !nuevoNivel.equals(nivel)) {
            puntos.setNivel(nuevoNivel);
        }

        puntosRepository.save(puntos);

        HistorialPuntos historial = new HistorialPuntos();
        historial.setUsuario(pedido.getUsuario());
        historial.setPuntos(puntosGanados);
        historial.setTipo("SUMAR");
        historial.setConcepto("Compra " + pedido.getCodigoPedido());
        historial.setReferenciaId(pedido.getId());
        historialPuntosRepository.save(historial);
    }

    private PedidoResponse toResponse(Pedido pedido) {
        PedidoResponse res = new PedidoResponse();
        res.setId(pedido.getId());
        res.setCodigoPedido(pedido.getCodigoPedido());
        res.setUsuarioNombre(pedido.getUsuario().getNombre());
        res.setMetodoEntrega(pedido.getMetodoEntrega() != null ? pedido.getMetodoEntrega().getNombre() : null);
        res.setMetodoPago(pedido.getMetodoPago() != null ? pedido.getMetodoPago().getNombre() : null);
        res.setSubtotal(pedido.getSubtotal());
        res.setCostoEnvio(pedido.getCostoEnvio());
        res.setTotal(pedido.getTotal());
        res.setEstado(pedido.getEstado());
        res.setDireccionEntrega(pedido.getDireccionEntrega());
        res.setNumeroOperacion(pedido.getNumeroOperacion());
        res.setCreatedAt(pedido.getCreatedAt());

        List<PedidoResponse.DetalleResponse> detalles = pedido.getDetalles().stream().map(d -> {
            PedidoResponse.DetalleResponse dr = new PedidoResponse.DetalleResponse();
            dr.setId(d.getId());
            dr.setProductoId(d.getProducto().getId());
            dr.setNombre(d.getProducto().getNombre());
            dr.setImagenUrl(d.getProducto().getImagenUrl());
            dr.setCantidad(d.getCantidad());
            dr.setPrecioUnitario(d.getPrecioUnitario());
            dr.setSubtotal(d.getSubtotal());
            return dr;
        }).collect(Collectors.toList());

        res.setDetalles(detalles);
        return res;
    }
}
