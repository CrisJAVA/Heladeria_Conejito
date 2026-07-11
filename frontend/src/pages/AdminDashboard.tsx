import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { obtenerReporte, type ReporteVentas } from "../services/reportes";
import { listarPedidos, actualizarEstadoPedido, type PedidoResponse } from "../services/pedidos";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { obtenerConfiguracion, type ConfiguracionDTO } from "../services/configuracion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["#ff6b9d", "#ffd93d", "#7cacd7", "#22c55e", "#a43756"];

const estadoColors: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-700",
  "EN PREPARACION": "bg-[#ffe173] text-[#554500]",
  LISTO: "bg-green-100 text-green-700",
  ENTREGADO: "bg-[#cde5ff] text-[#004064]",
  CANCELADO: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [reporte, setReporte] = useState<ReporteVentas | null>(null);
  const [pedidos, setPedidos] = useState<PedidoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<ConfiguracionDTO | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [r, p] = await Promise.all([obtenerReporte(), listarPedidos()]);
      setReporte(r);
      setPedidos(p);
    } catch {
      toast.error("Error al cargar datos del dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    obtenerConfiguracion()
      .then(setConfig)
      .catch(() => { });
  }, []);

  const ventasPeriodo = reporte?.ventasPorPeriodo
    ? Object.entries(reporte.ventasPorPeriodo).map(([fecha, total]) => ({ fecha, total }))
    : [];

  const pedidosEstado = reporte?.pedidosPorEstado
    ? Object.entries(reporte.pedidosPorEstado).map(([estado, cantidad]) => ({ estado, cantidad }))
    : [];

  const productosTop = reporte?.productosMasVendidos?.slice(0, 5) || [];

  const handleEstado = async (id: number, estado: string) => {
    try {
      await actualizarEstadoPedido(id, estado);
      toast.success(`Pedido #${id} actualizado a ${estado}`);
      loadData();
    } catch {
      toast.error("Error al actualizar estado");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-[Inter]">
      <aside className="w-64 bg-white border-r border-[#e1e3e4] flex flex-col fixed inset-y-0 left-0 z-50 py-6 px-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center shadow-sm">
            {config?.logoUrl ? (
              <img src={config.logoUrl} className="w-full h-full object-cover" />) : (
              <span className="material-symbols-outlined">
                icecream
              </span>)}
          </div>
          <div><h1 className="text-[24px] leading-[32px] font-bold text-[#191c1d]">Admin</h1><p className="text-xs text-[#564245]">Heladería Ica</p></div>
        </div>
        <nav className="flex-1 space-y-2 mt-10 px-2">
          <button onClick={() => navigate("/admin")} className="w-full flex items-center gap-3 px-4 py-3 bg-[#ff7e9d] text-[#761235] font-bold rounded-xl shadow-sm text-[14px]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span> Dashboard
          </button>
          <button onClick={() => navigate("/admin/productos")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] rounded-xl text-[14px]">
            <span className="material-symbols-outlined">icecream</span> Productos
          </button>
          <button onClick={() => navigate("/admin/pedidos")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] rounded-xl text-[14px]">
            <span className="material-symbols-outlined">shopping_cart</span> Pedidos
          </button>
          <button onClick={() => navigate("/admin/clientes")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] rounded-xl text-[14px]">
            <span className="material-symbols-outlined">group</span> Clientes
          </button>
          <button onClick={() => navigate("/admin/media")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] rounded-xl text-[14px]">
            <span className="material-symbols-outlined">photo_library</span> Multimedia
          </button>
          <button onClick={() => navigate("/admin/landing")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] rounded-xl text-[14px]">
            <span className="material-symbols-outlined">web</span> Landing Page
          </button>
          <button onClick={() => navigate("/admin/configuracion")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] rounded-xl text-[14px]">
            <span className="material-symbols-outlined">settings</span> Configuración
          </button>
        </nav>
        <div className="mt-auto border-t border-[#e1e3e4] pt-4 px-2">
          <button onClick={() => { logout(); navigate("/"); }} className="w-full flex items-center gap-3 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6]/10 rounded-xl text-[14px]">
            <span className="material-symbols-outlined">logout</span> Salir
          </button>
        </div>
      </aside>

      <style>{`.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }`}</style>

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-500">Panel de control en tiempo real</p>
          </motion.div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={loadData} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-all">
            <span className="material-symbols-outlined text-[18px]">refresh</span> Actualizar
          </motion.button>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-10 h-10 border-4 border-[#ff6b9d] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-3xl shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-pink-200/20 rounded-2xl flex items-center justify-center text-[#a43756] text-xl font-black">S/</div>
                  <div className="flex items-center text-green-500 text-sm font-semibold">+{reporte?.ventasHoy ? ((reporte.ventasHoy / (reporte.ventasTotales || 1)) * 100).toFixed(1) : "0"}%</div>
                </div>
                <p className="text-3xl font-black text-gray-800">S/ {Number(reporte?.ventasHoy || 0).toFixed(2)}</p>
                <p className="text-gray-400 text-sm mt-1">Ventas Hoy</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </div>
                </div>
                <p className="text-3xl font-black text-gray-800">{reporte?.pedidosHoy || 0}</p>
                <p className="text-gray-400 text-sm mt-1">Pedidos Hoy</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15.21 17.166M8.79 17.166M11.369 11.37a4 4 0 11.453-.454M15.823 15.123a6 6 0 010 3.123M8.177 15.123a6 6 0 000 3.123" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </div>
                </div>
                <p className="text-3xl font-black text-gray-800">{reporte?.totalPedidos || 0}</p>
                <p className="text-gray-400 text-sm mt-1">Total Pedidos</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-500">
                    <span className="text-2xl">&#11088;</span>
                  </div>
                </div>
                <p className="text-3xl font-black text-gray-800">S/ {Number(reporte?.ventasTotales || 0).toFixed(2)}</p>
                <p className="text-gray-400 text-sm mt-1">Ventas Totales</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-bold text-gray-800">Ventas por Período</h4>
                </div>
                {ventasPeriodo.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ventasPeriodo}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="total" fill="#ff6b9d" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">Sin datos de ventas</div>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white p-8 rounded-[40px] shadow-md">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Estado de Pedidos</h4>
                {pedidosEstado.length > 0 ? (
                  <div className="flex items-center gap-8">
                    <div className="relative shrink-0" style={{ width: 240, height: 240 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pedidosEstado}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            dataKey="cantidad"
                            nameKey="estado"
                          >
                            {pedidosEstado.map((_, idx) => (
                              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => [`${value} pedidos`, "Cantidad"]} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                          <p className="text-3xl font-black text-gray-800">{pedidosEstado.reduce((s, e) => s + e.cantidad, 0)}</p>
                          <p className="text-sm text-gray-400 -mt-1">Total</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      {pedidosEstado.map((e, i) => (
                        <div key={e.estado} className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                          <span className="flex-1 text-sm font-medium text-gray-700">{e.estado.replace(/_/g, " ")}</span>
                          <span className="text-sm font-bold text-gray-900">{e.cantidad}</span>
                          <span className="text-xs text-gray-400">({((e.cantidad / pedidosEstado.reduce((s, x) => s + x.cantidad, 0)) * 100).toFixed(0)}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">Sin pedidos</div>
                )}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-bold text-gray-800">Pedidos Recientes</h4>
                  <button onClick={() => navigate("/admin/pedidos")} className="text-[#a43756] font-bold text-sm hover:underline">Ver todos</button>
                </div>
                <div className="space-y-4">
                  {pedidos.slice(0, 5).map((pedido) => (
                    <div key={pedido.id} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-bold text-gray-800">#{pedido.codigoPedido}</div>
                        <div>
                          <p className="font-semibold text-gray-700">{pedido.usuarioNombre}</p>
                          <p className="text-xs text-gray-400">{pedido.detalles?.slice(0, 2).map((d) => `${d.cantidad}x ${d.nombre}`).join(", ")}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-6">
                        <div>
                          <p className="font-black text-gray-900">S/ {pedido.total.toFixed(2)}</p>
                          <p className="text-[10px] text-gray-400">{new Date(pedido.createdAt).toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}</p>
                        </div>
                        <span className={`px-3 py-1.5 text-[11px] font-bold rounded-lg uppercase ${estadoColors[pedido.estado] || "bg-gray-100 text-gray-600"}`}>{pedido.estado}</span>
                      </div>
                    </div>
                  ))}
                  {pedidos.length === 0 && <p className="text-center text-gray-400 py-10">No hay pedidos recientes</p>}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white p-8 rounded-[40px] shadow-md">
                <h4 className="text-xl font-bold text-gray-800 mb-8">Productos Más Vendidos</h4>
                <div className="space-y-6">
                  {productosTop.map((p, i) => (
                    <div key={p.id}>
                      <div className="flex justify-between items-end mb-2">
                        <p className="font-bold text-gray-700 text-sm">{p.nombre}</p>
                        <div className="text-right">
                          <span className="text-xs text-gray-400 block">{p.cantidadVendida} vendidos</span>
                          <span className="text-[#a43756] font-black text-sm">S/ {p.totalIngresos.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] h-full rounded-full" style={{ width: `${Math.min(100, (p.cantidadVendida / (productosTop[0]?.cantidadVendida || 1)) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                  {productosTop.length === 0 && <p className="text-center text-gray-400 py-10">Sin datos de ventas</p>}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
