package com.heladeria.backend.service;

import com.heladeria.backend.dto.CambiarEstadoUsuarioRequest;
import com.heladeria.backend.dto.CambiarPasswordRequest;
import com.heladeria.backend.dto.CambiarRolRequest;
import com.heladeria.backend.dto.LoginRequest;
import com.heladeria.backend.dto.PerfilDTO;
import com.heladeria.backend.dto.RegisterRequest;
import com.heladeria.backend.dto.UsuarioAdminDTO;
import com.heladeria.backend.exception.ForbiddenException;
import com.heladeria.backend.model.Pedido;
import com.heladeria.backend.model.Puntos;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.PedidoRepository;
import com.heladeria.backend.repository.PuntosRepository;
import com.heladeria.backend.repository.UsuarioRepository;
import com.heladeria.backend.security.UserPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final PedidoRepository pedidoRepository;
    private final PuntosRepository puntosRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
                           PedidoRepository pedidoRepository, PuntosRepository puntosRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.pedidoRepository = pedidoRepository;
        this.puntosRepository = puntosRepository;
    }

    private void checkAdmin(UserPrincipal principal) {
        if (principal == null || !"ADMIN".equals(principal.rol())) {
            throw new ForbiddenException("Acceso denegado: se requiere rol ADMIN");
        }
    }

    @Transactional(readOnly = true)
    public List<UsuarioAdminDTO> listarTodos(UserPrincipal principal) {
        checkAdmin(principal);
        return usuarioRepository.findAll().stream().map(u -> {
            UsuarioAdminDTO dto = new UsuarioAdminDTO();
            dto.setId(u.getId());
            dto.setNombre(u.getNombre());
            dto.setEmail(u.getEmail());
            dto.setTelefono(u.getTelefono());
            dto.setDireccion(u.getDireccion());
            dto.setRol(u.getRol());
            dto.setActivo(u.getActivo());
            dto.setCreatedAt(u.getCreatedAt());

            List<Pedido> pedidosUsuario = pedidoRepository.findByUsuarioIdOrderByCreatedAtDesc(u.getId());
            dto.setTotalPedidos(pedidosUsuario.size());
            dto.setTotalGastado(pedidosUsuario.stream()
                    .filter(p -> !"CANCELADO".equals(p.getEstado()))
                    .map(Pedido::getTotal)
                    .filter(java.util.Objects::nonNull)
                    .reduce(BigDecimal.ZERO, BigDecimal::add));
            dto.setUltimoPedido(pedidosUsuario.isEmpty() ? null : pedidosUsuario.get(0).getCreatedAt());

            Puntos puntos = puntosRepository.findByUsuarioId(u.getId()).orElse(null);
            dto.setPuntosActuales(puntos != null ? puntos.getPuntosActuales() : 0);
            dto.setNivel(puntos != null && puntos.getNivel() != null ? puntos.getNivel().getNombre() : "Bronce");

            return dto;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void cambiarEstado(UserPrincipal principal, Long usuarioId, CambiarEstadoUsuarioRequest request) {
        checkAdmin(principal);
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (request.getActivo() != null) {
            usuario.setActivo(request.getActivo());
        }
        usuarioRepository.save(usuario);
    }

    @Transactional
    public void cambiarRol(UserPrincipal principal, Long usuarioId, CambiarRolRequest request) {
        checkAdmin(principal);
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!"ADMIN".equals(request.getRol()) && !"CLIENTE".equals(request.getRol())) {
            throw new RuntimeException("Rol inválido");
        }
        usuario.setRol(request.getRol());
        usuarioRepository.save(usuario);
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

        return usuarioRepository.save(usuario);
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
}
