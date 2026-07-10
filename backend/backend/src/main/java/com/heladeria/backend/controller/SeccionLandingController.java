package com.heladeria.backend.controller;

import com.heladeria.backend.model.SeccionLanding;
import com.heladeria.backend.repository.SeccionLandingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/landing-secciones")
public class SeccionLandingController {

    private final SeccionLandingRepository repository;

    public SeccionLandingController(SeccionLandingRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<SeccionLanding>> listar() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PutMapping("/{sectionKey}")
    public ResponseEntity<SeccionLanding> actualizar(@PathVariable String sectionKey, @RequestBody SeccionLanding data) {
        SeccionLanding seccion = repository.findBySectionKey(sectionKey)
                .orElseThrow(() -> new RuntimeException("Sección no encontrada: " + sectionKey));
        if (data.getImagenUrl() != null) seccion.setImagenUrl(data.getImagenUrl());
        if (data.getTitulo() != null) seccion.setTitulo(data.getTitulo());
        if (data.getDescripcion() != null) seccion.setDescripcion(data.getDescripcion());
        if (data.getColorFrom() != null) seccion.setColorFrom(data.getColorFrom());
        if (data.getColorTo() != null) seccion.setColorTo(data.getColorTo());
        if (data.getActivo() != null) seccion.setActivo(data.getActivo());
        return ResponseEntity.ok(repository.save(seccion));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleError(RuntimeException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}
