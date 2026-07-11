import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import ProductModal from "../app/components/ProductModal";
import { listarProductos, eliminarProducto, type ProductoDTO } from "../services/productos";
import { obtenerConfiguracion, type ConfiguracionDTO } from "../services/configuracion";

const filters = ["Todos", "Helados", "Pizzas", "Bebidas", "Combos"];

export default function AdminProducts() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [products, setProducts] = useState<ProductoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductoDTO | null>(null);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [config, setConfig] = useState<ConfiguracionDTO | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await listarProductos();
      setProducts(data);
    } catch {
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    obtenerConfiguracion()
      .then(setConfig)
      .catch(() => { });
  }, []);

  const filteredProducts = products.filter((p) => {
    if (filter !== "Todos" && p.categoriaNombre !== filter) return false;
    if (search && !p.nombre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#e1e3e4] bg-white flex flex-col py-6 px-4 z-50">
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center shadow-sm">
            {config?.logoUrl ? (
              <img src={config.logoUrl} className="w-full h-full object-cover" />) : (
              <span className="material-symbols-outlined">
                icecream
              </span>)}
          </div>
          <div>
            <h1 className="text-[24px] leading-[32px] font-bold text-[#191c1d]">Admin Panel</h1>
            <p className="text-[11px] font-medium text-[#564245] uppercase tracking-wider">Heladería Ica</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          <button
            onClick={() => navigate("/admin")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#ff7e9d] text-[#761235] font-bold rounded-xl shadow-sm text-[14px] leading-[20px]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>icecream</span>
            Productos
          </button>
          <button
            onClick={() => navigate("/admin/pedidos")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            Pedidos
          </button>
          <button
            onClick={() => navigate("/admin/clientes")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">group</span>
            Clientes
          </button>
          <button
            onClick={() => navigate("/admin/media")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">photo_library</span>
            Multimedia
          </button>
          <button
            onClick={() => navigate("/admin/landing")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">web</span>
            Landing Page
          </button>
          <button
            onClick={() => navigate("/admin/configuracion")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">settings</span>
            Configuración
          </button>
        </nav>

        <div className="pt-6 border-t border-[#e1e3e4]">
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6]/10 transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="ml-64 min-h-screen w-[calc(100%-16rem)]">
        <header className="sticky top-0 h-16 flex justify-between items-center px-8 z-40 bg-[#f8f9fa]/80 backdrop-blur-md border-b border-[#e1e3e4]">
          <div className="flex items-center gap-4">
            <span className="text-[#564245] font-medium text-[14px]">Productos</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:bg-[#f3f4f5] rounded-full p-2 transition-all text-[#564245]">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-[#e1e3e4]">
              <div className="text-right hidden sm:block">
                <p className="text-[14px] leading-[20px] font-bold text-[#191c1d]">Admin</p>
                <p className="text-[10px] text-[#564245] uppercase tracking-tighter">Administrador</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ffe173] flex items-center justify-center text-[#221b00] font-bold text-lg">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 pb-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-[30px] leading-[36px] font-bold text-[#191c1d] mb-1">Productos</h2>
              <p className="text-[14px] leading-[20px] text-[#564245]">Gestiona tu catálogo de productos, stock y precios.</p>
            </div>
            <button
              onClick={() => { setEditingProduct(null); setModalOpen(true); }}
              className="bg-[#ff7e9d] text-[#761235] hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-sm"
            >
              <span className="material-symbols-outlined">add</span>
              Nuevo Producto
            </button>
          </div>

          <div className="bg-white p-5 rounded-3xl mb-8 flex flex-col lg:flex-row gap-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
            <div className="relative flex-1 group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#564245] group-focus-within:text-[#a43756] transition-colors">search</span>
              <input
                className="w-full bg-[#f3f4f5] border-none rounded-2xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-[#ff7e9d] focus:bg-white transition-all text-[14px] outline-none"
                placeholder="Buscar productos..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2.5 rounded-2xl text-[14px] transition-all ${filter === f
                    ? "bg-[#ff7e9d] text-[#761235] font-bold"
                    : "text-[#564245] hover:bg-[#e7e8e9]"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <span className="w-8 h-8 border-4 border-[#ff7e9d] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-[#dcc0c4] mb-4">icecream</span>
              <p className="text-[#564245] text-lg font-medium">No se encontraron productos</p>
              <p className="text-[#897175] text-sm mt-1">Agrega tu primer producto usando el botón "Nuevo Producto"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_30px_rgba(255,126,157,0.12)] transition-all duration-300 relative"
                >
                  {!product.disponible && (
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-10 flex items-center justify-center pointer-events-none">
                      <div className="bg-[#ba1a1a] text-white px-6 py-2 rounded-2xl font-bold uppercase tracking-widest rotate-[-12deg] shadow-xl border-4 border-white/30">
                        Agotado
                      </div>
                    </div>
                  )}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      alt={product.nombre}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${!product.disponible ? "grayscale-[40%]" : ""}`}
                      src={product.imagenUrl || "https://placehold.co/400x300?text=Sin+imagen"}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Sin+imagen";
                      }}
                    />
                    <div
                      className={`absolute top-4 right-4 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg ${!product.disponible
                        ? "bg-[#ba1a1a] text-white"
                        : product.stock <= 5
                          ? "bg-[#fdd73b] text-[#554500]"
                          : "bg-[#22c55e] text-white"
                        }`}
                    >
                      {!product.disponible ? "Agotado" : product.stock <= 5 ? "Bajo stock" : "Disponible"}
                    </div>
                  </div>
                  <div className={`p-6 ${!product.disponible ? "opacity-60" : ""}`}>
                    <p className="text-[11px] font-bold text-[#a43756] tracking-widest uppercase mb-1">{product.categoriaNombre}</p>
                    <h3 className="text-[20px] leading-[28px] font-semibold text-[#191c1d] mb-4">{product.nombre}</h3>
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <span className="text-[24px] font-bold text-[#a43756]">S/{Number(product.precio).toFixed(2)}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#564245] uppercase font-bold">Stock</p>
                        <p className={`font-bold text-[#191c1d] ${product.stock === 0 ? "text-[#ba1a1a]" : ""}`}>
                          {product.stock} unid.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        disabled
                        className="flex-1 bg-[#f3f4f5] text-[#191c1d] py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium text-[14px] opacity-50"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        Ver
                      </button>
                      <button
                        onClick={() => { setEditingProduct(product); setModalOpen(true); }}
                        className="flex-1 bg-[#7cacd7]/20 text-[#30628a] py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium text-[14px] hover:bg-[#7cacd7]/40 transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        Editar
                      </button>
                      <button
                        onClick={async () => {
                          if (!window.confirm(`¿Eliminar "${product.nombre}"?`)) return;
                          try {
                            await eliminarProducto(product.id!);
                            toast.success("Producto eliminado");
                            loadProducts();
                          } catch {
                            toast.error("Error al eliminar producto");
                          }
                        }}
                        className="w-12 bg-[#ffdad6]/20 text-[#ba1a1a] py-2.5 rounded-xl flex items-center justify-center hover:bg-[#ffdad6]/60 transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-between items-center bg-[#f3f4f5]/50 p-4 rounded-3xl border border-[#e1e3e4]">
            <p className="text-[14px] text-[#564245] pl-4">
              Mostrando <span className="font-bold text-[#191c1d]">{filteredProducts.length}</span> producto{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </main>

      <ProductModal
        open={modalOpen}
        onOpenChange={(open) => { setModalOpen(open); if (!open) setEditingProduct(null); }}
        onSuccess={() => {
          toast.success(editingProduct ? "Producto actualizado correctamente" : "Producto creado correctamente");
          setEditingProduct(null);
          loadProducts();
        }}
        product={editingProduct}
      />
    </div>
  );
}
