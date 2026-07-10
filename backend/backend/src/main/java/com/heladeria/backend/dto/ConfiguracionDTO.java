package com.heladeria.backend.dto;

public class ConfiguracionDTO {
    private Long id;
    private String nombreNegocio;
    private String descripcion;
    private String logoUrl;
    private String direccion;
    private String telefono;
    private String email;
    private String horarioSemana;
    private String horarioSabado;
    private String horarioDomingo;
    private String instagram;
    private String facebook;
    private String whatsapp;
    private String metodosPago;
    private Integer puntosPorSol;
    private Integer puntosRecompensa;

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
