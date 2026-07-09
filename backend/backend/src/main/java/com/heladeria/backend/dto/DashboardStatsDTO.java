package com.heladeria.backend.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class DashboardStatsDTO {
    private BigDecimal ventasHoy;
    private Long pedidosActivos;
    private Long clientesNuevosHoy;
    private Long totalClientes;
    private Map<String, Long> pedidosPorEstado;
    private List<ProductoVendidoDTO> productosMasVendidos;
    private List<PedidoResponse> pedidosRecientes;
    private Map<String, Long> ventasUltimos7Dias;

    public BigDecimal getVentasHoy() { return ventasHoy; }
    public void setVentasHoy(BigDecimal ventasHoy) { this.ventasHoy = ventasHoy; }
    public Long getPedidosActivos() { return pedidosActivos; }
    public void setPedidosActivos(Long pedidosActivos) { this.pedidosActivos = pedidosActivos; }
    public Long getClientesNuevosHoy() { return clientesNuevosHoy; }
    public void setClientesNuevosHoy(Long clientesNuevosHoy) { this.clientesNuevosHoy = clientesNuevosHoy; }
    public Long getTotalClientes() { return totalClientes; }
    public void setTotalClientes(Long totalClientes) { this.totalClientes = totalClientes; }
    public Map<String, Long> getPedidosPorEstado() { return pedidosPorEstado; }
    public void setPedidosPorEstado(Map<String, Long> pedidosPorEstado) { this.pedidosPorEstado = pedidosPorEstado; }
    public List<ProductoVendidoDTO> getProductosMasVendidos() { return productosMasVendidos; }
    public void setProductosMasVendidos(List<ProductoVendidoDTO> productosMasVendidos) { this.productosMasVendidos = productosMasVendidos; }
    public List<PedidoResponse> getPedidosRecientes() { return pedidosRecientes; }
    public void setPedidosRecientes(List<PedidoResponse> pedidosRecientes) { this.pedidosRecientes = pedidosRecientes; }
    public Map<String, Long> getVentasUltimos7Dias() { return ventasUltimos7Dias; }
    public void setVentasUltimos7Dias(Map<String, Long> ventasUltimos7Dias) { this.ventasUltimos7Dias = ventasUltimos7Dias; }

    public static class ProductoVendidoDTO {
        private String nombre;
        private Integer cantidadVendida;
        private BigDecimal totalVendido;

        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public Integer getCantidadVendida() { return cantidadVendida; }
        public void setCantidadVendida(Integer cantidadVendida) { this.cantidadVendida = cantidadVendida; }
        public BigDecimal getTotalVendido() { return totalVendido; }
        public void setTotalVendido(BigDecimal totalVendido) { this.totalVendido = totalVendido; }
    }
}
