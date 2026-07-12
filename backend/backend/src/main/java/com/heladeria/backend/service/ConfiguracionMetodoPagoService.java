package com.heladeria.backend.service;

import com.heladeria.backend.model.ConfiguracionMetodoPago;
import com.heladeria.backend.model.TipoMetodoPago;
import com.heladeria.backend.repository.ConfiguracionMetodoPagoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConfiguracionMetodoPagoService {

    private final ConfiguracionMetodoPagoRepository repository;

    public ConfiguracionMetodoPagoService(ConfiguracionMetodoPagoRepository repository) {
        this.repository = repository;
    }

    public List<ConfiguracionMetodoPago> listarTodos() {
        return repository.findAll();
    }

    public List<ConfiguracionMetodoPago> listarActivos() {
        return repository.findByActivoTrue();
    }

    public ConfiguracionMetodoPago obtenerPorTipo(TipoMetodoPago tipo) {
        return repository.findByTipo(tipo).orElseGet(() -> {
            ConfiguracionMetodoPago nuevo = new ConfiguracionMetodoPago();
            nuevo.setTipo(tipo);
            nuevo.setActivo(false);
            return repository.save(nuevo);
        });
    }

    public ConfiguracionMetodoPago actualizar(TipoMetodoPago tipo, ConfiguracionMetodoPago datos) {
        ConfiguracionMetodoPago config = repository.findByTipo(tipo).orElseGet(() -> {
            ConfiguracionMetodoPago nuevo = new ConfiguracionMetodoPago();
            nuevo.setTipo(tipo);
            return nuevo;
        });
        config.setNombreTitular(datos.getNombreTitular());
        config.setNumeroCelular(datos.getNumeroCelular());
        config.setUsuarioVisible(datos.getUsuarioVisible());
        config.setMensaje(datos.getMensaje());
        config.setActivo(datos.getActivo() != null ? datos.getActivo() : config.getActivo());
        return repository.save(config);
    }

    public ConfiguracionMetodoPago actualizarImagen(TipoMetodoPago tipo, String imagenUrl) {
        ConfiguracionMetodoPago config = repository.findByTipo(tipo).orElseGet(() -> {
            ConfiguracionMetodoPago nuevo = new ConfiguracionMetodoPago();
            nuevo.setTipo(tipo);
            nuevo.setActivo(false);
            return nuevo;
        });
        config.setImagenUrl(imagenUrl);
        return repository.save(config);
    }

    public ConfiguracionMetodoPago cambiarEstado(TipoMetodoPago tipo, Boolean activo) {
        ConfiguracionMetodoPago config = repository.findByTipo(tipo).orElseThrow(
                () -> new RuntimeException("Configuración no encontrada: " + tipo));
        config.setActivo(activo);
        return repository.save(config);
    }
}
