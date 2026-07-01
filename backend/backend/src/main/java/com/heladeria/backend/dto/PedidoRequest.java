package com.heladeria.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

public class PedidoRequest {

    @NotNull(message = "El método de entrega es obligatorio")
    private Long metodoEntregaId;

    @NotNull(message = "El método de pago es obligatorio")
    private Long metodoPagoId;

    private String direccionEntrega;
    private String numeroOperacion;
    private String nota;

    @NotEmpty(message = "Debe incluir al menos un producto")
    private List<DetalleRequest> detalles;

    public Long getMetodoEntregaId() { return metodoEntregaId; }
    public void setMetodoEntregaId(Long metodoEntregaId) { this.metodoEntregaId = metodoEntregaId; }
    public Long getMetodoPagoId() { return metodoPagoId; }
    public void setMetodoPagoId(Long metodoPagoId) { this.metodoPagoId = metodoPagoId; }
    public String getDireccionEntrega() { return direccionEntrega; }
    public void setDireccionEntrega(String direccionEntrega) { this.direccionEntrega = direccionEntrega; }
    public String getNumeroOperacion() { return numeroOperacion; }
    public void setNumeroOperacion(String numeroOperacion) { this.numeroOperacion = numeroOperacion; }
    public String getNota() { return nota; }
    public void setNota(String nota) { this.nota = nota; }
    public List<DetalleRequest> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleRequest> detalles) { this.detalles = detalles; }

    public static class DetalleRequest {
        @NotNull(message = "El ID del producto es obligatorio")
        private Long productoId;

        @NotBlank(message = "El nombre del producto es obligatorio")
        private String nombre;

        private String imagenUrl;

        @NotNull(message = "La cantidad es obligatoria")
        private Integer cantidad;

        @NotNull(message = "El precio unitario es obligatorio")
        private BigDecimal precioUnitario;

        public Long getProductoId() { return productoId; }
        public void setProductoId(Long productoId) { this.productoId = productoId; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public String getImagenUrl() { return imagenUrl; }
        public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }
        public Integer getCantidad() { return cantidad; }
        public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
        public BigDecimal getPrecioUnitario() { return precioUnitario; }
        public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; }
    }
}
