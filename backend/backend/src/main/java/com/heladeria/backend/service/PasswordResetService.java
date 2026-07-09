package com.heladeria.backend.service;

import com.heladeria.backend.model.PasswordResetToken;
import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.PasswordResetTokenRepository;
import com.heladeria.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetService(UsuarioRepository usuarioRepository,
                                 PasswordResetTokenRepository tokenRepository,
                                 PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public String solicitarReset(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Si el email existe, recibirás un enlace de recuperación"));

        tokenRepository.deleteByUsuarioId(usuario.getId());

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUsuario(usuario);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        tokenRepository.save(resetToken);

        return token;
    }

    @Transactional
    public void resetPassword(String token, String nuevaPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (resetToken.isUsed()) {
            throw new RuntimeException("Este enlace ya ha sido utilizado");
        }
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("El enlace ha expirado. Solicita uno nuevo");
        }

        Usuario usuario = resetToken.getUsuario();
        usuario.setPasswordHash(passwordEncoder.encode(nuevaPassword));
        usuarioRepository.save(usuario);

        resetToken.setUsed(true);
        tokenRepository.save(resetToken);
    }
}
