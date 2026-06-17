package com.heladeria.backend.controller;

import com.heladeria.backend.dto.CambiarPasswordRequest;
import com.heladeria.backend.dto.PerfilDTO;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/perfil")
    public ResponseEntity<PerfilDTO> obtenerPerfil(@AuthenticationPrincipal UserPrincipal principal) {
        Usuario usuario = usuarioService.obtenerPerfil(principal.userId());
        PerfilDTO dto = new PerfilDTO(usuario.getId(), usuario.getNombre(), usuario.getEmail(),
                usuario.getTelefono(), usuario.getDireccion(), usuario.getRol());
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/perfil")
    public ResponseEntity<PerfilDTO> actualizarPerfil(@AuthenticationPrincipal UserPrincipal principal,
                                                       @RequestBody PerfilDTO request) {
        Usuario usuario = usuarioService.actualizarPerfil(principal.userId(), request);
        PerfilDTO dto = new PerfilDTO(usuario.getId(), usuario.getNombre(), usuario.getEmail(),
                usuario.getTelefono(), usuario.getDireccion(), usuario.getRol());
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/cambiar-password")
    public ResponseEntity<?> cambiarPassword(@AuthenticationPrincipal UserPrincipal principal,
                                              @Valid @RequestBody CambiarPasswordRequest request) {
        usuarioService.cambiarPassword(principal.userId(), request);
        return ResponseEntity.ok().body(java.util.Map.of("mensaje", "Contraseña actualizada correctamente"));
    }
}
