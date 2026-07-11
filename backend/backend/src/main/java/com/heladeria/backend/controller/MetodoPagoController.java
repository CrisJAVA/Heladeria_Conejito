package com.heladeria.backend.controller;

import com.heladeria.backend.model.MetodoPago;
import com.heladeria.backend.repository.MetodoPagoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/metodos-pago")
public class MetodoPagoController {

    private final MetodoPagoRepository metodoPagoRepository;

    public MetodoPagoController(MetodoPagoRepository metodoPagoRepository) {
        this.metodoPagoRepository = metodoPagoRepository;
    }

    @GetMapping
    public ResponseEntity<List<MetodoPago>> listar() {
        return ResponseEntity.ok(metodoPagoRepository.findAll().stream()
                .filter(MetodoPago::getActivo)
                .toList());
    }
}
