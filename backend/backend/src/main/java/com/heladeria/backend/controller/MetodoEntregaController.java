package com.heladeria.backend.controller;

import com.heladeria.backend.model.MetodoEntrega;
import com.heladeria.backend.repository.MetodoEntregaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/metodos-entrega")
public class MetodoEntregaController {

    private final MetodoEntregaRepository metodoEntregaRepository;

    public MetodoEntregaController(MetodoEntregaRepository metodoEntregaRepository) {
        this.metodoEntregaRepository = metodoEntregaRepository;
    }

    @GetMapping
    public ResponseEntity<List<MetodoEntrega>> listar() {
        return ResponseEntity.ok(metodoEntregaRepository.findAll().stream()
                .filter(MetodoEntrega::getActivo)
                .toList());
    }
}
