package com.heladeria.backend.service;

import com.heladeria.backend.dto.ConfiguracionDTO;
import com.heladeria.backend.exception.ForbiddenException;
import com.heladeria.backend.model.Configuracion;
import com.heladeria.backend.repository.ConfiguracionRepository;
import com.heladeria.backend.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ConfiguracionService {

    private final ConfiguracionRepository configuracionRepository;

    public ConfiguracionService(ConfiguracionRepository configuracionRepository) {
        this.configuracionRepository = configuracionRepository;
    }

    private void checkAdmin(UserPrincipal principal) {
        if (principal == null || !"ADMIN".equals(principal.rol())) {
            throw new ForbiddenException("Acceso denegado: se requiere rol ADMIN");
        }
    }

    @Transactional
    public ConfiguracionDTO obtener() {
        Configuracion config = configuracionRepository.findAll().stream().findFirst()
                .orElseGet(() -> configuracionRepository.save(new Configuracion()));
        return toDTO(config);
    }

    @Transactional
    public ConfiguracionDTO actualizar(UserPrincipal principal, ConfiguracionDTO dto) {
        checkAdmin(principal);
        Configuracion config = configuracionRepository.findAll().stream().findFirst()
                .orElseGet(Configuracion::new);

        if (dto.getNombreNegocio() != null) config.setNombreNegocio(dto.getNombreNegocio());
        if (dto.getDescripcion() != null) config.setDescripcion(dto.getDescripcion());
        if (dto.getLogoUrl() != null) config.setLogoUrl(dto.getLogoUrl());
        if (dto.getDireccion() != null) config.setDireccion(dto.getDireccion());
        if (dto.getTelefono() != null) config.setTelefono(dto.getTelefono());
        if (dto.getEmail() != null) config.setEmail(dto.getEmail());
        if (dto.getHorarioSemana() != null) config.setHorarioSemana(dto.getHorarioSemana());
        if (dto.getHorarioSabado() != null) config.setHorarioSabado(dto.getHorarioSabado());
        if (dto.getHorarioDomingo() != null) config.setHorarioDomingo(dto.getHorarioDomingo());
        if (dto.getInstagram() != null) config.setInstagram(dto.getInstagram());
        if (dto.getFacebook() != null) config.setFacebook(dto.getFacebook());
        if (dto.getWhatsapp() != null) config.setWhatsapp(dto.getWhatsapp());
        if (dto.getMetodosPago() != null) config.setMetodosPago(dto.getMetodosPago());
        if (dto.getPuntosPorSol() != null) config.setPuntosPorSol(dto.getPuntosPorSol());
        if (dto.getPuntosRecompensa() != null) config.setPuntosRecompensa(dto.getPuntosRecompensa());

        return toDTO(configuracionRepository.save(config));
    }

    private ConfiguracionDTO toDTO(Configuracion c) {
        ConfiguracionDTO dto = new ConfiguracionDTO();
        dto.setId(c.getId());
        dto.setNombreNegocio(c.getNombreNegocio());
        dto.setDescripcion(c.getDescripcion());
        dto.setLogoUrl(c.getLogoUrl());
        dto.setDireccion(c.getDireccion());
        dto.setTelefono(c.getTelefono());
        dto.setEmail(c.getEmail());
        dto.setHorarioSemana(c.getHorarioSemana());
        dto.setHorarioSabado(c.getHorarioSabado());
        dto.setHorarioDomingo(c.getHorarioDomingo());
        dto.setInstagram(c.getInstagram());
        dto.setFacebook(c.getFacebook());
        dto.setWhatsapp(c.getWhatsapp());
        dto.setMetodosPago(c.getMetodosPago());
        dto.setPuntosPorSol(c.getPuntosPorSol());
        dto.setPuntosRecompensa(c.getPuntosRecompensa());
        return dto;
    }
}
