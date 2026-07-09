package com.heladeria.backend.repository;

import com.heladeria.backend.model.MetodoEntrega;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MetodoEntregaRepository extends JpaRepository<MetodoEntrega, Long> {
    Optional<MetodoEntrega> findByNombreIgnoreCase(String nombre);
}
