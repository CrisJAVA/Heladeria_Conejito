package com.heladeria.backend.repository;

import com.heladeria.backend.model.Beneficio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BeneficioRepository extends JpaRepository<Beneficio, Long> {
    List<Beneficio> findByNivelId(Long nivelId);
    void deleteByNivelId(Long nivelId);
}
