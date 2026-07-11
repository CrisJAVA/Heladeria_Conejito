package com.heladeria.backend.controller;

import com.heladeria.backend.dto.PromocionDTO;
import com.heladeria.backend.service.PromocionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    /** Público: solo promociones activas (usado en la web de clientes). */
    @GetMapping
    public ResponseEntity<List<PromocionDTO>> listarActivas() {
        return ResponseEntity.ok(promocionService.listarActivas());
    }

    /** Panel admin: todas las promociones, activas e inactivas. */
    @GetMapping("/todas")
    public ResponseEntity<List<PromocionDTO>> listarTodas() {
        return ResponseEntity.ok(promocionService.listarTodas());
    }

    @PostMapping
    public ResponseEntity<PromocionDTO> crear(@RequestBody PromocionDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(promocionService.crear(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromocionDTO> actualizar(@PathVariable Long id, @RequestBody PromocionDTO dto) {
        return ResponseEntity.ok(promocionService.actualizar(id, dto));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<PromocionDTO> cambiarEstado(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        return ResponseEntity.ok(promocionService.cambiarEstado(id, body.get("activa")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        promocionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
