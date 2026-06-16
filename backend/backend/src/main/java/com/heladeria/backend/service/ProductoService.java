package com.heladeria.backend.service;

import com.heladeria.backend.dto.ProductoDTO;
import com.heladeria.backend.model.Categoria;
import com.heladeria.backend.model.Producto;
import com.heladeria.backend.repository.CategoriaRepository;
import com.heladeria.backend.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoService(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<ProductoDTO> listarTodos() {
        return productoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductoDTO> listarDisponibles() {
        return productoRepository.findByDisponibleTrue().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductoDTO> listarDestacados() {
        return productoRepository.findByDestacadoTrue().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductoDTO> buscarPorCategoria(Long categoriaId) {
        return productoRepository.findByCategoriaId(categoriaId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductoDTO> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ProductoDTO obtenerPorId(Long id) {
        return productoRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public ProductoDTO crear(ProductoDTO dto) {
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        Producto producto = toEntity(dto, categoria);
        return toDTO(productoRepository.save(producto));
    }

    public ProductoDTO actualizar(Long id, ProductoDTO dto) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setImagenUrl(dto.getImagenUrl());
        producto.setStock(dto.getStock());
        producto.setDisponible(dto.getDisponible());
        producto.setDestacado(dto.getDestacado());
        producto.setCategoria(categoria);
        return toDTO(productoRepository.save(producto));
    }

    public void eliminar(Long id) {
        productoRepository.deleteById(id);
    }

    private ProductoDTO toDTO(Producto p) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(p.getId());
        dto.setCategoriaId(p.getCategoria().getId());
        dto.setCategoriaNombre(p.getCategoria().getNombre());
        dto.setNombre(p.getNombre());
        dto.setDescripcion(p.getDescripcion());
        dto.setPrecio(p.getPrecio());
        dto.setImagenUrl(p.getImagenUrl());
        dto.setStock(p.getStock());
        dto.setDisponible(p.getDisponible());
        dto.setDestacado(p.getDestacado());
        return dto;
    }

    private Producto toEntity(ProductoDTO dto, Categoria categoria) {
        Producto p = new Producto();
        p.setCategoria(categoria);
        p.setNombre(dto.getNombre());
        p.setDescripcion(dto.getDescripcion());
        p.setPrecio(dto.getPrecio());
        p.setImagenUrl(dto.getImagenUrl());
        p.setStock(dto.getStock() != null ? dto.getStock() : 0);
        p.setDisponible(dto.getDisponible() != null ? dto.getDisponible() : true);
        p.setDestacado(dto.getDestacado() != null ? dto.getDestacado() : false);
        return p;
    }
}
