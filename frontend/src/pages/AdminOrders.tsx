import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { listarPedidos, actualizarEstadoPedido, type PedidoResponse } from "../services/pedidos";
import { obtenerConfiguracion, type ConfiguracionDTO } from "../services/configuracion";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const WS_URL = API_BASE.replace(/^http/, "ws").replace(/\/api\/?$/, "") + "/ws/pedidos";

const estadoColors: Record<string, string> = {
  PENDIENTE: "bg-[#e7e8e9] text-[#564245]",
  "EN PREPARACION": "bg-[#ffe173] text-[#554500]",
  LISTO: "bg-green-100 text-green-700",
  ENTREGADO: "bg-[#cde5ff] text-[#004064]",
  CANCELADO: "bg-red-100 text-red-700",
};

const filters = ["Todos", "PENDIENTE", "EN PREPARACION", "LISTO", "ENTREGADO", "CANCELADO"];

export default function AdminOrders() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [pedidos, setPedidos] = useState<PedidoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [config, setConfig] = useState<ConfiguracionDTO | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const mountedRef = useRef(true);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const loadPedidos = async () => {
    try {
      const data = await listarPedidos();
      setPedidos(data);
    } catch {
      toast.error("Error al cargar pedidos");
    } finally {
      setLoading(false);
    }
  };

  const connectWS = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;
    try {
      const ws = new WebSocket(WS_URL);
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.tipo === "NUEVO_PEDIDO" || data.tipo === "ESTADO_ACTUALIZADO") {
            loadPedidos();
            toast.info(data.mensaje || "Actualización de pedido");
          }
        } catch { /* ignore */ }
      };
      ws.onclose = () => {
        if (mountedRef.current) {
          reconnectTimeoutRef.current = setTimeout(connectWS, 3000);
        }
      };
      wsRef.current = ws;
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    loadPedidos();
    connectWS();
    obtenerConfiguracion()
      .then((data) => {
        setConfig(data);
      })
      .catch(() => {
        console.log("No se pudo cargar logo");
      });
    return () => {
      mountedRef.current = false;
      clearTimeout(reconnectTimeoutRef.current);
      wsRef.current?.close();
    };
  }, [connectWS]);

  const handleEstado = async (id: number, estado: string) => {
    try {
      await actualizarEstadoPedido(id, estado);
      toast.success(`Pedido #${id} actualizado a ${estado}`);
      loadPedidos();
    } catch {
      toast.error("Error al actualizar estado");
    }
  };

  const filteredPedidos = pedidos.filter((p) => {
    if (filter !== "Todos" && p.estado !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      const codigo = p.codigoPedido?.toLowerCase() ?? "";
      const cliente = p.usuarioNombre?.toLowerCase() ?? "";
      return codigo.includes(q) || cliente.includes(q);
    }
    return true;
  });

  const counts = {
    activos: pedidos.filter((p) => p.estado !== "ENTREGADO" && p.estado !== "CANCELADO").length,
    preparacion: pedidos.filter((p) => p.estado === "EN PREPARACION").length,
    listos: pedidos.filter((p) => p.estado === "LISTO").length,
    completados: pedidos.filter((p) => p.estado === "ENTREGADO").length,
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-weight: normal; font-style: normal; font-size: 24px; line-height: 1;
          letter-spacing: normal; text-transform: none; display: inline-block;
          white-space: nowrap; word-wrap: normal; direction: ltr;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#e1e3e4] bg-white flex flex-col py-6 px-4 z-50">
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center shadow-sm overflow-hidden">
            {config?.logoUrl ? ( <img src={config.logoUrl} alt={config.nombreNegocio || "Logo"} className="w-full h-full object-cover" /> ) : (
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }} >
                icecream
              </span>
            )}
          </div>
          <div><h1 className="text-[24px] leading-[32px] font-bold text-[#191c1d]">Admin Panel</h1><p className="text-[11px] font-medium text-[#564245] uppercase tracking-wider">Heladería Ica</p></div>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => navigate("/admin")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] rounded-xl text-[14px]">
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </button>
          <button onClick={() => navigate("/admin/productos")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] rounded-xl text-[14px]">
            <span className="material-symbols-outlined">icecream</span> Productos
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#ff7e9d] text-[#761235] font-bold rounded-xl shadow-sm text-[14px]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span> Pedidos
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
        <div className="mt-auto border-t border-[#e1e3e4] pt-4">
          <button onClick={() => { logout(); navigate("/"); }} className="w-full flex items-center gap-3 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6]/10 rounded-xl text-[14px]">
            <span className="material-symbols-outlined">logout</span> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="ml-64 w-[calc(100%-16rem)] min-h-screen">
        <header className="sticky top-0 h-16 flex justify-between items-center px-8 z-40 bg-[#f8f9fa]/80 backdrop-blur-md border-b border-[#e1e3e4]">
          <div className="flex items-center gap-2">
            <span className="text-[14px] text-[#564245]">Admin /</span>
            <span className="text-[14px] text-[#a43756] font-bold">Pedidos</span>
          </div>
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={loadPedidos} className="p-2 hover:bg-[#f3f4f5] rounded-full transition-all">
              <span className="material-symbols-outlined text-[#564245]">refresh</span>
            </motion.button>
            <div className="flex items-center gap-3 pl-4 border-l border-[#e1e3e4]">
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-bold text-[#191c1d]">Admin</p>
                <p className="text-[10px] text-[#564245]">Administrador</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ffd9df] flex items-center justify-center text-[#3f0017] font-bold border-2 border-white shadow-sm overflow-hidden">A</div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-[30px] leading-[36px] font-bold text-[#191c1d]">Pedidos</h2>
            <p className="text-[16px] leading-[24px] text-[#564245]">Gestiona y monitorea todos los pedidos en tiempo real</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#ff7e9d] p-6 rounded-2xl shadow hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span></div>
              </div>
              <p className="text-[32px] font-black text-white leading-none">{counts.activos}</p>
              <p className="text-[14px] text-white/90 mt-1">Pedidos Activos</p>
            </div>
            <div className="bg-[#fdd73b] p-6 rounded-2xl shadow hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center"><span className="material-symbols-outlined text-[#554500]" style={{ fontVariationSettings: "'FILL' 1" }}>cooking</span></div>
              </div>
              <p className="text-[32px] font-black text-[#554500] leading-none">{counts.preparacion}</p>
              <p className="text-[14px] text-[#554500]/80 mt-1">En Preparación</p>
            </div>
            <div className="bg-[#7cacd7] p-6 rounded-2xl shadow hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center"><span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span></div>
              </div>
              <p className="text-[32px] font-black text-white leading-none">{counts.listos}</p>
              <p className="text-[14px] text-white/80 mt-1">Listos</p>
            </div>
            <div className="bg-[#ffd9df] p-6 rounded-2xl shadow hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center"><span className="material-symbols-outlined text-[#3f0017]" style={{ fontVariationSettings: "'FILL' 1" }}>history</span></div>
              </div>
              <p className="text-[32px] font-black text-[#3f0017] leading-none">{counts.completados}</p>
              <p className="text-[14px] text-[#3f0017]/80 mt-1">Completados Hoy</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#564245]">search</span>
                <input className="w-full pl-12 pr-4 py-3 bg-[#f3f4f5] border-none focus:ring-2 focus:ring-[#ff7e9d] rounded-xl text-[14px] outline-none transition-all" placeholder="Buscar por ID o cliente..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                {filters.map((f) => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-6 py-2 rounded-full text-[14px] whitespace-nowrap shadow-sm transition-all ${filter === f ? "bg-[#ff7e9d] text-[#761235] font-bold" : "bg-[#edeeef] text-[#564245] hover:bg-[#e7e8e9]"}`}>{f}</button>
                ))}
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#ff7e9d] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e1e3e4]">
                      <th className="px-6 py-5 text-[12px] uppercase tracking-wider text-[#564245]">ID Pedido</th>
                      <th className="px-6 py-5 text-[12px] uppercase tracking-wider text-[#564245]">Cliente</th>
                      <th className="px-6 py-5 text-[12px] uppercase tracking-wider text-[#564245]">Productos</th>
                      <th className="px-6 py-5 text-[12px] uppercase tracking-wider text-[#564245] text-center">Total</th>
                      <th className="px-6 py-5 text-[12px] uppercase tracking-wider text-[#564245]">Estado</th>
                      <th className="px-6 py-5 text-[12px] uppercase tracking-wider text-[#564245]">Hora</th>
                      <th className="px-6 py-5 text-[12px] uppercase tracking-wider text-[#564245] text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e1e3e4]">
                    <AnimatePresence>
                      {filteredPedidos.map((pedido) => (
                        <motion.tr key={pedido.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-5 font-black text-[#191c1d]">{pedido.codigoPedido}</td>
                          <td className="px-6 py-5">
                            <div className="font-bold text-[#191c1d]">{pedido.usuarioNombre}</div>
                            <div className="text-[12px] text-[#564245]">{pedido.metodoPago} - {pedido.metodoEntrega}</div>
                          </td>
                          <td className="px-6 py-5">
                            {pedido.detalles?.slice(0, 2).map((d, i) => (
                              <div key={i} className={i === 0 ? "text-[14px] text-[#191c1d]" : "text-[12px] text-[#564245]"}>{d.cantidad}x {d.nombre}</div>
                            ))}
                            {pedido.detalles && pedido.detalles.length > 2 && <div className="text-[12px] text-[#564245]">+{pedido.detalles.length - 2} más</div>}
                          </td>
                          <td className="px-6 py-5 text-center">
                            <div className="text-[#a43756] font-black text-[22px]">S/ {pedido.total.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${estadoColors[pedido.estado] || "bg-gray-100 text-gray-600"} rounded-full text-[11px] font-bold`}>
                              {pedido.estado}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="text-[14px] font-bold">{new Date(pedido.createdAt).toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}</div>
                            <div className="text-[11px] text-[#564245]">{new Date(pedido.createdAt).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" })}</div>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex justify-end gap-2">
                              {pedido.estado === "PENDIENTE" && (
                                <button onClick={() => handleEstado(pedido.id, "EN PREPARACION")} className="px-3 py-1.5 bg-[#ffe173] text-[#554500] text-[11px] font-bold rounded-lg hover:bg-[#fdd73b] transition-all">Preparar</button>
                              )}
                              {pedido.estado === "EN PREPARACION" && (
                                <button onClick={() => handleEstado(pedido.id, "LISTO")} className="px-3 py-1.5 bg-green-100 text-green-700 text-[11px] font-bold rounded-lg hover:bg-green-200 transition-all">Listo</button>
                              )}
                              {pedido.estado === "LISTO" && (
                                <button onClick={() => handleEstado(pedido.id, "ENTREGADO")} className="px-3 py-1.5 bg-[#cde5ff] text-[#004064] text-[11px] font-bold rounded-lg hover:bg-[#b8d4f0] transition-all">Entregar</button>
                              )}
                              {pedido.estado !== "ENTREGADO" && pedido.estado !== "CANCELADO" && (
                                <button onClick={() => handleEstado(pedido.id, "CANCELADO")} className="px-3 py-1.5 bg-red-100 text-red-700 text-[11px] font-bold rounded-lg hover:bg-red-200 transition-all">Cancelar</button>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {filteredPedidos.length === 0 && (
                  <div className="text-center py-16">
                    <span className="material-symbols-outlined text-5xl text-[#dcc0c4] mb-4">shopping_cart</span>
                    <p className="text-[#564245] text-lg font-medium">No se encontraron pedidos</p>
                  </div>
                )}
              </div>
              <div className="px-6 py-4 bg-white border-t border-[#e1e3e4] flex justify-between items-center">
                <span className="text-[12px] text-[#564245]">Mostrando {filteredPedidos.length} de {pedidos.length} pedidos</span>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
