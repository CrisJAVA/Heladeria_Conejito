package com.heladeria.backend.repository;

import com.heladeria.backend.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioIdOrderByCreatedAtDesc(Long usuarioId);
    List<Pedido> findByEstadoOrderByCreatedAtDesc(String estado);
    List<Pedido> findByCreatedAtBetween(LocalDateTime desde, LocalDateTime hasta);

    long countByUsuarioId(Long usuarioId);

    @Query("SELECT COALESCE(SUM(p.total), 0) FROM Pedido p WHERE p.usuario.id = :usuarioId AND p.estado = 'ENTREGADO'")
    BigDecimal sumTotalByUsuarioId(@Param("usuarioId") Long usuarioId);

    @Query("SELECT p.createdAt FROM Pedido p WHERE p.usuario.id = :usuarioId ORDER BY p.createdAt DESC")
    List<LocalDateTime> findLastOrderDateByUsuarioId(@Param("usuarioId") Long usuarioId);
}
