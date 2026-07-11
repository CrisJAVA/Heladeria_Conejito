package com.heladeria.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "configuracion")
public class Configuracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_negocio", length = 150)
    private String nombreNegocio = "Heladería Ica";

    @Column(length = 1000)
    private String descripcion = "Tu oasis de frescura en el corazón de Ica.";

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(length = 300)
    private String direccion = "Av. Principal 123, Ica, Perú";

    @Column(length = 30)
    private String telefono = "+51 956 789 123";

    @Column(length = 150)
    private String email = "hola@heladeriaica.pe";

    @Column(name = "horario_semana", length = 50)
    private String horarioSemana = "10:00 - 22:00";

    @Column(name = "horario_sabado", length = 50)
    private String horarioSabado = "09:00 - 23:00";

    @Column(name = "horario_domingo", length = 50)
    private String horarioDomingo = "09:00 - 23:00";

    @Column(length = 150)
    private String instagram = "@heladeria.ica";

    @Column(length = 150)
    private String facebook = "Heladería Ica";

    @Column(length = 30)
    private String whatsapp = "+51 956 789 123";

    @Column(name = "metodos_pago", length = 300)
    private String metodosPago = "Efectivo,Tarjeta,Yape,Plin,Transferencia";

    @Column(name = "puntos_por_sol")
    private Integer puntosPorSol = 10;

    @Column(name = "puntos_recompensa")
    private Integer puntosRecompensa = 3000;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombreNegocio() { return nombreNegocio; }
    public void setNombreNegocio(String nombreNegocio) { this.nombreNegocio = nombreNegocio; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getHorarioSemana() { return horarioSemana; }
    public void setHorarioSemana(String horarioSemana) { this.horarioSemana = horarioSemana; }
    public String getHorarioSabado() { return horarioSabado; }
    public void setHorarioSabado(String horarioSabado) { this.horarioSabado = horarioSabado; }
    public String getHorarioDomingo() { return horarioDomingo; }
    public void setHorarioDomingo(String horarioDomingo) { this.horarioDomingo = horarioDomingo; }
    public String getInstagram() { return instagram; }
    public void setInstagram(String instagram) { this.instagram = instagram; }
    public String getFacebook() { return facebook; }
    public void setFacebook(String facebook) { this.facebook = facebook; }
    public String getWhatsapp() { return whatsapp; }
    public void setWhatsapp(String whatsapp) { this.whatsapp = whatsapp; }
    public String getMetodosPago() { return metodosPago; }
    public void setMetodosPago(String metodosPago) { this.metodosPago = metodosPago; }
    public Integer getPuntosPorSol() { return puntosPorSol; }
    public void setPuntosPorSol(Integer puntosPorSol) { this.puntosPorSol = puntosPorSol; }
    public Integer getPuntosRecompensa() { return puntosRecompensa; }
    public void setPuntosRecompensa(Integer puntosRecompensa) { this.puntosRecompensa = puntosRecompensa; }
}
