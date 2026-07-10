package com.heladeria.backend.dto;

import java.time.LocalDateTime;

public class UsuarioAdminDTO {
    private Long id;
    private String nombre;
    private String email;
    private String telefono;
    private String direccion;
    private String rol;
    private Boolean activo;
    private LocalDateTime createdAt;
    private Integer totalPedidos;
    private java.math.BigDecimal totalGastado;
    private Integer puntosActuales;
    private String nivel;
    private LocalDateTime ultimoPedido;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Integer getTotalPedidos() { return totalPedidos; }
    public void setTotalPedidos(Integer totalPedidos) { this.totalPedidos = totalPedidos; }
    public java.math.BigDecimal getTotalGastado() { return totalGastado; }
    public void setTotalGastado(java.math.BigDecimal totalGastado) { this.totalGastado = totalGastado; }
    public Integer getPuntosActuales() { return puntosActuales; }
    public void setPuntosActuales(Integer puntosActuales) { this.puntosActuales = puntosActuales; }
    public String getNivel() { return nivel; }
    public void setNivel(String nivel) { this.nivel = nivel; }
    public LocalDateTime getUltimoPedido() { return ultimoPedido; }
    public void setUltimoPedido(LocalDateTime ultimoPedido) { this.ultimoPedido = ultimoPedido; }
}
