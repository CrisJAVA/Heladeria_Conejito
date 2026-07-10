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
import AdminMedia from "../pages/AdminMedia";
import AdminLandingPage from "../pages/AdminLandingPage";
import BoletaPage from "../pages/BoletaPage";
import MenuPage from "../pages/MenuPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import MisPedidosPage from "../pages/MisPedidosPage";
import CartPage from "../pages/CartPage";
import ContactPage from "../pages/ContactPage";
import PromocionesPage from "../pages/PromocionesPage";
import FidelizacionPage from "../pages/FidelizacionPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import WishlistPage from "../pages/WishlistPage";
import NotificationCenter from "../pages/NotificationCenter";

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
        <Route path="/admin/media" element={<ProtectedRoute adminOnly><AdminMedia /></ProtectedRoute>} />
        <Route path="/admin/landing" element={<ProtectedRoute adminOnly><AdminLandingPage /></ProtectedRoute>} />
        <Route path="/boleta/:id" element={<ProtectedRoute><BoletaPage /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
        <Route path="/notificaciones" element={<ProtectedRoute><NotificationCenter /></ProtectedRoute>} />
        <Route path="*" element={
          <div className="min-h-screen bg-[#fffbf7] flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl font-bold text-[#ff6b9d]">404</h1>
            <p className="text-[#564245] text-lg">Página no encontrada</p>
            <a href="/" className="mt-4 px-6 py-3 bg-[#ff7e9d] text-[#761235] rounded-xl font-bold">Volver al inicio</a>
          </div>
        } />
      </Routes>
    </>
  );
}
