# Heladería Conejito - Sistema Web
<p align="center">
  <img src="assets/banner.png" width="900"/>
</p>

## Día 4 - 11/06/2026

### Actividades Realizadas

**Backend:**
- Sin modificaciones en esta sesión (se mantiene la API y conexión a la base de datos H2 en desarrollo).

**Frontend:**
- **Página de Menú interactivo (`MenuPage.tsx`):** Diseño y desarrollo de la vista principal de productos con categorías navegables, barra de búsqueda reactiva y filtro por rango de precios.
- **Navegación Dinámica (`Navbar.tsx`):** Configuración completa de enlaces y lógica del menú responsivo, incluyendo el badge dinámico con el total de artículos en el carrito.
- **Módulo de Usuario y Autenticación:** Creación de la página de Login (`LoginPage.tsx`), el perfil del cliente (`ProfilePage.tsx`) para la edición de datos e historial de pedidos, y el contexto global de sesión (`AuthContext.tsx`).
- **Carrito de Compras (`CartPage.tsx` y `CartContext.tsx`):** Implementación del estado global del carrito con funciones para agregar, remover y calcular sumatorias totales, además del formulario para proceder con el pedido (checkout).
- **Vistas Complementarias:**
  - `PromocionesPage.tsx`: Módulo de descuentos y ofertas de temporada.
  - `FidelizacionPage.tsx`: Módulo de acumulación de puntos (Conejipuntos) y recompensas.
  - `ContactPage.tsx`: Formulario de contacto y soporte con mapa de ubicación.
- **Rutas de la Aplicación (`App.tsx`):** Integración y orquestación de todas las páginas de la aplicación mediante React Router.

**Estado Actual:**
- Backend: http://localhost:8080 (Spring Boot + H2)
- Frontend: http://localhost:5173 (React + Tailwind CSS + Vite)
- Ambos servidores ejecutándose en desarrollo.

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

* PostgreSQL

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

## Día #4 (Hoy)
* Página del Menú principal interactivo con filtros, búsqueda y precios
* Módulo de Usuario con Login, Perfil de cliente y sesión persistente (`AuthContext`)
* Carrito de compras funcional con contexto global (`CartContext`) y vista de checkout
* Páginas adicionales (Promociones, Fidelización con puntos, Contacto)
* Integración de rutas frontend y primera versión demo funcional (MVP)


# Estado del Proyecto

 En desarrollo (Demo funcional completo en el frontend)
