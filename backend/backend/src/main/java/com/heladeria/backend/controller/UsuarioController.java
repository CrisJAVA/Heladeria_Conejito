package com.heladeria.backend.controller;

import com.heladeria.backend.dto.CambiarEstadoUsuarioRequest;
import com.heladeria.backend.dto.CambiarPasswordRequest;
import com.heladeria.backend.dto.CambiarRolRequest;
import com.heladeria.backend.dto.ClienteDTO;
import com.heladeria.backend.dto.PerfilDTO;
import com.heladeria.backend.dto.UsuarioAdminDTO;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.UsuarioService;
import jakarta.validation.Valid;
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

    @GetMapping
    public ResponseEntity<List<UsuarioAdminDTO>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
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

    @GetMapping("/clientes")
    public ResponseEntity<List<ClienteDTO>> listarClientes() {
        return ResponseEntity.ok(usuarioService.listarClientes());
    }

    @PutMapping("/cambiar-password")
    public ResponseEntity<?> cambiarPassword(@AuthenticationPrincipal UserPrincipal principal,
                                              @Valid @RequestBody CambiarPasswordRequest request) {
        usuarioService.cambiarPassword(principal.userId(), request);
        return ResponseEntity.ok().body(Map.of("mensaje", "Contraseña actualizada correctamente"));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Map<String, String>> cambiarEstado(@PathVariable Long id,
                                                              @RequestBody CambiarEstadoUsuarioRequest request) {
        usuarioService.cambiarEstadoUsuario(id, request.getActivo());
        return ResponseEntity.ok(Map.of("mensaje", "Estado actualizado correctamente"));
    }

    @PatchMapping("/{id}/rol")
    public ResponseEntity<Map<String, String>> cambiarRol(@PathVariable Long id,
                                                           @Valid @RequestBody CambiarRolRequest request) {
        usuarioService.cambiarRolUsuario(id, request.getRol());
        return ResponseEntity.ok(Map.of("mensaje", "Rol actualizado correctamente"));
    }
}
