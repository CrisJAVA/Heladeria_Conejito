package com.heladeria.backend.service;

import com.heladeria.backend.dto.BeneficioDTO;
import com.heladeria.backend.dto.NivelFidelizacionDTO;
import com.heladeria.backend.model.Beneficio;
import com.heladeria.backend.model.NivelFidelizacion;
import com.heladeria.backend.repository.BeneficioRepository;
import com.heladeria.backend.repository.NivelFidelizacionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NivelFidelizacionService {

    private final NivelFidelizacionRepository nivelRepository;
    private final BeneficioRepository beneficioRepository;

    public NivelFidelizacionService(NivelFidelizacionRepository nivelRepository, BeneficioRepository beneficioRepository) {
        this.nivelRepository = nivelRepository;
        this.beneficioRepository = beneficioRepository;
    }

    @Transactional(readOnly = true)
    public List<NivelFidelizacionDTO> listarTodos() {
        return nivelRepository.findAllByOrderByPuntosMinimosAsc().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public NivelFidelizacionDTO actualizar(Long id, NivelFidelizacionDTO dto) {
        NivelFidelizacion nivel = nivelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nivel no encontrado"));
        nivel.setNombre(dto.getNombre());
        nivel.setPuntosMinimos(dto.getPuntosMinimos());
        nivel.setPuntosPorSoles(dto.getPuntosPorSoles());
        nivel.setColorHex(dto.getColorHex());
        nivel = nivelRepository.save(nivel);

        if (dto.getBeneficios() != null) {
            beneficioRepository.deleteByNivelId(nivel.getId());
            for (BeneficioDTO b : dto.getBeneficios()) {
                Beneficio beneficio = new Beneficio();
                beneficio.setNivel(nivel);
                beneficio.setDescripcion(b.getDescripcion());
                beneficio.setTipo(b.getTipo());
                beneficio.setValor(b.getValor());
                beneficioRepository.save(beneficio);
            }
        }
        return toDTO(nivel);
    }

    private NivelFidelizacionDTO toDTO(NivelFidelizacion n) {
        NivelFidelizacionDTO dto = new NivelFidelizacionDTO();
        dto.setId(n.getId());
        dto.setNombre(n.getNombre());
        dto.setPuntosMinimos(n.getPuntosMinimos());
        dto.setPuntosPorSoles(n.getPuntosPorSoles());
        dto.setColorHex(n.getColorHex());
        dto.setBeneficios(beneficioRepository.findByNivelId(n.getId()).stream().map(b -> {
            BeneficioDTO bd = new BeneficioDTO();
            bd.setId(b.getId());
            bd.setDescripcion(b.getDescripcion());
            bd.setTipo(b.getTipo());
            bd.setValor(b.getValor());
            return bd;
        }).collect(Collectors.toList()));
        return dto;
    }
}
