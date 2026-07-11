package com.heladeria.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class CambiarRolRequest {
    @NotBlank(message = "El rol es obligatorio")
    private String rol;

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
