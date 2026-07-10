package com.heladeria.backend.repository;

import com.heladeria.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByCategoriaId(Long categoriaId);
    List<Producto> findByDisponibleTrue();
    List<Producto> findByDestacadoTrue();
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
