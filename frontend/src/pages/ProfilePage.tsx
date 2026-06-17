import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, User, Mail, Phone, MapPin, Lock, Eye, EyeOff, Save, Star,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getPerfil, cambiarPassword } from "../services/auth";
import { toast } from "sonner";
import { Toaster } from "../app/components/ui/sonner";
import Footer from "../app/components/Footer";

const purchaseHistory = [
  { id: "#102", date: "10/05/2025", total: 45.0, status: "Entregado" },
  { id: "#101", date: "05/05/2025", total: 35.0, status: "Entregado" },
  { id: "#100", date: "01/05/2025", total: 50.0, status: "Entregado" },
  { id: "#99", date: "28/04/2025", total: 22.0, status: "Entregado" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, token, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ nombre: "", telefono: "", direccion: "" });
  const [error, setError] = useState("");

  const [showPassForm, setShowPassForm] = useState(false);
  const [passForm, setPassForm] = useState({ passwordActual: "", nuevaPassword: "", confirmarPassword: "" });
  const [showNewPass, setShowNewPass] = useState(false);
  const [savingPass, setSavingPass] = useState(false);
  const [passError, setPassError] = useState("");

  useEffect(() => {
    if (user && token) {
      setForm({ nombre: user.nombre, telefono: user.telefono || "", direccion: user.direccion || "" });
    }
  }, [user, token]);

  const handleSaveProfile = async () => {
    if (!form.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await updateProfile({ nombre: form.nombre.trim(), telefono: form.telefono.trim() || null, direccion: form.direccion.trim() || null });
      toast.success("Perfil actualizado correctamente");
      setEditing(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al actualizar perfil");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    if (!passForm.passwordActual || !passForm.nuevaPassword || !passForm.confirmarPassword) {
      setPassError("Todos los campos son obligatorios");
      return;
    }
    if (passForm.nuevaPassword.length < 8) {
      setPassError("La nueva contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (passForm.nuevaPassword !== passForm.confirmarPassword) {
      setPassError("Las contraseñas nuevas no coinciden");
      return;
    }
    setSavingPass(true);
    try {
      await cambiarPassword(token!, {
        passwordActual: passForm.passwordActual,
        nuevaPassword: passForm.nuevaPassword,
        confirmarPassword: passForm.confirmarPassword,
      });
      toast.success("Contraseña actualizada correctamente");
      setShowPassForm(false);
      setPassForm({ passwordActual: "", nuevaPassword: "", confirmarPassword: "" });
    } catch (err) {
      setPassError(err instanceof Error ? err.message : "Error al cambiar contraseña");
    } finally {
      setSavingPass(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fffbf7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#2d2d2d] mb-2">Inicia sesión para ver tu perfil</h2>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col pb-32">
      <Toaster position="top-right" />
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-5xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
          <h1 className="text-lg font-bold text-[#2d2d2d]">Mi Perfil</h1>
          <div className="w-20" />
        </div>
      </header>
      <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto w-full space-y-6">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d]">
              <span className="text-4xl font-bold text-white">{user.nombre.charAt(0).toUpperCase()}</span>
            </div>
            <div className="text-center md:text-left flex-1 w-full">
              {editing ? (
                <div className="space-y-3 max-w-md">
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none" placeholder="Nombre" />
                  </div>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none" placeholder="Teléfono" />
                  </div>
                  <div className="relative">
                    <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none" placeholder="Dirección" />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={handleSaveProfile} disabled={saving} className="px-5 py-2 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-medium text-sm disabled:opacity-50">
                      {saving ? "Guardando..." : "Guardar"}
                    </button>
                    <button onClick={() => { setEditing(false); setForm({ nombre: user.nombre, telefono: user.telefono || "", direccion: user.direccion || "" }); setError(""); }} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium text-sm">Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#2d2d2d]">{user.nombre}</h2>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                  {user.telefono && (
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-500 text-sm">{user.telefono}</p>
                    </div>
                  )}
                  {user.direccion && (
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-500 text-sm">{user.direccion}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                    <button onClick={() => setEditing(true)} className="px-5 py-2 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-medium text-sm shadow-sm hover:shadow-md transition-all active:scale-95">Editar perfil</button>
                    <button onClick={() => setShowPassForm(!showPassForm)} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium text-sm hover:bg-gray-200 transition-all">{showPassForm ? "Cancelar" : "Cambiar contraseña"}</button>
                  </div>
                </>
              )}
            </div>
          </div>

          {showPassForm && (
            <form onSubmit={handleChangePassword} className="mt-6 pt-6 border-t border-gray-100 max-w-md">
              <h3 className="text-sm font-bold text-[#2d2d2d] mb-4">Cambiar contraseña</h3>
              {passError && <p className="text-red-500 text-sm mb-3">{passError}</p>}
              <div className="space-y-3">
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="password" placeholder="Contraseña actual" value={passForm.passwordActual} onChange={(e) => setPassForm({ ...passForm, passwordActual: e.target.value })} className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none" />
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showNewPass ? "text" : "password"} placeholder="Nueva contraseña" value={passForm.nuevaPassword} onChange={(e) => setPassForm({ ...passForm, nuevaPassword: e.target.value })} className="w-full pl-11 pr-11 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none" />
                  <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showNewPass ? "text" : "password"} placeholder="Confirmar nueva contraseña" value={passForm.confirmarPassword} onChange={(e) => setPassForm({ ...passForm, confirmarPassword: e.target.value })} className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none" />
                </div>
                <button type="submit" disabled={savingPass} className="w-full py-2.5 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-medium text-sm disabled:opacity-50">
                  {savingPass ? "Guardando..." : "Actualizar contraseña"}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 md:px-8 py-6">
          <h3 className="text-lg font-bold text-[#2d2d2d] mb-4">Historial de pedidos</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-gray-500 font-medium">Pedido</th>
                  <th className="text-left py-3 text-gray-500 font-medium">Fecha</th>
                  <th className="text-left py-3 text-gray-500 font-medium">Total</th>
                  <th className="text-left py-3 text-gray-500 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50">
                    <td className="py-3 font-medium text-[#2d2d2d]">{order.id}</td>
                    <td className="py-3 text-gray-500">{order.date}</td>
                    <td className="py-3 text-[#ff6b9d] font-medium">S/{order.total.toFixed(2)}</td>
                    <td className="py-3"><span className="px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
