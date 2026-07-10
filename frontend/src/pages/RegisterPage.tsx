import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IceCream, Mail, Lock, User, Phone, MapPin, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Footer from "../app/components/Footer";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = (): string | null => {
    if (!form.nombre.trim()) return "El nombre es obligatorio";
    if (!form.email.trim()) return "El email es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Formato de email inválido";
    if (!form.password) return "La contraseña es obligatoria";
    if (form.password.length < 8) return "La contraseña debe tener al menos 8 caracteres";
    if (form.password !== form.confirmPassword) return "Las contraseñas no coinciden";
    if (!termsAccepted) return "Debes aceptar los términos y condiciones";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        password: form.password,
        telefono: form.telefono.trim() || undefined,
        direccion: form.direccion.trim() || undefined,
      });
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col">
      <header className="px-4 md:px-8 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center mx-auto mb-4 shadow-lg">
              <IceCream className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#2d2d2d]">Crear Cuenta</h1>
            <p className="text-gray-500 text-sm mt-1">Regístrate y obtén beneficios exclusivos</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Nombre *</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] focus:border-[#ff6b9d] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Correo electrónico *</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] focus:border-[#ff6b9d] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Contraseña *</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] focus:border-[#ff6b9d] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Confirmar contraseña *</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repite la contraseña"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] focus:border-[#ff6b9d] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Teléfono (opcional)</label>
              <div className="relative">
                <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="telefono"
                  type="tel"
                  placeholder="999 999 999"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] focus:border-[#ff6b9d] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Dirección (opcional)</label>
              <div className="relative">
                <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="direccion"
                  type="text"
                  placeholder="Av. Principal 123"
                  value={form.direccion}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] focus:border-[#ff6b9d] outline-none transition-all"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#ff6b9d] focus:ring-[#ff6b9d] accent-[#ff6b9d]"
              />
              <span className="text-sm text-gray-600">
                Acepto los{" "}
                <a
                  href="/terminos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff6b9d] hover:underline font-medium"
                >
                  términos y condiciones
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>

            <p className="text-center text-sm text-gray-500">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[#ff6b9d] hover:underline font-medium"
              >
                Iniciar Sesión
              </button>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
