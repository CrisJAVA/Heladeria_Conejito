-- ============================================================
-- HELADERÍA CONEJITO - Base de Datos PostgreSQL
-- ============================================================

-- CATEGORÍAS de productos
CREATE TABLE IF NOT EXISTS categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCTOS (helados, pizzas, bebidas, toppings, etc.)
CREATE TABLE IF NOT EXISTS producto (
    id SERIAL PRIMARY KEY,
    categoria_id INTEGER NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(500),
    precio DECIMAL(10, 2) NOT NULL,
    imagen_url VARCHAR(500),
    stock INTEGER DEFAULT 0,
    disponible BOOLEAN DEFAULT TRUE,
    destacado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id) ON DELETE CASCADE
);

-- USUARIOS (clientes y administradores)
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    telefono VARCHAR(20),
    direccion VARCHAR(300),
    rol VARCHAR(20) DEFAULT 'CLIENTE' CHECK (rol IN ('CLIENTE', 'ADMIN')),
    auth_provider VARCHAR(20) DEFAULT 'EMAIL' CHECK (auth_provider IN ('EMAIL', 'GOOGLE', 'FACEBOOK')),
    auth_provider_id VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NIVELES DE FIDELIZACIÓN
CREATE TABLE IF NOT EXISTS nivel_fidelizacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    puntos_minimos INTEGER NOT NULL,
    puntos_por_soles INTEGER DEFAULT 5,
    color_hex VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BENEFICIOS por nivel
CREATE TABLE IF NOT EXISTS beneficio (
    id SERIAL PRIMARY KEY,
    nivel_id INTEGER NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    tipo VARCHAR(50) CHECK (tipo IN ('DESCUENTO', 'PRODUCTO_GRATIS', 'ENVIO_GRATIS', 'EVENTO', 'OTRO')),
    valor VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nivel_id) REFERENCES nivel_fidelizacion(id) ON DELETE CASCADE
);

-- PUNTOS DE FIDELIZACIÓN por usuario
CREATE TABLE IF NOT EXISTS puntos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    puntos_actuales INTEGER DEFAULT 0,
    puntos_acumulados INTEGER DEFAULT 0,
    nivel_id INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (nivel_id) REFERENCES nivel_fidelizacion(id)
);

-- HISTORIAL de transacciones de puntos
CREATE TABLE IF NOT EXISTS historial_puntos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    puntos INTEGER NOT NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('SUMAR', 'CANJEAR', 'RESTAR', 'DEVOLVER')),
    concepto VARCHAR(255),
    referencia_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- PROMOCIONES
CREATE TABLE IF NOT EXISTS promocion (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    descuento VARCHAR(50),
    dias_vigencia VARCHAR(100),
    icono VARCHAR(50),
    color VARCHAR(100),
    activa BOOLEAN DEFAULT TRUE,
    fecha_inicio DATE,
    fecha_fin DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MÉTODOS DE ENTREGA
CREATE TABLE IF NOT EXISTS metodo_entrega (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    costo DECIMAL(10, 2) DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE
);

-- MÉTODOS DE PAGO
CREATE TABLE IF NOT EXISTS metodo_pago (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    icono VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
);

-- PEDIDOS
CREATE TYPE estado_pedido AS ENUM ('PENDIENTE', 'CONFIRMADO', 'PREPARANDO', 'EN_CAMINO', 'ENTREGADO', 'CANCELADO');

CREATE TABLE IF NOT EXISTS pedido (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    metodo_entrega_id INTEGER,
    metodo_pago_id INTEGER,
    subtotal DECIMAL(10, 2) NOT NULL,
    costo_envio DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    estado estado_pedido DEFAULT 'PENDIENTE',
    direccion_entrega VARCHAR(300),
    nota VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (metodo_entrega_id) REFERENCES metodo_entrega(id),
    FOREIGN KEY (metodo_pago_id) REFERENCES metodo_pago(id)
);

-- DETALLE DEL PEDIDO (productos en cada pedido)
CREATE TABLE IF NOT EXISTS detalle_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);

-- PASSWORD RESET TOKENS
CREATE TABLE IF NOT EXISTS password_reset_token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    usuario_id INTEGER NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- FAVORITOS / WISHLIST
CREATE TABLE IF NOT EXISTS favorito (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES producto(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, producto_id)
);

-- RESEÑAS Y VALORACIONES
CREATE TABLE IF NOT EXISTS resena (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES producto(id) ON DELETE CASCADE
);

-- NOTIFICACIONES
CREATE TABLE IF NOT EXISTS notificacion (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    mensaje VARCHAR(500),
    leida BOOLEAN DEFAULT FALSE,
    tipo VARCHAR(50),
    referencia_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- CARRITO PERSISTENTE
CREATE TABLE IF NOT EXISTS carrito (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES producto(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, producto_id)
);

-- CONFIGURACIÓN DE MÉTODOS DE PAGO DIGITALES (Yape / Plin)
CREATE TABLE IF NOT EXISTS configuracion_metodo_pago (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('YAPE', 'PLIN')),
    nombre_titular VARCHAR(200),
    numero_celular VARCHAR(20),
    usuario_visible VARCHAR(200),
    imagen_url VARCHAR(500),
    mensaje VARCHAR(500),
    activo BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (tipo)
);

-- ============================================================
-- DATOS INICIALES
-- ============================================================

-- Categorías
INSERT INTO categoria (nombre, descripcion) VALUES
('Helados', 'Helados artesanales en cono, copa y vaso'),
('Pizzas', 'Pizzas artesanales horneadas al momento'),
('Bebidas', 'Jugos naturales, gaseosas y batidos'),
('Toppings', 'Complementos para tus helados'),
('Combos', 'Combos familiares y promocionales');

-- Métodos de entrega
INSERT INTO metodo_entrega (nombre, descripcion, costo) VALUES
('Recojo en tienda', 'Recoge tu pedido en nuestro local', 0),
('Delivery', 'Llevamos tu pedido a casa', 8);

-- Métodos de pago
INSERT INTO metodo_pago (nombre, icono) VALUES
('Yape', 'smartphone'),
('Plin', 'qr_code'),
('Tarjeta', 'credit_card'),
('Efectivo', 'banknote');

-- Niveles de fidelización
INSERT INTO nivel_fidelizacion (nombre, puntos_minimos, puntos_por_soles, color_hex) VALUES
('Bronce', 0, 5, '#cd7f32'),
('Plata', 100, 8, '#c0c0c0'),
('Oro', 300, 12, '#ffd700'),
('Diamante', 600, 20, '#b9f2ff');

-- Beneficios por nivel
INSERT INTO beneficio (nivel_id, descripcion, tipo, valor) VALUES
(1, '5% de descuento en tu compra', 'DESCUENTO', '5'),
(1, '1 helado gratis al mes', 'PRODUCTO_GRATIS', '1'),
(1, 'Acceso a promociones exclusivas', 'OTRO', NULL),
(1, 'Acumula 5 puntos por cada S/ 1', 'OTRO', '5'),
(2, '10% de descuento en tu compra', 'DESCUENTO', '10'),
(2, '2 helados gratis al mes', 'PRODUCTO_GRATIS', '2'),
(2, '1 topping gratis por pedido', 'PRODUCTO_GRATIS', '1'),
(2, 'Prioridad en atención presencial', 'OTRO', NULL),
(2, 'Acumula 8 puntos por cada S/ 1', 'OTRO', '8'),
(3, '15% de descuento en tu compra', 'DESCUENTO', '15'),
(3, '3 helados gratis al mes', 'PRODUCTO_GRATIS', '3'),
(3, '1 bebida gratis por pedido', 'PRODUCTO_GRATIS', '1'),
(3, 'Envío delivery gratuito', 'ENVIO_GRATIS', NULL),
(3, 'Invitación a lanzamientos de sabores', 'EVENTO', NULL),
(3, 'Acumula 12 puntos por cada S/ 1', 'OTRO', '12'),
(4, '20% de descuento en tu compra', 'DESCUENTO', '20'),
(4, '5 helados gratis al mes', 'PRODUCTO_GRATIS', '5'),
(4, '1 pizza personal gratis al mes', 'PRODUCTO_GRATIS', '1'),
(4, 'Envío delivery gratuito ilimitado', 'ENVIO_GRATIS', NULL),
(4, 'Evento VIP exclusivo anual', 'EVENTO', NULL),
(4, 'Sabor personalizado en tu cumpleaños', 'OTRO', NULL),
(4, 'Acumula 20 puntos por cada S/ 1', 'OTRO', '20');

-- Promociones
INSERT INTO promocion (titulo, descripcion, descuento, dias_vigencia, icono, color, activa) VALUES
('2x1 en Conos', 'Todos los lunes y martes, llévate 2 conos del sabor que quieras por el precio de 1.', '2x1', 'Lun - Mar', 'IceCream', 'from-[#ff6b9d] to-[#ff8fab]', TRUE),
('Combo Familiar', '4 helados artesanales + 4 toppings + 1 jarra de jugo natural a un precio especial.', 'S/ 39.90', 'Todos los días', 'Users', 'from-[#ffd93d] to-[#ffed4e]', TRUE),
('Happy Hour', 'De 6:00 pm a 8:00 pm, todos los milkshakes y batidos tienen 30% de descuento.', '-30%', '6:00 - 8:00 pm', 'Clock', 'from-[#a7e4f2] to-[#c3ecf6]', TRUE),
('Helado de Cumpleaños', 'Celebra con nosotros y recibe un helado gigante completamente gratis presentando tu DNI.', 'GRATIS', 'En tu cumpleaños', 'Cake', 'from-[#c8b6ff] to-[#dac9ff]', TRUE),
('Combo Estudiantes', 'Presenta tu carnet y llévate un cono + bebida por solo S/ 7.90.', 'S/ 7.90', 'Lun - Vie', 'Sparkles', 'from-[#4ade80] to-[#22c55e]', TRUE),
('Toppings Extra', 'Agrega hasta 3 toppings adicionales a tu helado por solo S/ 1.00 más.', 'S/ 1.00', 'Todos los días', 'Coffee', 'from-[#ff8fab] to-[#ff6b9d]', TRUE),
('Noche de Pizzas', 'Los jueves por la noche, todas las pizzas individuales tienen 25% de descuento.', '-25%', 'Jueves 7:00 pm', 'BadgePercent', 'from-[#f97316] to-[#fb923c]', TRUE),
('Sabor del Mes', 'Prueba nuestro sabor especial del mes y llévate el segundo medio cono a mitad de precio.', '50% OFF', 'Todo el mes', 'Tag', 'from-[#ec4899] to-[#f472b6]', TRUE);

-- Usuario administrador por defecto (password: admin123)
-- NOTA: Al iniciar el backend, si no existe un admin, se crea automáticamente
-- con email: admin@gmail.com y password: admin123 (ver DataInitializer.java)
INSERT INTO usuario (nombre, email, password_hash, rol) VALUES
('Administrador', 'admin@gmail.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PQm4sEPhMNPfFhpYN76uO', 'ADMIN');
