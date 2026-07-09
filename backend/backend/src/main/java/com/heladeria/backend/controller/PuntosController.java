package com.heladeria.backend.controller;

import com.heladeria.backend.dto.HistorialPuntosDTO;
import com.heladeria.backend.dto.PuntosDTO;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.PuntosService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/puntos")
public class PuntosController {

    private final PuntosService puntosService;

    public PuntosController(PuntosService puntosService) {
        this.puntosService = puntosService;
    }

    @GetMapping("/mis-puntos")
    public ResponseEntity<PuntosDTO> misPuntos(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(puntosService.obtenerMisPuntos(principal.userId()));
    }

    @GetMapping("/historial")
    public ResponseEntity<List<HistorialPuntosDTO>> historial(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(puntosService.obtenerHistorial(principal.userId()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntime(RuntimeException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}
