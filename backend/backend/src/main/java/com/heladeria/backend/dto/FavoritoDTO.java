package com.heladeria.backend.dto;

import java.math.BigDecimal;

public class FavoritoDTO {
    private Long id;
    private Long productoId;
    private String productoNombre;
    private BigDecimal productoPrecio;
    private String productoCategoria;
    private String productoImagenUrl;
    private boolean productoDisponible;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }
    public String getProductoNombre() { return productoNombre; }
    public void setProductoNombre(String productoNombre) { this.productoNombre = productoNombre; }
    public BigDecimal getProductoPrecio() { return productoPrecio; }
    public void setProductoPrecio(BigDecimal productoPrecio) { this.productoPrecio = productoPrecio; }
    public String getProductoCategoria() { return productoCategoria; }
    public void setProductoCategoria(String productoCategoria) { this.productoCategoria = productoCategoria; }
    public String getProductoImagenUrl() { return productoImagenUrl; }
    public void setProductoImagenUrl(String productoImagenUrl) { this.productoImagenUrl = productoImagenUrl; }
    public boolean isProductoDisponible() { return productoDisponible; }
    public void setProductoDisponible(boolean productoDisponible) { this.productoDisponible = productoDisponible; }
}
