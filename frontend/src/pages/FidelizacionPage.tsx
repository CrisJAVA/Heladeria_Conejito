import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, IceCream, Gift, Trophy, Star, Zap, Sparkles, Check, UserPlus, LogIn } from "lucide-react";
import Footer from "../app/components/Footer";
import { listarNiveles, type NivelFidelizacionDTO } from "../services/niveles";
import { obtenerMisPuntos, afiliarse as afiliarsePuntos, type MisPuntos } from "../services/puntos";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

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
  const { user, token } = useAuth();
  const [levels, setLevels] = useState<NivelFidelizacionDTO[]>([]);
  const [misPuntos, setMisPuntos] = useState<MisPuntos | null>(null);
  const [loadingLevels, setLoadingLevels] = useState(true);
  const [loadingPuntos, setLoadingPuntos] = useState(false);
  const [affiliating, setAffiliating] = useState(false);

  useEffect(() => {
    listarNiveles()
      .then(setLevels)
      .catch(() => setLevels([]))
      .finally(() => setLoadingLevels(false));
  }, []);

  useEffect(() => {
    if (token) {
      setLoadingPuntos(true);
      obtenerMisPuntos()
        .then(setMisPuntos)
        .catch(() => setMisPuntos(null))
        .finally(() => setLoadingPuntos(false));
    } else {
      setMisPuntos(null);
    }
  }, [token]);

  const handleAfiliarse = async () => {
    setAffiliating(true);
    try {
      const res = await afiliarsePuntos();
      setMisPuntos(res.puntos);
      toast.success(res.mensaje);
    } catch {
      toast.error("Error al afiliarse");
    } finally {
      setAffiliating(false);
    }
  };

  const currentLevelName = misPuntos?.afiliado ? misPuntos.nivel : null;
  const estiloActual = currentLevelName ? (ESTILOS_NIVEL[currentLevelName] || ESTILO_DEFAULT) : null;
  const IconActual = estiloActual?.icon || Gift;

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

        {!token && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fab] rounded-2xl p-8 text-center text-white shadow-lg"
          >
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <LogIn className="w-12 h-12 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-3">Comienza hoy mismo</h3>
            <p className="text-white/90 mb-6 max-w-lg mx-auto">
              Regístrate gratis y empieza a acumular puntos desde tu primera compra. ¡Te esperamos!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-white text-[#ff6b9d] rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Crear cuenta gratis
            </motion.button>
            <p className="text-white/70 text-sm mt-3">
              ¿Ya tienes cuenta?{" "}
              <button onClick={() => navigate("/login")} className="underline font-medium">
                Inicia sesión
              </button>
            </p>
          </motion.div>
        )}

        {token && !loadingPuntos && misPuntos && !misPuntos.afiliado && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 bg-gradient-to-br from-[#ffd93d] to-[#ffed4e] rounded-2xl p-8 text-center shadow-lg"
          >
            <UserPlus className="w-12 h-12 mx-auto mb-4 text-[#b8860b]" />
            <h3 className="text-2xl font-bold text-[#2d2d2d] mb-3">Únete al programa</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Empieza a acumular puntos con cada compra y accede a beneficios exclusivos.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAfiliarse}
              disabled={affiliating}
              className="px-8 py-3 bg-[#2d2d2d] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {affiliating ? "Afiliando..." : "Afiliarme al programa"}
            </motion.button>
          </motion.div>
        )}

        {token && misPuntos?.afiliado && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className={`rounded-2xl border-2 ${estiloActual?.borderColor || "border-amber-300"} shadow-lg overflow-hidden`}>
              <div className={`${estiloActual?.bgCard || "bg-gradient-to-br from-amber-50 to-amber-100"} p-6 md:p-8`}>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className={`w-20 h-20 rounded-full ${estiloActual?.color || "from-amber-600 to-amber-400"} flex items-center justify-center shadow-lg`}>
                    <IconActual className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <p className="text-sm text-gray-500 mb-1">Tu nivel actual</p>
                    <h3 className="text-3xl font-black text-[#2d2d2d]">{misPuntos.nivel}</h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                      <Star className="w-5 h-5 text-[#ffd93d]" />
                      <span className="text-2xl font-black text-[#2d2d2d]">{misPuntos.puntosActuales.toLocaleString()}</span>
                      <span className="text-sm text-gray-400">pts disponibles</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {misPuntos.puntosAcumulados.toLocaleString()} pts acumulados en total
                    </p>
                  </div>
                </div>

                {misPuntos.nivelSiguiente ? (
                  <div className="mt-6 bg-white/60 rounded-xl p-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Progreso a {misPuntos.nivelSiguiente}</span>
                      <span className="font-medium text-[#2d2d2d]">
                        {misPuntos.puntosFaltantes > 0
                          ? `Faltan ${misPuntos.puntosFaltantes} pts`
                          : "¡Listo para subir!"}
                      </span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={misPuntos.porcentajeProgreso} aria-valuemin={0} aria-valuemax={100} aria-label={`Progreso a ${misPuntos.nivelSiguiente}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${estiloActual?.color || "from-amber-600 to-amber-400"}`}
                        style={{ width: `${misPuntos.porcentajeProgreso}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 bg-white/60 rounded-xl p-5 text-center">
                    <Trophy className="w-8 h-8 text-[#ffd93d] mx-auto mb-2" />
                    <p className="text-sm font-bold text-[#2d2d2d]">¡Has alcanzado el nivel máximo!</p>
                    <p className="text-xs text-gray-400">Sigue acumulando puntos para canjear beneficios</p>
                  </div>
                )}
              </div>

              <div className="bg-white px-6 md:px-8 py-5 border-t border-gray-100">
                <h4 className="font-bold text-sm text-gray-700 mb-4 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#ff6b9d]" />
                  Beneficios de tu nivel
                </h4>
                {(() => {
                  const currentLevel = levels.find((l) => l.nombre === misPuntos.nivel);
                  const benefits = currentLevel?.beneficios || [];
                  if (benefits.length === 0) {
                    return <p className="text-sm text-gray-400">No hay beneficios configurados para este nivel</p>;
                  }
                  return (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {benefits.map((b) => (
                        <div key={b.id} className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full ${estiloActual?.color || "from-amber-600 to-amber-400"} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-sm text-gray-700">{b.descripcion}</span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}

        {token && loadingPuntos && (
          <div className="text-center text-gray-400 py-10 mb-10">Cargando tu información...</div>
        )}

        <h3 className="text-xl font-bold text-[#2d2d2d] mb-6">Todos los niveles</h3>
        {loadingLevels ? (
          <div className="text-center text-gray-400 py-10">Cargando niveles...</div>
        ) : levels.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No hay niveles configurados</div>
        ) : (
          <div className="flex flex-col gap-6">
            {levels.map((level, i) => {
              const estilo = ESTILOS_NIVEL[level.nombre] || ESTILO_DEFAULT;
              const Icon = estilo.icon;
              const isCurrentLevel = misPuntos?.afiliado && misPuntos.nivel === level.nombre;
              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className={`rounded-2xl border-2 shadow-sm overflow-hidden transition-all ${
                    isCurrentLevel
                      ? `${estilo.bgCard} ${estilo.borderColor} ring-2 ring-offset-2 ${estilo.borderColor.replace("border-", "ring-")}`
                      : `${estilo.bgCard} border-gray-200`
                  }`}
                >
                  <div className="flex flex-col md:flex-row relative">
                    {isCurrentLevel && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${estilo.badgeColor} shadow-md`}>
                          Tu nivel
                        </span>
                      </div>
                    )}
                    <div className={`md:w-56 p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r ${isCurrentLevel ? estilo.borderColor : "border-gray-200"}`}>
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
      </main>

      <Footer />
    </div>
  );
}
