import { motion, AnimatePresence } from "motion/react";
import { IceCream, Menu, X, ShoppingBag, User, Package, Settings, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Menú", href: "/menu" },
    { name: "Promociones", href: "/promociones" },
    { name: "Fidelización", href: "/fidelizacion" },
    { name: "Contacto", href: "/contacto" },
  ];

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center">
              <IceCream className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl text-[#2d2d2d]">Heladería Ica</div>
              <div className="text-xs text-gray-600">Sabor artesanal</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.href)}
                className="text-gray-700 hover:text-[#ff6b9d] font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] group-hover:w-full transition-all" />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#ff6b9d] rounded-full font-medium transition-colors border border-gray-200 hover:border-[#ff6b9d]"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm max-w-[120px] truncate">{user.name}</span>
                </motion.button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-[#2d2d2d] truncate">{user.name}</p>
                        <p className="text-xs text-gray-400">Cliente</p>
                      </div>
                      <button
                        onClick={() => { navigate("/mis-pedidos"); setShowDropdown(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ff6b9d] transition-colors"
                      >
                        <Package className="w-4 h-4" />
                        Ver mis pedidos
                      </button>
                      <button
                        onClick={() => { navigate("/editar-perfil"); setShowDropdown(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ff6b9d] transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Editar perfil
                      </button>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar sesión
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-[#ff6b9d] rounded-full font-medium transition-colors"
              >
                <User className="w-5 h-5" />
                Iniciar Sesión
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/carrito")}
              className="relative flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-[#ff6b9d] rounded-full font-medium transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#ff6b9d] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              <ShoppingBag className="w-5 h-5" />
              Pedir Ahora
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-gray-100"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => { navigate(link.href); setIsOpen(false); }}
                  className="text-gray-700 hover:text-[#ff6b9d] font-medium transition-colors py-2 text-left"
                >
                  {link.name}
                </button>
              ))}
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 truncate">{user.name}</span>
                  </div>
                  <button
                    onClick={() => { navigate("/mis-pedidos"); setIsOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-[#ff6b9d] transition-colors text-sm"
                  >
                    <Package className="w-4 h-4" />
                    Ver mis pedidos
                  </button>
                  <button
                    onClick={() => { navigate("/editar-perfil"); setIsOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-[#ff6b9d] transition-colors text-sm"
                  >
                    <Settings className="w-4 h-4" />
                    Editar perfil
                  </button>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 transition-colors text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { navigate("/login"); setIsOpen(false); }}
                  className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-[#ff6b9d] font-medium transition-colors"
                >
                  <User className="w-5 h-5" />
                  Iniciar Sesión
                </button>
              )}
              <button
                onClick={() => { navigate("/carrito"); setIsOpen(false); }}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-[#ff6b9d] font-medium transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                Carrito
                {totalItems > 0 && (
                  <span className="w-5 h-5 bg-[#ff6b9d] text-white text-[10px] font-bold flex items-center justify-center rounded-full">{totalItems}</span>
                )}
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-lg mt-4">
                <ShoppingBag className="w-5 h-5" />
                Pedir Ahora
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
