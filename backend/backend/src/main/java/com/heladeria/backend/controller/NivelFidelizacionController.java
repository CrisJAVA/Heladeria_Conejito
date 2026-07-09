package com.heladeria.backend.controller;

import com.heladeria.backend.dto.NivelFidelizacionDTO;
import com.heladeria.backend.exception.ForbiddenException;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.NivelFidelizacionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/niveles")
public class NivelFidelizacionController {

    private final NivelFidelizacionService nivelFidelizacionService;

    public NivelFidelizacionController(NivelFidelizacionService nivelFidelizacionService) {
        this.nivelFidelizacionService = nivelFidelizacionService;
    }

    @GetMapping
    public ResponseEntity<List<NivelFidelizacionDTO>> listarTodos() {
        return ResponseEntity.ok(nivelFidelizacionService.listarTodos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NivelFidelizacionDTO> actualizar(@AuthenticationPrincipal UserPrincipal principal,
                                                            @PathVariable Long id,
                                                            @RequestBody NivelFidelizacionDTO dto) {
        return ResponseEntity.ok(nivelFidelizacionService.actualizar(principal, id, dto));
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
