package com.heladeria.backend.repository;

import com.heladeria.backend.model.NivelFidelizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NivelFidelizacionRepository extends JpaRepository<NivelFidelizacion, Long> {
    List<NivelFidelizacion> findAllByOrderByPuntosMinimosAsc();

    @Query("SELECT n FROM NivelFidelizacion n WHERE n.puntosMinimos <= ?1 ORDER BY n.puntosMinimos DESC LIMIT 1")
    java.util.Optional<NivelFidelizacion> findNivelByPuntos(Integer puntos);
}
