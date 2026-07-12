package com.heladeria.backend.controller;

import com.heladeria.backend.model.ConfiguracionMetodoPago;
import com.heladeria.backend.model.TipoMetodoPago;
import com.heladeria.backend.service.ConfiguracionMetodoPagoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/configuracion-metodos-pago")
public class ConfiguracionMetodoPagoController {

    private final ConfiguracionMetodoPagoService service;

    public ConfiguracionMetodoPagoController(ConfiguracionMetodoPagoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ConfiguracionMetodoPago>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/activos")
    public ResponseEntity<List<ConfiguracionMetodoPago>> listarActivos() {
        return ResponseEntity.ok(service.listarActivos());
    }

    @GetMapping("/{tipo}")
    public ResponseEntity<ConfiguracionMetodoPago> obtenerPorTipo(@PathVariable TipoMetodoPago tipo) {
        return ResponseEntity.ok(service.obtenerPorTipo(tipo));
    }

    @PutMapping("/{tipo}")
    public ResponseEntity<ConfiguracionMetodoPago> actualizar(
            @PathVariable TipoMetodoPago tipo,
            @RequestBody ConfiguracionMetodoPago datos) {
        return ResponseEntity.ok(service.actualizar(tipo, datos));
    }

    @PostMapping("/{tipo}/imagen")
    public ResponseEntity<ConfiguracionMetodoPago> subirImagen(
            @PathVariable TipoMetodoPago tipo,
            @RequestBody Map<String, String> body) {
        String imagenUrl = body.get("imagenUrl");
        if (imagenUrl == null || imagenUrl.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(service.actualizarImagen(tipo, imagenUrl));
    }

    @PatchMapping("/{tipo}/estado")
    public ResponseEntity<ConfiguracionMetodoPago> cambiarEstado(
            @PathVariable TipoMetodoPago tipo,
            @RequestBody Map<String, Boolean> body) {
        Boolean activo = body.get("activo");
        if (activo == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(service.cambiarEstado(tipo, activo));
    }
}
