import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Bell, ArrowLeft, CheckCheck, Trash2, IceCream, Package, AlertCircle, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { listarNotificaciones, marcarLeida, marcarTodasLeidas, type NotificacionDTO } from "../services/notificaciones";
import Footer from "../app/components/Footer";

const iconMap: Record<string, React.ReactNode> = {
  PEDIDO: <Package className="w-5 h-5 text-blue-500" />,
  PROMOCION: <IceCream className="w-5 h-5 text-[#ff6b9d]" />,
  ALERTA: <AlertCircle className="w-5 h-5 text-red-500" />,
};

export default function NotificationCenter() {
  const navigate = useNavigate();
  const [items, setItems] = useState<NotificacionDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listarNotificaciones();
      setItems(data);
    } catch {
      setError("Error al cargar notificaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleMarkRead = async (id: number) => {
    try {
      await marcarLeida(id);
      setItems((prev) => prev.map((n) => n.id === id ? { ...n, leida: true } : n));
    } catch { /* ignore */ }
  };

  const handleMarkAllRead = async () => {
    try {
      await marcarTodasLeidas();
      setItems((prev) => prev.map((n) => ({ ...n, leida: true })));
    } catch { /* ignore */ }
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Ahora";
    if (mins < 60) return `Hace ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Hace ${hours}h`;
    return d.toLocaleDateString("es-PE", { day: "numeric", month: "short" });
  };

  const unreadCount = items.filter((n) => !n.leida).length;

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-3xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-[#2d2d2d]">Notificaciones</h1>
            <div className="relative">
              <Bell className="w-5 h-5 text-[#ff6b9d]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#ff6b9d] text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button onClick={handleMarkAllRead} className="flex items-center gap-1.5 text-sm text-[#ff6b9d] font-medium hover:underline">
              <CheckCheck className="w-4 h-4" /> Marcar todas
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-8 max-w-3xl mx-auto w-full">
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
              <Bell className="w-10 h-10 text-[#ff6b9d]/40" />
            </div>
            <h2 className="text-xl font-bold text-[#2d2d2d] mb-2">Sin notificaciones</h2>
            <p className="text-gray-500">No tienes notificaciones por ahora</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {items.map((notif) => (
                <motion.div key={notif.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className={`flex items-start gap-4 p-4 rounded-2xl transition-all ${notif.leida ? "bg-white border border-gray-100" : "bg-[#ff6b9d]/5 border border-[#ff6b9d]/20 shadow-sm"}`}>
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    {iconMap[notif.tipo] || <Info className="w-5 h-5 text-gray-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`text-sm ${notif.leida ? "text-gray-500" : "text-[#2d2d2d] font-semibold"}`}>{notif.mensaje}</p>
                      {!notif.leida && <span className="w-2 h-2 rounded-full bg-[#ff6b9d] flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400">{formatDate(notif.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!notif.leida && (
                      <button onClick={() => handleMarkRead(notif.id)} className="p-2 text-gray-400 hover:text-green-500 transition-colors" title="Marcar como leída">
                        <CheckCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(notif.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
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
