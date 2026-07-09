package com.heladeria.backend.repository;

import com.heladeria.backend.model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    List<Favorito> findByUsuarioId(Long usuarioId);
    Optional<Favorito> findByUsuarioIdAndProductoId(Long usuarioId, Long productoId);
    boolean existsByUsuarioIdAndProductoId(Long usuarioId, Long productoId);
    void deleteByUsuarioIdAndProductoId(Long usuarioId, Long productoId);
}
