package com.heladeria.backend.controller;

import com.heladeria.backend.dto.CambiarEstadoUsuarioRequest;
import com.heladeria.backend.dto.CambiarPasswordRequest;
import com.heladeria.backend.dto.CambiarRolRequest;
import com.heladeria.backend.dto.PerfilDTO;
import com.heladeria.backend.dto.UsuarioAdminDTO;
import com.heladeria.backend.exception.ForbiddenException;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping
    public ResponseEntity<List<UsuarioAdminDTO>> listarTodos(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(usuarioService.listarTodos(principal));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Void> cambiarEstado(@AuthenticationPrincipal UserPrincipal principal,
                                               @PathVariable Long id,
                                               @RequestBody CambiarEstadoUsuarioRequest request) {
        usuarioService.cambiarEstado(principal, id, request);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/rol")
    public ResponseEntity<Void> cambiarRol(@AuthenticationPrincipal UserPrincipal principal,
                                            @PathVariable Long id,
                                            @Valid @RequestBody CambiarRolRequest request) {
        usuarioService.cambiarRol(principal, id, request);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<Map<String, String>> handleForbidden(ForbiddenException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntime(RuntimeException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}
