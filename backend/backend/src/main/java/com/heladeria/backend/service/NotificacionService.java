package com.heladeria.backend.service;

import com.heladeria.backend.dto.NotificacionDTO;
import com.heladeria.backend.model.Notificacion;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.NotificacionRepository;
import com.heladeria.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificacionService {

    private final NotificacionRepository notificacionRepository;
    private final UsuarioRepository usuarioRepository;

    public NotificacionService(NotificacionRepository notificacionRepository,
                                UsuarioRepository usuarioRepository) {
        this.notificacionRepository = notificacionRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional(readOnly = true)
    public List<NotificacionDTO> listarPorUsuario(Long usuarioId) {
        return notificacionRepository.findByUsuarioIdOrderByCreatedAtDesc(usuarioId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public long contarNoLeidas(Long usuarioId) {
        return notificacionRepository.countByUsuarioIdAndLeidaFalse(usuarioId);
    }

    @Transactional
    public void marcarComoLeida(Long notificacionId, Long usuarioId) {
        Notificacion notificacion = notificacionRepository.findById(notificacionId)
                .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));
        if (!notificacion.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes acceso a esta notificación");
        }
        notificacion.setLeida(true);
        notificacionRepository.save(notificacion);
    }

    @Transactional
    public void marcarTodasComoLeidas(Long usuarioId) {
        List<Notificacion> noLeidas = notificacionRepository
                .findByUsuarioIdAndLeidaFalseOrderByCreatedAtDesc(usuarioId);
        noLeidas.forEach(n -> n.setLeida(true));
        notificacionRepository.saveAll(noLeidas);
    }

    @Transactional
    public void eliminar(Long notificacionId, Long usuarioId) {
        Notificacion n = notificacionRepository.findById(notificacionId)
                .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));
        if (!n.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes acceso a esta notificación");
        }
        notificacionRepository.delete(n);
    }

    @Transactional
    public NotificacionDTO crearNotificacion(Long usuarioId, String titulo, String mensaje, String tipo, Long referenciaId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Notificacion n = new Notificacion();
        n.setUsuario(usuario);
        n.setTitulo(titulo);
        n.setMensaje(mensaje);
        n.setTipo(tipo);
        n.setReferenciaId(referenciaId);
        return toDTO(notificacionRepository.save(n));
    }

    private NotificacionDTO toDTO(Notificacion n) {
        NotificacionDTO dto = new NotificacionDTO();
        dto.setId(n.getId());
        dto.setTitulo(n.getTitulo());
        dto.setMensaje(n.getMensaje());
        dto.setLeida(n.isLeida());
        dto.setTipo(n.getTipo());
        dto.setReferenciaId(n.getReferenciaId());
        dto.setCreatedAt(n.getCreatedAt());
        return dto;
    }
}
