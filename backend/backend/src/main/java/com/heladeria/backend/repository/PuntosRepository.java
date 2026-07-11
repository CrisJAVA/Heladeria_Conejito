package com.heladeria.backend.repository;

import com.heladeria.backend.model.Puntos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PuntosRepository extends JpaRepository<Puntos, Long> {
    Optional<Puntos> findFirstByUsuarioId(Long usuarioId);
}
