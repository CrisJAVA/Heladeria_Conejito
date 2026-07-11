package com.heladeria.backend.service;

import com.heladeria.backend.dto.CambiarPasswordRequest;
import com.heladeria.backend.dto.ClienteDTO;
import com.heladeria.backend.dto.LoginRequest;
import com.heladeria.backend.dto.UsuarioAdminDTO;
import com.heladeria.backend.dto.PerfilDTO;
import com.heladeria.backend.dto.RegisterRequest;
import com.heladeria.backend.model.NivelFidelizacion;
import com.heladeria.backend.model.Puntos;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.NivelFidelizacionRepository;
import com.heladeria.backend.repository.PedidoRepository;
import com.heladeria.backend.repository.PuntosRepository;
import com.heladeria.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final PedidoRepository pedidoRepository;
    private final PuntosRepository puntosRepository;
    private final NivelFidelizacionRepository nivelFidelizacionRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
                          PedidoRepository pedidoRepository, PuntosRepository puntosRepository,
                          NivelFidelizacionRepository nivelFidelizacionRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.pedidoRepository = pedidoRepository;
        this.puntosRepository = puntosRepository;
        this.nivelFidelizacionRepository = nivelFidelizacionRepository;
    }

    @Transactional
    public Usuario registrar(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        usuario.setTelefono(request.getTelefono());
        usuario.setDireccion(request.getDireccion());
        usuario.setRol("CLIENTE");
        usuario.setAuthProvider("EMAIL");
        usuario.setActivo(true);
        usuario = usuarioRepository.save(usuario);

        NivelFidelizacion bronce = nivelFidelizacionRepository.findFirstByNombre("Bronce").orElse(null);
        Puntos puntos = new Puntos();
        puntos.setUsuario(usuario);
        puntos.setPuntosActuales(0);
        puntos.setPuntosAcumulados(0);
        puntos.setNivel(bronce);
        puntosRepository.save(puntos);

        return usuario;
    }

    @Transactional(readOnly = true)
    public Usuario login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Correo o contraseña incorrectos"));

        if (!usuario.getActivo()) {
            throw new RuntimeException("Cuenta desactivada. Contacte al administrador.");
        }

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPasswordHash())) {
            throw new RuntimeException("Correo o contraseña incorrectos");
        }

        return usuario;
    }

    @Transactional(readOnly = true)
    public Usuario obtenerPerfil(Long userId) {
        return usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Transactional
    public Usuario actualizarPerfil(Long userId, PerfilDTO dto) {
        Usuario usuario = obtenerPerfil(userId);
        if (dto.getNombre() != null && !dto.getNombre().isBlank()) {
            usuario.setNombre(dto.getNombre());
        }
        if (dto.getTelefono() != null) {
            usuario.setTelefono(dto.getTelefono());
        }
        if (dto.getDireccion() != null) {
            usuario.setDireccion(dto.getDireccion());
        }
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public void cambiarPassword(Long userId, CambiarPasswordRequest request) {
        Usuario usuario = obtenerPerfil(userId);

        if (!passwordEncoder.matches(request.getPasswordActual(), usuario.getPasswordHash())) {
            throw new RuntimeException("La contraseña actual es incorrecta");
        }

        if (!request.getNuevaPassword().equals(request.getConfirmarPassword())) {
            throw new RuntimeException("Las contraseñas nuevas no coinciden");
        }

        usuario.setPasswordHash(passwordEncoder.encode(request.getNuevaPassword()));
        usuarioRepository.save(usuario);
    }

    @Transactional(readOnly = true)
    public List<UsuarioAdminDTO> listarUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        NivelFidelizacion bronce = nivelFidelizacionRepository.findFirstByNombre("Bronce").orElse(null);
        List<UsuarioAdminDTO> result = new ArrayList<>();
        for (Usuario u : usuarios) {
            UsuarioAdminDTO dto = new UsuarioAdminDTO();
            dto.setId(u.getId());
            dto.setNombre(u.getNombre());
            dto.setEmail(u.getEmail());
            dto.setTelefono(u.getTelefono());
            dto.setDireccion(u.getDireccion());
            dto.setRol(u.getRol());
            dto.setActivo(u.getActivo());
            dto.setCreatedAt(u.getCreatedAt());

            long totalPedidos = pedidoRepository.countByUsuarioId(u.getId());
            dto.setTotalPedidos((int) totalPedidos);

            java.math.BigDecimal totalGastado = pedidoRepository.sumTotalByUsuarioId(u.getId());
            dto.setTotalGastado(totalGastado != null ? totalGastado : java.math.BigDecimal.ZERO);

            List<LocalDateTime> fechas = pedidoRepository.findLastOrderDateByUsuarioId(u.getId());
            dto.setUltimoPedido(fechas.isEmpty() ? null : fechas.get(0));

            Puntos puntos = puntosRepository.findFirstByUsuarioId(u.getId()).orElse(null);
            if (puntos != null) {
                dto.setPuntosActuales(puntos.getPuntosActuales());
                dto.setNivel(puntos.getNivel() != null ? puntos.getNivel().getNombre() : null);
            } else {
                dto.setPuntosActuales(0);
                dto.setNivel(bronce != null ? bronce.getNombre() : "Bronce");
            }

            result.add(dto);
        }
        return result;
    }

    @Transactional
    public void cambiarEstadoUsuario(Long id, Boolean activo) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setActivo(activo);
        usuarioRepository.save(usuario);
    }

    @Transactional
    public void cambiarRolUsuario(Long id, String rol) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        String rolUpper = rol.toUpperCase();
        if (!List.of("CLIENTE", "ADMIN").contains(rolUpper)) {
            throw new RuntimeException("Rol inválido. Use CLIENTE o ADMIN");
        }
        usuario.setRol(rolUpper);
        usuarioRepository.save(usuario);
    }

    @Transactional(readOnly = true)
    public List<ClienteDTO> listarClientes() {
        List<Usuario> usuarios = usuarioRepository.findByRolOrderByCreatedAtDesc("CLIENTE");
        NivelFidelizacion bronce = nivelFidelizacionRepository.findFirstByNombre("Bronce").orElse(null);
        List<ClienteDTO> result = new ArrayList<>();
        for (Usuario u : usuarios) {
            ClienteDTO dto = new ClienteDTO();
            dto.setId(u.getId());
            dto.setNombre(u.getNombre());
            dto.setEmail(u.getEmail());
            dto.setTelefono(u.getTelefono());
            dto.setDireccion(u.getDireccion());
            dto.setRol(u.getRol());
            dto.setCreatedAt(u.getCreatedAt());

            long totalPedidos = pedidoRepository.countByUsuarioId(u.getId());
            dto.setTotalPedidos(totalPedidos);

            BigDecimal totalGastado = pedidoRepository.sumTotalByUsuarioId(u.getId());
            dto.setTotalGastado(totalGastado != null ? totalGastado : BigDecimal.ZERO);

            List<LocalDateTime> fechas = pedidoRepository.findLastOrderDateByUsuarioId(u.getId());
            dto.setUltimoPedido(fechas.isEmpty() ? null : fechas.get(0));

            Puntos puntos = puntosRepository.findFirstByUsuarioId(u.getId()).orElse(null);
            if (puntos == null) {
                puntos = new Puntos();
                puntos.setUsuario(u);
                puntos.setPuntosActuales(0);
                puntos.setPuntosAcumulados(0);
                puntos.setNivel(bronce);
                puntosRepository.save(puntos);
            }

            dto.setPuntosActuales(puntos.getPuntosActuales());
            dto.setPuntosAcumulados(puntos.getPuntosAcumulados());
            if (puntos.getNivel() != null) {
                dto.setNivel(puntos.getNivel().getNombre());
                dto.setNivelColor(puntos.getNivel().getColorHex());
            }

            result.add(dto);
        }
        return result;
    }
}
