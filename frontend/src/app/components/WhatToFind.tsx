import { motion } from "motion/react";
import { IceCream, Pizza, Star, Gift, Sparkles } from "lucide-react";

const features = [
  {
    icon: IceCream,
    title: "Variedad de Productos",
    description: "Helados artesanales en conos, copas, milkshakes y mucho más",
    color: "from-[#ff6b9d] to-[#ff8fab]",
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxpY2UlMjBjcmVhbSUyMGFydGlzYW4lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzkxMTk3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Star,
    title: "Ranking de Favoritos",
    description: "Descubre los sabores más populares y favoritos de la semana",
    color: "from-[#ffd93d] to-[#ffed4e]",
    image: "https://images.unsplash.com/photo-1718810125230-e8e2271354f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxpY2UlMjBjcmVhbSUyMGFydGlzYW4lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzkxMTk3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Gift,
    title: "Promociones y Combos",
    description: "Combos familiares, ofertas 2x1 y promociones especiales",
    color: "from-[#a7e4f2] to-[#c3ecf6]",
    image: "https://images.unsplash.com/photo-1663721206074-02fb7b026da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrc2hha2UlMjBkZXNzZXJ0JTIwY29sb3JmdWx8ZW58MXx8fHwxNzc5MTE5Nzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Sparkles,
    title: "Degustaciones",
    description: "Prueba nuevos sabores antes de elegir, ¡sin compromiso!",
    color: "from-[#c8b6ff] to-[#dac9ff]",
    image: "https://images.unsplash.com/photo-1629385697093-57be2cc97fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxpY2UlMjBjcmVhbSUyMGFydGlzYW4lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzkxMTk3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const popularProducts = [
  {
    name: "Cono Triple Arcoíris",
    price: "S/ 12.00",
    badge: "Más Vendido",
    rating: 5,
  },
  {
    name: "Milkshake de Fresa",
    price: "S/ 15.00",
    badge: "Favorito",
    rating: 5,
  },
  {
    name: "Pizza Personal",
    price: "S/ 18.00",
    badge: "Nuevo",
    rating: 5,
  },
  {
    name: "Combo Familiar",
    price: "S/ 45.00",
    badge: "2x1",
    rating: 5,
  },
];

export default function WhatToFind() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#fff5f7]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] bg-clip-text text-transparent">
              ¿Qué encontrarás?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas para disfrutar de un momento refrescante y delicioso
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-40`} />
                </div>
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Popular products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 sm:p-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Los Más Pedidos</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-[#ff6b9d] font-medium hover:underline"
            >
              Ver todos →
            </motion.button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative bg-gradient-to-br from-[#fff5f7] to-white rounded-2xl p-6 border-2 border-[#ffe5ed] cursor-pointer"
              >
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white text-xs font-medium rounded-full">
                    {product.badge}
                  </span>
                </div>
                <div className="pt-8">
                  <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ffd93d] text-[#ffd93d]" />
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-[#ff6b9d]">{product.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
