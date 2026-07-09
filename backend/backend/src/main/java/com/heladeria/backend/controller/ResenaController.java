package com.heladeria.backend.controller;

import com.heladeria.backend.dto.ResenaDTO;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.ResenaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resenas")
public class ResenaController {

    private final ResenaService resenaService;

    public ResenaController(ResenaService resenaService) {
        this.resenaService = resenaService;
    }

    @GetMapping("/producto/{productoId}")
    public ResponseEntity<List<ResenaDTO>> listarPorProducto(@PathVariable Long productoId) {
        return ResponseEntity.ok(resenaService.listarPorProducto(productoId));
    }

    @GetMapping("/producto/{productoId}/stats")
    public ResponseEntity<Map<String, Object>> estadisticas(@PathVariable Long productoId) {
        return ResponseEntity.ok(resenaService.obtenerEstadisticas(productoId));
    }

    @PostMapping("/producto/{productoId}")
    public ResponseEntity<ResenaDTO> crear(@AuthenticationPrincipal UserPrincipal principal,
                                            @PathVariable Long productoId,
                                            @RequestBody Map<String, Object> body) {
        if (principal == null) {
            return ResponseEntity.status(401).body(null);
        }
        Integer calificacion = (Integer) body.get("calificacion");
        String comentario = (String) body.getOrDefault("comentario", "");
        return ResponseEntity.ok(resenaService.crearResena(principal.userId(), productoId, calificacion, comentario));
    }
}
