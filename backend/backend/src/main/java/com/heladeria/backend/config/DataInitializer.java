package com.heladeria.backend.config;

import com.heladeria.backend.model.*;
import com.heladeria.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final MetodoEntregaRepository metodoEntregaRepository;
    private final MetodoPagoRepository metodoPagoRepository;
    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;
    private final NivelFidelizacionRepository nivelFidelizacionRepository;
    private final PromocionRepository promocionRepository;
    private final SeccionLandingRepository seccionLandingRepository;
    private final PuntosRepository puntosRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UsuarioRepository usuarioRepository,
                           MetodoEntregaRepository metodoEntregaRepository,
                           MetodoPagoRepository metodoPagoRepository,
                           CategoriaRepository categoriaRepository,
                           ProductoRepository productoRepository,
                           NivelFidelizacionRepository nivelFidelizacionRepository,
                           PromocionRepository promocionRepository,
                           SeccionLandingRepository seccionLandingRepository,
                           PuntosRepository puntosRepository,
                           PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.metodoEntregaRepository = metodoEntregaRepository;
        this.metodoPagoRepository = metodoPagoRepository;
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
        this.nivelFidelizacionRepository = nivelFidelizacionRepository;
        this.promocionRepository = promocionRepository;
        this.seccionLandingRepository = seccionLandingRepository;
        this.puntosRepository = puntosRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
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

        if (!usuarioRepository.existsByEmail("cliente@test.com")) {
            Usuario cliente = new Usuario();
            cliente.setNombre("Cliente Prueba");
            cliente.setEmail("cliente@test.com");
            cliente.setPasswordHash(passwordEncoder.encode("cliente123"));
            cliente.setRol("CLIENTE");
            cliente.setAuthProvider("EMAIL");
            cliente.setActivo(true);
            cliente.setTelefono("999888777");
            cliente.setDireccion("Av. Principal 123, Ica");
            usuarioRepository.save(cliente);
        }

        // --- Clientes ficticios con niveles ---
        if (nivelFidelizacionRepository.count() > 0) {
            NivelFidelizacion bronce = nivelFidelizacionRepository.findByNombre("Bronce").orElse(null);
            NivelFidelizacion plata = nivelFidelizacionRepository.findByNombre("Plata").orElse(null);
            NivelFidelizacion oro = nivelFidelizacionRepository.findByNombre("Oro").orElse(null);
            NivelFidelizacion diamante = nivelFidelizacionRepository.findByNombre("Diamante").orElse(null);

            String[][] fakeUsers = {
                {"María García", "maria@email.com", "987654321", "Jr. Lima 456, Ica", "Plata", "350", "450"},
                {"Carlos López", "carlos@email.com", "976543210", "Av. Grau 789, Ica", "Oro", "520", "1200"},
                {"Ana Martínez", "ana@email.com", "965432109", "Calle Real 321, Ica", "Diamante", "850", "2500"},
                {"Pedro Sánchez", "pedro@email.com", "954321098", "Av. Los Maestros 111, Ica", "Plata", "200", "380"},
                {"Lucía Torres", "lucia@email.com", "943210987", "Jr. Ayacucho 222, Ica", "Bronce", "45", "80"},
                {"Roberto Díaz", "roberto@email.com", "932109876", "Av. Municipalidad 333, Ica", "Oro", "600", "1500"},
            };

            for (String[] f : fakeUsers) {
                if (!usuarioRepository.existsByEmail(f[1])) {
                    Usuario u = new Usuario();
                    u.setNombre(f[0]);
                    u.setEmail(f[1]);
                    u.setPasswordHash(passwordEncoder.encode("cliente123"));
                    u.setRol("CLIENTE");
                    u.setAuthProvider("EMAIL");
                    u.setActivo(true);
                    u.setTelefono(f[2]);
                    u.setDireccion(f[3]);
                    usuarioRepository.save(u);

                    NivelFidelizacion nivel = switch (f[4]) {
                        case "Plata" -> plata;
                        case "Oro" -> oro;
                        case "Diamante" -> diamante;
                        default -> bronce;
                    };

                    Puntos puntos = new Puntos();
                    puntos.setUsuario(u);
                    puntos.setPuntosActuales(Integer.parseInt(f[5]));
                    puntos.setPuntosAcumulados(Integer.parseInt(f[6]));
                    puntos.setNivel(nivel);
                    puntosRepository.save(puntos);
                }
            }
        }

        // --- Métodos de entrega ---
        if (metodoEntregaRepository.count() == 0) {
            MetodoEntrega recojo = new MetodoEntrega();
            recojo.setNombre("Recojo en tienda");
            recojo.setDescripcion("Recoge tu pedido en nuestro local");
            recojo.setCosto(BigDecimal.ZERO);
            metodoEntregaRepository.save(recojo);

            MetodoEntrega delivery = new MetodoEntrega();
            delivery.setNombre("Delivery");
            delivery.setDescripcion("Entrega a domicilio");
            delivery.setCosto(new BigDecimal("8.00"));
            metodoEntregaRepository.save(delivery);
        }

        // --- Métodos de pago ---
        if (metodoPagoRepository.count() == 0) {
            for (String[] p : new String[][]{
                {"Yape", "smartphone"},
                {"Plin", "qr-code"},
                {"Tarjeta", "credit-card"},
                {"Efectivo", "banknote"}
            }) {
                MetodoPago mp = new MetodoPago();
                mp.setNombre(p[0]);
                mp.setIcono(p[1]);
                metodoPagoRepository.save(mp);
            }
        }

        // --- Categorías ---
        if (categoriaRepository.count() == 0) {
            for (String[] c : new String[][]{
                {"Helados", "Helados suaves y cremosos en cono, perfectos para cualquier momento"},
                {"Raspadillas", "Refrescantes, frías y llenas de sabor"},
                {"Bebidas", "Tradicionales y refrescantes, ideales para acompañar"},
                {"Pizzas", "Deliciosas, calientes y perfectas para compartir en familia o con amigos"}
            }) {
                Categoria cat = new Categoria();
                cat.setNombre(c[0]);
                cat.setDescripcion(c[1]);
                categoriaRepository.save(cat);
            }
        }

        // --- Niveles de fidelización ---
        if (nivelFidelizacionRepository.count() == 0) {
            for (Object[] n : new Object[][]{
                {"Bronce", 0, 5, "#cd7f32"},
                {"Plata", 100, 8, "#c0c0c0"},
                {"Oro", 300, 12, "#ffd700"},
                {"Diamante", 600, 20, "#b9f2ff"}
            }) {
                NivelFidelizacion nivel = new NivelFidelizacion();
                nivel.setNombre((String) n[0]);
                nivel.setPuntosMinimos((Integer) n[1]);
                nivel.setPuntosPorSoles((Integer) n[2]);
                nivel.setColorHex((String) n[3]);
                nivelFidelizacionRepository.save(nivel);
            }
        }

        // --- Productos ---
        if (productoRepository.count() == 0) {
            Categoria helados = categoriaRepository.findByNombre("Helados").orElse(null);
            Categoria raspadillas = categoriaRepository.findByNombre("Raspadillas").orElse(null);
            Categoria bebidas = categoriaRepository.findByNombre("Bebidas").orElse(null);
            Categoria pizzas = categoriaRepository.findByNombre("Pizzas").orElse(null);

            java.util.function.Function<String, String> img = t -> "https://placehold.co/400x300/ffd9df/a43756?text=" + t;

            // --- HELADOS (en cono) ---
            if (helados != null) {
                guardarProducto(helados, "Chocolate", "Helado suave y cremoso en cono", 7.00, 50, true, true, img.apply("Helado+Chocolate"));
                guardarProducto(helados, "Vainilla", "Helado suave y cremoso en cono", 7.00, 50, true, true, img.apply("Helado+Vainilla"));
            }

            // --- RASPADILLAS ---
            if (raspadillas != null) {
                guardarProducto(raspadillas, "Raspadilla de Lúcuma", "Sabor tradicional y cremoso", 5.00, 80, true, true, img.apply("Raspadilla+Lucuma"));
                guardarProducto(raspadillas, "Raspadilla de Fresa", "Dulce y frutal, ideal para refrescarte", 5.00, 80, true, true, img.apply("Raspadilla+Fresa"));
                guardarProducto(raspadillas, "Raspadilla de Coco", "Suave, tropical y delicioso", 5.00, 60, true, false, img.apply("Raspadilla+Coco"));
                guardarProducto(raspadillas, "Raspadilla de Menta", "Fresca y aromática, perfecta para el calor", 5.00, 60, true, false, img.apply("Raspadilla+Menta"));
                guardarProducto(raspadillas, "Raspadilla de Maracuyá", "Tropical y ligeramente ácida", 5.00, 70, true, true, img.apply("Raspadilla+Maracuya"));
                guardarProducto(raspadillas, "Raspadilla de Piña", "Dulce y tropical, llena de frescura", 5.00, 70, true, false, img.apply("Raspadilla+Pina"));
                guardarProducto(raspadillas, "Raspadilla de Limón", "Cítrica y refrescante", 5.00, 75, true, true, img.apply("Raspadilla+Limon"));
                guardarProducto(raspadillas, "Raspadilla de Chicha", "Sabor tradicional con un toque único", 5.00, 65, true, true, img.apply("Raspadilla+Chicha"));
            }

            // --- BEBIDAS ---
            if (bebidas != null) {
                guardarProducto(bebidas, "Chicha Morada Helada", "Bebida tradicional peruana a base de maíz morado", 7.00, 100, true, true, img.apply("Chicha+Morada"));
            }

            // --- PIZZAS ---
            if (pizzas != null) {
                guardarProducto(pizzas, "Pizza Personal", "Ideal para una persona. Práctica y deliciosa", 18.00, 30, true, true, img.apply("Pizza+Personal"));
                guardarProducto(pizzas, "Pizza Mediana", "Perfecta para compartir entre 3 a 4 personas", 32.00, 25, true, true, img.apply("Pizza+Mediana"));
                guardarProducto(pizzas, "Pizza Familiar", "Para compartir en grande. Ideal para 5 a 6 personas", 45.00, 20, true, true, img.apply("Pizza+Familiar"));
            }
        }

        // --- Promociones ---
        if (promocionRepository.count() == 0) {
            for (Object[] p : new Object[][]{
                {"2x1 en Conos", "Todos los lunes y martes, llévate 2 conos del sabor que quieras por el precio de 1.", "2x1", "Lun - Mar", "ice-cream", "#ff6b9d"},
                {"Combo Familiar", "2 pizzas + 4 raspadillas a un precio especial. Ideal para compartir en familia.", "S/ 39.90", "Todos los días", "users", "#ffd93d"},
                {"Helado de Cumpleaños", "Celebra con nosotros y recibe un helado gigante completamente gratis presentando tu DNI.", "GRATIS", "En tu cumpleaños", "cake", "#c8b6ff"},
                {"Noche de Pizzas", "Los jueves por la noche, todas las pizzas tienen 25% de descuento.", "-25%", "Jueves 7:00 pm", "percent", "#f97316"},
            }) {
                Promocion promo = new Promocion();
                promo.setTitulo((String) p[0]);
                promo.setDescripcion((String) p[1]);
                promo.setDescuento((String) p[2]);
                promo.setDiasVigencia((String) p[3]);
                promo.setIcono((String) p[4]);
                promo.setColor((String) p[5]);
                promo.setFechaInicio(LocalDate.now());
                promo.setFechaFin(LocalDate.now().plusMonths(1));
                promocionRepository.save(promo);
            }
        }

        // --- Secciones Landing Page ---
        if (seccionLandingRepository.count() == 0) {
            for (Object[] s : new Object[][]{
                {"helados", "Helados Artesanales", "Suaves y cremosos en cono, preparados al momento",
                 "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                 "#ff6b9d", "#ff8fab"},
                {"raspadillas", "Raspadillas Refrescantes", "8 sabores tradicionales para combatir el calor de Ica",
                 "https://images.unsplash.com/photo-1718810125230-e8e2271354f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                 "#ffd93d", "#ffed4e"},
                {"pizzas", "Pizzas Artesanales", "Personal, mediana o familiar, horneadas al momento",
                 "https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                 "#a7e4f2", "#c3ecf6"},
                {"chicha", "Chicha Morada Helada", "La bebida tradicional peruana, siempre fría y deliciosa",
                 "https://images.unsplash.com/photo-1629385697093-57be2cc97fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                 "#c8b6ff", "#dac9ff"},
            }) {
                SeccionLanding sec = new SeccionLanding();
                sec.setSectionKey((String) s[0]);
                sec.setTitulo((String) s[1]);
                sec.setDescripcion((String) s[2]);
                sec.setImagenUrl((String) s[3]);
                sec.setColorFrom((String) s[4]);
                sec.setColorTo((String) s[5]);
                seccionLandingRepository.save(sec);
            }
        }
    }

    private void guardarProducto(Categoria cat, String nombre, String desc, double precio,
                                  int stock, boolean disponible, boolean destacado, String img) {
        Producto p = new Producto();
        p.setCategoria(cat);
        p.setNombre(nombre);
        p.setDescripcion(desc);
        p.setPrecio(BigDecimal.valueOf(precio));
        p.setStock(stock);
        p.setDisponible(disponible);
        p.setDestacado(destacado);
        p.setImagenUrl(img);
        productoRepository.save(p);
    }
}
