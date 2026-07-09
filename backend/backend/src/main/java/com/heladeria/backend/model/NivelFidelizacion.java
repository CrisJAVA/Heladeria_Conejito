package com.heladeria.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nivel_fidelizacion")
public class NivelFidelizacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(name = "puntos_minimos", nullable = false)
    private Integer puntosMinimos;

    @Column(name = "puntos_por_soles")
    private Integer puntosPorSoles = 5;

    @Column(name = "color_hex", length = 7)
    private String colorHex;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Integer getPuntosMinimos() { return puntosMinimos; }
    public void setPuntosMinimos(Integer puntosMinimos) { this.puntosMinimos = puntosMinimos; }
    public Integer getPuntosPorSoles() { return puntosPorSoles; }
    public void setPuntosPorSoles(Integer puntosPorSoles) { this.puntosPorSoles = puntosPorSoles; }
    public String getColorHex() { return colorHex; }
    public void setColorHex(String colorHex) { this.colorHex = colorHex; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
