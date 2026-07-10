package com.heladeria.backend.dto;

import java.time.LocalDate;

public class PromocionDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private String descuento;
    private String diasVigencia;
    private String icono;
    private String color;
    private Boolean activa;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getDescuento() { return descuento; }
    public void setDescuento(String descuento) { this.descuento = descuento; }
    public String getDiasVigencia() { return diasVigencia; }
    public void setDiasVigencia(String diasVigencia) { this.diasVigencia = diasVigencia; }
    public String getIcono() { return icono; }
    public void setIcono(String icono) { this.icono = icono; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public Boolean getActiva() { return activa; }
    public void setActiva(Boolean activa) { this.activa = activa; }
    public LocalDate getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDate fechaInicio) { this.fechaInicio = fechaInicio; }
    public LocalDate getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDate fechaFin) { this.fechaFin = fechaFin; }
}
