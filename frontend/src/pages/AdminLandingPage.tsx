import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { listarSecciones, actualizarSeccion, type SeccionLanding } from "../services/landingPage";

export default function AdminLandingPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [secciones, setSecciones] = useState<SeccionLanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await listarSecciones();
      setSecciones(data);
    } catch {
      toast.error("Error al cargar secciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (sec: SeccionLanding) => {
    setSaving(sec.sectionKey);
    try {
      await actualizarSeccion(sec.sectionKey, sec);
      toast.success(`${sec.titulo} actualizado`);
    } catch {
      toast.error("Error al actualizar");
    } finally {
      setSaving(null);
    }
  };

  const updateField = (key: string, field: keyof SeccionLanding, value: string | boolean) => {
    setSecciones((prev) => prev.map((s) => (s.sectionKey === key ? { ...s, [field]: value } : s)));
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased;
        }
      `}</style>

      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#e1e3e4] flex flex-col py-6 px-4 bg-white z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>icecream</span>
          </div>
          <div>
            <h1 className="text-[24px] leading-[32px] font-bold text-[#191c1d]">Admin Panel</h1>
            <p className="text-[#564245] text-xs">Heladería Ica</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {[
            { label: "Dashboard", icon: "dashboard", path: "/admin" },
            { label: "Productos", icon: "inventory_2", path: "/admin/productos" },
            { label: "Pedidos", icon: "receipt_long", path: "/admin/pedidos" },
            { label: "Clientes", icon: "group", path: "/admin/clientes" },
            { label: "Multimedia", icon: "photo_library", path: "/admin/media" },
            { label: "Landing Page", icon: "web", path: "/admin/landing" },
            { label: "Configuración", icon: "settings", path: "/admin/configuracion" },
          ].map((item) => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] leading-[20px] transition-colors ${
                location.pathname === item.path ? "bg-[#ffd9df] text-[#761235] font-semibold" : "text-[#564245] hover:bg-[#f3f4f5]"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <button onClick={() => { logout(); navigate("/"); }}
          className="flex items-center gap-3 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors rounded-xl text-[14px] leading-[20px] mt-auto"
        >
          <span className="material-symbols-outlined">logout</span> Cerrar Sesión
        </button>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-[32px] font-bold text-[#191c1d]">Landing Page</h1>
            <p className="text-[#564245] mt-1">Gestiona las imágenes de la sección "¿Qué encontrarás?"</p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {secciones.map((sec) => (
                <motion.div key={sec.sectionKey} layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
                >
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={sec.imagenUrl}
                      alt={sec.titulo}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400/${sec.colorFrom?.replace('#','')}/ffffff?text=${encodeURIComponent(sec.titulo)}`; }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-[${sec.colorFrom}] to-transparent opacity-30`} />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#191c1d]">{sec.titulo}</h3>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">{sec.sectionKey}</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-[#564245]">URL de imagen</label>
                        <input type="text" value={sec.imagenUrl}
                          onChange={(e) => updateField(sec.sectionKey, "imagenUrl", e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-[#f3f4f5] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none transition-all"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-[#564245]">Color inicio</label>
                          <div className="flex gap-2 mt-1">
                            <input type="color" value={sec.colorFrom}
                              onChange={(e) => updateField(sec.sectionKey, "colorFrom", e.target.value)}
                              className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                            />
                            <input type="text" value={sec.colorFrom}
                              onChange={(e) => updateField(sec.sectionKey, "colorFrom", e.target.value)}
                              className="flex-1 px-3 py-2 bg-[#f3f4f5] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#564245]">Color fin</label>
                          <div className="flex gap-2 mt-1">
                            <input type="color" value={sec.colorTo}
                              onChange={(e) => updateField(sec.sectionKey, "colorTo", e.target.value)}
                              className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                            />
                            <input type="text" value={sec.colorTo}
                              onChange={(e) => updateField(sec.sectionKey, "colorTo", e.target.value)}
                              className="flex-1 px-3 py-2 bg-[#f3f4f5] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={sec.activo}
                          onChange={(e) => updateField(sec.sectionKey, "activo", e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-[#ff6b9d] focus:ring-[#ff6b9d]"
                        />
                        <span className="text-xs font-medium text-[#564245]">Activo</span>
                      </label>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        disabled={saving === sec.sectionKey}
                        onClick={() => handleSave(sec)}
                        className="px-5 py-2 bg-[#ff7e9d] text-[#761235] rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all disabled:opacity-50"
                      >
                        {saving === sec.sectionKey ? "Guardando..." : "Guardar cambios"}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
