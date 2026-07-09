package com.heladeria.backend.controller;

import com.heladeria.backend.dto.ProductoDTO;
import com.heladeria.backend.exception.ForbiddenException;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.ProductoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public ResponseEntity<List<ProductoDTO>> listar(
            @RequestParam(required = false) Long categoria,
            @RequestParam(required = false) String q) {
        if (q != null && !q.isBlank()) {
            return ResponseEntity.ok(productoService.buscarPorNombre(q));
        }
        if (categoria != null) {
            return ResponseEntity.ok(productoService.buscarPorCategoria(categoria));
        }
        return ResponseEntity.ok(productoService.listarTodos());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<ProductoDTO>> listarDisponibles() {
        return ResponseEntity.ok(productoService.listarDisponibles());
    }

    @GetMapping("/destacados")
    public ResponseEntity<List<ProductoDTO>> listarDestacados() {
        return ResponseEntity.ok(productoService.listarDestacados());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtener(@PathVariable Long id) {
        ProductoDTO dto = productoService.obtenerPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@AuthenticationPrincipal UserPrincipal principal,
                                              @RequestBody ProductoDTO dto) {
        return ResponseEntity.ok(productoService.crear(principal, dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizar(@AuthenticationPrincipal UserPrincipal principal,
                                                   @PathVariable Long id, @RequestBody ProductoDTO dto) {
        return ResponseEntity.ok(productoService.actualizar(principal, id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id) {
        productoService.eliminar(principal, id);
        return ResponseEntity.noContent().build();
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
