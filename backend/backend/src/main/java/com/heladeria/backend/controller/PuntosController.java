package com.heladeria.backend.controller;

import com.heladeria.backend.dto.PuntosDTO;
import com.heladeria.backend.model.NivelFidelizacion;
import com.heladeria.backend.model.Puntos;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.NivelFidelizacionRepository;
import com.heladeria.backend.repository.PuntosRepository;
import com.heladeria.backend.repository.UsuarioRepository;
import com.heladeria.backend.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/puntos")
public class PuntosController {

    private final PuntosRepository puntosRepository;
    private final UsuarioRepository usuarioRepository;
    private final NivelFidelizacionRepository nivelFidelizacionRepository;

    public PuntosController(PuntosRepository puntosRepository,
                            UsuarioRepository usuarioRepository,
                            NivelFidelizacionRepository nivelFidelizacionRepository) {
        this.puntosRepository = puntosRepository;
        this.usuarioRepository = usuarioRepository;
        this.nivelFidelizacionRepository = nivelFidelizacionRepository;
    }

    @GetMapping("/mis-puntos")
    @Transactional(readOnly = true)
    public ResponseEntity<PuntosDTO> obtenerMisPuntos(@AuthenticationPrincipal UserPrincipal principal) {
        Puntos puntos = puntosRepository.findByUsuario_Id(principal.userId()).orElse(null);

        PuntosDTO dto = new PuntosDTO();
        dto.setAfiliado(puntos != null);
        if (puntos != null) {
            dto.setId(puntos.getId());
            dto.setPuntosActuales(puntos.getPuntosActuales());
            dto.setPuntosAcumulados(puntos.getPuntosAcumulados());
            if (puntos.getNivel() != null) {
                dto.setNivel(puntos.getNivel().getNombre());
                dto.setNivelColor(puntos.getNivel().getColorHex());
            }
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/afiliarse")
    @Transactional
    public ResponseEntity<?> afiliarse(@AuthenticationPrincipal UserPrincipal principal) {
        if (puntosRepository.findByUsuario_Id(principal.userId()).isPresent()) {

            return ResponseEntity.badRequest().body(Map.of("error", "Ya estás afiliado al programa de fidelización"));
        }

        Usuario usuario = usuarioRepository.findById(principal.userId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        NivelFidelizacion bronce = nivelFidelizacionRepository.findByNombre("Bronce").orElse(null);

        Puntos puntos = new Puntos();
        puntos.setUsuario(usuario);
        puntos.setPuntosActuales(0);
        puntos.setPuntosAcumulados(0);
        puntos.setNivel(bronce);
        puntosRepository.save(puntos);

        PuntosDTO dto = new PuntosDTO();
        dto.setId(puntos.getId());
        dto.setPuntosActuales(0);
        dto.setPuntosAcumulados(0);
        dto.setAfiliado(true);
        if (bronce != null) {
            dto.setNivel(bronce.getNombre());
            dto.setNivelColor(bronce.getColorHex());
        }

        return ResponseEntity.ok(Map.of("mensaje", "¡Bienvenido al programa de fidelización!", "puntos", dto));
    }
}
