import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import { useCart } from "../context/CartContext";
import { listarProductos, type ProductoDTO } from "../services/productos";

export default function MenuPage() {
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const [products, setProducts] = useState<ProductoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Helados");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(60);

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
  }, []);

  const categories = [...new Set(products.map((p) => p.categoriaNombre).filter(Boolean))] as string[];
  const allCategories = ["Todas", ...categories];

  const filteredProducts = products.filter((p) => {
    const matchCategory = filterCategory === "Todas" || p.categoriaNombre === filterCategory;
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPrice = p.precio <= maxPrice;
    return matchCategory && matchSearch && matchPrice;
  });

  const bestSellers = products.filter((p) => p.destacado);

  const getPlaceholder = (nombre: string) =>
    `https://placehold.co/400x300/ff6b9d/ffffff?text=${encodeURIComponent(nombre)}`;

  return (
    <div className="min-h-screen bg-[#fffbf7]">
      <Navbar />

      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto space-y-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#2d2d2d]">Categorías</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all ${
                  selectedCategory === cat
                    ? "bg-[#ff6b9d] text-white shadow-md scale-105"
                    : "bg-white text-[#6b7280] border border-gray-200 hover:border-[#ff6b9d]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl h-52 flex items-center bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] shadow-lg">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white" />
          </div>
          <div className="relative z-10 px-8 md:px-12 max-w-lg space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Disfruta tus sabores favoritos sin esperas
            </h2>
            <p className="text-white/80 text-sm">Pide online y recoge en tienda o recibe a domicilio</p>
            <button
              onClick={() => navigate("/menu")}
              className="px-6 py-2.5 bg-white text-[#ff6b9d] font-semibold text-sm rounded-full shadow-lg hover:shadow-xl transition-shadow active:scale-95"
            >
              Ordenar ahora
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#2d2d2d]">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-medium text-[#6b7280] tracking-wide">Categoría</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] focus:border-[#ff6b9d] outline-none transition-all"
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-medium text-[#6b7280] tracking-wide">Precio máximo: S/.{maxPrice}</label>
              <input
                type="range"
                min="0"
                max="60"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#ff6b9d" }}
              />
              <div className="flex justify-between text-xs text-[#6b7280]">
                <span>S/.0</span>
                <span>S/.60</span>
              </div>
            </div>

            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-medium text-[#6b7280] tracking-wide">Buscar</label>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] focus:border-[#ff6b9d] outline-none transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <button
                onClick={() => { setFilterCategory("Todas"); setSearchTerm(""); setMaxPrice(60); }}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-medium text-sm rounded-xl hover:shadow-lg transition-all active:scale-95"
              >
                Filtrar
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#2d2d2d]">Todos los Productos</h2>
            {!loading && (
              <span className="text-sm text-[#6b7280]">{filteredProducts.length} productos</span>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#6b7280]">
              <div className="w-10 h-10 border-4 border-[#ff6b9d] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-lg font-medium">Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-lg text-red-500">{error}</p>
              <button onClick={loadProducts} className="mt-4 text-[#ff6b9d] font-medium hover:underline">
                Reintentar
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-[#6b7280]">
              <p className="text-lg">No hay productos disponibles.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-[#6b7280]">
              <p className="text-lg">No encontramos productos con esos filtros</p>
              <button
                onClick={() => { setFilterCategory("Todas"); setSearchTerm(""); setMaxPrice(60); }}
                className="mt-4 text-[#ff6b9d] font-medium hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#ff6b9d]/20 transition-all group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      alt={product.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={product.imagenUrl || getPlaceholder(product.nombre)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getPlaceholder(product.nombre);
                      }}
                    />
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${
                        product.disponible
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.disponible ? "Disponible" : "Agotado"}
                    </span>
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full bg-[#ffd93d] text-[#2d2d2d]">
                      {product.categoriaNombre}
                    </span>
                  </div>
                  <div className={`p-5 space-y-3 ${!product.disponible && "opacity-70"}`}>
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-[#2d2d2d]">{product.nombre}</h3>
                      <span className="font-bold text-lg text-[#ff6b9d]">S/.{Number(product.precio).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-[#6b7280] line-clamp-2">{product.descripcion}</p>
                    {product.disponible ? (
                      <button
                        onClick={() => { addToCart({ id: product.id!, name: product.nombre, price: product.precio, image: product.imagenUrl || getPlaceholder(product.nombre), description: product.descripcion || "" }); toast.success(`${product.nombre} agregado al carrito`); }}
                        className="w-full py-2.5 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-medium text-sm rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        Agregar
                      </button>
                    ) : (
                      <button className="w-full py-2.5 bg-gray-100 text-[#6b7280] font-medium text-sm rounded-xl cursor-not-allowed" disabled>
                        No disponible
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {bestSellers.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#2d2d2d]">Más Vendidos</h2>
                <p className="text-sm text-[#6b7280]">Los favoritos de nuestra comunidad en Ica</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestSellers.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:border-[#ffd93d] transition-colors"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      alt={item.nombre}
                      className="w-full h-full object-cover"
                      src={item.imagenUrl || getPlaceholder(item.nombre)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getPlaceholder(item.nombre);
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-[#ffd93d]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <h4 className="font-semibold text-sm text-[#2d2d2d] truncate">{item.nombre}</h4>
                    <p className="text-[#ff6b9d] font-bold text-sm mt-0.5">S/.{Number(item.precio).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => { addToCart({ id: item.id!, name: item.nombre, price: item.precio, image: item.imagenUrl || getPlaceholder(item.nombre), description: item.descripcion || "" }); toast.success(`${item.nombre} agregado al carrito`); }}
                    className="px-3 py-1.5 bg-[#ff6b9d]/10 text-[#ff6b9d] font-medium text-xs rounded-lg hover:bg-[#ff6b9d] hover:text-white transition-all whitespace-nowrap"
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
