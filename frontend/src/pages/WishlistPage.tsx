import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ArrowLeft, ShoppingBag, Trash2, IceCream } from "lucide-react";
import { toast } from "sonner";
import { listarFavoritos, quitarFavorito as eliminarFavorito, type FavoritoDTO } from "../services/favoritos";
import { useCart } from "../context/CartContext";
import Footer from "../app/components/Footer";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [items, setItems] = useState<FavoritoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listarFavoritos();
      setItems(data);
    } catch {
      setError("Error al cargar favoritos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleRemove = async (productoId: number, name: string) => {
    try {
      await eliminarFavorito(productoId);
      setItems((prev) => prev.filter((i) => i.productoId !== productoId));
      toast.success(`${name} eliminado de favoritos`);
    } catch {
      toast.error("Error al eliminar de favoritos");
    }
  };

  const handleAddToCart = (item: FavoritoDTO) => {
    addToCart({
      id: item.productoId,
      name: item.productoNombre,
      price: item.productoPrecio,
      image: item.productoImagenUrl || "",
      description: item.productoDescripcion || "",
    });
    toast.success(`${item.productoNombre} agregado al carrito`);
  };

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-5xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-[#2d2d2d]">Mis Favoritos</h1>
            <Heart className="w-5 h-5 text-[#ff6b9d]" fill="#ff6b9d" />
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-8 max-w-5xl mx-auto w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#ff6b9d] border-t-transparent rounded-full animate-spin mb-4" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button onClick={load} className="mt-4 text-[#ff6b9d] font-medium hover:underline">Reintentar</button>
          </div>
        ) : items.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-[#ff6b9d]/5 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-[#ff6b9d]/40" />
            </div>
            <h2 className="text-xl font-bold text-[#2d2d2d] mb-2">No tienes favoritos</h2>
            <p className="text-gray-500 mb-6">Guarda tus productos favoritos para encontrarlos rápido</p>
            <button onClick={() => navigate("/menu")} className="inline-flex px-8 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all">
              Explorar menú
            </button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <motion.div key={item.productoId} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                  <div className="h-44 overflow-hidden relative">
                    <img alt={item.productoNombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.productoImagenUrl || `https://placehold.co/400x300/ff6b9d/ffffff?text=${encodeURIComponent(item.productoNombre)}`} />
                    <button onClick={() => handleRemove(item.productoId, item.productoNombre)} className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full bg-[#ffd93d] text-[#2d2d2d]">{item.productoCategoria}</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-[#2d2d2d]">{item.productoNombre}</h3>
                      <span className="font-bold text-lg text-[#ff6b9d]">S/.{Number(item.productoPrecio).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.productoDescripcion}</p>
                    <button onClick={() => handleAddToCart(item)} className="w-full py-2.5 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-medium text-sm rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                      <ShoppingBag className="w-4 h-4" /> Agregar al carrito
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>
      <Footer />
    </div>
  );
}
