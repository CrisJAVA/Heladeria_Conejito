# Heladería Conejito 🍦

<p align="center">
  <img src="assets/banner.png" width="900" alt="Heladería Conejito Banner"/>
</p>

<p align="center">
  <strong>Sistema web para la gestión de pedidos y administración de una heladería familiar</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19"/>
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5"/>
  <img src="https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white" alt="Java 21"/>
  <img src="https://img.shields.io/badge/Spring_Boot-4-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot 4"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL 16"/>
</p>

---

## Funcionalidades

- **Menú digital interactivo** — Navega por categorías, busca productos, filtra por precio y disponibilidad
- **Carrito de compras** — Agrega productos, elige método de entrega y pago, confirma tu pedido
- **Autenticación JWT** — Registro e inicio de sesión con tokens seguros
- **Fidelización** — Programa de puntos con 4 niveles (Bronce, Plata, Oro, Diamante)
- **Promociones** — Ofertas activas con descuentos y combos especiales
- **Panel administrativo** — Dashboard con estadísticas, gestión de productos, pedidos y clientes
- **Perfil de usuario** — Edita tus datos, cambia tu contraseña, consulta tu historial

---

## Tecnologías

### Frontend
[React](https://react.dev/) 19 · [Vite](https://vitejs.dev/) 6 · [Tailwind CSS](https://tailwindcss.com/) 4 · [TypeScript](https://www.typescriptlang.org/) 5 · [React Router](https://reactrouter.com/) 7 · [Motion](https://motion.dev/) (animaciones)

### Backend
[Java](https://www.java.com/) 21 · [Spring Boot](https://spring.io/projects/spring-boot) 4 · [Spring Security](https://spring.io/projects/spring-security) (JWT) · [Spring Data JPA](https://spring.io/projects/spring-data-jpa) / Hibernate · [Lombok](https://projectlombok.org/)

### Base de datos
[PostgreSQL](https://www.postgresql.org/) 16

---

## Primeros pasos

> 📖 Sigue la **[guía de primeros pasos](PRIMEROS_PASOS.me)** para levantar el proyecto en 5 minutos.

```bash
# 1. Clonar
git clone <url> && cd Heladeria_Conejito

# 2. Base de datos
psql -U postgres -c "CREATE DATABASE heladeria_conejito;"
psql -U postgres -d heladeria_conejito -f database/schema.sql

# 3. Backend (terminal 1)
cd backend/backend && .\mvnw.cmd spring-boot:run

# 4. Frontend (terminal 2)
cd frontend && npm install && npm run dev
```

### Cuentas predefinidas

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | `admin@gmail.com` | `admin123` |
| Cliente | Regístrate en `/registro` | — |

---

## Estructura del proyecto

```
Heladeria_Conejito/
├── backend/                    # Spring Boot API
│   └── backend/src/main/java/com/heladeria/backend/
│       ├── controller/         # Endpoints REST
│       ├── service/            # Lógica de negocio
│       ├── repository/         # Acceso a datos (JPA)
│       ├── model/              # Entidades (Usuario, Producto, Pedido...)
│       ├── dto/                # Objetos de transferencia
│       ├── security/           # JWT, filtros, UserPrincipal
│       ├── config/             # Seguridad, CORS, DataInitializer
│       └── exception/          # Manejador global de errores
├── frontend/                   # React SPA
│   └── src/
│       ├── pages/              # Vistas (Login, Menu, Carrito, Admin...)
│       ├── context/            # AuthContext, CartContext
│       ├── services/           # auth.ts, productos.ts, pedidos.ts...
│       └── app/                # Router, Navbar, Footer, ProtectedRoute
├── database/
│   └── schema.sql              # Esquema PostgreSQL + datos iniciales
├── PRIMEROS_PASOS.me           # Guía de inicio rápido
└── README.md                   # Este archivo
```

---

## API REST

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/usuarios/perfil` | Obtener perfil (requiere token) |
| PUT | `/api/usuarios/perfil` | Actualizar perfil (requiere token) |
| PUT | `/api/usuarios/cambiar-password` | Cambiar contraseña (requiere token) |

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Listar todos los productos |
| GET | `/api/productos/{id}` | Obtener producto por ID |
| GET | `/api/productos/categoria/{id}` | Filtrar por categoría |
| GET | `/api/productos/buscar?nombre=` | Buscar por nombre |
| GET | `/api/productos/disponibles` | Productos disponibles |
| GET | `/api/productos/destacados` | Productos destacados |

### Pedidos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/pedidos` | Crear nuevo pedido (requiere token) |
| GET | `/api/pedidos/mis-pedidos` | Listar pedidos del usuario (requiere token) |
| GET | `/api/pedidos/{id}` | Obtener pedido por ID (requiere token) |

---

## Nuevas Funcionalidades y Mejoras Recientes

### 🚀 Sistema Completo de Pedidos

Se ha implementado un **sistema completo de pedidos** que conecta el frontend con el backend:

- **Creación de pedidos** — Los usuarios pueden realizar pedidos desde el carrito con selección de métodos de entrega (Recoger en tienda o Delivery) y pago (Yape, Plin, Tarjeta, Efectivo)
- **Seguimiento de pedidos** — Nueva página "Mis Pedidos" donde los usuarios pueden ver el historial completo de sus pedidos con estado detallado
- **Código de seguimiento** — Cada pedido recibe un código único (ej: PED-20250101-123456) para rastreo fácil
- **Historial detallado** — Visualización completa de cada pedido con productos, cantidades, precios, métodos de entrega/pago y estados actualizados

### 💳 Proceso de Pago Mejorado

El **Carrito de Compras** ahora incluye un **proceso de pago avanzado**:

- **Multi-pasos** — Flujo de pago dividido en pasos lógicos: Selección → Confirmación → Procesamiento
- **Cuatro métodos de pago** —
  - Yape: Escanea QR + ingresa operación
  - Plin: Escanea QR + ingresa operación  
  - Tarjeta: Formulario seguro para datos de tarjeta (Simulación académica)
  - Efectivo: Pago contra entrega o recogida en tienda
- **Validación completa** — Validación en tiempo real de:
  - Campos obligatorios
  - Formato de número de tarjeta
  - Vencimiento de tarjeta
  - CVV de tarjeta
  - Números de operación para Yape/Plin
- **Feedback visual** — Indicadores de estado, spinner de procesamiento y confirmación con código de pedido

### 📱 Menú Digital Avanzado

El **Menú de Productos** ahora utiliza **datos en tiempo real**:

- **API Integrada** — Productos cargados desde backend con categorías (Helados, Pizzas, Bebidas, Toppings, Combos)
- **Filtrado dinámico** — Filtrar por categoría, búsqueda por nombre y límite de precio
- **Productos destacados** — Sección de "Más Vendidos" con calificaciones y botones directos para agregar
- **Estado de disponibilidad** — Indicadores visuales de productos disponibles/agotados
- **Carga asíncrona** — Loading skeletons y manejo de errores con reintentos
- **Imágenes con fallback** — Manejo automático de errores de carga de imágenes con placeholders

### 👤 Autenticación y Perfil Mejorados

**Registro de Usuarios** ahora incluye:
- **Términos y condiciones** — Checkbox obligatorio con link a términos
- **Validación robusta** — Validación en tiempo real de nombre, email, contraseña (mínimo 8 chars), confirmación de contraseña
- **Campos adicionales** — Teléfono y dirección opcionales durante registro

### 🛡️ Panel Administrativo Completo

Las **rutas del panel admin** ahora están protegidas:
- `/api/usuarios/**` — Perfil y cambio de contraseña (requiere autenticación)
- `/api/pedidos/**` — Gestión de pedidos (requiere autenticación)

### 🆕 Nuevas Vistas y Componentes

**Se han agregado nuevas páginas**:
- **`/mis-pedidos`** — Historial de pedidos para usuarios autenticados
- **`/editar-perfil`** — Página para editar información de perfil

### 🔧 Mejoras Técnicas

**Backend (Java + Spring Boot)**:

- **Entidades de pedido** — Nueva entidad Pedido con código generador automático, relaciones con Usuario, MetodoEntrega y MetodoPago
- **DTOs robustos** — PedidoRequest y PedidoResponse con validación y mapeo completo
- **Servicios transaccionales** — PedidoService con lógica completa de creación, listados y validaciones de seguridad
- **DataInitializer** — Usuario administrador creado automáticamente al iniciar con email admin@gmail.com y password admin123

**Frontend (React + TypeScript)**:

- **Contextos globales** — AuthContext y CartContext para estado global centralizado
- **Servicios API** — Servicios tipados para pedidos, autenticación y gestión de productos
- **Componentes reutilizables** — Footer, ProtectedRoute, Navbar y Hero actualizados
- **Animaciones modernas** — Micro-interacciones y feedback visual con Motion

> **Nota:** Todas las funcionalidades mencionadas están implementadas y probadas. No hay elementos pendientes de revisión.

---

## Licencia

Proyecto académico sin fines comerciales.
