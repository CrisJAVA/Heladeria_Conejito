import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { IceCream, Star, Gift, Sparkles, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { listarProductos, type ProductoDTO } from "../../services/productos";
import { listarSecciones, type SeccionLanding } from "../../services/landingPage";
import { useCart } from "../../context/CartContext";

const defaultFeatures: SeccionLanding[] = [
  { sectionKey: "helados", titulo: "Helados Artesanales", descripcion: "Suaves y cremosos en cono, preparados al momento", imagenUrl: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", colorFrom: "#ff6b9d", colorTo: "#ff8fab", activo: true },
  { sectionKey: "raspadillas", titulo: "Raspadillas Refrescantes", descripcion: "8 sabores tradicionales para combatir el calor de Ica", imagenUrl: "https://images.unsplash.com/photo-1718810125230-e8e2271354f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", colorFrom: "#ffd93d", colorTo: "#ffed4e", activo: true },
  { sectionKey: "pizzas", titulo: "Pizzas Artesanales", descripcion: "Personal, mediana o familiar, horneadas al momento", imagenUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", colorFrom: "#a7e4f2", colorTo: "#c3ecf6", activo: true },
  { sectionKey: "chicha", titulo: "Chicha Morada Helada", descripcion: "La bebida tradicional peruana, siempre fría y deliciosa", imagenUrl: "https://images.unsplash.com/photo-1629385697093-57be2cc97fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", colorFrom: "#c8b6ff", colorTo: "#dac9ff", activo: true },
];

const sectionIcons: Record<string, typeof IceCream> = { helados: IceCream, raspadillas: Star, pizzas: Gift, chicha: Sparkles };

const sectionIconMap = (key: string) => sectionIcons[key] || IceCream;

export default function WhatToFind() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<ProductoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<SeccionLanding[]>(defaultFeatures);

  useEffect(() => {
    listarSecciones()
      .then((data) => {
        if (data.length > 0) setFeatures(data);
      })
      .catch(() => {});
    listarProductos()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const destacados = products.filter((p) => p.destacado).slice(0, 4);

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.filter(f => f.activo !== false).map((feature, index) => {
            const Icon = sectionIconMap(feature.sectionKey);
            return (
              <motion.div
                key={feature.sectionKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => navigate("/menu")}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.imagenUrl}
                      alt={feature.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400/${feature.colorFrom?.replace('#','')}/ffffff?text=${encodeURIComponent(feature.titulo)}`; }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-[${feature.colorFrom}] to-[${feature.colorTo}] opacity-40`} />
                  </div>
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[${feature.colorFrom}] to-[${feature.colorTo}] flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.titulo}</h3>
                    <p className="text-gray-600">{feature.descripcion}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 sm:p-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-[#2d2d2d]">Los Más Pedidos</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/menu")}
              className="text-[#ff6b9d] font-medium hover:underline flex items-center gap-1"
            >
              Ver todos →
            </motion.button>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gradient-to-br from-[#fff5f7] to-white rounded-2xl p-6 border-2 border-[#ffe5ed] animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded-xl mt-4" />
                </div>
              ))}
            </div>
          ) : destacados.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No hay productos destacados aún</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destacados.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative bg-gradient-to-br from-[#fff5f7] to-white rounded-2xl p-6 border-2 border-[#ffe5ed] cursor-pointer group"
                >
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white text-xs font-medium rounded-full">
                      {product.destacado ? "Más Vendido" : "Popular"}
                    </span>
                  </div>
                  <div className="pt-8">
                    <h4 className="font-bold text-lg mb-2 text-[#2d2d2d]">{product.nombre}</h4>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#ffd93d] text-[#ffd93d]" />
                      ))}
                    </div>
                    <div className="text-2xl font-bold text-[#ff6b9d] mb-4">S/.{Number(product.precio).toFixed(2)}</div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({ id: product.id!, name: product.nombre, price: product.precio, image: product.imagenUrl || "", description: product.descripcion || "" });
                        toast.success(`${product.nombre} agregado al carrito`);
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-medium text-sm rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4" /> Agregar
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
