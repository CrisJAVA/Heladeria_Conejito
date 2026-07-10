package com.heladeria.backend.service;

import com.heladeria.backend.dto.CarritoDTO;
import com.heladeria.backend.model.Carrito;
import com.heladeria.backend.model.Producto;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.CarritoRepository;
import com.heladeria.backend.repository.ProductoRepository;
import com.heladeria.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    public CarritoService(CarritoRepository carritoRepository,
                           UsuarioRepository usuarioRepository,
                           ProductoRepository productoRepository) {
        this.carritoRepository = carritoRepository;
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
    }

    @Transactional(readOnly = true)
    public List<CarritoDTO> listarCarrito(Long usuarioId) {
        return carritoRepository.findByUsuarioIdOrderByCreatedAtAsc(usuarioId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CarritoDTO agregarProducto(Long usuarioId, Long productoId, Integer cantidad) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        var existing = carritoRepository.findByUsuarioIdAndProductoId(usuarioId, productoId);
        if (existing.isPresent()) {
            Carrito c = existing.get();
            c.setCantidad(c.getCantidad() + (cantidad != null ? cantidad : 1));
            return toDTO(carritoRepository.save(c));
        }

        Carrito carrito = new Carrito();
        carrito.setUsuario(usuario);
        carrito.setProducto(producto);
        carrito.setCantidad(cantidad != null ? cantidad : 1);
        return toDTO(carritoRepository.save(carrito));
    }

    @Transactional
    public CarritoDTO actualizarCantidad(Long usuarioId, Long productoId, Integer cantidad) {
        Carrito carrito = carritoRepository.findByUsuarioIdAndProductoId(usuarioId, productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado en el carrito"));
        if (cantidad <= 0) {
            carritoRepository.delete(carrito);
            return null;
        }
        carrito.setCantidad(cantidad);
        return toDTO(carritoRepository.save(carrito));
    }

    @Transactional
    public void eliminarProducto(Long usuarioId, Long productoId) {
        carritoRepository.findByUsuarioIdAndProductoId(usuarioId, productoId)
                .ifPresent(carritoRepository::delete);
    }

    @Transactional
    public void limpiarCarrito(Long usuarioId) {
        carritoRepository.deleteByUsuarioId(usuarioId);
    }

    private CarritoDTO toDTO(Carrito c) {
        CarritoDTO dto = new CarritoDTO();
        dto.setId(c.getId());
        dto.setProductoId(c.getProducto().getId());
        dto.setProductoNombre(c.getProducto().getNombre());
        dto.setProductoPrecio(c.getProducto().getPrecio());
        dto.setProductoImagenUrl(c.getProducto().getImagenUrl());
        dto.setProductoDescripcion(c.getProducto().getDescripcion());
        dto.setCantidad(c.getCantidad());
        dto.setProductoDisponible(c.getProducto().getDisponible());
        return dto;
    }
}
