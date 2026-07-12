import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { obtenerConfiguracion, actualizarConfiguracion, type ConfiguracionDTO } from "../services/configuracion";
import { subirImagen } from "../services/upload";
import {
  obtenerConfiguracionMetodoPago,
  actualizarConfiguracionMetodoPago,
  subirImagenMetodoPago,
  type ConfiguracionMetodoPagoDTO,
} from "../services/configuracionMetodoPago";
import { listarNiveles, actualizarNivel, type NivelFidelizacionDTO, type BeneficioDTO } from "../services/niveles";

const CONFIG_DEFAULT: ConfiguracionDTO = {
  nombreNegocio: "Heladería Ica",
  descripcion: "Tu oasis de frescura en el corazón de Ica. Helados artesanales y pizzas deliciosas desde 2020.",
  direccion: "Av. Principal 123, Ica, Perú",
  telefono: "+51 956 789 123",
  email: "hola@heladeriaica.pe",
  horarioSemana: "10:00 - 22:00",
  horarioSabado: "09:00 - 23:00",
  horarioDomingo: "09:00 - 23:00",
  instagram: "@heladeria.ica",
  facebook: "Heladería Ica",
  whatsapp: "+51 956 789 123",
  metodosPago: "Efectivo,Tarjeta,Yape,Plin,Transferencia",
  puntosPorSol: 10,
  puntosRecompensa: 3000,
};

export default function AdminConfiguracion() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [config, setConfig] = useState<ConfiguracionDTO>(CONFIG_DEFAULT);
  const [guardando, setGuardando] = useState(false);
  const [subiendoLogo, setSubiendoLogo] = useState(false);
  const [logo, setLogo] = useState<string>("");

  const [modalAbierto, setModalAbierto] = useState<"YAPE" | "PLIN" | null>(null);
  const [configMetodo, setConfigMetodo] = useState<ConfiguracionMetodoPagoDTO>({
    tipo: "YAPE",
    nombreTitular: "",
    numeroCelular: "",
    usuarioVisible: "",
    imagenUrl: "",
    mensaje: "",
    activo: false,
  });
  const [guardandoMetodo, setGuardandoMetodo] = useState(false);
  const [subiendoQr, setSubiendoQr] = useState(false);

  const [niveles, setNiveles] = useState<NivelFidelizacionDTO[]>([]);
  const [nivelEditando, setNivelEditando] = useState<Record<number, NivelFidelizacionDTO>>({});
  const [guardandoNivel, setGuardandoNivel] = useState<Record<number, boolean>>({});

  useEffect(() => {
    obtenerConfiguracion()
      .then((data) => {
        setConfig(data);
        setLogo(data.logoUrl || "");
      })
      .catch(() => toast.error("Error al cargar la configuración"));
    cargarNiveles();
  }, []);

  const cargarNiveles = async () => {
    try {
      const data = await listarNiveles();
      setNiveles(data);
      const editMap: Record<number, NivelFidelizacionDTO> = {};
      data.forEach((n) => { editMap[n.id] = JSON.parse(JSON.stringify(n)); });
      setNivelEditando(editMap);
    } catch {
      toast.error("Error al cargar niveles");
    }
  };

  const actualizarBeneficios = (nivelId: number, beneficios: BeneficioDTO[]) => {
    setNivelEditando((prev) => ({
      ...prev,
      [nivelId]: { ...prev[nivelId], beneficios },
    }));
  };

  const agregarBeneficio = (nivelId: number) => {
    const actual = nivelEditando[nivelId];
    if (!actual) return;
    const nuevoBeneficio: BeneficioDTO = { descripcion: "", tipo: "OTRO", valor: "" };
    actualizarBeneficios(nivelId, [...(actual.beneficios || []), nuevoBeneficio]);
  };

  const editarBeneficio = (nivelId: number, idx: number, campo: keyof BeneficioDTO, valor: string) => {
    const actual = nivelEditando[nivelId];
    if (!actual) return;
    const beneficios = [...(actual.beneficios || [])];
    beneficios[idx] = { ...beneficios[idx], [campo]: valor };
    actualizarBeneficios(nivelId, beneficios);
  };

  const eliminarBeneficio = (nivelId: number, idx: number) => {
    const actual = nivelEditando[nivelId];
    if (!actual) return;
    const beneficios = (actual.beneficios || []).filter((_, i) => i !== idx);
    actualizarBeneficios(nivelId, beneficios);
  };

  const guardarNivel = async (nivelId: number) => {
    const dto = nivelEditando[nivelId];
    if (!dto) return;
    setGuardandoNivel((prev) => ({ ...prev, [nivelId]: true }));
    try {
      await actualizarNivel(nivelId, dto);
      toast.success(`${dto.nombre} actualizado correctamente`);
      await cargarNiveles();
    } catch {
      toast.error(`Error al guardar ${dto.nombre}`);
    } finally {
      setGuardandoNivel((prev) => ({ ...prev, [nivelId]: false }));
    }
  };

  const campo = (key: keyof ConfiguracionDTO) => ({
    value: (config[key] as any) ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setConfig((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      const actualizado = await actualizarConfiguracion(config);
      setConfig(actualizado);
      toast.success("Configuración guardada correctamente");
    } catch {
      toast.error("Error al guardar la configuración. Verifica que tengas sesión de administrador.");
    } finally {
      setGuardando(false);
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setSubiendoLogo(true);
    try {
      const { url } = await subirImagen(file);
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const apiPrefix = baseUrl.replace(/\/api\/?$/, "");
      const fullUrl = url.startsWith("http") ? url : `${apiPrefix}${url}`;
      const actualizado = await actualizarConfiguracion({ ...config, logoUrl: fullUrl });
      setConfig(actualizado);
      toast.success("Logo actualizado correctamente");
    } catch {
      toast.error("Error al subir el logo. Verifica que tengas sesión de administrador.");
    } finally {
      setSubiendoLogo(false);
    }
  };

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

      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#e1e3e4] flex flex-col py-6 px-4 bg-white z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center shadow-sm overflow-hidden">
            {logo ? (
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />) : (
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }} >
                icecream
              </span>
            )}
          </div>
          <div>
            <h1 className="text-[24px] leading-[32px] font-bold text-[#191c1d]">Admin Panel</h1>
            <p className="text-[#564245] text-xs">Heladería Ica</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => navigate("/admin")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">dashboard</span>
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
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#ff7e9d] text-[#761235] font-bold rounded-xl text-[14px] leading-[20px] shadow-sm">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            Configuración
          </button>
        </nav>

        <div className="mt-auto border-t border-[#e1e3e4] pt-4">
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6]/10 transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-[#f8f9fa]/80 backdrop-blur-md flex justify-between items-center px-8 z-40">
        <h2 className="text-[24px] leading-[32px] font-bold text-[#a43756]">Settings</h2>
        <div className="flex items-center gap-4">
          <button className="hover:bg-[#f3f4f5] rounded-full p-2 transition-all relative">
            <span className="material-symbols-outlined text-[#564245]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-[#f8f9fa]" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-[#e1e3e4]">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#191c1d]">Admin</p>
              <p className="text-[10px] text-[#564245] uppercase tracking-wider">Administrador</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#ffe173] flex items-center justify-center text-[#221b00] font-bold">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="ml-64 pt-20 pb-12 px-8 w-[calc(100%-16rem)]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-[30px] leading-[36px] font-bold text-[#191c1d]">Configuración</h1>
            <p className="text-[#564245] text-[16px] leading-[24px]">Configura los ajustes de tu negocio</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-[#ff7e9d]/20 flex items-center justify-center text-[#a43756]">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>store</span>
                </div>
                <h3 className="text-[24px] leading-[32px] font-semibold">Información del Negocio</h3>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] leading-[16px] text-[#564245]">Nombre del Negocio</label>
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none text-[14px]"
                    type="text"
                    {...campo("nombreNegocio")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] leading-[16px] text-[#564245]">Descripción</label>
                  <textarea
                    className="w-full p-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none resize-none text-[14px]"
                    rows={4}
                    {...campo("descripcion")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] leading-[16px] text-[#564245]">Logo</label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#ff7e9d] to-[#ffe173] p-4 shadow-sm flex items-center justify-center">
                      {config.logoUrl ? (
                        <img src={config.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <span className="material-symbols-outlined text-4xl text-[#761235]">icecream</span>
                      )}
                    </div>
                    <input
                      id="logo-file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                    <button
                      type="button"
                      disabled={subiendoLogo}
                      onClick={() => document.getElementById("logo-file-input")?.click()}
                      className="px-6 py-2.5 rounded-xl border border-[#897175] text-[#a43756] font-bold hover:bg-[#edeeef] transition-all text-sm disabled:opacity-50"
                    >
                      {subiendoLogo ? "Subiendo..." : "Cambiar Logo"}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-[#7cacd7]/20 flex items-center justify-center text-[#30628a]">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>contact_support</span>
                </div>
                <h3 className="text-[24px] leading-[32px] font-semibold">Información de Contacto</h3>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] leading-[16px] text-[#564245] flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">location_on</span> Dirección
                  </label>
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none text-[14px]"
                    type="text"
                    {...campo("direccion")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] leading-[16px] text-[#564245] flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">call</span> Teléfono
                  </label>
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none text-[14px]"
                    type="text"
                    {...campo("telefono")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] leading-[16px] text-[#564245] flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">mail</span> Email
                  </label>
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none text-[14px]"
                    type="email"
                    {...campo("email")}
                  />
                </div>
              </div>
            </section>

            <section className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-[#fdd73b]/30 flex items-center justify-center text-[#705d00]">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                </div>
                <h3 className="text-[24px] leading-[32px] font-semibold">Horarios de Atención</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-32 py-2.5 px-4 bg-[#f8f9fa] rounded-xl border border-[#dcc0c4] text-sm text-[#564245]">Lunes - Viernes</div>
                  <input
                    className="flex-1 h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] text-sm focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none"
                    type="text"
                    {...campo("horarioSemana")}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 py-2.5 px-4 bg-[#f8f9fa] rounded-xl border border-[#dcc0c4] text-sm text-[#564245]">Sábados</div>
                  <input
                    className="flex-1 h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] text-sm focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none"
                    type="text"
                    {...campo("horarioSabado")}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 py-2.5 px-4 bg-[#f8f9fa] rounded-xl border border-[#dcc0c4] text-sm text-[#564245]">Domingos</div>
                  <input
                    className="flex-1 h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] text-sm focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none"
                    type="text"
                    {...campo("horarioDomingo")}
                  />
                </div>
              </div>
            </section>

            <section className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-[#9bcbf8]/40 flex items-center justify-center text-[#30628a]">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>share</span>
                </div>
                <h3 className="text-[24px] leading-[32px] font-semibold">Redes Sociales</h3>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] leading-[16px] text-[#564245] flex items-center gap-2 px-1">
                    <span className="material-symbols-outlined text-sm">camera_alt</span> Instagram
                  </label>
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] text-sm focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none"
                    type="text"
                    {...campo("instagram")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] leading-[16px] text-[#564245] flex items-center gap-2 px-1">
                    <span className="material-symbols-outlined text-sm">public</span> Facebook
                  </label>
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] text-sm focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none"
                    type="text"
                    {...campo("facebook")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] leading-[16px] text-[#564245] flex items-center gap-2 px-1">
                    <span className="material-symbols-outlined text-sm">chat</span> WhatsApp
                  </label>
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] text-sm focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none"
                    type="text"
                    {...campo("whatsapp")}
                  />
                </div>
              </div>
            </section>

            <section className="lg:col-span-12 bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] space-y-6">
              <h3 className="text-[24px] leading-[32px] font-semibold">Métodos de Pago</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {["Efectivo", "Tarjeta", "Yape", "Plin", "Transferencia"].map((method) => {
                  const seleccionados = config.metodosPago
                    ? config.metodosPago.split(",").map((s) => s.trim()).filter(Boolean)
                    : [];
                  const checked = seleccionados.includes(method);
                  const toggle = () => {
                    const nuevos = checked
                      ? seleccionados.filter((m) => m !== method)
                      : [...seleccionados, method];
                    setConfig((prev) => ({ ...prev, metodosPago: nuevos.join(",") }));
                  };
                  const isDigital = method === "Yape" || method === "Plin";
                  return (
                    <div key={method} className="group">
                      <div className="flex items-center gap-2 p-4 border border-[#dcc0c4] rounded-2xl group-hover:border-[#ff7e9d] group-hover:bg-[#ff7e9d]/5 transition-all">
                        <input
                          checked={checked}
                          onChange={toggle}
                          className="w-5 h-5 rounded border-[#dcc0c4] text-[#ff7e9d] focus:ring-[#ff7e9d] transition-all"
                          type="checkbox"
                        />
                        <span className="text-sm font-medium flex-1">{method}</span>
                        {isDigital && (
                          <button
                            type="button"
                            onClick={async (e) => {
                              e.stopPropagation();
                              const tipo = method.toUpperCase() as "YAPE" | "PLIN";
                              setModalAbierto(tipo);
                              try {
                                const cfg = await obtenerConfiguracionMetodoPago(tipo);
                                setConfigMetodo(cfg);
                              } catch {
                                setConfigMetodo({
                                  tipo,
                                  nombreTitular: "",
                                  numeroCelular: "",
                                  usuarioVisible: "",
                                  imagenUrl: "",
                                  mensaje: "",
                                  activo: false,
                                });
                              }
                            }}
                            className="px-2 py-1 text-[11px] font-bold text-[#a43756] hover:bg-[#ff7e9d]/10 rounded-lg transition-all"
                          >
                            ⚙️
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="lg:col-span-12 bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] space-y-6">
              <h3 className="text-[24px] leading-[32px] font-semibold">Programa de Fidelización</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] leading-[16px] text-[#564245]">Puntos por cada S/1</label>
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none text-[14px]"
                    type="number"
                    value={config.puntosPorSol}
                    onChange={(e) => setConfig((prev) => ({ ...prev, puntosPorSol: Number(e.target.value) }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] leading-[16px] text-[#564245]">Puntos para recompensa</label>
                  <input
                    className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none text-[14px]"
                    type="number"
                    value={config.puntosRecompensa}
                    onChange={(e) => setConfig((prev) => ({ ...prev, puntosRecompensa: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </section>

            <section className="lg:col-span-12 bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-[#fdd73b]/30 flex items-center justify-center text-[#705d00]">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                </div>
                <h3 className="text-[24px] leading-[32px] font-semibold">Niveles y Beneficios</h3>
              </div>
              {niveles.length === 0 ? (
                <p className="text-sm text-gray-400">Cargando niveles...</p>
              ) : (
                <div className="space-y-4">
                  {niveles.map((nivel) => {
                    const editDto = nivelEditando[nivel.id];
                    const beneficios = editDto?.beneficios || [];
                    const guardando = guardandoNivel[nivel.id];
                    return (
                      <div key={nivel.id} className="border border-[#dcc0c4] rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 bg-[#f8f9fa] border-b border-[#dcc0c4]">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: nivel.colorHex || "#cd7f32" }} />
                            <div>
                              <h4 className="text-[18px] leading-[24px] font-bold text-[#191c1d]">{nivel.nombre}</h4>
                              <p className="text-[12px] text-[#564245]">{nivel.puntosMinimos} pts mínimos &middot; {nivel.puntosPorSoles} pts por S/1</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 space-y-3">
                          {beneficios.length === 0 ? (
                            <p className="text-sm text-gray-400">Beneficios aún no configurados.</p>
                          ) : (
                            beneficios.map((b, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-[#f8f9fa] rounded-xl border border-[#dcc0c4]">
                                <div className="flex-1 space-y-2 min-w-0">
                                  <input
                                    className="w-full h-9 px-3 rounded-lg border border-[#dcc0c4] bg-white focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none text-[13px]"
                                    type="text"
                                    placeholder="Descripción del beneficio"
                                    value={b.descripcion}
                                    onChange={(e) => editarBeneficio(nivel.id, idx, "descripcion", e.target.value)}
                                  />
                                  <div className="flex gap-2">
                                    <select
                                      className="h-9 px-3 rounded-lg border border-[#dcc0c4] bg-white text-[12px] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none"
                                      value={b.tipo || "OTRO"}
                                      onChange={(e) => editarBeneficio(nivel.id, idx, "tipo", e.target.value)}
                                    >
                                      <option value="OTRO">General</option>
                                      <option value="DESCUENTO">Descuento</option>
                                      <option value="PRODUCTO_GRATIS">Producto gratis</option>
                                      <option value="ENVIO_GRATIS">Envío gratis</option>
                                      <option value="EVENTO">Evento</option>
                                    </select>
                                    <input
                                      className="h-9 px-3 rounded-lg border border-[#dcc0c4] bg-white text-[12px] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none w-24"
                                      type="text"
                                      placeholder="Valor"
                                      value={b.valor || ""}
                                      onChange={(e) => editarBeneficio(nivel.id, idx, "valor", e.target.value)}
                                    />
                                  </div>
                                </div>
                                <button
                                  onClick={() => eliminarBeneficio(nivel.id, idx)}
                                  className="text-[#ba1a1a] hover:bg-[#ffdad6] p-2 rounded-lg transition-all flex-shrink-0"
                                >
                                  <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                              </div>
                            ))
                          )}
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => agregarBeneficio(nivel.id)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-[#897175] text-[#a43756] font-bold hover:bg-[#edeeef] transition-all text-sm"
                            >
                              <span className="material-symbols-outlined text-[18px]">add</span>
                              Agregar beneficio
                            </button>
                            <button
                              onClick={() => guardarNivel(nivel.id)}
                              disabled={guardando}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff7e9d] text-[#761235] font-bold hover:brightness-105 active:scale-95 transition-all text-sm disabled:opacity-60"
                            >
                              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
                              {guardando ? "Guardando..." : "Guardar cambios"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <div className="lg:col-span-12 flex justify-start pb-8">
              <button
                onClick={handleGuardar}
                disabled={guardando}
                className="flex items-center gap-3 bg-[#ff7e9d] text-[#761235] px-10 py-4 rounded-2xl font-bold shadow-[0px_10px_30px_rgba(255,126,157,0.12)] hover:brightness-105 active:scale-95 transition-all duration-150 disabled:opacity-60"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
                {guardando ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {modalAbierto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setModalAbierto(null)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[24px] leading-[32px] font-bold">Configurar {modalAbierto}</h3>
              <button onClick={() => setModalAbierto(null)} className="text-[#564245] hover:text-[#ba1a1a] transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl">
                <span className="text-sm font-medium">Activo</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configMetodo.activo}
                    onChange={() => setConfigMetodo((prev) => ({ ...prev, activo: !prev.activo }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff7e9d]" />
                </label>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] leading-[16px] text-[#564245]">Nombre del titular *</label>
                <input
                  className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none text-[14px]"
                  type="text"
                  placeholder="Ej: Heladería Conejito"
                  value={configMetodo.nombreTitular || ""}
                  onChange={(e) => setConfigMetodo((prev) => ({ ...prev, nombreTitular: e.target.value }))}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] leading-[16px] text-[#564245]">Número de celular *</label>
                <input
                  className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none text-[14px]"
                  type="text"
                  placeholder="Ej: 999999999"
                  value={configMetodo.numeroCelular || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 9);
                    setConfigMetodo((prev) => ({ ...prev, numeroCelular: val }));
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] leading-[16px] text-[#564245]">Usuario visible</label>
                <input
                  className="w-full h-11 px-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none text-[14px]"
                  type="text"
                  placeholder="Ej: Heladería Conejito"
                  value={configMetodo.usuarioVisible || ""}
                  onChange={(e) => setConfigMetodo((prev) => ({ ...prev, usuarioVisible: e.target.value }))}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] leading-[16px] text-[#564245]">Mensaje para el cliente</label>
                <textarea
                  className="w-full p-4 rounded-xl border border-[#dcc0c4] bg-[#f8f9fa] focus:border-[#a43756] focus:ring-2 focus:ring-[#a43756]/20 transition-all outline-none resize-none text-[14px]"
                  rows={3}
                  placeholder="Ej: Realiza el pago y adjunta tu comprobante"
                  value={configMetodo.mensaje || ""}
                  onChange={(e) => setConfigMetodo((prev) => ({ ...prev, mensaje: e.target.value }))}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] leading-[16px] text-[#564245]">Imagen QR</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center">
                    {configMetodo.imagenUrl ? (
                      <img src={configMetodo.imagenUrl} alt="QR" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-[10px] text-gray-400 text-center px-2">Sin QR</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      id="qr-file-input"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (!file) return;
                        if (file.size > 5 * 1024 * 1024) {
                          toast.error("La imagen no debe superar los 5MB");
                          return;
                        }
                        setSubiendoQr(true);
                        try {
                          const { url } = await subirImagen(file);
                          const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
                          const apiPrefix = baseUrl.replace(/\/api\/?$/, "");
                          const fullUrl = url.startsWith("http") ? url : `${apiPrefix}${url}`;
                          const actualizado = await subirImagenMetodoPago(modalAbierto, fullUrl);
                          setConfigMetodo(actualizado);
                          toast.success("QR subido correctamente");
                        } catch {
                          toast.error("Error al subir el QR");
                        } finally {
                          setSubiendoQr(false);
                        }
                      }}
                    />
                    <button
                      type="button"
                      disabled={subiendoQr}
                      onClick={() => document.getElementById("qr-file-input")?.click()}
                      className="px-4 py-2 rounded-xl border border-[#897175] text-[#a43756] font-bold hover:bg-[#edeeef] transition-all text-xs disabled:opacity-50"
                    >
                      {subiendoQr ? "Subiendo..." : configMetodo.imagenUrl ? "Cambiar QR" : "Subir QR"}
                    </button>
                    {configMetodo.imagenUrl && (
                      <button
                        type="button"
                        onClick={async () => {
                          setConfigMetodo((prev) => ({ ...prev, imagenUrl: "" }));
                          try {
                            await subirImagenMetodoPago(modalAbierto, "");
                          } catch {}
                        }}
                        className="px-4 py-2 rounded-xl border border-red-200 text-red-500 font-bold hover:bg-red-50 transition-all text-xs"
                      >
                        Quitar QR
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={async () => {
                    if (!configMetodo.nombreTitular?.trim()) {
                      toast.error("El nombre del titular es obligatorio");
                      return;
                    }
                    if (!configMetodo.numeroCelular?.trim() || configMetodo.numeroCelular.length < 9) {
                      toast.error("El número debe tener 9 dígitos");
                      return;
                    }
                    setGuardandoMetodo(true);
                    try {
                      const actualizado = await actualizarConfiguracionMetodoPago(modalAbierto, configMetodo);
                      setConfigMetodo(actualizado);
                      toast.success("Configuración guardada correctamente");
                    } catch {
                      toast.error("Error al guardar la configuración");
                    } finally {
                      setGuardandoMetodo(false);
                    }
                  }}
                  disabled={guardandoMetodo}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#ff7e9d] text-[#761235] px-6 py-3 rounded-2xl font-bold hover:brightness-105 active:scale-95 transition-all disabled:opacity-60"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
                  {guardandoMetodo ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalAbierto(null)}
                  className="flex-1 px-6 py-3 rounded-2xl border border-[#dcc0c4] text-[#564245] font-bold hover:bg-[#f3f4f5] transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-[#ff7e9d]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#fdd73b]/5 blur-[150px] rounded-full" />
      </div>
    </div>
  );
}
