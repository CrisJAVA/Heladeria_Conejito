package com.heladeria.backend.controller;

import com.heladeria.backend.model.SeccionLanding;
import com.heladeria.backend.repository.SeccionLandingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
        SeccionLanding seccion = repository.findBySectionKey(sectionKey).orElse(null);
        if (seccion == null) {
            return ResponseEntity.notFound().build();
        }
        if (data.getImagenUrl() != null) seccion.setImagenUrl(data.getImagenUrl());
        if (data.getTitulo() != null) seccion.setTitulo(data.getTitulo());
        if (data.getDescripcion() != null) seccion.setDescripcion(data.getDescripcion());
        if (data.getColorFrom() != null) seccion.setColorFrom(data.getColorFrom());
        if (data.getColorTo() != null) seccion.setColorTo(data.getColorTo());
        if (data.getActivo() != null) seccion.setActivo(data.getActivo());
        return ResponseEntity.ok(repository.save(seccion));
    }
}
