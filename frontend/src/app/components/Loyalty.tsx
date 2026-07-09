import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Gift, Star, Trophy, Percent, X, IceCream } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { obtenerMisPuntos, afiliarse, type MisPuntos } from "../../services/puntos";
import { registerApi } from "../../services/auth";
import { toast } from "sonner";

const benefits = [
  {
    icon: Star,
    title: "Acumula Puntos",
    description: "Por cada compra ganas puntos canjeables",
    color: "from-[#ffd93d] to-[#ffed4e]",
  },
  {
    icon: Gift,
    title: "Productos Gratis",
    description: "Canjea tus puntos por helados y pizzas",
    color: "from-[#ff6b9d] to-[#ff8fab]",
  },
  {
    icon: Percent,
    title: "Descuentos Exclusivos",
    description: "Ofertas especiales solo para miembros",
    color: "from-[#a7e4f2] to-[#c3ecf6]",
  },
  {
    icon: Trophy,
    title: "Niveles VIP",
    description: "Más beneficios mientras más compras",
    color: "from-[#c8b6ff] to-[#dac9ff]",
  },
];

const levels = [
  { name: "Bronce", pts: 0, color: "#cd7f32" },
  { name: "Plata", pts: 100, color: "#c0c0c0" },
  { name: "Oro", pts: 300, color: "#ffd700" },
  { name: "Diamante", pts: 600, color: "#b9f2ff" },
];

function getNextLevel(puntos: number, nivel: string | null) {
  for (let i = 0; i < levels.length; i++) {
    if (levels[i].name === nivel && i + 1 < levels.length) {
      return levels[i + 1];
    }
  }
  return null;
}

export default function Loyalty() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [misPuntos, setMisPuntos] = useState<MisPuntos | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", password: "" });

  useEffect(() => {
    if (token) {
      obtenerMisPuntos().then(setMisPuntos).catch(() => {});
    }
  }, [token]);

  const handleUnirse = async () => {
    if (!user) {
      setShowModal(true);
      return;
    }
    setLoading(true);
    try {
      const res = await afiliarse();
      setMisPuntos(res.puntos);
      toast.success(res.mensaje);
    } catch (e: any) {
      if (e.message.includes("Ya estás afiliado")) {
        toast.info("Ya eres parte del programa de fidelización");
      } else {
        toast.error("Error al afiliarse");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterAndAffiliate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.password) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }
    setLoading(true);
    try {
      const res = await registerApi(form);
      const userData = {
        id: res.id, nombre: res.nombre, email: res.email,
        rol: res.rol, telefono: res.telefono, direccion: res.direccion,
      };
      localStorage.setItem("auth_token", res.token);
      localStorage.setItem("auth_user", JSON.stringify(userData));
      window.location.reload();
    } catch (e: any) {
      toast.error(e.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  const nextLevel = misPuntos?.afiliado ? getNextLevel(misPuntos.puntosAcumulados, misPuntos.nivel) : null;
  const progress = misPuntos?.afiliado && nextLevel
    ? Math.min((misPuntos.puntosAcumulados / nextLevel.pts) * 100, 100)
    : 0;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fff5f7] to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6b9d] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#a7e4f2] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] bg-clip-text text-transparent">
              Programa de Fidelización
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Únete gratis y empieza a disfrutar beneficios exclusivos desde tu primera compra
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Loyalty card mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#ff6b9d] via-[#ff8fab] to-[#ffd93d] rounded-3xl p-8 shadow-2xl transform perspective-1000">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-white/80 text-sm mb-1">
                      {misPuntos?.afiliado ? "Miembro fidelizado" : "Únete al programa"}
                    </div>
                    <div className="text-white text-2xl font-bold">
                      {user?.nombre || "Invitado"}
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/80">Puntos Acumulados</span>
                    <Star className="w-5 h-5 text-[#ffd93d]" />
                  </div>
                  <div className="text-white text-4xl font-bold mb-2">
                    {misPuntos?.afiliado ? misPuntos.puntosAcumulados.toLocaleString() : "0"}
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: misPuntos?.afiliado && nextLevel ? `${progress}%` : "0%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                  <div className="text-white/80 text-sm mt-2">
                    {misPuntos?.afiliado && nextLevel
                      ? `${nextLevel.pts - misPuntos.puntosAcumulados} puntos para ${nextLevel.name}`
                      : misPuntos?.afiliado
                        ? "¡Nivel máximo alcanzado!"
                        : "Regístrate y empieza a acumular"}
                  </div>
                </div>

                <div className="flex items-center justify-between text-white/80 text-sm">
                  <span>Nivel: {misPuntos?.afiliado ? misPuntos.nivel || "Bronce" : "—"}</span>
                  <span>Válido desde {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -right-6 top-1/4 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">¡Recompensa!</div>
                    <div className="text-xs text-gray-600">
                      {misPuntos?.afiliado ? `${misPuntos.puntosActuales} pts disponibles` : "Helado gratis"}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4`}>
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 bg-gradient-to-br from-[#fff5f7] to-white rounded-2xl p-6 border-2 border-[#ffe5ed]"
            >
              <h4 className="font-bold text-lg mb-3">¿Cómo funciona?</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#ff6b9d] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <span>Regístrate gratis con tu WhatsApp o email</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#ffd93d] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <span>Gana 10 puntos por cada S/1 en compras</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#a7e4f2] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <span>Canjea tus puntos por productos y descuentos</span>
                </div>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnirse}
              disabled={loading}
              className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
            >
              {loading ? "Procesando..." : misPuntos?.afiliado ? "Ya eres miembro — Ver mi nivel" : "Unirse Ahora - Es Gratis"}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#2d2d2d]">Afíliate Gratis</h3>
                <p className="text-gray-500 text-sm mt-1">Empieza a acumular puntos y sube de nivel</p>
              </div>

              <form onSubmit={handleRegisterAndAffiliate} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Nombre completo</label>
                  <input
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6b9d] focus:border-transparent outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6b9d] focus:border-transparent outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">WhatsApp / Teléfono</label>
                  <input
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6b9d] focus:border-transparent outline-none transition-all"
                    placeholder="999 888 777"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Contraseña</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6b9d] focus:border-transparent outline-none transition-all"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {loading ? "Creando cuenta..." : "Crear cuenta y afiliarse gratis"}
                </motion.button>
                <p className="text-xs text-gray-400 text-center">
                  Al registrarte aceptas nuestros términos y condiciones
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
