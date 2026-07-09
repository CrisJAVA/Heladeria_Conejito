package com.heladeria.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ClienteDTO {

    private Long id;
    private String nombre;
    private String email;
    private String telefono;
    private String direccion;
    private String rol;
    private long totalPedidos;
    private BigDecimal totalGastado;
    private Integer puntosActuales;
    private Integer puntosAcumulados;
    private String nivel;
    private String nivelColor;
    private LocalDateTime ultimoPedido;
    private LocalDateTime createdAt;

    public ClienteDTO() {}

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
    public long getTotalPedidos() { return totalPedidos; }
    public void setTotalPedidos(long totalPedidos) { this.totalPedidos = totalPedidos; }
    public BigDecimal getTotalGastado() { return totalGastado; }
    public void setTotalGastado(BigDecimal totalGastado) { this.totalGastado = totalGastado; }
    public Integer getPuntosActuales() { return puntosActuales; }
    public void setPuntosActuales(Integer puntosActuales) { this.puntosActuales = puntosActuales; }
    public Integer getPuntosAcumulados() { return puntosAcumulados; }
    public void setPuntosAcumulados(Integer puntosAcumulados) { this.puntosAcumulados = puntosAcumulados; }
    public String getNivel() { return nivel; }
    public void setNivel(String nivel) { this.nivel = nivel; }
    public String getNivelColor() { return nivelColor; }
    public void setNivelColor(String nivelColor) { this.nivelColor = nivelColor; }
    public LocalDateTime getUltimoPedido() { return ultimoPedido; }
    public void setUltimoPedido(LocalDateTime ultimoPedido) { this.ultimoPedido = ultimoPedido; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
