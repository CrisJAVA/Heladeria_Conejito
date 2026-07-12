package com.heladeria.backend.repository;

import com.heladeria.backend.model.ConfiguracionMetodoPago;
import com.heladeria.backend.model.TipoMetodoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConfiguracionMetodoPagoRepository extends JpaRepository<ConfiguracionMetodoPago, Long> {
    Optional<ConfiguracionMetodoPago> findByTipo(TipoMetodoPago tipo);
    List<ConfiguracionMetodoPago> findByActivoTrue();
}
