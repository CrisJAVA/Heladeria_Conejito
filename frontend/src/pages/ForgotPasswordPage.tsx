import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IceCream, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Footer from "../app/components/Footer";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Ingresa tu correo electrónico"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al solicitar recuperación");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión");
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
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-[#2d2d2d] mb-2">Revisa tu correo</h1>
                <p className="text-gray-500 mb-6">
                  Si existe una cuenta con <strong>{email}</strong>, recibirás un enlace para restablecer tu contraseña.
                </p>
                <button onClick={() => navigate("/login")} className="px-8 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all">
                  Volver a iniciar sesión
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IceCream className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#2d2d2d]">Recuperar contraseña</h1>
                  <p className="text-gray-500 text-sm mt-1">Te enviaremos un enlace para restablecer tu contraseña</p>
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
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : "Enviar enlace de recuperación"}
                  </motion.button>
                  <p className="text-center text-sm text-gray-500">
                    ¿Recordaste tu contraseña?{" "}
                    <button type="button" onClick={() => navigate("/login")} className="text-[#ff6b9d] hover:underline font-medium">Iniciar Sesión</button>
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
