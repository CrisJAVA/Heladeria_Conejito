package com.heladeria.backend.config;

import com.heladeria.backend.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/productos/**").permitAll()
                .requestMatchers("/api/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/categorias/**").permitAll()
                .requestMatchers("/api/categorias/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/promociones/**").permitAll()
                .requestMatchers("/api/promociones/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/niveles/**").permitAll()
                .requestMatchers("/api/niveles/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/configuracion/**").permitAll()
                .requestMatchers("/api/configuracion/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/resenas/producto/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/resenas/**").authenticated()
                .requestMatchers("/api/resenas/**").hasRole("ADMIN")
                .requestMatchers("/uploads/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/pedidos/mis-pedidos").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/pedidos").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/pedidos/{id}").authenticated()
                .requestMatchers("/api/pedidos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/usuarios/clientes").hasRole("ADMIN")
                .requestMatchers("/api/usuarios/**").authenticated()
                .requestMatchers("/api/favoritos/**").authenticated()
                .requestMatchers("/api/notificaciones/**").authenticated()
                .requestMatchers("/api/carrito/**").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/landing-secciones/**").permitAll()
                .requestMatchers("/api/landing-secciones/**").hasRole("ADMIN")
                .requestMatchers("/api/reportes/**").hasRole("ADMIN")
                .requestMatchers("/api/upload/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
