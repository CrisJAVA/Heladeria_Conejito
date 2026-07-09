package com.heladeria.backend.service;

import com.heladeria.backend.dto.ResenaDTO;
import com.heladeria.backend.model.Producto;
import com.heladeria.backend.model.Resena;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.ProductoRepository;
import com.heladeria.backend.repository.ResenaRepository;
import com.heladeria.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ResenaService {

    private final ResenaRepository resenaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    public ResenaService(ResenaRepository resenaRepository,
                          UsuarioRepository usuarioRepository,
                          ProductoRepository productoRepository) {
        this.resenaRepository = resenaRepository;
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
    }

    @Transactional(readOnly = true)
    public List<ResenaDTO> listarPorProducto(Long productoId) {
        return resenaRepository.findByProductoIdOrderByCreatedAtDesc(productoId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Map<String, Object> obtenerEstadisticas(Long productoId) {
        Double promedio = resenaRepository.promedioCalificacionByProductoId(productoId);
        Long total = resenaRepository.countByProductoId(productoId);
        Map<String, Object> stats = new HashMap<>();
        stats.put("promedio", promedio != null ? Math.round(promedio * 10.0) / 10.0 : 0);
        stats.put("total", total != null ? total : 0);
        return stats;
    }

    @Transactional
    public ResenaDTO crearResena(Long usuarioId, Long productoId, Integer calificacion, String comentario) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (calificacion < 1 || calificacion > 5) {
            throw new RuntimeException("La calificación debe ser entre 1 y 5");
        }

        if (resenaRepository.existsByUsuarioIdAndProductoId(usuarioId, productoId)) {
            throw new RuntimeException("Ya has reseñado este producto anteriormente");
        }

        Resena resena = new Resena();
        resena.setUsuario(usuario);
        resena.setProducto(producto);
        resena.setCalificacion(calificacion);
        resena.setComentario(comentario);
        return toDTO(resenaRepository.save(resena));
    }

    private ResenaDTO toDTO(Resena r) {
        ResenaDTO dto = new ResenaDTO();
        dto.setId(r.getId());
        dto.setUsuarioId(r.getUsuario().getId());
        dto.setUsuarioNombre(r.getUsuario().getNombre());
        dto.setProductoId(r.getProducto().getId());
        dto.setCalificacion(r.getCalificacion());
        dto.setComentario(r.getComentario());
        dto.setCreatedAt(r.getCreatedAt());
        return dto;
    }
}
