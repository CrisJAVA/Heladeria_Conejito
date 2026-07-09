package com.heladeria.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ResetPasswordRequest {
    @NotBlank
    private String token;
    @NotBlank @Size(min = 8)
    private String nuevaPassword;
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getNuevaPassword() { return nuevaPassword; }
    public void setNuevaPassword(String nuevaPassword) { this.nuevaPassword = nuevaPassword; }
}
