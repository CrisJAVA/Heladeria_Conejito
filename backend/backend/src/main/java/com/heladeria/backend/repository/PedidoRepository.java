package com.heladeria.backend.repository;

import com.heladeria.backend.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioIdOrderByCreatedAtDesc(Long usuarioId);
    List<Pedido> findByEstadoOrderByCreatedAtDesc(String estado);
}
