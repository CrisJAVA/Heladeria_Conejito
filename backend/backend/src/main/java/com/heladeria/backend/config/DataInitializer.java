package com.heladeria.backend.config;

import com.heladeria.backend.model.*;
import com.heladeria.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final NivelFidelizacionRepository nivelRepository;
    private final BeneficioRepository beneficioRepository;
    private final PromocionRepository promocionRepository;
    private final MetodoEntregaRepository metodoEntregaRepository;
    private final MetodoPagoRepository metodoPagoRepository;

    public DataInitializer(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
                            NivelFidelizacionRepository nivelRepository, BeneficioRepository beneficioRepository,
                            PromocionRepository promocionRepository, MetodoEntregaRepository metodoEntregaRepository,
                            MetodoPagoRepository metodoPagoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.nivelRepository = nivelRepository;
        this.beneficioRepository = beneficioRepository;
        this.promocionRepository = promocionRepository;
        this.metodoEntregaRepository = metodoEntregaRepository;
        this.metodoPagoRepository = metodoPagoRepository;
    }

    @Override
    public void run(String... args) {
        seedAdmin();
        seedMetodosEntrega();
        seedMetodosPago();
        seedNivelesYBeneficios();
        seedPromociones();
    }

    private void seedAdmin() {
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

    private void seedMetodosEntrega() {
        if (metodoEntregaRepository.count() == 0) {
            MetodoEntrega recojo = new MetodoEntrega();
            recojo.setNombre("Recojo en tienda");
            recojo.setDescripcion("Recoge tu pedido en nuestro local");
            recojo.setCosto(BigDecimal.ZERO);
            metodoEntregaRepository.save(recojo);

            MetodoEntrega delivery = new MetodoEntrega();
            delivery.setNombre("Delivery");
            delivery.setDescripcion("Llevamos tu pedido a casa");
            delivery.setCosto(BigDecimal.valueOf(8));
            metodoEntregaRepository.save(delivery);
        }
    }

    private void seedMetodosPago() {
        if (metodoPagoRepository.count() == 0) {
            metodoPagoRepository.save(nuevoMetodoPago("Yape", "smartphone"));
            metodoPagoRepository.save(nuevoMetodoPago("Plin", "qr_code"));
            metodoPagoRepository.save(nuevoMetodoPago("Tarjeta", "credit_card"));
            metodoPagoRepository.save(nuevoMetodoPago("Efectivo", "banknote"));
        }
    }

    private MetodoPago nuevoMetodoPago(String nombre, String icono) {
        MetodoPago mp = new MetodoPago();
        mp.setNombre(nombre);
        mp.setIcono(icono);
        return mp;
    }

    private void seedNivelesYBeneficios() {
        if (nivelRepository.count() > 0) {
            return;
        }
        NivelFidelizacion bronce = guardarNivel("Bronce", 0, 5, "#d97706");
        NivelFidelizacion plata = guardarNivel("Plata", 501, 10, "#94a3b8");
        NivelFidelizacion oro = guardarNivel("Oro", 1501, 15, "#eab308");
        NivelFidelizacion diamante = guardarNivel("Diamante", 3001, 20, "#06b6d4");

        guardarBeneficios(bronce, List.of(
                new String[]{"5% de descuento en tu compra", "DESCUENTO", "5"},
                new String[]{"1 helado gratis al mes", "PRODUCTO_GRATIS", "1"},
                new String[]{"Acceso a promociones exclusivas", "OTRO", null},
                new String[]{"Acumula 5 puntos por cada S/ 1", "OTRO", "5"}
        ));
        guardarBeneficios(plata, List.of(
                new String[]{"10% de descuento en tu compra", "DESCUENTO", "10"},
                new String[]{"2 helados gratis al mes", "PRODUCTO_GRATIS", "2"},
                new String[]{"1 topping gratis por pedido", "PRODUCTO_GRATIS", "1"},
                new String[]{"Prioridad en atención presencial", "OTRO", null},
                new String[]{"Acumula 10 puntos por cada S/ 1", "OTRO", "10"}
        ));
        guardarBeneficios(oro, List.of(
                new String[]{"15% de descuento en tu compra", "DESCUENTO", "15"},
                new String[]{"3 helados gratis al mes", "PRODUCTO_GRATIS", "3"},
                new String[]{"1 bebida gratis por pedido", "PRODUCTO_GRATIS", "1"},
                new String[]{"Envío delivery gratuito", "ENVIO_GRATIS", null},
                new String[]{"Invitación a lanzamientos de sabores", "EVENTO", null},
                new String[]{"Acumula 15 puntos por cada S/ 1", "OTRO", "15"}
        ));
        guardarBeneficios(diamante, List.of(
                new String[]{"20% de descuento en tu compra", "DESCUENTO", "20"},
                new String[]{"5 helados gratis al mes", "PRODUCTO_GRATIS", "5"},
                new String[]{"1 pizza personal gratis al mes", "PRODUCTO_GRATIS", "1"},
                new String[]{"Envío delivery gratuito ilimitado", "ENVIO_GRATIS", null},
                new String[]{"Evento VIP exclusivo anual", "EVENTO", null},
                new String[]{"Sabor personalizado en tu cumpleaños", "OTRO", null},
                new String[]{"Acumula 20 puntos por cada S/ 1", "OTRO", "20"}
        ));
    }

    private NivelFidelizacion guardarNivel(String nombre, int puntosMinimos, int puntosPorSoles, String colorHex) {
        NivelFidelizacion nivel = new NivelFidelizacion();
        nivel.setNombre(nombre);
        nivel.setPuntosMinimos(puntosMinimos);
        nivel.setPuntosPorSoles(puntosPorSoles);
        nivel.setColorHex(colorHex);
        return nivelRepository.save(nivel);
    }

    private void guardarBeneficios(NivelFidelizacion nivel, List<String[]> beneficios) {
        for (String[] b : beneficios) {
            Beneficio beneficio = new Beneficio();
            beneficio.setNivel(nivel);
            beneficio.setDescripcion(b[0]);
            beneficio.setTipo(b[1]);
            beneficio.setValor(b[2]);
            beneficioRepository.save(beneficio);
        }
    }

    private void seedPromociones() {
        if (promocionRepository.count() > 0) {
            return;
        }
        Object[][] datos = {
                {"2x1 en Conos", "Todos los lunes y martes, llévate 2 conos del sabor que quieras por el precio de 1.", "2x1", "Lun - Mar", "IceCream", "from-[#ff6b9d] to-[#ff8fab]"},
                {"Combo Familiar", "4 helados artesanales + 4 toppings + 1 jarra de jugo natural a un precio especial.", "S/ 39.90", "Todos los días", "Users", "from-[#ffd93d] to-[#ffed4e]"},
                {"Happy Hour", "De 6:00 pm a 8:00 pm, todos los milkshakes y batidos tienen 30% de descuento.", "-30%", "6:00 - 8:00 pm", "Clock", "from-[#a7e4f2] to-[#c3ecf6]"},
                {"Helado de Cumpleaños", "Celebra con nosotros y recibe un helado gigante completamente gratis presentando tu DNI.", "GRATIS", "En tu cumpleaños", "Cake", "from-[#c8b6ff] to-[#dac9ff]"},
                {"Combo Estudiantes", "Presenta tu carnet y llévate un cono + bebida por solo S/ 7.90.", "S/ 7.90", "Lun - Vie", "Sparkles", "from-[#4ade80] to-[#22c55e]"},
                {"Toppings Extra", "Agrega hasta 3 toppings adicionales a tu helado por solo S/ 1.00 más.", "S/ 1.00", "Todos los días", "Coffee", "from-[#ff8fab] to-[#ff6b9d]"},
                {"Noche de Pizzas", "Los jueves por la noche, todas las pizzas individuales tienen 25% de descuento.", "-25%", "Jueves 7:00 pm", "BadgePercent", "from-[#f97316] to-[#fb923c]"},
                {"Sabor del Mes", "Prueba nuestro sabor especial del mes y llévate el segundo medio cono a mitad de precio.", "50% OFF", "Todo el mes", "Tag", "from-[#ec4899] to-[#f472b6]"},
        };
        for (Object[] d : datos) {
            Promocion p = new Promocion();
            p.setTitulo((String) d[0]);
            p.setDescripcion((String) d[1]);
            p.setDescuento((String) d[2]);
            p.setDiasVigencia((String) d[3]);
            p.setIcono((String) d[4]);
            p.setColor((String) d[5]);
            p.setActiva(true);
            promocionRepository.save(p);
        }
    }
}
