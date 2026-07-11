package com.heladeria.backend.controller;

import com.heladeria.backend.dto.ConfiguracionDTO;
import com.heladeria.backend.service.ConfiguracionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ConfiguracionDTO> actualizar(@RequestBody ConfiguracionDTO dto) {
        return ResponseEntity.ok(configuracionService.actualizar(dto));
    }
}
