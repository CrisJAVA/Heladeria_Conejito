package com.heladeria.backend.controller;

import com.heladeria.backend.dto.FavoritoDTO;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.FavoritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {

    private final FavoritoService favoritoService;

    public FavoritoController(FavoritoService favoritoService) {
        this.favoritoService = favoritoService;
    }

    @GetMapping
    public ResponseEntity<List<FavoritoDTO>> listar(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(favoritoService.listarFavoritos(principal.userId()));
    }

    @PostMapping("/{productoId}")
    public ResponseEntity<FavoritoDTO> agregar(@AuthenticationPrincipal UserPrincipal principal,
                                                @PathVariable Long productoId) {
        return ResponseEntity.ok(favoritoService.agregarFavorito(principal.userId(), productoId));
    }

    @DeleteMapping("/{productoId}")
    public ResponseEntity<Void> quitar(@AuthenticationPrincipal UserPrincipal principal,
                                        @PathVariable Long productoId) {
        favoritoService.quitarFavorito(principal.userId(), productoId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check/{productoId}")
    public ResponseEntity<Map<String, Boolean>> check(@AuthenticationPrincipal UserPrincipal principal,
                                                       @PathVariable Long productoId) {
        return ResponseEntity.ok(Map.of("esFavorito",
                favoritoService.esFavorito(principal.userId(), productoId)));
    }
}
