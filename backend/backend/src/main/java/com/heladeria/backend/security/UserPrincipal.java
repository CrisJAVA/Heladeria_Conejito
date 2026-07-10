package com.heladeria.backend.security;

public record UserPrincipal(Long userId, String email, String rol) {
}
