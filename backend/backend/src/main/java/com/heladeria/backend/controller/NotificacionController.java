package com.heladeria.backend.controller;

import com.heladeria.backend.dto.NotificacionDTO;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.NotificacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    private final NotificacionService notificacionService;

    public NotificacionController(NotificacionService notificacionService) {
        this.notificacionService = notificacionService;
    }

    @GetMapping
    public ResponseEntity<List<NotificacionDTO>> listar(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(notificacionService.listarPorUsuario(principal.userId()));
    }

    @GetMapping("/no-leidas")
    public ResponseEntity<Map<String, Long>> contarNoLeidas(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(Map.of("count", notificacionService.contarNoLeidas(principal.userId())));
    }

    @PutMapping("/{id}/leer")
    public ResponseEntity<Void> marcarLeida(@AuthenticationPrincipal UserPrincipal principal,
                                             @PathVariable Long id) {
        notificacionService.marcarComoLeida(id, principal.userId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/leer-todas")
    public ResponseEntity<Void> marcarTodasLeidas(@AuthenticationPrincipal UserPrincipal principal) {
        notificacionService.marcarTodasComoLeidas(principal.userId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@AuthenticationPrincipal UserPrincipal principal,
                                          @PathVariable Long id) {
        notificacionService.eliminar(id, principal.userId());
        return ResponseEntity.noContent().build();
    }
}
