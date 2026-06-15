# Heladería Conejito - Sistema Web
<p align="center">
  <img src="assets/banner.png" width="900"/>
</p>

## Día 5 - 15/06/2026

### Actividades Realizadas

**Backend:**
- **Base de datos persistente:** Migración de H2 en memoria (`jdbc:h2:mem:testdb`) a H2 en archivo (`jdbc:h2:file:./database/data/heladeria`). Los datos ahora persisten entre reinicios del servidor.
- **Esquema PostgreSQL (`database/schema.sql`):** Creación del esquema completo con 13 tablas (categorías, productos, usuarios, pedidos, promociones, niveles de fidelización, beneficios, puntos, etc.) y datos iniciales (promociones, niveles, beneficios, métodos de pago y entrega).
- **Configuración de producción:** Se agregó configuración comentada para PostgreSQL lista para desplegar.

**Frontend:**
- **Rediseño del Carrito (`CartPage.tsx`):** Mejora visual del resumen de pedido con colores, sección de tiempo estimado (30-40 min), método de entrega con radio buttons, método de pago en grid 2×2 y botón de confirmar estilizado.
- **Página de Contacto (`ContactPage.tsx`):** Mapa de ubicación, horario de atención, información del local, formulario de contacto, testimonios de clientes y galería de fotos.
- **Página de Promociones (`PromocionesPage.tsx`):** Grid con 8 promociones (2x1 conos, combo familiar, happy hour, helado de cumpleaños, combo estudiantes, toppings extra, noche de pizzas, sabor del mes).
- **Página de Fidelización (`FidelizacionPage.tsx`):** 4 niveles (Bronce, Plata, Oro, Diamante) con sus beneficios detallados, puntos mínimos y progresión.
- **Navegación:** Los enlaces del Navbar y Footer ahora apuntan a las rutas correspondientes (`/promociones`, `/fidelizacion`, `/contacto`).

**Estado Actual:**
- Backend: http://localhost:8080 (Spring Boot + H2 file-based)
- Frontend: http://localhost:5173 (React + Tailwind CSS + Vite)
- Base de datos: H2 persistente en `database/data/heladeria.mv.db`
- Esquema PostgreSQL listo en `database/schema.sql`

---

## Día 3 - 08/06/2026

### Actividades Realizadas

**Backend:**
- Sin modificaciones en esta sesión.

**Frontend:**
- **Panel Administrativo (`AdminDashboard.tsx`):** Diseño e implementación del dashboard principal para control de negocio y estadísticas rápidas.
- **Gestión de Productos (`AdminProducts.tsx`):** Creación del panel del administrador para listar, agregar, editar y eliminar productos.
- **Gestión de Pedidos (`AdminOrders.tsx`):** Implementación del panel de pedidos entrantes con estados de entrega.
- **Gestión de Clientes (`AdminClientes.tsx`):** Creación de la lista de usuarios registrados y clientes frecuentes.
- **Configuración del Sistema (`AdminConfiguracion.tsx`):** Vista para ajustes generales del negocio.
- **Diseño General:** Soluciones estéticas en el maquetado del panel del administrador y carga dinámica del logo.

**Estado Actual:**
- Backend: http://localhost:8080 (Spring Boot + H2)
- Frontend: http://localhost:5173 (React + Tailwind CSS + Vite)
- Ambos servidores ejecutándose en desarrollo.

---

##  Día 2 - 5/06/2026

### Actividades Realizadas

**Backend:**
- Configuración de base de datos H2 (embebida en memoria) para desarrollo
- Agregada dependencia H2 a Maven (pom.xml)
- Servidor Spring Boot ejecutándose correctamente en puerto 8080
- Configuración de propiedades de conexión a base de datos

**Frontend:**
- Instalación de dependencias npm (motion, framer-motion, react-dom)
- Corrección de imports de motion/react en 9 componentes
- Configuración completa de Tailwind CSS v4 en Vite
- Resolución de problemas de configuración en vite.config.js
- Servidor Vite ejecutándose en puerto 5175
- Estilos CSS y diseño responsivo funcionando correctamente

**Estado Actual:**
- Backend: http://localhost:8080 (Spring Boot + H2)
- Frontend: http://localhost:5175 (React + Tailwind CSS + Vite)
- Ambos servidores ejecutándose en desarrollo

---

## Descripción del Proyecto

Heladería Conejito es un sistema web desarrollado para optimizar la experiencia de compra de los clientes de una heladería familiar. El proyecto busca reducir tiempos de espera, mejorar la organización de pedidos y facilitar la visualización de productos mediante herramientas digitales.

El sistema contará con:

* Menú digital interactivo
* Gestión de productos
* Sistema de pedidos
* Promociones
* Panel administrativo
* Posible integración de pedidos anticipados

---

# Tecnologías Utilizadas

## Frontend

* React
* Vite
* JavaScript
* CSS

## Backend

* Java Spring Boot
* Spring Web
* Spring Data JPA
* PostgreSQL
* Lombok

## Base de Datos

* PostgreSQL (producción)
* H2 (desarrollo - archivo persistente)

## Herramientas

* Git
* GitHub
* Postman

---

# Estructura del Proyecto

```plaintext
Heladeria_Conejito/
│
├── frontend/
│
└── backend/
```

---

# Estructura Frontend

```plaintext
frontend/src/
│
├── components/
├── pages/
├── services/
├── routes/
├── assets/
├── styles/
├── hooks/
└── context/
```

---

# Estructura Backend

```plaintext
backend/src/main/java/com/heladeria/backend/
│
├── controller/
├── service/
├── repository/
├── model/
├── dto/
├── config/
├── security/
└── exception/
```

---

# Objetivo del Sistema

Desarrollar una plataforma web que permita mejorar la atención al cliente y optimizar el proceso de compra dentro de la heladería.

---

# Avance del Proyecto

## Día #1
* Creación del repositorio GitHub
* Configuración inicial de Git
* Creación del frontend con React + Vite
* Configuración inicial del backend con Spring Boot
* Organización de carpetas y arquitectura base del proyecto

## Día #2
* Integración del motor de base de datos H2 en memoria para desarrollo
* Configuración completa de Tailwind CSS v4 con Vite
* Ajustes de dependencias y solución de estilos responsivos

## Día #3
* Desarrollo del Panel Administrativo (Dashboard) completo
* Vistas de control de Productos, Pedidos, Clientes y Configuración general

## Día #4
* Página del Menú principal interactivo con filtros, búsqueda y precios
* Módulo de Usuario con Login, Perfil de cliente y sesión persistente (`AuthContext`)
* Carrito de compras funcional con contexto global (`CartContext`) y vista de checkout
* Páginas adicionales (Promociones, Fidelización con puntos, Contacto)
* Integración de rutas frontend y primera versión demo funcional (MVP)

## Día #5 (Hoy)
* Base de datos persistente: migración de H2 en memoria a H2 en archivo
* Esquema PostgreSQL completo (`database/schema.sql`) con 13 tablas y datos iniciales
* Rediseño del carrito de compras con mejoras visuales y UX
* Página de Contacto con mapa, horarios, formulario y testimonios
* Página de Promociones con 8 ofertas activas
* Página de Fidelización con 4 niveles y sus beneficios
* Navegación completa con rutas para todas las nuevas páginas
* Guía de primeros pasos (`PRIMEROS_PASOS.me`)


# Estado del Proyecto

 En desarrollo (Frontend completo + Base de datos persistente)
