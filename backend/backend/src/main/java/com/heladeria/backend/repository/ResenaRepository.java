package com.heladeria.backend.repository;

import com.heladeria.backend.model.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Long> {
    List<Resena> findByProductoIdOrderByCreatedAtDesc(Long productoId);
    List<Resena> findByUsuarioIdOrderByCreatedAtDesc(Long usuarioId);
    boolean existsByUsuarioIdAndProductoId(Long usuarioId, Long productoId);
    @Query("SELECT AVG(r.calificacion) FROM Resena r WHERE r.producto.id = ?1")
    Double promedioCalificacionByProductoId(Long productoId);
    @Query("SELECT COUNT(r) FROM Resena r WHERE r.producto.id = ?1")
    Long countByProductoId(Long productoId);
}
