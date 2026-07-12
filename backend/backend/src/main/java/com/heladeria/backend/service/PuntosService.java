package com.heladeria.backend.service;

import com.heladeria.backend.dto.HistorialPuntosDTO;
import com.heladeria.backend.dto.PuntosDTO;
import com.heladeria.backend.model.*;
import static com.heladeria.backend.model.TipoTransaccion.SUMAR;
import com.heladeria.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Servicio central del programa de fidelización: acumula puntos por cada
 * pedido, actualiza el nivel del usuario y deja registro en el historial.
 */
@Service
public class PuntosService {

    private final PuntosRepository puntosRepository;
    private final HistorialPuntosRepository historialPuntosRepository;
    private final NivelFidelizacionRepository nivelFidelizacionRepository;
    private final UsuarioRepository usuarioRepository;

    public PuntosService(PuntosRepository puntosRepository,
            HistorialPuntosRepository historialPuntosRepository,
            NivelFidelizacionRepository nivelFidelizacionRepository,
            UsuarioRepository usuarioRepository) {
        this.puntosRepository = puntosRepository;
        this.historialPuntosRepository = historialPuntosRepository;
        this.nivelFidelizacionRepository = nivelFidelizacionRepository;
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Acredita los puntos correspondientes a un pedido recién creado.
     * Se calcula usando "puntos por cada S/1" del nivel actual del usuario
     * (o del nivel Bronce/base si aún no tiene puntos registrados).
     */
    @Transactional
    public void acreditarPuntosPorPedido(Usuario usuario, Pedido pedido) {
        Puntos puntos = puntosRepository.findFirstByUsuarioId(usuario.getId())
                .orElseGet(() -> {
                    Puntos nuevo = new Puntos();
                    nuevo.setUsuario(usuario);
                    nuevo.setPuntosActuales(0);
                    nuevo.setPuntosAcumulados(0);
                    return nuevo;
                });

        Integer puntosPorSol = puntos.getNivel() != null && puntos.getNivel().getPuntosPorSoles() != null
                ? puntos.getNivel().getPuntosPorSoles()
                : nivelFidelizacionRepository.findAllByOrderByPuntosMinimosAsc().stream()
                        .findFirst().map(NivelFidelizacion::getPuntosPorSoles).orElse(5);

        BigDecimal total = pedido.getTotal() != null ? pedido.getTotal() : BigDecimal.ZERO;
        int puntosGanados = total.multiply(BigDecimal.valueOf(puntosPorSol)).intValue();
        if (puntosGanados <= 0) {
            return;
        }

        puntos.setPuntosActuales(puntos.getPuntosActuales() + puntosGanados);
        puntos.setPuntosAcumulados(puntos.getPuntosAcumulados() + puntosGanados);

        Optional<NivelFidelizacion> nuevoNivel = nivelFidelizacionRepository
                .findNivelByPuntos(puntos.getPuntosAcumulados());
        nuevoNivel.ifPresent(puntos::setNivel);

        puntosRepository.save(puntos);

        HistorialPuntos historial = new HistorialPuntos();
        historial.setUsuario(usuario);
        historial.setPuntos(puntosGanados);
        historial.setTipo(SUMAR);
        historial.setConcepto("Pedido " + (pedido.getCodigoPedido() != null ? pedido.getCodigoPedido() : ""));
        historial.setReferenciaId(pedido.getId());
        historialPuntosRepository.save(historial);
    }

    @Transactional(readOnly = true)
    public PuntosDTO obtenerMisPuntos(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Puntos puntos = puntosRepository.findFirstByUsuarioId(usuarioId).orElse(null);
        List<NivelFidelizacion> niveles = nivelFidelizacionRepository.findAllByOrderByPuntosMinimosAsc();

        PuntosDTO dto = new PuntosDTO();
        dto.setAfiliado(puntos != null);
        if (puntos != null) {
            dto.setId(puntos.getId());
        }
        int acumulados = puntos != null ? puntos.getPuntosAcumulados() : 0;
        dto.setPuntosActuales(puntos != null ? puntos.getPuntosActuales() : 0);
        dto.setPuntosAcumulados(acumulados);

        NivelFidelizacion nivelActual = niveles.stream()
                .filter(n -> n.getPuntosMinimos() <= acumulados)
                .reduce((a, b) -> b)
                .orElse(niveles.isEmpty() ? null : niveles.get(0));

        if (nivelActual != null) {
            dto.setNivel(nivelActual.getNombre());
            dto.setNivelColor(nivelActual.getColorHex());
        }

        NivelFidelizacion siguienteNivel = niveles.stream()
                .filter(n -> n.getPuntosMinimos() > acumulados)
                .findFirst()
                .orElse(null);

        if (siguienteNivel != null) {
            dto.setNivelSiguiente(siguienteNivel.getNombre());
            dto.setPuntosSiguiente(siguienteNivel.getPuntosMinimos());
            int currentMin = nivelActual != null ? nivelActual.getPuntosMinimos() : 0;
            int range = siguienteNivel.getPuntosMinimos() - currentMin;
            int progress = acumulados - currentMin;
            dto.setPorcentajeProgreso(range > 0 ? Math.min(100, (int) (((double) progress / range) * 100)) : 100);
            dto.setPuntosFaltantes(Math.max(0, siguienteNivel.getPuntosMinimos() - acumulados));
        } else {
            dto.setPuntosSiguiente(0);
            dto.setPuntosFaltantes(0);
            dto.setPorcentajeProgreso(100);
        }

        return dto;
    }

    @Transactional(readOnly = true)
    public List<HistorialPuntosDTO> obtenerHistorial(Long usuarioId) {
        return historialPuntosRepository.findByUsuarioIdOrderByCreatedAtDesc(usuarioId).stream()
                .map(h -> {
                    HistorialPuntosDTO dto = new HistorialPuntosDTO();
                    dto.setId(h.getId());
                    dto.setPuntos(h.getPuntos());
                    dto.setTipo(h.getTipo() != null ? h.getTipo().name() : null);
                    dto.setConcepto(h.getConcepto());
                    dto.setCreatedAt(h.getCreatedAt());
                    return dto;
                }).collect(Collectors.toList());
    }
}
