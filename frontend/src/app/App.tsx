import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatToFind from "./components/WhatToFind";
import Location from "./components/Location";
import PreOrder from "./components/PreOrder";
import Loyalty from "./components/Loyalty";
import Social from "./components/Social";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import AdminOrders from "../pages/AdminOrders";
import AdminClientes from "../pages/AdminClientes";
import AdminConfiguracion from "../pages/AdminConfiguracion";
import MenuPage from "../pages/MenuPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import MisPedidosPage from "../pages/MisPedidosPage";
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
      <button onClick={() => navigate("/admin")} className="fixed bottom-6 right-6 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-gray-50 transition-colors z-50 border border-gray-200" title="Panel de Administración">
        🔒
      </button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/editar-perfil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/mis-pedidos" element={<ProtectedRoute><MisPedidosPage /></ProtectedRoute>} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/promociones" element={<PromocionesPage />} />
        <Route path="/fidelizacion" element={<FidelizacionPage />} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/productos" element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
        <Route path="/admin/pedidos" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
        <Route path="/admin/clientes" element={<ProtectedRoute adminOnly><AdminClientes /></ProtectedRoute>} />
        <Route path="/admin/configuracion" element={<ProtectedRoute adminOnly><AdminConfiguracion /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
