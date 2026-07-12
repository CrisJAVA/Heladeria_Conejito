package com.heladeria.backend.dto;

public class PuntosDTO {

    private Long id;
    private int puntosActuales;
    private int puntosAcumulados;
    private String nivel;
    private String nivelColor;
    private String nivelSiguiente;
    private int puntosSiguiente;
    private int puntosFaltantes;
    private int porcentajeProgreso;
    private boolean afiliado;

    public PuntosDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getPuntosActuales() { return puntosActuales; }
    public void setPuntosActuales(int puntosActuales) { this.puntosActuales = puntosActuales; }
    public int getPuntosAcumulados() { return puntosAcumulados; }
    public void setPuntosAcumulados(int puntosAcumulados) { this.puntosAcumulados = puntosAcumulados; }
    public String getNivel() { return nivel; }
    public void setNivel(String nivel) { this.nivel = nivel; }
    public String getNivelColor() { return nivelColor; }
    public void setNivelColor(String nivelColor) { this.nivelColor = nivelColor; }
    public String getNivelSiguiente() { return nivelSiguiente; }
    public void setNivelSiguiente(String nivelSiguiente) { this.nivelSiguiente = nivelSiguiente; }
    public int getPuntosSiguiente() { return puntosSiguiente; }
    public void setPuntosSiguiente(int puntosSiguiente) { this.puntosSiguiente = puntosSiguiente; }
    public boolean isAfiliado() { return afiliado; }
    public void setAfiliado(boolean afiliado) { this.afiliado = afiliado; }
    public int getPuntosFaltantes() { return puntosFaltantes; }
    public void setPuntosFaltantes(int puntosFaltantes) { this.puntosFaltantes = puntosFaltantes; }
    public int getPorcentajeProgreso() { return porcentajeProgreso; }
    public void setPorcentajeProgreso(int porcentajeProgreso) { this.porcentajeProgreso = porcentajeProgreso; }
}
