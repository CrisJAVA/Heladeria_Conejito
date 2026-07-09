package com.heladeria.backend.dto;

public class PuntosDTO {
    private Integer puntosActuales;
    private Integer puntosAcumulados;
    private String nivelActual;
    private String nivelColorHex;
    private String siguienteNivel;
    private Integer puntosParaSiguienteNivel;
    private Integer puntosMinimosSiguienteNivel;

    public Integer getPuntosActuales() { return puntosActuales; }
    public void setPuntosActuales(Integer puntosActuales) { this.puntosActuales = puntosActuales; }
    public Integer getPuntosAcumulados() { return puntosAcumulados; }
    public void setPuntosAcumulados(Integer puntosAcumulados) { this.puntosAcumulados = puntosAcumulados; }
    public String getNivelActual() { return nivelActual; }
    public void setNivelActual(String nivelActual) { this.nivelActual = nivelActual; }
    public String getNivelColorHex() { return nivelColorHex; }
    public void setNivelColorHex(String nivelColorHex) { this.nivelColorHex = nivelColorHex; }
    public String getSiguienteNivel() { return siguienteNivel; }
    public void setSiguienteNivel(String siguienteNivel) { this.siguienteNivel = siguienteNivel; }
    public Integer getPuntosParaSiguienteNivel() { return puntosParaSiguienteNivel; }
    public void setPuntosParaSiguienteNivel(Integer puntosParaSiguienteNivel) { this.puntosParaSiguienteNivel = puntosParaSiguienteNivel; }
    public Integer getPuntosMinimosSiguienteNivel() { return puntosMinimosSiguienteNivel; }
    public void setPuntosMinimosSiguienteNivel(Integer puntosMinimosSiguienteNivel) { this.puntosMinimosSiguienteNivel = puntosMinimosSiguienteNivel; }
}
