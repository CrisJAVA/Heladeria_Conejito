import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { obtenerDashboardStats, type DashboardStatsDTO } from "../services/admin";

const ESTADO_LABEL: Record<string, { label: string; className: string }> = {
  PENDIENTE: { label: "Pendiente", className: "bg-gray-100 text-gray-600" },
  CONFIRMADO: { label: "Confirmado", className: "bg-blue-100 text-blue-800" },
  PREPARANDO: { label: "En preparación", className: "bg-amber-100 text-amber-800" },
  EN_CAMINO: { label: "En camino", className: "bg-blue-100 text-blue-800" },
  ENTREGADO: { label: "Entregado", className: "bg-green-100 text-green-800" },
  CANCELADO: { label: "Cancelado", className: "bg-red-100 text-red-700" },
};

function tiempoDesde(fechaIso: string) {
  const minutos = Math.max(1, Math.floor((Date.now() - new Date(fechaIso).getTime()) / 60000));
  if (minutos < 60) return `${minutos} min`;
  const horas = Math.floor(minutos / 60);
  return `${horas} h`;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStatsDTO | null>(null);

  useEffect(() => {
    obtenerDashboardStats()
      .then(setStats)
      .catch(() => toast.error("Error al cargar el dashboard"));
  }, []);

  const maxCantidad = stats?.productosMasVendidos?.[0]?.cantidadVendida || 1;
  const barColors = ["bg-orange-300", "bg-orange-400", "bg-pink-400", "bg-purple-400", "bg-blue-400"];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-[Inter]">
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
      <aside className="w-64 bg-white border-r border-[#e1e3e4] flex flex-col fixed inset-y-0 left-0 z-50 py-6 px-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>icecream</span>
          </div>
          <div>
            <h1 className="text-[24px] leading-[32px] font-bold text-[#191c1d]">Admin Panel</h1>
            <p className="text-xs text-[#564245]">Heladería Ica</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 mt-10 px-2">
          <button
            onClick={() => navigate("/admin")}
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#ff7e9d] text-[#761235] font-bold rounded-xl shadow-sm text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/productos")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">icecream</span>
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

        <div className="mt-auto border-t border-[#e1e3e4] pt-4 px-2">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6]/10 transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center space-x-3 bg-white p-1 pr-4 rounded-full shadow-md">
              <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center font-bold text-white">
                A
              </div>
              <div className="text-sm">
                <p className="font-bold text-gray-800 leading-none">Admin</p>
                <p className="text-gray-400 text-xs mt-1">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h3>
          <p className="text-gray-500">Bienvenido al panel de administración</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-pink-200/20 rounded-2xl flex items-center justify-center text-[#a43756] text-xl font-black">
                $
              </div>
              <div className="flex items-center text-green-500 text-sm font-semibold">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                +12.5%
              </div>
            </div>
            <p className="text-3xl font-black text-gray-800">S/ {(stats?.ventasHoy ?? 0).toFixed(2)}</p>
            <p className="text-gray-400 text-sm mt-1">Ventas Hoy</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex items-center text-green-500 text-sm font-semibold">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                +5
              </div>
            </div>
            <p className="text-3xl font-black text-gray-800">{stats?.pedidosActivos ?? 0}</p>
            <p className="text-gray-400 text-sm mt-1">Pedidos Activos</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.354a4 4 0 110 5.292M15.21 17.166M8.79 17.166M11.369 11.37a4 4 0 11.453-.454M15.823 15.123a6 6 0 010 3.123M8.177 15.123a6 6 0 000 3.123" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex items-center text-green-500 text-sm font-semibold">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                +8.2%
              </div>
            </div>
            <p className="text-3xl font-black text-gray-800">{stats?.clientesNuevosHoy ?? 0}</p>
            <p className="text-gray-400 text-sm mt-1">Clientes Nuevos</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex items-center text-green-500 text-sm font-semibold">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                0.2
              </div>
            </div>
            <p className="text-3xl font-black text-gray-800">4.9</p>
            <p className="text-gray-400 text-sm mt-1">Calificación</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold text-gray-800">Pedidos Recientes</h4>
              <a className="text-[#a43756] font-bold text-sm hover:underline" href="#">
                Ver todos
              </a>
            </div>
            <div className="space-y-4">
              {(stats?.pedidosRecientes ?? []).length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-6">Sin pedidos recientes</p>
              ) : (
                stats!.pedidosRecientes.map((pedido) => {
                  const estado = ESTADO_LABEL[pedido.estado] || ESTADO_LABEL.PENDIENTE;
                  const itemsTexto = pedido.detalles.map((d) => `${d.cantidad}x ${d.nombre}`).join(", ");
                  return (
                    <div key={pedido.id} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-bold text-gray-800">{pedido.codigoPedido}</div>
                        <div>
                          <p className="font-semibold text-gray-700">{pedido.usuarioNombre}</p>
                          <p className="text-xs text-gray-400">{itemsTexto}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-6">
                        <div>
                          <p className="font-black text-gray-900 text-[16px]">S/ {pedido.total.toFixed(2)}</p>
                          <p className="text-[10px] text-gray-400 flex items-center justify-end">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                            {tiempoDesde(pedido.createdAt)}
                          </p>
                        </div>
                        <span className={`px-3 py-1.5 ${estado.className} text-[11px] font-bold rounded-lg uppercase`}>
                          {estado.label}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-md">
            <h4 className="text-xl font-bold text-gray-800 mb-8">Productos Populares</h4>
            <div className="space-y-8">
              {(stats?.productosMasVendidos ?? []).length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-6">Sin datos de ventas todavía</p>
              ) : (
                stats!.productosMasVendidos.map((producto, i) => (
                  <div key={producto.nombre}>
                    <div className="flex justify-between items-end mb-2">
                      <p className="font-bold text-gray-700">{producto.nombre}</p>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">{producto.cantidadVendida} vendidos</span>
                        <span className="text-[#a43756] font-black text-sm">S/ {producto.totalVendido.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`${barColors[i % barColors.length]} h-full rounded-full`}
                        style={{ width: `${Math.max(10, (producto.cantidadVendida / maxCantidad) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[40px] shadow-md">
            <h4 className="text-xl font-bold text-gray-800 mb-6">Ventas de la Semana</h4>
            <div className="bg-pink-50/30 rounded-3xl h-64 flex flex-col items-center justify-center text-gray-400 border border-pink-50">
              <svg className="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <p className="font-medium">Gráfico de ventas</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-md">
            <h4 className="text-xl font-bold text-gray-800 mb-8">Distribución de Productos</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500 text-xl">
                    🍦
                  </div>
                  <div>
                    <p className="font-bold text-gray-700">Helados</p>
                    <p className="text-xs text-gray-400">245 vendidos hoy</p>
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-800">65%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-500 text-xl">
                    🍕
                  </div>
                  <div>
                    <p className="font-bold text-gray-700">Pizzas</p>
                    <p className="text-xs text-gray-400">132 vendidos hoy</p>
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-800">35%</div>
              </div>
            </div>
            <div className="mt-8 flex h-4 rounded-full overflow-hidden">
              <div className="bg-pink-400 h-full" style={{ width: "65%" }} />
              <div className="bg-yellow-400 h-full" style={{ width: "35%" }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
