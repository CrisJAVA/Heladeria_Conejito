package com.heladeria.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "seccion_landing")
public class SeccionLanding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "section_key", nullable = false, unique = true, length = 50)
    private String sectionKey;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(length = 300)
    private String descripcion;

    @Column(name = "imagen_url", length = 500)
    private String imagenUrl;

    @Column(name = "color_from", length = 50)
    private String colorFrom;

    @Column(name = "color_to", length = 50)
    private String colorTo;

    @Column(nullable = false)
    private Boolean activo = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSectionKey() { return sectionKey; }
    public void setSectionKey(String sectionKey) { this.sectionKey = sectionKey; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }
    public String getColorFrom() { return colorFrom; }
    public void setColorFrom(String colorFrom) { this.colorFrom = colorFrom; }
    public String getColorTo() { return colorTo; }
    public void setColorTo(String colorTo) { this.colorTo = colorTo; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
