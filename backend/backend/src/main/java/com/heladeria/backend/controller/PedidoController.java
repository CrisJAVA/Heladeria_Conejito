package com.heladeria.backend.controller;

import com.heladeria.backend.dto.PedidoRequest;
import com.heladeria.backend.dto.PedidoResponse;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> crearPedido(@AuthenticationPrincipal UserPrincipal principal,
                                                       @Valid @RequestBody PedidoRequest request) {
        PedidoResponse response = pedidoService.crearPedido(principal.userId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/mis-pedidos")
    public ResponseEntity<List<PedidoResponse>> listarMisPedidos(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(pedidoService.listarMisPedidos(principal.userId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> obtenerPedido(@AuthenticationPrincipal UserPrincipal principal,
                                                         @PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.obtenerPedido(id, principal.userId()));
    }

    @GetMapping
    public ResponseEntity<List<PedidoResponse>> listarTodos() {
        return ResponseEntity.ok(pedidoService.listarTodos());
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<PedidoResponse> actualizarEstado(@PathVariable Long id,
                                                            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(pedidoService.actualizarEstado(id, body.get("estado")));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntime(RuntimeException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}
