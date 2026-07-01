package com.heladeria.backend.service;

import com.heladeria.backend.dto.PedidoRequest;
import com.heladeria.backend.dto.PedidoResponse;
import com.heladeria.backend.model.*;
import com.heladeria.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final MetodoEntregaRepository metodoEntregaRepository;
    private final MetodoPagoRepository metodoPagoRepository;
    private final ProductoRepository productoRepository;

    public PedidoService(PedidoRepository pedidoRepository,
                         UsuarioRepository usuarioRepository,
                         MetodoEntregaRepository metodoEntregaRepository,
                         MetodoPagoRepository metodoPagoRepository,
                         ProductoRepository productoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.metodoEntregaRepository = metodoEntregaRepository;
        this.metodoPagoRepository = metodoPagoRepository;
        this.productoRepository = productoRepository;
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
            Producto producto = null;
            if (detReq.getProductoId() != null && detReq.getProductoId() > 0) {
                producto = productoRepository.findById(detReq.getProductoId()).orElse(null);
            }
            if (producto == null) {
                producto = productoRepository.findByNombreContainingIgnoreCase(detReq.getNombre())
                        .stream().findFirst().orElse(null);
            }
            if (producto == null) {
                producto = productoRepository.findAll().stream().findFirst()
                        .orElseThrow(() -> new RuntimeException("No hay productos disponibles en el sistema"));
            }

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
