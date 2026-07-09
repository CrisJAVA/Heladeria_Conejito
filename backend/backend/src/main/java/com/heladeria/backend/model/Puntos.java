package com.heladeria.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "puntos")
public class Puntos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "puntos_actuales")
    private Integer puntosActuales = 0;

    @Column(name = "puntos_acumulados")
    private Integer puntosAcumulados = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nivel_id")
    private NivelFidelizacion nivel;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public Integer getPuntosActuales() { return puntosActuales; }
    public void setPuntosActuales(Integer puntosActuales) { this.puntosActuales = puntosActuales; }
    public Integer getPuntosAcumulados() { return puntosAcumulados; }
    public void setPuntosAcumulados(Integer puntosAcumulados) { this.puntosAcumulados = puntosAcumulados; }
    public NivelFidelizacion getNivel() { return nivel; }
    public void setNivel(NivelFidelizacion nivel) { this.nivel = nivel; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
