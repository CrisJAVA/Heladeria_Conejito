import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Star, TrendingUp, Gift, Percent, Truck, Medal, Award } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Footer from "../app/components/Footer";

const purchaseHistory = [
  { id: "#102", date: "10/05/2025", total: 45.0, status: "Entregado" },
  { id: "#101", date: "05/05/2025", total: 35.0, status: "Entregado" },
  { id: "#100", date: "01/05/2025", total: 50.0, status: "Entregado" },
  { id: "#99", date: "28/04/2025", total: 22.0, status: "Entregado" },
];

const benefits = [
  { icon: Gift, title: "Producto gratis", desc: "Válido en tu próximo helado triple", bg: "bg-pink-50" },
  { icon: Percent, title: "20% de descuento", desc: "Aplicable en toda la línea artesanal", bg: "bg-blue-50" },
  { icon: Truck, title: "Envío gratis", desc: "Sin mínimo de compra para delivery", bg: "bg-yellow-50" },
];

const discounts = [
  { code: "20% OFF", desc: "En tu próximo pedido", bg: "bg-pink-50", border: "border-pink-300", iconColor: "text-pink-300" },
  { code: "2x1 en", desc: "Milkshakes de estación", bg: "bg-yellow-50", border: "border-yellow-300", iconColor: "text-yellow-300" },
];

const levels = [
  { name: "Bronce", points: 0, unlocked: true },
  { name: "Plata", points: 50, unlocked: true },
  { name: "Oro", points: 100, unlocked: true },
  { name: "Diamante", points: 200, unlocked: false },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    updateUser({ name: form.name, email: form.email });
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fffbf7] flex items-center justify-center">
        <div className="text-center">
          <IceCream className="w-16 h-16 text-[#ff6b9d] mx-auto mb-4" />
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
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-5xl mx-auto w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <h1 className="text-lg font-bold text-[#2d2d2d]">Mi Perfil</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto w-full space-y-6">
        <section className="flex flex-col md:flex-row items-center gap-6 py-6 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 md:px-8">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden bg-gray-100">
              <img alt="Avatar" className="w-full h-full object-cover" src={user.avatar} />
            </div>
            <div className="absolute bottom-1 right-1 bg-[#ff6b9d] text-white p-2 rounded-full border-2 border-white shadow group-hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
          <div className="text-center md:text-left flex-1">
            {editing ? (
              <div className="space-y-3">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none"
                  placeholder="Nombre"
                />
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none"
                  placeholder="Email"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="px-5 py-2 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-medium text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#2d2d2d]">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                  <button
                    onClick={() => setEditing(true)}
                    className="px-5 py-2 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-medium text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
                  >
                    Editar perfil
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Tarjeta de Puntos</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-8 h-8 text-[#ffd93d]" fill="currentColor" />
                <span className="text-4xl font-bold text-[#2d2d2d]">{user.points}</span>
                <span className="text-gray-500 text-sm self-end mb-1">Puntos acumulados</span>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Nivel Actual</p>
                <span className="bg-[#ffd93d]/20 text-[#ffd93d] px-4 py-1 rounded-full font-bold text-sm" style={{ color: "#b8860b" }}>{user.level}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] h-full rounded-full" style={{ width: `${(user.points / user.nextLevelPoints) * 100}%` }} />
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Falta {user.nextLevelPoints - user.points} puntos para el siguiente nivel</span>
                <span className="font-bold">{user.nextLevelPoints} pts</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-gradient-to-br from-[#ffd93d]/20 to-[#ffd93d]/5 rounded-2xl p-6 shadow-sm border border-[#ffd93d]/20 flex flex-col justify-between">
            <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" style={{ color: "#b8860b" }} />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold" style={{ color: "#b8860b" }}>Próximo Regalo</p>
              <p className="text-sm text-gray-600">¡Un Milkshake Premium te espera!</p>
            </div>
          </div>
        </div>

        <section>
          <h3 className="text-xl font-bold text-[#2d2d2d] mb-4">Beneficios Desbloqueados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-md hover:border-[#ff6b9d]/20 transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-full ${b.bg} mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <b.icon className="w-7 h-7 text-[#ff6b9d]" />
                </div>
                <p className="font-bold text-[#2d2d2d]">{b.title}</p>
                <p className="text-sm text-gray-500 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#2d2d2d]">Historial de Compras</h3>
            <button className="text-[#ff6b9d] font-medium text-sm hover:underline flex items-center gap-1">
              Ver más pedidos
              <span className="text-lg">→</span>
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 font-semibold">Pedido</th>
                  <th className="px-5 py-3 font-semibold">Fecha</th>
                  <th className="px-5 py-3 font-semibold">Total</th>
                  <th className="px-5 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {purchaseHistory.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-5 py-4 font-bold text-[#2d2d2d]">{p.id}</td>
                    <td className="px-5 py-4 text-gray-500 text-sm">{p.date}</td>
                    <td className="px-5 py-4 font-bold text-[#ff6b9d]">S/ {p.total.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-[#2d2d2d] mb-4">Descuentos Disponibles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {discounts.map((d) => (
              <div
                key={d.code}
                className={`${d.bg} border-2 border-dashed ${d.border} rounded-2xl p-6 flex items-center justify-between group overflow-hidden relative`}
              >
                <div className="relative z-10">
                  <h4 className="text-3xl font-extrabold text-[#2d2d2d]">{d.code}</h4>
                  <p className="text-gray-600 text-sm">{d.desc}</p>
                  <button className="mt-3 px-5 py-2 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-bold text-sm active:scale-95 transition-transform">
                    Ver detalles
                  </button>
                </div>
                <Award className={`w-24 h-24 ${d.iconColor} absolute -right-4 -bottom-4 rotate-12 opacity-30 group-hover:scale-110 transition-transform`} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-[#2d2d2d] mb-4">Niveles de Cliente</h3>
          <div className="grid grid-cols-4 gap-3">
            {levels.map((l) => (
              <div
                key={l.name}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all ${
                  l.unlocked && l.name === user.level
                    ? "bg-gradient-to-b from-[#ffd93d]/20 to-transparent border-2 border-[#ffd93d] shadow-sm"
                    : l.unlocked
                    ? "bg-white border border-gray-100 shadow-sm"
                    : "bg-gray-50 border border-gray-100 opacity-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    l.unlocked && l.name === user.level
                      ? "bg-[#ffd93d]"
                      : l.unlocked
                      ? "bg-gray-200"
                      : "bg-gray-200"
                  }`}
                >
                  <Medal className={`w-5 h-5 ${l.unlocked && l.name === user.level ? "text-white" : "text-gray-400"}`} />
                </div>
                <span className={`font-bold text-sm ${l.unlocked && l.name === user.level ? "text-[#2d2d2d]" : "text-gray-500"}`}>
                  {l.name}
                </span>
                {l.unlocked && l.name === user.level && (
                  <span className="text-[10px] font-semibold text-[#b8860b] bg-[#ffd93d]/20 px-2 py-0.5 rounded-full">Actual</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
