import { motion } from "motion/react";
import { IceCream, Pizza } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff5f7] via-[#fffbf7] to-[#f0f9ff]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-[#ffb8d1] rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#a7e4f2] rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-[#ff6b9d]"
              >
                <IceCream className="w-8 h-8" />
                <span className="text-lg font-medium">Heladería Familiar · Ica, Perú</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] bg-clip-text text-transparent">
                  Disfruta tus
                </span>
                <br />
                <span className="text-[#2d2d2d]">sabores favoritos</span>
                <br />
                <span className="text-[#ffd93d]">sin esperas</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg">
                Compra rápida, cómoda y deliciosa desde cualquier lugar. Tu oasis de frescura en el corazón de Ica.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/menu")}
                className="px-8 py-4 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Ver Menú
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/menu")}
                className="px-8 py-4 bg-white text-[#ff6b9d] rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-[#ff6b9d]"
              >
                Pedir Ahora
              </motion.button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ff6b9d]">50+</div>
                <div className="text-sm text-gray-600">Sabores</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ffd93d]">15min</div>
                <div className="text-sm text-gray-600">Entrega</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#a7e4f2]">100%</div>
                <div className="text-sm text-gray-600">Artesanal</div>
              </div>
            </div>
          </motion.div>

          {/* Right content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1629385701021-fcd568a743e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGFydGlzYW4lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzkxMTk3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Delicious ice cream cones"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] rounded-full flex items-center justify-center">
                <Pizza className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">¡También pizzas!</div>
                <div className="text-sm text-gray-600">Artesanales y deliciosas</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
