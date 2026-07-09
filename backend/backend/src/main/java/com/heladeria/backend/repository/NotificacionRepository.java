package com.heladeria.backend.repository;

import com.heladeria.backend.model.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
    List<Notificacion> findByUsuarioIdOrderByCreatedAtDesc(Long usuarioId);
    List<Notificacion> findByUsuarioIdAndLeidaFalseOrderByCreatedAtDesc(Long usuarioId);
    long countByUsuarioIdAndLeidaFalse(Long usuarioId);
}
