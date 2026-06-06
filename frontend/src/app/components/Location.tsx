import { motion } from "motion/react";
import { MapPin, Clock, Users, Sun } from "lucide-react";

export default function Location() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fff5f7] via-white to-[#f0f9ff]">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBlbmpveWluZyUyMGZvb2QlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3OTExOTc4OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Families enjoying food together"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Floating info cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a7e4f2] to-[#c3ecf6] flex items-center justify-center">
                    <Sun className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-bold">Clima perfecto</div>
                </div>
                <p className="text-sm text-gray-600">
                  Tu oasis de frescura en el cálido clima de Ica
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#ff6b9d] to-[#a7e4f2] bg-clip-text text-transparent">
                  El lugar perfecto
                </span>
                <br />
                <span className="text-[#2d2d2d]">para refrescarte</span>
              </h2>
              <p className="text-xl text-gray-600">
                Tu oasis de tranquilidad en la ciudad. Un espacio acogedor donde familias, amigos y jóvenes se reúnen para disfrutar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b9d] to-[#ff8fab] flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Ubicación Central</h3>
                <p className="text-gray-600 text-sm">
                  En el corazón de Ica, cerca de espacios recreativos
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd93d] to-[#ffed4e] flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Horarios Flexibles</h3>
                <p className="text-gray-600 text-sm">
                  Abierto todos los días para tu comodidad
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a7e4f2] to-[#c3ecf6] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Espacio Familiar</h3>
                <p className="text-gray-600 text-sm">
                  Ambiente cómodo para toda la familia
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c8b6ff] to-[#dac9ff] flex items-center justify-center mb-4">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Refrescante</h3>
                <p className="text-gray-600 text-sm">
                  Aire acondicionado y ambiente fresco
                </p>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Cómo llegar
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
