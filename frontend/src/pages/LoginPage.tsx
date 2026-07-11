import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { IceCream, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import Footer from "../app/components/Footer";
import { obtenerConfiguracion, type ConfiguracionDTO } from "../services/configuracion";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<ConfiguracionDTO | null>(null);

  useEffect(() => {
    obtenerConfiguracion()
      .then(setConfig)
      .catch(() => {
        console.log("No se pudo cargar configuración");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Todos los campos son obligatorios"); return; }
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.rol === "ADMIN" ? "/admin" : "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col">
      <header className="px-4 md:px-8 py-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden" >
              {config?.logoUrl ? (
                <img src={config.logoUrl} alt={config.nombreNegocio || "Logo"} className="w-full h-full object-cover" />) : (
                <IceCream className="w-8 h-8 text-white" />
              )}
            </motion.div>
            <h1 className="text-2xl font-bold text-[#2d2d2d]">Iniciar Sesión</h1>
            <p className="text-gray-500 text-sm mt-1">Ingresa a tu cuenta para pedir más rápido</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
            {error && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </motion.div>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Correo electrónico</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="tucorreo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] focus:border-[#ff6b9d] outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Contraseña</label>
                <button type="button" onClick={() => navigate("/forgot-password")} className="text-xs text-[#ff6b9d] hover:underline font-medium">¿Olvidaste tu contraseña?</button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] focus:border-[#ff6b9d] outline-none transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </motion.button>

            <p className="text-center text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <button type="button" onClick={() => navigate("/registro")} className="text-[#ff6b9d] hover:underline font-medium">Registrarse</button>
            </p>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
