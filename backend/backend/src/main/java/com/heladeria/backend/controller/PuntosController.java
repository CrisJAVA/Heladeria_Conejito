package com.heladeria.backend.controller;

import com.heladeria.backend.dto.PuntosDTO;
import com.heladeria.backend.model.NivelFidelizacion;
import com.heladeria.backend.model.Puntos;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.NivelFidelizacionRepository;
import com.heladeria.backend.repository.PuntosRepository;
import com.heladeria.backend.repository.UsuarioRepository;
import com.heladeria.backend.security.UserPrincipal;
import com.heladeria.backend.service.PuntosService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/puntos")
public class PuntosController {

    private final PuntosService puntosService;
    private final PuntosRepository puntosRepository;
    private final UsuarioRepository usuarioRepository;
    private final NivelFidelizacionRepository nivelFidelizacionRepository;

    public PuntosController(PuntosService puntosService,
                            PuntosRepository puntosRepository,
                            UsuarioRepository usuarioRepository,
                            NivelFidelizacionRepository nivelFidelizacionRepository) {
        this.puntosService = puntosService;
        this.puntosRepository = puntosRepository;
        this.usuarioRepository = usuarioRepository;
        this.nivelFidelizacionRepository = nivelFidelizacionRepository;
    }

    @GetMapping("/mis-puntos")
    public ResponseEntity<PuntosDTO> obtenerMisPuntos(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(puntosService.obtenerMisPuntos(principal.userId()));
    }

    @PostMapping("/afiliarse")
    @Transactional
    public ResponseEntity<?> afiliarse(@AuthenticationPrincipal UserPrincipal principal) {
        if (puntosRepository.findFirstByUsuarioId(principal.userId()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Ya estás afiliado al programa de fidelización"));
        }

        Usuario usuario = usuarioRepository.findById(principal.userId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        NivelFidelizacion bronce = nivelFidelizacionRepository.findFirstByNombre("Bronce").orElse(null);

        Puntos puntos = new Puntos();
        puntos.setUsuario(usuario);
        puntos.setPuntosActuales(0);
        puntos.setPuntosAcumulados(0);
        puntos.setNivel(bronce);
        puntosRepository.save(puntos);

        PuntosDTO dto = puntosService.obtenerMisPuntos(principal.userId());

        return ResponseEntity.ok(Map.of("mensaje", "¡Bienvenido al programa de fidelización!", "puntos", dto));
    }
}
