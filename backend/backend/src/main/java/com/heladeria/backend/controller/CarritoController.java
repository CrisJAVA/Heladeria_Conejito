package com.heladeria.backend.controller;

import com.heladeria.backend.dto.CarritoDTO;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.CarritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @GetMapping
    public ResponseEntity<List<CarritoDTO>> listar(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(carritoService.listarCarrito(principal.userId()));
    }

    @PostMapping
    public ResponseEntity<CarritoDTO> agregar(@AuthenticationPrincipal UserPrincipal principal,
                                               @RequestBody Map<String, Object> body) {
        Long productoId = Long.valueOf(body.get("productoId").toString());
        Integer cantidad = body.containsKey("cantidad") ? Integer.valueOf(body.get("cantidad").toString()) : 1;
        return ResponseEntity.ok(carritoService.agregarProducto(principal.userId(), productoId, cantidad));
    }

    @PutMapping("/{productoId}")
    public ResponseEntity<CarritoDTO> actualizar(@AuthenticationPrincipal UserPrincipal principal,
                                                  @PathVariable Long productoId,
                                                  @RequestBody Map<String, Object> body) {
        Integer cantidad = Integer.valueOf(body.get("cantidad").toString());
        CarritoDTO dto = carritoService.actualizarCantidad(principal.userId(), productoId, cantidad);
        if (dto == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{productoId}")
    public ResponseEntity<Void> eliminar(@AuthenticationPrincipal UserPrincipal principal,
                                          @PathVariable Long productoId) {
        carritoService.eliminarProducto(principal.userId(), productoId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> limpiar(@AuthenticationPrincipal UserPrincipal principal) {
        carritoService.limpiarCarrito(principal.userId());
        return ResponseEntity.noContent().build();
    }
}
