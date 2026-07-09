package com.heladeria.backend.service;

import com.heladeria.backend.dto.PromocionDTO;
import com.heladeria.backend.exception.ForbiddenException;
import com.heladeria.backend.model.Promocion;
import com.heladeria.backend.repository.PromocionRepository;
import com.heladeria.backend.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromocionService {

    private final PromocionRepository promocionRepository;

    public PromocionService(PromocionRepository promocionRepository) {
        this.promocionRepository = promocionRepository;
    }

    private void checkAdmin(UserPrincipal principal) {
        if (principal == null || !"ADMIN".equals(principal.rol())) {
            throw new ForbiddenException("Acceso denegado: se requiere rol ADMIN");
        }
    }

    @Transactional(readOnly = true)
    public List<PromocionDTO> listarActivas() {
        return promocionRepository.findByActivaTrue().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PromocionDTO> listarTodas() {
        return promocionRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public PromocionDTO crear(UserPrincipal principal, PromocionDTO dto) {
        checkAdmin(principal);
        Promocion promo = new Promocion();
        aplicarCambios(promo, dto);
        return toDTO(promocionRepository.save(promo));
    }

    @Transactional
    public PromocionDTO actualizar(UserPrincipal principal, Long id, PromocionDTO dto) {
        checkAdmin(principal);
        Promocion promo = promocionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promoción no encontrada"));
        aplicarCambios(promo, dto);
        return toDTO(promocionRepository.save(promo));
    }

    @Transactional
    public PromocionDTO cambiarEstado(UserPrincipal principal, Long id, Boolean activa) {
        checkAdmin(principal);
        Promocion promo = promocionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promoción no encontrada"));
        promo.setActiva(activa);
        return toDTO(promocionRepository.save(promo));
    }

    @Transactional
    public void eliminar(UserPrincipal principal, Long id) {
        checkAdmin(principal);
        if (!promocionRepository.existsById(id)) {
            throw new RuntimeException("Promoción no encontrada");
        }
        promocionRepository.deleteById(id);
    }

    private void aplicarCambios(Promocion promo, PromocionDTO dto) {
        promo.setTitulo(dto.getTitulo());
        promo.setDescripcion(dto.getDescripcion());
        promo.setDescuento(dto.getDescuento());
        promo.setDiasVigencia(dto.getDiasVigencia());
        promo.setIcono(dto.getIcono());
        promo.setColor(dto.getColor());
        promo.setActiva(dto.getActiva() != null ? dto.getActiva() : true);
        promo.setFechaInicio(dto.getFechaInicio());
        promo.setFechaFin(dto.getFechaFin());
    }

    private PromocionDTO toDTO(Promocion p) {
        PromocionDTO dto = new PromocionDTO();
        dto.setId(p.getId());
        dto.setTitulo(p.getTitulo());
        dto.setDescripcion(p.getDescripcion());
        dto.setDescuento(p.getDescuento());
        dto.setDiasVigencia(p.getDiasVigencia());
        dto.setIcono(p.getIcono());
        dto.setColor(p.getColor());
        dto.setActiva(p.getActiva());
        dto.setFechaInicio(p.getFechaInicio());
        dto.setFechaFin(p.getFechaFin());
        dto.setCreatedAt(p.getCreatedAt());
        dto.setUpdatedAt(p.getUpdatedAt());
        return dto;
    }
}
