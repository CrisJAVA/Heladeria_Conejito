import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Ana García",
    role: "Madre de familia",
    rating: 5,
    text: "El lugar perfecto para pasar una tarde en familia. Los helados son deliciosos y el ambiente es muy acogedor. ¡Mis hijos lo adoran!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    name: "Carlos Mendoza",
    role: "Estudiante universitario",
    rating: 5,
    text: "Me encanta venir aquí con mis amigos. Las pizzas son increíbles y los milkshakes son lo mejor. Además, los precios son muy justos.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    name: "María Torres",
    role: "Cliente frecuente",
    rating: 5,
    text: "La atención es excelente y el sistema de pedidos por WhatsApp es super conveniente. Ya no tengo que hacer cola y mis helados siempre están listos.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
  {
    name: "Roberto Silva",
    role: "Padre de familia",
    rating: 5,
    text: "Calidad premium a precios accesibles. El programa de fidelización es genial, ya he canjeado varios helados gratis. ¡100% recomendado!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
  {
    name: "Lucía Ramírez",
    role: "Joven profesional",
    rating: 5,
    text: "Un oasis en el calor de Ica. Los sabores son únicos y artesanales. Me encanta que siempre tienen opciones nuevas para probar.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },
  {
    name: "Diego Paredes",
    role: "Escolar",
    rating: 5,
    text: "¡El mejor lugar para estudiar con amigos! WiFi gratis, aire acondicionado y los helados más ricos de Ica. Vengo casi todos los días.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fff5f7] to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-[#ff6b9d]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#a7e4f2]/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] bg-clip-text text-transparent">
              Lo que dicen
            </span>
            <br />
            <span className="text-[#2d2d2d]">nuestros clientes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Miles de familias y jóvenes ya disfrutan de nuestros productos
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <div className="text-4xl font-bold text-[#ff6b9d] mb-2">4.9</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#ffd93d] text-[#ffd93d]" />
              ))}
            </div>
            <div className="text-gray-600">Calificación promedio</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <div className="text-4xl font-bold text-[#ffd93d] mb-2">2,500+</div>
            <div className="text-gray-600">Clientes satisfechos</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <div className="text-4xl font-bold text-[#a7e4f2] mb-2">500+</div>
            <div className="text-gray-600">Reseñas positivas</div>
          </motion.div>
        </div>

        {/* Testimonials carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all relative"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b9d]/10 to-[#ffd93d]/10 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-[#ff6b9d]" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ffd93d] text-[#ffd93d]" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">¿Ya probaste nuestros productos?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            Deja tu reseña
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
