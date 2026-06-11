import { useNavigate } from "react-router-dom";
import { ArrowLeft, IceCream, Star, Gift, Trophy, Sparkles, Zap, Check } from "lucide-react";
import Footer from "../app/components/Footer";

const levels = [
  {
    name: "Bronce",
    icon: Star,
    minPoints: 0,
    color: "from-amber-600 to-amber-400",
    bgCard: "bg-gradient-to-br from-amber-50 to-amber-100",
    borderColor: "border-amber-300",
    badgeColor: "bg-amber-500",
    benefits: [
      "5% de descuento en tu compra",
      "1 helado gratis al mes",
      "Acceso a promociones exclusivas",
      "Acumula 5 puntos por cada S/ 1",
    ],
  },
  {
    name: "Plata",
    icon: Zap,
    minPoints: 501,
    color: "from-slate-400 to-slate-300",
    bgCard: "bg-gradient-to-br from-slate-50 to-slate-100",
    borderColor: "border-slate-300",
    badgeColor: "bg-slate-400",
    benefits: [
      "10% de descuento en tu compra",
      "2 helados gratis al mes",
      "1 topping gratis por pedido",
      "Prioridad en atención presencial",
      "Acumula 10 puntos por cada S/ 1",
    ],
  },
  {
    name: "Oro",
    icon: Trophy,
    minPoints: 1501,
    color: "from-yellow-500 to-yellow-300",
    bgCard: "bg-gradient-to-br from-yellow-50 to-amber-50",
    borderColor: "border-yellow-400",
    badgeColor: "bg-yellow-500",
    benefits: [
      "15% de descuento en tu compra",
      "3 helados gratis al mes",
      "1 bebida gratis por pedido",
      "Envío delivery gratuito",
      "Invitación a lanzamientos de sabores",
      "Acumula 15 puntos por cada S/ 1",
    ],
  },
  {
    name: "Diamante",
    icon: Sparkles,
    minPoints: 3001,
    color: "from-cyan-500 to-blue-400",
    bgCard: "bg-gradient-to-br from-cyan-50 to-blue-50",
    borderColor: "border-cyan-400",
    badgeColor: "bg-cyan-500",
    benefits: [
      "20% de descuento en tu compra",
      "5 helados gratis al mes",
      "1 pizza personal gratis al mes",
      "Envío delivery gratuito ilimitado",
      "Evento VIP exclusivo anual",
      "Sabor personalizado en tu cumpleaños",
      "Acumula 20 puntos por cada S/ 1",
    ],
  },
];

export default function FidelizacionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#ff6b9d]/5" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#ffd93d]/5" />
        <div className="absolute top-1/3 -left-10 w-40 h-40 rounded-full bg-[#ff6b9d]/5" />
        <div className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full bg-[#ffd93d]/10" />
        <IceCream className="absolute top-40 left-8 w-12 h-12 text-[#ff6b9d]/5 rotate-12" />
        <IceCream className="absolute bottom-40 right-12 w-16 h-16 text-[#ffd93d]/5 -rotate-12" />
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-5xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-[#2d2d2d]">Fidelización</h1>
            <div className="p-2 bg-[#ffd93d]/20 rounded-xl">
              <Gift className="w-5 h-5 text-[#b8860b]" />
            </div>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#2d2d2d] mb-3">Programa de Fidelización</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Mientras más compras, más subes de nivel y más beneficios obtienes. ¡Únete gratis!
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {levels.map((level, i) => (
            <div
              key={level.name}
              className={`${level.bgCard} rounded-2xl border ${level.borderColor} shadow-sm overflow-hidden`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Level header */}
                <div className={`md:w-56 p-6 ${level.bgCard} flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r ${level.borderColor}`}>
                  <div className={`w-16 h-16 rounded-full ${level.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <level.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`px-4 py-1 ${level.badgeColor} text-white text-sm font-bold rounded-full mb-2`}>
                    {level.minPoints === 0 ? "0 pts" : `${level.minPoints}+ pts`}
                  </div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                    {level.name}
                  </h3>
                </div>

                {/* Benefits */}
                <div className="flex-1 p-6">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {level.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full ${level.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fab] rounded-2xl p-8 text-center text-white shadow-lg">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-[#ffd93d]" />
          <h3 className="text-2xl font-bold mb-3">Comienza hoy mismo</h3>
          <p className="text-white/90 mb-6 max-w-lg mx-auto">
            Regístrate gratis y empieza a acumular puntos desde tu primera compra. ¡Te esperamos!
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-white text-[#ff6b9d] rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            Crear cuenta gratis
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
