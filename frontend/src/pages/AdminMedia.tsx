import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { listarImagenes, subirImagen, eliminarImagen } from "../services/upload";
import { obtenerConfiguracion, type ConfiguracionDTO } from "../services/configuracion";

interface ImagenInfo {
  filename: string;
  url: string;
  size: string;
  type: string;
}

export default function AdminMedia() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [imagenes, setImagenes] = useState<ImagenInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [config, setConfig] = useState<ConfiguracionDTO | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await listarImagenes();
      setImagenes(data);
    } catch {
      toast.error("Error al cargar imágenes");
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

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) { toast.error("Solo se permiten imágenes"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Máximo 5MB"); return; }
    setUploading(true);
    try {
      await subirImagen(file);
      toast.success("Imagen subida");
      load();
    } catch {
      toast.error("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`¿Eliminar ${filename}?`)) return;
    try {
      await eliminarImagen(filename);
      toast.success("Imagen eliminada");
      setImagenes((prev) => prev.filter((i) => i.filename !== filename));
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const copyUrl = (url: string) => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
    const apiPrefix = baseUrl.replace(/\/api\/?$/, "");
    navigator.clipboard.writeText(`${apiPrefix}${url}`);
    toast.success("URL copiada");
  };

  const formatSize = (bytes: string) => {
    const n = parseInt(bytes);
    if (isNaN(n)) return "?";
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(1)} MB`;
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
            {config?.logoUrl ? (
              <img src={config.logoUrl} className="w-full h-full object-cover" />) : (
              <span className="material-symbols-outlined">
                icecream
              </span>)}
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] leading-[20px] transition-colors ${location.pathname === item.path ? "bg-[#ffd9df] text-[#761235] font-semibold" : "text-[#564245] hover:bg-[#f3f4f5]"
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
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[32px] font-bold text-[#191c1d]">Multimedia</h1>
              <p className="text-[#564245] mt-1">Gestiona las imágenes de tus productos</p>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-5 py-3 bg-[#ff7e9d] text-[#761235] rounded-xl font-semibold shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined">add_photo_alternate</span>
              {uploading ? "Subiendo..." : "Subir imagen"}
            </motion.button>
            <input ref={fileInputRef} type="file" accept="image/*" multiple={false} className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ""; }}
            />
          </div>

          <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${dragging ? "border-[#ff6b9d] bg-[#ffd9df]/20" : "border-gray-300 hover:border-[#ff6b9d] bg-white"}`}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#f3f4f5] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[#564245]">cloud_upload</span>
            </div>
            <p className="text-[#191c1d] font-medium">Arrastra una imagen aquí o haz clic en "Subir imagen"</p>
            <p className="text-[#564245] text-sm mt-1">JPG, PNG, WEBP — Máximo 5MB</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : imagenes.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#ffd9df] flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#761235]">photo_library</span>
              </div>
              <p className="text-lg font-medium text-[#191c1d]">No hay imágenes aún</p>
              <p className="text-[#564245] text-sm mt-1">Sube tu primera imagen para empezar</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {imagenes.map((img, i) => (
                  <motion.div key={img.filename} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.03 }}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square overflow-hidden cursor-pointer" onClick={() => setSelected(selected === img.filename ? null : img.filename)}>
                      <img src={img.url} alt={img.filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 space-y-2">
                      <p className="text-xs text-[#564245] truncate font-medium">{img.filename}</p>
                      <p className="text-[10px] text-gray-400">{formatSize(img.size)}</p>
                      <div className="flex gap-2">
                        <button onClick={() => copyUrl(img.url)}
                          className="flex-1 py-1.5 text-[11px] font-semibold bg-[#f3f4f5] text-[#564245] rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Copiar URL
                        </button>
                        <button onClick={() => handleDelete(img.filename)}
                          className="py-1.5 px-2.5 text-[11px] font-semibold text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>delete</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] shadow-2xl"
            >
              <div className="relative">
                <img src={selected} alt="Vista previa" className="w-full max-h-[70vh] object-contain bg-gray-100" />
                <button onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="p-4 flex items-center justify-between bg-white">
                <p className="text-sm font-medium text-[#191c1d] truncate">{selected}</p>
                <button onClick={() => { copyUrl(selected!); setSelected(null); }}
                  className="px-4 py-2 bg-[#ff7e9d] text-[#761235] rounded-xl font-semibold text-sm hover:shadow-md transition-all"
                >
                  Copiar URL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
