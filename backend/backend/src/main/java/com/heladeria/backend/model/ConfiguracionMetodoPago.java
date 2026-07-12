package com.heladeria.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "configuracion_metodo_pago")
public class ConfiguracionMetodoPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20, unique = true)
    private TipoMetodoPago tipo;

    @Column(name = "nombre_titular", length = 200)
    private String nombreTitular;

    @Column(name = "numero_celular", length = 20)
    private String numeroCelular;

    @Column(name = "usuario_visible", length = 200)
    private String usuarioVisible;

    @Column(name = "imagen_url", length = 500)
    private String imagenUrl;

    @Column(length = 500)
    private String mensaje;

    @Column(nullable = false)
    private Boolean activo = false;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public TipoMetodoPago getTipo() { return tipo; }
    public void setTipo(TipoMetodoPago tipo) { this.tipo = tipo; }
    public String getNombreTitular() { return nombreTitular; }
    public void setNombreTitular(String nombreTitular) { this.nombreTitular = nombreTitular; }
    public String getNumeroCelular() { return numeroCelular; }
    public void setNumeroCelular(String numeroCelular) { this.numeroCelular = numeroCelular; }
    public String getUsuarioVisible() { return usuarioVisible; }
    public void setUsuarioVisible(String usuarioVisible) { this.usuarioVisible = usuarioVisible; }
    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
