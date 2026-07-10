package com.heladeria.backend.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class ReporteVentasDTO {
    private BigDecimal ventasTotales;
    private long totalPedidos;
    private BigDecimal ventasHoy;
    private long pedidosHoy;
    private List<ProductoTop> productosMasVendidos;
    private Map<String, BigDecimal> ventasPorPeriodo;
    private Map<String, Long> pedidosPorEstado;

    public BigDecimal getVentasTotales() { return ventasTotales; }
    public void setVentasTotales(BigDecimal ventasTotales) { this.ventasTotales = ventasTotales; }
    public long getTotalPedidos() { return totalPedidos; }
    public void setTotalPedidos(long totalPedidos) { this.totalPedidos = totalPedidos; }
    public BigDecimal getVentasHoy() { return ventasHoy; }
    public void setVentasHoy(BigDecimal ventasHoy) { this.ventasHoy = ventasHoy; }
    public long getPedidosHoy() { return pedidosHoy; }
    public void setPedidosHoy(long pedidosHoy) { this.pedidosHoy = pedidosHoy; }
    public List<ProductoTop> getProductosMasVendidos() { return productosMasVendidos; }
    public void setProductosMasVendidos(List<ProductoTop> productosMasVendidos) { this.productosMasVendidos = productosMasVendidos; }
    public Map<String, BigDecimal> getVentasPorPeriodo() { return ventasPorPeriodo; }
    public void setVentasPorPeriodo(Map<String, BigDecimal> ventasPorPeriodo) { this.ventasPorPeriodo = ventasPorPeriodo; }
    public Map<String, Long> getPedidosPorEstado() { return pedidosPorEstado; }
    public void setPedidosPorEstado(Map<String, Long> pedidosPorEstado) { this.pedidosPorEstado = pedidosPorEstado; }

    public static class ProductoTop {
        private Long id;
        private String nombre;
        private long cantidadVendida;
        private BigDecimal totalIngresos;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public long getCantidadVendida() { return cantidadVendida; }
        public void setCantidadVendida(long cantidadVendida) { this.cantidadVendida = cantidadVendida; }
        public BigDecimal getTotalIngresos() { return totalIngresos; }
        public void setTotalIngresos(BigDecimal totalIngresos) { this.totalIngresos = totalIngresos; }
    }
}
