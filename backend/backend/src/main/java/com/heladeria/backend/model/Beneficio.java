package com.heladeria.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "beneficio")
public class Beneficio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nivel_id", nullable = false)
    private NivelFidelizacion nivel;

    @Column(nullable = false, length = 500)
    private String descripcion;

    @Column(length = 50)
    private String tipo;

    @Column(length = 100)
    private String valor;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public NivelFidelizacion getNivel() { return nivel; }
    public void setNivel(NivelFidelizacion nivel) { this.nivel = nivel; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getValor() { return valor; }
    public void setValor(String valor) { this.valor = valor; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
