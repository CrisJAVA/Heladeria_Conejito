import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatToFind from "./components/WhatToFind";
import Location from "./components/Location";
import PreOrder from "./components/PreOrder";
import Loyalty from "./components/Loyalty";
import Social from "./components/Social";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import AdminOrders from "../pages/AdminOrders";
import AdminClientes from "../pages/AdminClientes";
import AdminConfiguracion from "../pages/AdminConfiguracion";
import MenuPage from "../pages/MenuPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import CartPage from "../pages/CartPage";
import ContactPage from "../pages/ContactPage";
import PromocionesPage from "../pages/PromocionesPage";
import FidelizacionPage from "../pages/FidelizacionPage";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <WhatToFind />
        <Location />
        <PreOrder />
        <Loyalty />
        <Testimonials />
        <Social />
      </main>
      <Footer />

      <button
        onClick={() => navigate("/admin")}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-gray-50 transition-colors z-50 border border-gray-200"
        title="Panel de Administración"
      >
        🔒
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/editar-perfil" element={<ProfilePage />} />
      <Route path="/mis-pedidos" element={<ProfilePage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/promociones" element={<PromocionesPage />} />
      <Route path="/fidelizacion" element={<FidelizacionPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/productos" element={<AdminProducts />} />
      <Route path="/admin/pedidos" element={<AdminOrders />} />
      <Route path="/admin/clientes" element={<AdminClientes />} />
      <Route path="/admin/configuracion" element={<AdminConfiguracion />} />
    </Routes>
  );
}