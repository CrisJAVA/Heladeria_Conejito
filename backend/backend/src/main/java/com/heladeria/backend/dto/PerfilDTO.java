package com.heladeria.backend.dto;

public class PerfilDTO {

    private Long id;
    private String nombre;
    private String email;
    private String telefono;
    private String direccion;
    private String rol;

    public PerfilDTO() {}

    public PerfilDTO(Long id, String nombre, String email, String telefono, String direccion, String rol) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.rol = rol;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
