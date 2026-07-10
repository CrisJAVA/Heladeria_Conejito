package com.heladeria.backend.service;

import com.heladeria.backend.dto.ReporteVentasDTO;
import com.heladeria.backend.model.DetallePedido;
import com.heladeria.backend.model.Pedido;
import com.heladeria.backend.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReporteService {

    private final PedidoRepository pedidoRepository;

    public ReporteService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @Transactional(readOnly = true)
    public ReporteVentasDTO generarReporte(LocalDate desde, LocalDate hasta) {
        ReporteVentasDTO reporte = new ReporteVentasDTO();

        List<Pedido> pedidos;
        if (desde != null && hasta != null) {
            pedidos = pedidoRepository.findByCreatedAtBetween(
                    desde.atStartOfDay(), hasta.atTime(23, 59, 59));
        } else {
            pedidos = pedidoRepository.findAll();
        }

        List<Pedido> pedidosCompletados = pedidos.stream()
                .filter(p -> "ENTREGADO".equals(p.getEstado()) || "CONFIRMADO".equals(p.getEstado()))
                .collect(Collectors.toList());

        BigDecimal ventasTotales = pedidosCompletados.stream()
                .map(Pedido::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        reporte.setVentasTotales(ventasTotales);
        reporte.setTotalPedidos(pedidos.size());

        LocalDate hoy = LocalDate.now();
        List<Pedido> pedidosHoy = pedidos.stream()
                .filter(p -> p.getCreatedAt().toLocalDate().equals(hoy))
                .collect(Collectors.toList());
        reporte.setPedidosHoy(pedidosHoy.size());
        reporte.setVentasHoy(pedidosHoy.stream()
                .map(Pedido::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        Map<String, Long> pedidosPorEstado = new LinkedHashMap<>();
        Arrays.asList("PENDIENTE", "CONFIRMADO", "PREPARANDO", "EN_CAMINO", "ENTREGADO", "CANCELADO")
                .forEach(e -> pedidosPorEstado.put(e, pedidos.stream()
                        .filter(p -> e.equals(p.getEstado())).count()));
        reporte.setPedidosPorEstado(pedidosPorEstado);

        Map<String, BigDecimal> ventasPorPeriodo = new LinkedHashMap<>();
        LocalDate inicio = desde != null ? desde : LocalDate.now().minusDays(7);
        LocalDate fin = hasta != null ? hasta : LocalDate.now();
        for (LocalDate date = inicio; !date.isAfter(fin); date = date.plusDays(1)) {
            String key = date.format(DateTimeFormatter.ISO_LOCAL_DATE);
            LocalDate d = date;
            BigDecimal total = pedidosCompletados.stream()
                    .filter(p -> p.getCreatedAt().toLocalDate().equals(d))
                    .map(Pedido::getTotal)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            ventasPorPeriodo.put(key, total);
        }
        reporte.setVentasPorPeriodo(ventasPorPeriodo);

        Map<Long, ReporteVentasDTO.ProductoTop> productosMap = new HashMap<>();
        for (Pedido pedido : pedidosCompletados) {
            for (DetallePedido det : pedido.getDetalles()) {
                ReporteVentasDTO.ProductoTop top = productosMap
                        .computeIfAbsent(det.getProducto().getId(), k -> {
                            ReporteVentasDTO.ProductoTop pt = new ReporteVentasDTO.ProductoTop();
                            pt.setId(det.getProducto().getId());
                            pt.setNombre(det.getProducto().getNombre());
                            pt.setCantidadVendida(0);
                            pt.setTotalIngresos(BigDecimal.ZERO);
                            return pt;
                        });
                top.setCantidadVendida(top.getCantidadVendida() + det.getCantidad());
                top.setTotalIngresos(top.getTotalIngresos().add(det.getSubtotal()));
            }
        }
        List<ReporteVentasDTO.ProductoTop> topProductos = new ArrayList<>(productosMap.values());
        topProductos.sort((a, b) -> Long.compare(b.getCantidadVendida(), a.getCantidadVendida()));
        reporte.setProductosMasVendidos(
                topProductos.size() > 10 ? topProductos.subList(0, 10) : topProductos);

        return reporte;
    }
}
