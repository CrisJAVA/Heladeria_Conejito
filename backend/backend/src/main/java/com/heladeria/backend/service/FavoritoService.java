package com.heladeria.backend.service;

import com.heladeria.backend.dto.FavoritoDTO;
import com.heladeria.backend.model.Favorito;
import com.heladeria.backend.model.Producto;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.FavoritoRepository;
import com.heladeria.backend.repository.ProductoRepository;
import com.heladeria.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoritoService {

    private final FavoritoRepository favoritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    public FavoritoService(FavoritoRepository favoritoRepository,
                            UsuarioRepository usuarioRepository,
                            ProductoRepository productoRepository) {
        this.favoritoRepository = favoritoRepository;
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
    }

    @Transactional(readOnly = true)
    public List<FavoritoDTO> listarFavoritos(Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public FavoritoDTO agregarFavorito(Long usuarioId, Long productoId) {
        if (favoritoRepository.existsByUsuarioIdAndProductoId(usuarioId, productoId)) {
            throw new RuntimeException("El producto ya está en favoritos");
        }
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Favorito favorito = new Favorito();
        favorito.setUsuario(usuario);
        favorito.setProducto(producto);
        return toDTO(favoritoRepository.save(favorito));
    }

    @Transactional
    public void quitarFavorito(Long usuarioId, Long productoId) {
        if (!favoritoRepository.existsByUsuarioIdAndProductoId(usuarioId, productoId)) {
            throw new RuntimeException("El producto no está en favoritos");
        }
        favoritoRepository.deleteByUsuarioIdAndProductoId(usuarioId, productoId);
    }

    @Transactional(readOnly = true)
    public boolean esFavorito(Long usuarioId, Long productoId) {
        return favoritoRepository.existsByUsuarioIdAndProductoId(usuarioId, productoId);
    }

    private FavoritoDTO toDTO(Favorito f) {
        FavoritoDTO dto = new FavoritoDTO();
        dto.setId(f.getId());
        dto.setProductoId(f.getProducto().getId());
        dto.setProductoNombre(f.getProducto().getNombre());
        dto.setProductoPrecio(f.getProducto().getPrecio());
        dto.setProductoCategoria(f.getProducto().getCategoria().getNombre());
        dto.setProductoImagenUrl(f.getProducto().getImagenUrl());
        dto.setProductoDisponible(f.getProducto().getDisponible());
        return dto;
    }
}
