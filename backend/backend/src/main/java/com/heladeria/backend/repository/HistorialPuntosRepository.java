package com.heladeria.backend.repository;

import com.heladeria.backend.model.HistorialPuntos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistorialPuntosRepository extends JpaRepository<HistorialPuntos, Long> {
    List<HistorialPuntos> findByUsuarioIdOrderByCreatedAtDesc(Long usuarioId);
}
