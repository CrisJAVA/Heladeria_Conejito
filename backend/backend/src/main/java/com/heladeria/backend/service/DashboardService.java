package com.heladeria.backend.service;

import com.heladeria.backend.dto.DashboardStatsDTO;
import com.heladeria.backend.dto.PedidoResponse;
import com.heladeria.backend.exception.ForbiddenException;
import com.heladeria.backend.model.DetallePedido;
import com.heladeria.backend.model.Pedido;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.PedidoRepository;
import com.heladeria.backend.repository.UsuarioRepository;
import com.heladeria.backend.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PedidoService pedidoService;

    public DashboardService(PedidoRepository pedidoRepository, UsuarioRepository usuarioRepository, PedidoService pedidoService) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.pedidoService = pedidoService;
    }

    @Transactional(readOnly = true)
    public DashboardStatsDTO obtenerEstadisticas(UserPrincipal principal) {
        if (principal == null || !"ADMIN".equals(principal.rol())) {
            throw new ForbiddenException("Acceso denegado: se requiere rol ADMIN");
        }

        List<Pedido> pedidos = pedidoRepository.findAll();
        LocalDate hoy = LocalDate.now();

        BigDecimal ventasHoy = pedidos.stream()
                .filter(p -> p.getCreatedAt() != null && p.getCreatedAt().toLocalDate().isEqual(hoy))
                .filter(p -> !"CANCELADO".equals(p.getEstado()))
                .map(Pedido::getTotal)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long pedidosActivos = pedidos.stream()
                .filter(p -> !"ENTREGADO".equals(p.getEstado()) && !"CANCELADO".equals(p.getEstado()))
                .count();

        List<Usuario> usuarios = usuarioRepository.findAll();
        long clientesNuevosHoy = usuarios.stream()
                .filter(u -> u.getCreatedAt() != null && u.getCreatedAt().toLocalDate().isEqual(hoy))
                .count();
        long totalClientes = usuarios.stream().filter(u -> "CLIENTE".equals(u.getRol())).count();

        Map<String, Long> pedidosPorEstado = pedidos.stream()
                .collect(Collectors.groupingBy(Pedido::getEstado, Collectors.counting()));

        Map<String, DashboardStatsDTO.ProductoVendidoDTO> productos = new LinkedHashMap<>();
        for (Pedido p : pedidos) {
            if ("CANCELADO".equals(p.getEstado())) continue;
            for (DetallePedido d : p.getDetalles()) {
                String nombre = d.getProducto().getNombre();
                DashboardStatsDTO.ProductoVendidoDTO pv = productos.computeIfAbsent(nombre, n -> {
                    DashboardStatsDTO.ProductoVendidoDTO nuevo = new DashboardStatsDTO.ProductoVendidoDTO();
                    nuevo.setNombre(n);
                    nuevo.setCantidadVendida(0);
                    nuevo.setTotalVendido(BigDecimal.ZERO);
                    return nuevo;
                });
                pv.setCantidadVendida(pv.getCantidadVendida() + d.getCantidad());
                pv.setTotalVendido(pv.getTotalVendido().add(d.getSubtotal()));
            }
        }
        List<DashboardStatsDTO.ProductoVendidoDTO> productosMasVendidos = productos.values().stream()
                .sorted((a, b) -> b.getCantidadVendida().compareTo(a.getCantidadVendida()))
                .limit(5)
                .collect(Collectors.toList());

        List<PedidoResponse> pedidosRecientes = pedidoRepository.findAllByOrderByCreatedAtDesc().stream()
                .limit(5)
                .map(p -> {
                    PedidoResponse res = new PedidoResponse();
                    res.setId(p.getId());
                    res.setCodigoPedido(p.getCodigoPedido());
                    res.setUsuarioNombre(p.getUsuario().getNombre());
                    res.setTotal(p.getTotal());
                    res.setEstado(p.getEstado());
                    res.setCreatedAt(p.getCreatedAt());
                    res.setDetalles(p.getDetalles().stream().map(d -> {
                        PedidoResponse.DetalleResponse dr = new PedidoResponse.DetalleResponse();
                        dr.setNombre(d.getProducto().getNombre());
                        dr.setCantidad(d.getCantidad());
                        return dr;
                    }).collect(Collectors.toList()));
                    return res;
                }).collect(Collectors.toList());

        Map<String, Long> ventasUltimos7Dias = new LinkedHashMap<>();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM");
        for (int i = 6; i >= 0; i--) {
            LocalDate dia = hoy.minusDays(i);
            long totalDia = pedidos.stream()
                    .filter(p -> p.getCreatedAt() != null && p.getCreatedAt().toLocalDate().isEqual(dia))
                    .filter(p -> !"CANCELADO".equals(p.getEstado()))
                    .map(Pedido::getTotal)
                    .filter(Objects::nonNull)
                    .mapToLong(BigDecimal::longValue)
                    .sum();
            ventasUltimos7Dias.put(dia.format(fmt), totalDia);
        }

        DashboardStatsDTO dto = new DashboardStatsDTO();
        dto.setVentasHoy(ventasHoy);
        dto.setPedidosActivos(pedidosActivos);
        dto.setClientesNuevosHoy(clientesNuevosHoy);
        dto.setTotalClientes(totalClientes);
        dto.setPedidosPorEstado(pedidosPorEstado);
        dto.setProductosMasVendidos(productosMasVendidos);
        dto.setPedidosRecientes(pedidosRecientes);
        dto.setVentasUltimos7Dias(ventasUltimos7Dias);
        return dto;
    }
}
