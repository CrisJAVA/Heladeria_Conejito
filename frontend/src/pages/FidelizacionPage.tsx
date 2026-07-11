import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, IceCream, Star, Gift, Trophy, Sparkles, Zap, Check } from "lucide-react";
import Footer from "../app/components/Footer";
import { listarNiveles, type NivelFidelizacionDTO } from "../services/niveles";

// Estilos visuales por nombre de nivel. El backend solo administra puntos y
// beneficios; el ícono/color de cada nivel se mantiene igual que el diseño original.
const ESTILOS_NIVEL: Record<string, { icon: any; color: string; bgCard: string; borderColor: string; badgeColor: string }> = {
  Bronce: {
    icon: Star,
    color: "from-amber-600 to-amber-400",
    bgCard: "bg-gradient-to-br from-amber-50 to-amber-100",
    borderColor: "border-amber-300",
    badgeColor: "bg-amber-500",
  },
  Plata: {
    icon: Zap,
    color: "from-slate-400 to-slate-300",
    bgCard: "bg-gradient-to-br from-slate-50 to-slate-100",
    borderColor: "border-slate-300",
    badgeColor: "bg-slate-400",
  },
  Oro: {
    icon: Trophy,
    color: "from-yellow-500 to-yellow-300",
    bgCard: "bg-gradient-to-br from-yellow-50 to-amber-50",
    borderColor: "border-yellow-400",
    badgeColor: "bg-yellow-500",
  },
  Diamante: {
    icon: Sparkles,
    color: "from-cyan-500 to-blue-400",
    bgCard: "bg-gradient-to-br from-cyan-50 to-blue-50",
    borderColor: "border-cyan-400",
    badgeColor: "bg-cyan-500",
  },
};

const ESTILO_DEFAULT = ESTILOS_NIVEL.Bronce;

export default function FidelizacionPage() {
  const navigate = useNavigate();
  const [levels, setLevels] = useState<NivelFidelizacionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarNiveles()
      .then(setLevels)
      .catch(() => setLevels([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#ff6b9d]/5" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#ffd93d]/5" />
        <div className="absolute top-1/3 -left-10 w-40 h-40 rounded-full bg-[#ff6b9d]/5" />
        <div className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full bg-[#ffd93d]/10" />
        <IceCream className="absolute top-40 left-8 w-12 h-12 text-[#ff6b9d]/5 rotate-12" />
        <IceCream className="absolute bottom-40 right-12 w-16 h-16 text-[#ffd93d]/5 -rotate-12" />
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-5xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-[#2d2d2d]">Fidelización</h1>
            <div className="p-2 bg-[#ffd93d]/20 rounded-xl">
              <Gift className="w-5 h-5 text-[#b8860b]" />
            </div>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#2d2d2d] mb-3">Programa de Fidelización</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Mientras más compras, más subes de nivel y más beneficios obtienes. ¡Únete gratis!
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-10">Cargando niveles...</div>
        ) : (
          <div className="flex flex-col gap-6">
            {levels.map((level, i) => {
              const estilo = ESTILOS_NIVEL[level.nombre] || ESTILO_DEFAULT;
              const Icon = estilo.icon;
              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className={`${estilo.bgCard} rounded-2xl border ${estilo.borderColor} shadow-sm overflow-hidden`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Level header */}
                    <div className={`md:w-56 p-6 ${estilo.bgCard} flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r ${estilo.borderColor}`}>
                      <div className={`w-16 h-16 rounded-full ${estilo.color} flex items-center justify-center mb-3 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className={`px-4 py-1 ${estilo.badgeColor} text-white text-sm font-bold rounded-full mb-2`}>
                        {level.puntosMinimos === 0 ? "0 pts" : `${level.puntosMinimos}+ pts`}
                      </div>
                      <h3 className={`text-2xl font-bold bg-gradient-to-r ${estilo.color} bg-clip-text text-transparent`}>
                        {level.nombre}
                      </h3>
                    </div>

                    {/* Benefits */}
                    <div className="flex-1 p-6">
                      <div className="grid sm:grid-cols-2 gap-3">
                        {(level.beneficios || []).map((benefit) => (
                          <div key={benefit.id} className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full ${estilo.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-sm text-gray-700">{benefit.descripcion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fab] rounded-2xl p-8 text-center text-white shadow-lg"
        >
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Trophy className="w-12 h-12 mx-auto mb-4 text-[#ffd93d]" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-3">Comienza hoy mismo</h3>
          <p className="text-white/90 mb-6 max-w-lg mx-auto">
            Regístrate gratis y empieza a acumular puntos desde tu primera compra. ¡Te esperamos!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-white text-[#ff6b9d] rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Crear cuenta gratis
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
