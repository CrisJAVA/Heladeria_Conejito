import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Package, Clock, MapPin, CreditCard, Truck, Store } from "lucide-react";
import { listarMisPedidos, type PedidoResponse } from "../services/pedidos";
import Footer from "../app/components/Footer";

const estadoColors: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-700",
  CONFIRMADO: "bg-blue-100 text-blue-700",
  PREPARANDO: "bg-purple-100 text-purple-700",
  EN_CAMINO: "bg-orange-100 text-orange-700",
  ENTREGADO: "bg-green-100 text-green-700",
  CANCELADO: "bg-red-100 text-red-700",
};

export default function MisPedidosPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<PedidoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listarMisPedidos();
      setOrders(data);
    } catch {
      setError("Error al cargar pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-5xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
          <h1 className="text-lg font-bold text-[#2d2d2d]">Mis Pedidos</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 max-w-4xl mx-auto w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#ff6b9d] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-500">Cargando pedidos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={loadOrders} className="text-[#ff6b9d] font-medium hover:underline">Reintentar</button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-[#ff6b9d]/5 flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-[#ff6b9d]/40" />
            </div>
            <h2 className="text-xl font-bold text-[#2d2d2d] mb-2">No tienes pedidos aún</h2>
            <p className="text-gray-500 mb-6">Realiza tu primer pedido desde el menú</p>
            <button onClick={() => navigate("/menu")} className="px-8 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all">
              Ir al menú
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-[#2d2d2d]">{order.codigoPedido}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${estadoColors[order.estado] || "bg-gray-100 text-gray-600"}`}>{order.estado}</span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.detalles.map((d) => (
                    <div key={d.id} className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img alt={d.nombre} className="w-full h-full object-cover" src={d.imagenUrl || `https://placehold.co/100x100/ff6b9d/ffffff?text=${encodeURIComponent(d.nombre.charAt(0))}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#2d2d2d] truncate">{d.nombre}</p>
                        <p className="text-gray-400 text-xs">{d.cantidad} x S/.{Number(d.precioUnitario).toFixed(2)}</p>
                      </div>
                      <span className="font-medium text-[#2d2d2d]">S/.{Number(d.subtotal).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    {order.metodoEntrega?.toLowerCase().includes("recojo") ? <Store className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                    <span>{order.metodoEntrega}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{order.metodoPago}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[#ff6b9d]">Total: S/.{Number(order.total).toFixed(2)}</span>
                  </div>
                  <button onClick={() => navigate(`/boleta/${order.id}`)}
                    className="ml-auto text-xs font-medium text-[#ff6b9d] hover:underline flex items-center gap-1"
                  >
                    Ver Boleta →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
