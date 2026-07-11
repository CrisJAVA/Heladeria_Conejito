import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { listarClientes, type ClienteInfo } from "../services/auth";
import { obtenerConfiguracion, type ConfiguracionDTO } from "../services/configuracion";

const levelConfig: Record<string, {
  label: string; gradient: string; badgeBg: string; badgeText: string;
  cardBorder: string; cardGlow: string; icon: string; starColor: string;
}> = {
  Diamante: {
    label: "Diamante", icon: "diamond",
    gradient: "from-[#e0f7fa] via-[#b9f2ff] to-[#80deea]",
    badgeBg: "bg-[#b9f2ff]", badgeText: "text-[#004d40]",
    cardBorder: "border-[#80deea]", cardGlow: "shadow-[#b9f2ff]/40",
    starColor: "#00bcd4",
  },
  Oro: {
    label: "Oro", icon: "star",
    gradient: "from-[#fff8e1] via-[#ffecb3] to-[#ffe082]",
    badgeBg: "bg-[#ffd700]", badgeText: "text-[#4e342e]",
    cardBorder: "border-[#ffd700]", cardGlow: "shadow-[#ffd700]/30",
    starColor: "#ff8f00",
  },
  Plata: {
    label: "Plata", icon: "workspace_premium",
    gradient: "from-[#f5f5f5] via-[#e0e0e0] to-[#bdbdbd]",
    badgeBg: "bg-[#bdbdbd]", badgeText: "text-[#212121]",
    cardBorder: "border-[#9e9e9e]", cardGlow: "shadow-[#bdbdbd]/30",
    starColor: "#616161",
  },
  Bronce: {
    label: "Bronce", icon: "emoji_events",
    gradient: "from-[#fce4d6] via-[#f5cba7] to-[#e6a17a]",
    badgeBg: "bg-[#cd7f32]", badgeText: "text-white",
    cardBorder: "border-[#cd7f32]", cardGlow: "shadow-[#cd7f32]/20",
    starColor: "#8d5524",
  },
};

const avatarColors = [
  "from-[#ffb1c0] to-[#ff8ea3]", "from-[#9bcbf8] to-[#6db3f2]",
  "from-[#ffe173] to-[#ffd633]", "from-[#b8f0d0] to-[#85e0b0]",
  "from-[#dcc8f0] to-[#c4a0e8]", "from-[#f9c6b8] to-[#f5a692]",
];

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatCurrency(n: number): string {
  return "S/ " + n.toFixed(2);
}

const nextLevelMap: Record<string, { name: string; pts: number; color: string }> = {
  Bronce: { name: "Plata", pts: 100, color: "#c0c0c0" },
  Plata: { name: "Oro", pts: 300, color: "#ffd700" },
  Oro: { name: "Diamante", pts: 600, color: "#b9f2ff" },
};

function getProgress(puntos: number, nivel: string | null): { pct: number; next: string; nextPts: number; color: string } | null {
  const next = nextLevelMap[nivel || "Bronce"];
  if (!next) return null;
  const current = nivel === "Bronce" ? 0 : nivel === "Plata" ? 100 : nivel === "Oro" ? 300 : 600;
  const needed = next.pts - current;
  const progress = Math.min((puntos - current) / needed * 100, 100);
  return { pct: Math.round(progress), next: next.name, nextPts: next.pts, color: next.color };
}

export default function AdminClientes() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [clientes, setClientes] = useState<ClienteInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [config, setConfig] = useState<ConfiguracionDTO | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setClientes(await listarClientes());
    } catch {
      toast.error("Error al cargar clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    obtenerConfiguracion()
      .then(setConfig)
      .catch(() => { });
  }, []);

  const filtered = clientes.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.nombre.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.nivel?.toLowerCase().includes(q) ?? false);
  });

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
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center shadow-sm">
            {config?.logoUrl ? (
              <img src={config.logoUrl} className="w-full h-full object-cover" />) : (
              <span className="material-symbols-outlined">
                icecream
              </span>)}
          </div>
          <div>
            <h1 className="text-[24px] leading-[32px] font-bold text-[#191c1d]">Admin Panel</h1>
            <p className="text-[#564245] text-[12px] leading-[16px] tracking-wider uppercase">Heladería Ica</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => navigate("/admin")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]">
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </button>
          <button onClick={() => navigate("/admin/productos")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]">
            <span className="material-symbols-outlined">icecream</span> Productos
          </button>
          <button onClick={() => navigate("/admin/pedidos")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]">
            <span className="material-symbols-outlined">shopping_cart</span> Pedidos
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#ff7e9d] text-[#761235] font-bold rounded-xl shadow-sm text-[14px] leading-[20px]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span> Clientes
          </button>
          <button onClick={() => navigate("/admin/media")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]">
            <span className="material-symbols-outlined">photo_library</span> Multimedia
          </button>
          <button onClick={() => navigate("/admin/landing")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]">
            <span className="material-symbols-outlined">web</span> Landing Page
          </button>
          <button onClick={() => navigate("/admin/configuracion")} className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]">
            <span className="material-symbols-outlined">settings</span> Configuración
          </button>
        </nav>
        <div className="mt-auto border-t border-[#e1e3e4] pt-4">
          <button onClick={() => { logout(); navigate("/"); }} className="w-full flex items-center gap-3 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6]/10 transition-colors rounded-xl text-[14px] leading-[20px]">
            <span className="material-symbols-outlined">logout</span> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="ml-64 w-[calc(100%-16rem)] min-h-screen">
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 flex justify-between items-center px-8 z-40 bg-[#f8f9fa]/80 backdrop-blur-md border-b border-[#e1e3e4]">
          <h2 className="text-[24px] leading-[32px] font-bold text-[#a43756]">Clientes</h2>
          <div className="flex items-center gap-6">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={load} className="p-2 hover:bg-[#f3f4f5] rounded-full transition-all">
              <span className="material-symbols-outlined text-[#564245]">refresh</span>
            </motion.button>
            <div className="flex items-center gap-3 pl-4 border-l border-[#e1e3e4]">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-[#191c1d] text-[14px] leading-[20px]">Admin</p>
                <p className="text-[#564245] text-[12px] leading-[16px]">Administrador</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ffd9df] flex items-center justify-center text-[#a43756] font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="pt-20 pb-12 px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-[30px] leading-[36px] font-bold text-[#191c1d]">Clientes</h3>
              <p className="text-[#564245] text-[14px] leading-[20px] mt-1">{clientes.length} cliente{clientes.length !== 1 ? "s" : ""} registrado{clientes.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex gap-3">
              {["Todos", "Diamante", "Oro", "Plata", "Bronce"].map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setSearch(nivel === "Todos" ? "" : nivel)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${(nivel === "Todos" && !search) || search === nivel
                    ? "bg-[#ff7e9d] text-white border-[#ff7e9d] shadow-sm"
                    : "bg-white text-[#564245] border-[#e1e3e4] hover:border-[#ff7e9d]"
                    }`}
                >
                  {nivel}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#564245]">search</span>
              <input className="w-full pl-12 pr-4 py-3 bg-[#f3f4f5] border-none focus:ring-2 focus:ring-[#ff7e9d] rounded-xl text-[14px] outline-none transition-all" placeholder="Buscar por nombre o email..." value={search} onChange={(e) => {
                const val = e.target.value;
                if (!["Diamante", "Oro", "Plata", "Bronce", "Todos"].includes(val)) setSearch(val);
              }} />
            </div>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#ff7e9d] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-[#dcc0c4] mb-4">group</span>
              <p className="text-[#564245] text-lg font-medium">No se encontraron clientes</p>
              <p className="text-[#564245] text-sm mt-1">Los clientes registrados aparecerán aquí</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filtered.map((cliente, i) => {
                const level = levelConfig[cliente.nivel || "Bronce"] || levelConfig.Bronce;
                const progress = getProgress(cliente.puntosAcumulados, cliente.nivel);
                return (
                  <motion.div key={cliente.id} layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 20 }}
                    className={`relative overflow-hidden rounded-2xl border ${level.cardBorder} bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${level.cardGlow}`}
                  >
                    {/* Level gradient header strip */}
                    <div className={`h-2 w-full bg-gradient-to-r ${level.gradient}`} />

                    <div className="p-6">
                      <div className="flex items-start gap-5">
                        {/* Avatar */}
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center font-bold text-white text-lg shadow-md flex-shrink-0`}>
                          {getInitials(cliente.nombre)}
                        </div>

                        {/* Main content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h4 className="font-bold text-[#191c1d] text-[18px]">{cliente.nombre}</h4>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold ${level.badgeBg} ${level.badgeText} shadow-sm`}>
                              <span className="material-symbols-outlined" style={{ fontSize: "16px", color: level.starColor, fontVariationSettings: "'FILL' 1" }}>{level.icon}</span>
                              {level.label}
                            </span>
                          </div>
                          <p className="text-[13px] text-[#564245] mt-0.5">{cliente.email}</p>

                          {/* Stats row */}
                          <div className="flex gap-6 mt-3 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[#a43756]" style={{ fontSize: "18px" }}>shopping_cart</span>
                              <span className="text-[12px] text-[#564245]"><b className="text-[#191c1d]">{cliente.totalPedidos}</b> pedidos</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[#2e7d32]" style={{ fontSize: "18px" }}>payments</span>
                              <span className="text-[12px] text-[#564245]"><b className="text-[#191c1d]">{formatCurrency(cliente.totalGastado)}</b> gastado</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[#f57c00]" style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}>trophy</span>
                              <span className="text-[12px] text-[#564245]"><b className="text-[#191c1d]">{cliente.puntosAcumulados}</b> pts</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[#564245]" style={{ fontSize: "18px" }}>calendar_today</span>
                              <span className="text-[12px] text-[#564245]">Último pedido: <b className="text-[#191c1d]">{formatDate(cliente.ultimoPedido)}</b></span>
                            </div>
                          </div>

                          {/* Progress bar to next level */}
                          {progress && (
                            <div className="mt-4">
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-[#564245]">Progreso a <b style={{ color: progress.color }}>{progress.next}</b></span>
                                <span className="text-[#564245] font-semibold">{cliente.puntosAcumulados} / {progress.nextPts} pts</span>
                              </div>
                              <div className="h-2 bg-[#f3f4f5] rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(progress.pct, 100)}%` }}
                                  transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                                  className="h-full rounded-full"
                                  style={{
                                    background: `linear-gradient(90deg, ${level.starColor}, ${progress.color})`,
                                    boxShadow: `0 0 8px ${progress.color}60`,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right side info */}
                        <div className="text-right flex-shrink-0 space-y-1.5 min-w-[140px]">
                          {cliente.telefono && (
                            <div className="flex items-center justify-end gap-1 text-[12px] text-[#564245]">
                              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>phone</span>
                              {cliente.telefono}
                            </div>
                          )}
                          {cliente.direccion && (
                            <div className="flex items-center justify-end gap-1 text-[11px] text-[#564245]">
                              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>location_on</span>
                              <span className="max-w-[140px] truncate">{cliente.direccion}</span>
                            </div>
                          )}
                          <div className="text-[11px] text-[#a09c9c] pt-2 border-t border-[#f3f4f5] mt-2">
                            Registrado: {formatDate(cliente.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
