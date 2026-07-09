package com.heladeria.backend.controller;

import com.heladeria.backend.dto.ConfiguracionDTO;
import com.heladeria.backend.exception.ForbiddenException;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.ConfiguracionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/configuracion")
public class ConfiguracionController {

    private final ConfiguracionService configuracionService;

    public ConfiguracionController(ConfiguracionService configuracionService) {
        this.configuracionService = configuracionService;
    }

    @GetMapping
    public ResponseEntity<ConfiguracionDTO> obtener() {
        return ResponseEntity.ok(configuracionService.obtener());
    }

    @PutMapping
    public ResponseEntity<ConfiguracionDTO> actualizar(@AuthenticationPrincipal UserPrincipal principal,
                                                        @RequestBody ConfiguracionDTO dto) {
        return ResponseEntity.ok(configuracionService.actualizar(principal, dto));
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
