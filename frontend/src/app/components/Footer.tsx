import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { IceCream, MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center">
                <IceCream className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Heladería Ica</span>
            </div>
            <p className="text-gray-400 mb-6">
              Tu oasis de frescura en el corazón de Ica. Helados artesanales y pizzas deliciosas desde 2020.
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-[#ff6b9d] hover:to-[#ff8fab] flex items-center justify-center transition-all"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-[#a7e4f2] hover:to-[#c3ecf6] flex items-center justify-center transition-all"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-[#4ade80] hover:to-[#22c55e] flex items-center justify-center transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ff6b9d] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-medium">Dirección</div>
                  <div className="text-gray-400 text-sm">Av. Principal 123, Ica, Perú</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#ffd93d] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-medium">Teléfono</div>
                  <div className="text-gray-400 text-sm">+51 956 789 123</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#a7e4f2] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-gray-400 text-sm">hola@heladeriaica.pe</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6">Horarios</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Lunes - Viernes</span>
                <span className="font-medium">10:00 - 22:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sábados</span>
                <span className="font-medium">09:00 - 23:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Domingos</span>
                <span className="font-medium">09:00 - 23:00</span>
              </div>
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 text-[#4ade80]">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Abierto ahora</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Enlaces Rápidos</h3>
            <div className="space-y-3">
              <Link to="/menu" className="block text-gray-400 hover:text-[#ff6b9d] transition-colors">
                Menú Completo
              </Link>
              <Link to="/promociones" className="block text-gray-400 hover:text-[#ff6b9d] transition-colors">
                Promociones
              </Link>
              <Link to="/fidelizacion" className="block text-gray-400 hover:text-[#ff6b9d] transition-colors">
                Programa de Fidelización
              </Link>
              <a href="#" className="block text-gray-400 hover:text-[#ff6b9d] transition-colors">
                Trabaja con Nosotros
              </a>
              <a href="#" className="block text-gray-400 hover:text-[#ff6b9d] transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="block text-gray-400 hover:text-[#ff6b9d] transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Heladería Ica. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Hecho con ❤️ en Ica, Perú</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
