package com.heladeria.backend.controller;

import com.heladeria.backend.dto.NivelFidelizacionDTO;
import com.heladeria.backend.service.NivelFidelizacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public ResponseEntity<NivelFidelizacionDTO> actualizar(@PathVariable Long id, @RequestBody NivelFidelizacionDTO dto) {
        return ResponseEntity.ok(nivelFidelizacionService.actualizar(id, dto));
    }
}
