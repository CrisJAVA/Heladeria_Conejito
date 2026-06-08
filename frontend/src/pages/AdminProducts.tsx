import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXHe0CQeH7xC1FtsNGyeWskMMIWr9Bvlhs6ZEqf9gVu15_KQqZcq1geqOnOXlnOf6ehJx7S693bYN_cd-OkrSG66veMzSJ7mYD2fJni9NqMNCRK8Pxg9YPSKECDd5zhTTRe35p5uT4txpmYfsWJXHsE4SuvL1po7w3g4mTe4Jnre83Rhfxt452iry_NFWg3L3EnHBFvxpUraYos1GCLLKXewnSk8XdgJXhe88YQzmafJCdEtx_5G3jIS1hCS-jJ2EVkmGYaFO2kvg",
    alt: "Cono Triple Arcoíris",
    category: "Helados",
    name: "Cono Triple Arcoíris",
    price: "S/ 12.00",
    stock: 150,
    available: true,
  },
  {
    id: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2eDEFMtWkYzXjL1YAImRiVpUvCMLRfCYwRvj_Nuj-WYzrlRBHvMWJoF_mf5rWipMdpgAo5uFoZtJSGGJGLOMTn6Hevzz-jrJKIvuwJt8gd1RSru523wysSPIa9vKEWbtEFaca3XPKqyRz9nqZE-yhi2zyp0XluzCAFgOurhWNKBZ7TSHEWJwN0tbuc16bn7jV9qV4T3FuDz4f7Uh-sdfaGXM43OalBuyyZ3gkVM6C6zedavzJeH6WjJsLrBD2F5VR-D81jQmWnOA",
    alt: "Milkshake de Fresa",
    category: "Bebidas",
    name: "Milkshake de Fresa",
    price: "S/ 15.00",
    stock: 80,
    available: true,
  },
  {
    id: 3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc9K_nCvPjkARTltakG1u8NaqegsaTJED-NiLGWSlXtXdnUUWjNIzJGhdZ8FrZFmfpwcIbECLvYHKgxtQNLWzCSg2tsDJ6HlKJNozBkd3BSXEPzSEcAheQhPj8y_gWouaBaMSDT4jGf8cll2m6K7LZJAIddrg52FnXuzAc70ZCJ2HBOIFetLgKT32YJ2JxUrzXq2HfCsIKVO86YJs_IkedTmNue-rN2vZJ52bO3pmAAgyh8n4odQlhsUkcHC1yvYlR_eXFLQ0mAwE",
    alt: "Pizza Personal Margarita",
    category: "Pizzas",
    name: "Pizza Personal Margarita",
    price: "S/ 18.00",
    stock: 45,
    available: true,
  },
  {
    id: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAygXYxEP2j-EnB-YVwFCXRGnDgcbWysxtjJmh62F0sG56gH3-0145RSld0gtcQOMOl4i45ONQdHXv5XpV5-G488KY_mSvyRcHPmIojmTVK3gti6Xk3BOtgGWrGoeleR64Z-ZeLp2J846NUhhCNanGWhRp7EYyluoKQ_WaM2drUxX_F0Hfu7O1HDjoriPyw7xPQ4p06rMZjoDHzJhYWyWI9HFh5_wuX5nOQOfkeG9YjTkkvt3SgtkjnJ6ntgYt8vPAEsxwrin_YkJo",
    alt: "Combo Familiar",
    category: "Combos",
    name: "Combo Familiar",
    price: "S/ 45.00",
    stock: 30,
    available: true,
  },
  {
    id: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMoiEXyT19047IOuweL3jBt4jMV9Kyy9nOjX9bbzaO9jqCqP6pCdaQblckpLwy-DGG6BnTXCFpD1t5rk1ku186Bsiq7aUhECa9RKEfSu7wHt40b5mJliUPWUYW9ebSGA_p1kYsuShRMFxhHhIeD06C0vNzLIlatkWmMtoij9MfmlNoQjl3DyVzGwqgtewb_bJXrX2M-MQmntD8L-G63QLuSbzhzbWM7D86jZXNuZhkoGya8fv8HM50oXpX0V3565g4EALeixu4qQQ",
    alt: "Copa de Chocolate",
    category: "Helados",
    name: "Copa de Chocolate",
    price: "S/ 10.00",
    stock: 5,
    available: true,
    lowStock: true,
  },
  {
    id: 6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVgWMDLbZCLOxGO3mb78qXvL4P6X5mF4EvZdp15rc7yT4NeSealqZkaV8Woo8kGZH4Jf8DVH8_lkuNhnJeVc5mIKAODggN-GHgjSevfo_e_fx3o3QornoC4Rp34PipRipxb1izQgDQjqf4_McjwTmmvOsv5sMS0lTV-KEnt-hNU5OIv3E5x6XDGzScrfOSldZYRsuqQ38GTdYGmWdJsq9CdoVItn3M1YLUzE492EHjhEAEr8igtE5u9p6bXWXqOC5Bsdn4tN8N6pA",
    alt: "Pizza BBQ",
    category: "Pizzas",
    name: "Pizza BBQ",
    price: "S/ 22.00",
    stock: 0,
    available: false,
  },
];

const filters = ["Todos", "Helados", "Pizzas", "Bebidas", "Combos"];

export default function AdminProducts() {
  const navigate = useNavigate();

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
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>icecream</span>
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
            onClick={() => navigate("/admin/configuracion")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">settings</span>
            Configuración
          </button>
        </nav>

        <div className="pt-6 border-t border-[#e1e3e4]">
          <button
            onClick={() => navigate("/")}
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
            <button className="bg-[#ff7e9d] text-[#761235] hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-sm">
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
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-5 py-2.5 rounded-2xl text-[14px] transition-all ${
                    filter === "Todos"
                      ? "bg-[#ff7e9d] text-[#761235] font-bold"
                      : "text-[#564245] hover:bg-[#e7e8e9]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_30px_rgba(255,126,157,0.12)] transition-all duration-300 relative"
              >
                {!product.available && (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-10 flex items-center justify-center pointer-events-none">
                    <div className="bg-[#ba1a1a] text-white px-6 py-2 rounded-2xl font-bold uppercase tracking-widest rotate-[-12deg] shadow-xl border-4 border-white/30">
                      Agotado
                    </div>
                  </div>
                )}
                <div className="relative h-56 overflow-hidden">
                  <img
                    alt={product.alt}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${!product.available ? "grayscale-[40%]" : ""}`}
                    src={product.image}
                  />
                  <div
                    className={`absolute top-4 right-4 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg ${
                      !product.available
                        ? "bg-[#ba1a1a] text-white"
                        : product.lowStock
                          ? "bg-[#fdd73b] text-[#554500]"
                          : "bg-[#22c55e] text-white"
                    }`}
                  >
                    {!product.available ? "Agotado" : product.lowStock ? "Bajo stock" : "Disponible"}
                  </div>
                </div>
                <div className={`p-6 ${!product.available ? "opacity-60" : ""}`}>
                  <p className="text-[11px] font-bold text-[#a43756] tracking-widest uppercase mb-1">{product.category}</p>
                  <h3 className="text-[20px] leading-[28px] font-semibold text-[#191c1d] mb-4">{product.name}</h3>
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="text-[24px] font-bold text-[#a43756]">{product.price}</span>
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
                      className={`flex-1 bg-[#f3f4f5] text-[#191c1d] py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-[14px] ${
                        !product.available ? "cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      Ver
                    </button>
                    <button
                      className={`flex-1 bg-[#7cacd7]/20 text-[#30628a] hover:bg-[#7cacd7]/40 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-[14px] ${
                        !product.available ? "cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                      Editar
                    </button>
                    <button className="w-12 bg-[#ffdad6]/20 text-[#ba1a1a] hover:bg-[#ffdad6]/40 py-2.5 rounded-xl transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-between items-center bg-[#f3f4f5]/50 p-4 rounded-3xl border border-[#e1e3e4]">
            <p className="text-[14px] text-[#564245] pl-4">
              Mostrando <span className="font-bold text-[#191c1d]">6</span> de{" "}
              <span className="font-bold text-[#191c1d]">24</span> productos
            </p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-white border border-[#e1e3e4] flex items-center justify-center text-[#564245] hover:bg-[#a43756] hover:text-white transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-xl bg-[#a43756] text-white flex items-center justify-center font-bold">1</button>
              <button className="w-10 h-10 rounded-xl bg-white border border-[#e1e3e4] flex items-center justify-center text-[#564245] hover:bg-[#ff7e9d] transition-all">2</button>
              <button className="w-10 h-10 rounded-xl bg-white border border-[#e1e3e4] flex items-center justify-center text-[#564245] hover:bg-[#ff7e9d] transition-all">3</button>
              <button className="w-10 h-10 rounded-xl bg-white border border-[#e1e3e4] flex items-center justify-center text-[#564245] hover:bg-[#a43756] hover:text-white transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
