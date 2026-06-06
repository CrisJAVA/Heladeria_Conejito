import { motion } from "motion/react";
import { Gift, Star, Trophy, Percent } from "lucide-react";

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

export default function Loyalty() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fff5f7] to-white relative overflow-hidden">
      {/* Background decoration */}
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
              {/* Main card */}
              <div className="bg-gradient-to-br from-[#ff6b9d] via-[#ff8fab] to-[#ffd93d] rounded-3xl p-8 shadow-2xl transform perspective-1000">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-white/80 text-sm mb-1">Miembro desde 2024</div>
                    <div className="text-white text-2xl font-bold">María González</div>
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
                  <div className="text-white text-4xl font-bold mb-2">2,450</div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                  <div className="text-white/80 text-sm mt-2">550 puntos para tu próxima recompensa</div>
                </div>

                <div className="flex items-center justify-between text-white/80 text-sm">
                  <span>Nivel: Gold</span>
                  <span>Válido hasta 12/2025</span>
                </div>
              </div>

              {/* Floating rewards */}
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
                    <div className="text-xs text-gray-600">Helado gratis</div>
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
              className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Unirse Ahora - Es Gratis
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
