import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, IceCream, Gift, Clock, Users, Cake, Sparkles, Coffee, BadgePercent, Tag, Gem } from "lucide-react";
import Footer from "../app/components/Footer";
import { listarPromocionesActivas, type PromocionDTO } from "../services/promociones";

const ICONOS: Record<string, any> = {
  IceCream, Users, Clock, Cake, Sparkles, Coffee, BadgePercent, Tag, Gift, Gem,
};

function resolverIcono(nombre?: string) {
  if (nombre && ICONOS[nombre]) return ICONOS[nombre];
  return Gift;
}

export default function PromocionesPage() {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState<PromocionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarPromocionesActivas()
      .then(setPromotions)
      .catch(() => setPromotions([]))
      .finally(() => setLoading(false));
  }, []);

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
            <h1 className="text-lg font-bold text-[#2d2d2d]">Promociones</h1>
            <div className="p-2 bg-[#ffd93d]/20 rounded-xl">
              <Gift className="w-5 h-5 text-[#b8860b]" />
            </div>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#2d2d2d] mb-3">¡Aprovecha nuestras ofertas!</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Promociones pensadas para que disfrutes más por menos. Válidas hasta nuevo aviso.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-10">Cargando promociones...</div>
        ) : promotions.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No hay promociones activas por el momento.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {promotions.map((promo) => {
              const Icon = resolverIcono(promo.icono);
              return (
                <div
                  key={promo.id}
                  className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${promo.color || "from-[#ff6b9d] to-[#ff8fab]"} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {promo.descuento && (
                      <span className="px-3 py-1 bg-[#ff6b9d]/10 text-[#ff6b9d] font-bold text-sm rounded-full">
                        {promo.descuento}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-[#2d2d2d] mb-2">{promo.titulo}</h3>
                  <p className="text-sm text-gray-500 mb-4">{promo.descripcion}</p>
                  {promo.diasVigencia && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{promo.diasVigencia}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
