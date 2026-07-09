package com.heladeria.backend.controller;

import com.heladeria.backend.dto.AuthResponse;
import com.heladeria.backend.dto.LoginRequest;
import com.heladeria.backend.dto.RegisterRequest;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.security.JwtUtil;
import com.heladeria.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioService usuarioService, JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        Usuario usuario = usuarioService.registrar(request);
        String token = jwtUtil.generateToken(usuario.getId(), usuario.getEmail(), usuario.getRol());
        return ResponseEntity.ok(new AuthResponse(token, usuario.getId(), usuario.getNombre(),
                usuario.getEmail(), usuario.getRol()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        Usuario usuario = usuarioService.login(request);
        String token = jwtUtil.generateToken(usuario.getId(), usuario.getEmail(), usuario.getRol());
        return ResponseEntity.ok(new AuthResponse(token, usuario.getId(), usuario.getNombre(),
                usuario.getEmail(), usuario.getRol()));
    }
}
