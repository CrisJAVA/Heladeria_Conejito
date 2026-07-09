package com.heladeria.backend.dto;

import java.util.List;

public class NivelFidelizacionDTO {
    private Long id;
    private String nombre;
    private Integer puntosMinimos;
    private Integer puntosPorSoles;
    private String colorHex;
    private List<BeneficioDTO> beneficios;

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
    public List<BeneficioDTO> getBeneficios() { return beneficios; }
    public void setBeneficios(List<BeneficioDTO> beneficios) { this.beneficios = beneficios; }
}
