package com.heladeria.backend.config;

import com.heladeria.backend.model.Usuario;
import com.heladeria.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!usuarioRepository.existsByEmail("admin@gmail.com")) {
            Usuario admin = new Usuario();
            admin.setNombre("Administrador");
            admin.setEmail("admin@gmail.com");
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setRol("ADMIN");
            admin.setAuthProvider("EMAIL");
            admin.setActivo(true);
            usuarioRepository.save(admin);
        }
    }
}
