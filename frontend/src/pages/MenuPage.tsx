import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Heart, Search, SlidersHorizontal, X } from "lucide-react";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { listarProductos, type ProductoDTO } from "../services/productos";
import { agregarFavorito, quitarFavorito as eliminarFavorito, listarFavoritos } from "../services/favoritos";

const categories = ["Helados", "Raspadillas", "Bebidas", "Pizzas"];
const categoryColors: Record<string, string> = {
  Helados: "#ff6b9d",
  Raspadillas: "#7cacd7",
  Bebidas: "#c8b6ff",
  Pizzas: "#f97316",
};

export default function MenuPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(60);
  const [favoritos, setFavoritos] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const loadFavoritos = useCallback(async () => {
    if (!user) return;
    try {
      const data = await listarFavoritos();
      setFavoritos(new Set(data.map((f) => f.productoId)));
    } catch { /* ignore */ }
  }, [user]);

  const toggleFavorito = async (productoId: number, nombre: string) => {
    if (!user) { toast.error("Inicia sesión para guardar favoritos"); return; }
    const isFav = favoritos.has(productoId);
    try {
      if (isFav) {
        await eliminarFavorito(productoId);
        setFavoritos((prev) => { const next = new Set(prev); next.delete(productoId); return next; });
        toast.success(`${nombre} eliminado de favoritos`);
      } else {
        await agregarFavorito(productoId);
        setFavoritos((prev) => new Set(prev).add(productoId));
        toast.success(`${nombre} agregado a favoritos`);
      }
    } catch { toast.error("Error al actualizar favoritos"); }
  };

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listarProductos();
      setProducts(data);
    } catch {
      setError("Error al cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadFavoritos();
  }, [loadFavoritos]);

  const allCategories = ["Todas", ...categories];

  const filteredProducts = products.filter((p) => {
    const matchCategory = filterCategory === "Todas" || p.categoriaNombre === filterCategory;
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchPrice = p.precio <= maxPrice;
    return matchCategory && matchSearch && matchPrice;
  });

  const bestSellers = products.filter((p) => p.destacado);

  const getPlaceholder = (nombre: string) =>
    `https://placehold.co/400x300/ff6b9d/ffffff?text=${encodeURIComponent(nombre)}`;

  return (
    <div className="min-h-screen bg-[#fffbf7]">
      <Navbar />

      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl h-56 md:h-64 flex items-center bg-gradient-to-br from-[#ff6b9d] via-[#ff8fab] to-[#ffd93d] shadow-xl mb-12">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-white/20" />
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-white/15" />
          </div>
          <div className="relative z-10 px-8 md:px-14 max-w-2xl space-y-4">
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-white/70 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">Heladería Conejito</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Disfruta tus sabores <br className="hidden sm:block" />favoritos sin esperas
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/80 text-sm md:text-base max-w-md">
              Pide online y recoge en tienda o recibe a domicilio
            </motion.p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-10 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar helados, raspadillas, pizzas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-12 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#ff6b9d]/30 focus:border-[#ff6b9d] outline-none transition-all shadow-sm hover:shadow-md"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          <motion.div layout className="flex flex-wrap items-center justify-center gap-3">
            {allCategories.map((cat, i) => {
              const isActive = filterCategory === cat;
              const accent = cat === "Todas" ? "#ff6b9d" : categoryColors[cat] || "#ff6b9d";
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "text-gray-600 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                  }`}
                  style={{ backgroundColor: isActive ? accent : undefined, boxShadow: isActive ? `0 8px 25px -5px ${accent}40` : undefined }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-2xl"
                      style={{ backgroundColor: accent }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {cat !== "Todas" && (
                      <span
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{ backgroundColor: isActive ? "rgba(255,255,255,0.8)" : accent }}
                      />
                    )}
                    {cat}
                  </span>
                </motion.button>
              );
            })}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                showFilters || maxPrice < 60 ? "bg-[#ffd93d]/20 text-[#b8860b] border border-[#ffd93d]" : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {maxPrice < 60 && <span className="w-2 h-2 rounded-full bg-[#ffd93d]" />}
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="max-w-md mx-auto bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Precio máximo: <span className="text-[#ff6b9d]">S/.{maxPrice}</span></span>
                    <button onClick={() => setMaxPrice(60)} className="text-xs text-gray-400 hover:text-[#ff6b9d] transition-colors">Restablecer</button>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="60"
                      step="1"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#ff6b9d]"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>S/.0</span>
                      <span>S/.15</span>
                      <span>S/.30</span>
                      <span>S/.45</span>
                      <span>S/.60</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    {[10, 20, 30, 45].map((p) => (
                      <button
                        key={p}
                        onClick={() => setMaxPrice(p)}
                        className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                          maxPrice === p
                            ? "bg-[#ff6b9d]/10 text-[#ff6b9d] border border-[#ff6b9d]/30"
                            : "bg-gray-50 text-gray-500 border border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        S/.{p}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => { setFilterCategory("Todas"); setSearchTerm(""); setMaxPrice(60); }}
                    className="w-full py-2.5 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <section className="space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#2d2d2d]">
                {filterCategory === "Todas" ? "Todos los Productos" : filterCategory}
              </h2>
              {!loading && (
                <motion.p key={filteredProducts.length} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-gray-400 mt-0.5">
                  {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
                </motion.p>
              )}
            </div>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-10 bg-gray-200 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-lg text-red-500 font-medium">{error}</p>
              <button onClick={loadProducts} className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all">
                Reintentar
              </button>
            </motion.div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">No hay productos disponibles.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-xl font-bold text-[#2d2d2d] mb-1">Sin resultados</p>
              <p className="text-gray-400 text-sm mb-6">No encontramos productos que coincidan con tu búsqueda</p>
              <button onClick={() => { setFilterCategory("Todas"); setSearchTerm(""); setMaxPrice(60); }} className="px-6 py-2.5 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all active:scale-[0.98]">
                Limpiar filtros
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ delay: idx * 0.04, type: "spring", stiffness: 200, damping: 25 }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#ff6b9d]/20 transition-all duration-300 group"
                  >
                    <div className="h-52 overflow-hidden relative">
                      <img
                        alt={product.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        src={product.imagenUrl || getPlaceholder(product.nombre)}
                        onError={(e) => { (e.target as HTMLImageElement).src = getPlaceholder(product.nombre); }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorito(product.id!, product.nombre)}
                        className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all z-10"
                      >
                        <Heart className={`w-4 h-4 transition-all ${favoritos.has(product.id!) ? "text-red-500 fill-red-500 scale-110" : "text-gray-400"}`} />
                      </motion.button>
                      <span className={`absolute top-3 right-3 px-3 py-1 text-[11px] font-semibold rounded-full backdrop-blur-sm ${
                        product.disponible ? "bg-green-100/90 text-green-700" : "bg-red-100/90 text-red-700"
                      }`}>
                        {product.disponible ? "Disponible" : "Agotado"}
                      </span>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#ffd93d]/20 text-[#b8860b] font-medium">
                              {product.categoriaNombre}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-[#2d2d2d] truncate">{product.nombre}</h3>
                        </div>
                        <span className="font-bold text-lg text-[#ff6b9d] whitespace-nowrap">S/.{Number(product.precio).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{product.descripcion}</p>
                      {product.disponible ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => { addToCart({ id: product.id!, name: product.nombre, price: product.precio, image: product.imagenUrl || getPlaceholder(product.nombre), description: product.descripcion || "" }); toast.success(`${product.nombre} agregado al carrito`); }}
                          className="w-full py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-[#ff6b9d]/25 transition-all flex items-center justify-center gap-2 group/btn"
                        >
                          <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                          Agregar al pedido
                        </motion.button>
                      ) : (
                        <button className="w-full py-3 bg-gray-50 text-gray-400 font-medium text-sm rounded-xl cursor-not-allowed border border-gray-100" disabled>
                          Producto agotado
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </section>

        {bestSellers.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="space-y-6 pt-16 mt-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2d2d2d]">Más Vendidos</h2>
              <p className="text-sm text-gray-400 mt-1">Los favoritos de nuestra comunidad en Ica</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bestSellers.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#ffd93d]/40 transition-all duration-300"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-inner">
                    <img alt={item.nombre} className="w-full h-full object-cover" src={item.imagenUrl || getPlaceholder(item.nombre)} onError={(e) => { (e.target as HTMLImageElement).src = getPlaceholder(item.nombre); }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-0.5 mb-1">
                      {[...Array(5)].map((_, si) => (
                        <svg key={si} className="w-3 h-3 text-[#ffd93d]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                    <h4 className="font-semibold text-sm text-[#2d2d2d] truncate">{item.nombre}</h4>
                    <p className="text-[#ff6b9d] font-bold text-sm mt-0.5">S/.{Number(item.precio).toFixed(2)}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => { addToCart({ id: item.id!, name: item.nombre, price: item.precio, image: item.imagenUrl || getPlaceholder(item.nombre), description: item.descripcion || "" }); toast.success(`${item.nombre} agregado al carrito`); }}
                    className="px-4 py-2 bg-[#ff6b9d]/10 text-[#ff6b9d] font-medium text-xs rounded-lg hover:bg-[#ff6b9d] hover:text-white transition-all whitespace-nowrap active:scale-95"
                  >
                    + Agregar
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>
      <Footer />
    </div>
  );
}
