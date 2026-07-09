package com.heladeria.backend.controller;

import com.heladeria.backend.dto.PromocionDTO;
import com.heladeria.backend.exception.ForbiddenException;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.PromocionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/promociones")
public class PromocionController {

    private final PromocionService promocionService;

    public PromocionController(PromocionService promocionService) {
        this.promocionService = promocionService;
    }

    @GetMapping
    public ResponseEntity<List<PromocionDTO>> listarActivas() {
        return ResponseEntity.ok(promocionService.listarActivas());
    }

    @GetMapping("/todas")
    public ResponseEntity<List<PromocionDTO>> listarTodas() {
        return ResponseEntity.ok(promocionService.listarTodas());
    }

    @PostMapping
    public ResponseEntity<PromocionDTO> crear(@AuthenticationPrincipal UserPrincipal principal,
                                               @RequestBody PromocionDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(promocionService.crear(principal, dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromocionDTO> actualizar(@AuthenticationPrincipal UserPrincipal principal,
                                                    @PathVariable Long id,
                                                    @RequestBody PromocionDTO dto) {
        return ResponseEntity.ok(promocionService.actualizar(principal, id, dto));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<PromocionDTO> cambiarEstado(@AuthenticationPrincipal UserPrincipal principal,
                                                       @PathVariable Long id,
                                                       @RequestBody Map<String, Boolean> body) {
        return ResponseEntity.ok(promocionService.cambiarEstado(principal, id, body.get("activa")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id) {
        promocionService.eliminar(principal, id);
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
