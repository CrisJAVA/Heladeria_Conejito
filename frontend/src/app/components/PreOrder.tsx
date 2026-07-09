import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Clock, Zap, Check } from "lucide-react";

const benefits = [
  { icon: Clock, text: "Evita colas y ahorra tiempo" },
  { icon: Zap, text: "Servicio rápido en 15 minutos" },
  { icon: Check, text: "Pago seguro y fácil" },
];

export default function PreOrder() {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#f0f9ff] to-[#fff5f7]">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff6b9d]/10 to-[#ffd93d]/10 rounded-full mb-4"
              >
                <span className="text-[#ff6b9d] font-medium">Pedidos Anticipados</span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="text-[#2d2d2d]">Pide antes desde</span>
                <br />
                <span className="bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] bg-clip-text text-transparent">
                  tu celular
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Ordena con anticipación y recoge tu pedido listo. Sin esperas, sin complicaciones.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b9d] to-[#ff8fab] flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-lg">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/menu")}
              className="px-10 py-5 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Ordenar Ahora
            </motion.button>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a7e4f2] to-[#c8b6ff] border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <div className="font-bold">+2,500 clientes</div>
                <div className="text-sm text-gray-600">ordenan cada mes</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Decorative circles */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#ff6b9d]/20 to-[#ffd93d]/20 rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#a7e4f2]/20 to-[#c8b6ff]/20 rounded-full blur-2xl"
              />

              {/* Phone frame */}
              <div className="relative z-10 w-[300px] h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Phone content */}
                  <div className="bg-gradient-to-br from-[#fff5f7] to-white h-full p-6 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">Mi Pedido</h3>
                      <Smartphone className="w-6 h-6 text-[#ff6b9d]" />
                    </div>

                    {/* Order items */}
                    <div className="space-y-4 flex-1">
                      <div className="bg-white rounded-2xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold">Cono Triple</div>
                            <div className="text-sm text-gray-600">Chocolate, Vainilla, Fresa</div>
                          </div>
                          <div className="font-bold text-[#ff6b9d]">S/ 12</div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold">Pizza Personal</div>
                            <div className="text-sm text-gray-600">Mozzarella y albahaca</div>
                          </div>
                          <div className="font-bold text-[#ff6b9d]">S/ 18</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-[#a7e4f2]/20 to-white rounded-2xl p-4 border-2 border-dashed border-[#a7e4f2]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[#ffd93d]" />
                            <span className="font-medium text-sm">Tiempo estimado</span>
                          </div>
                          <span className="font-bold text-[#2d2d2d]">15 min</span>
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-lg">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-[#ff6b9d]">S/ 30.00</span>
                      </div>
                      <button className="w-full py-4 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-2xl font-medium shadow-lg">
                        Confirmar Pedido
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
