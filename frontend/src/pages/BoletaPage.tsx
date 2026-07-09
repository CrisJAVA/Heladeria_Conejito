import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Store, Truck, CreditCard, Check } from "lucide-react";
import { motion } from "motion/react";
import { obtenerPedido, type PedidoResponse } from "../services/pedidos";

export default function BoletaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<PedidoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    obtenerPedido(Number(id))
      .then(setOrder)
      .catch(() => setError("No se pudo cargar la boleta"))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePrint = () => {
    const win = window.open("", "_blank");
    if (!win || !order) return;
    win.document.write(`
      <html><head>
        <title>Boleta - ${order.codigoPedido}</title>
        <style>
          body { font-family: 'Courier New', monospace; font-size: 12px; color: #333; margin: 0; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; border-bottom: 2px dashed #333; padding-bottom: 15px; }
          .header h1 { font-size: 18px; margin: 0 0 5px; text-transform: uppercase; }
          .header p { margin: 2px 0; font-size: 11px; color: #666; }
          .info-table { width: 100%; margin-bottom: 15px; }
          .info-table td { padding: 3px 5px; font-size: 11px; }
          .info-table td:last-child { text-align: right; font-weight: bold; }
          table.items { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          table.items th { border-bottom: 1px solid #333; padding: 5px; text-align: left; font-size: 10px; text-transform: uppercase; }
          table.items td { padding: 5px; border-bottom: 1px dotted #ccc; font-size: 11px; }
          table.items td:last-child, table.items th:last-child { text-align: right; }
          .totals { border-top: 2px solid #333; padding-top: 10px; margin-top: 5px; }
          .totals table { width: 100%; }
          .totals td { padding: 3px 5px; font-size: 11px; }
          .totals td:last-child { text-align: right; }
          .totals .grand-total td { font-size: 14px; font-weight: bold; border-top: 1px solid #333; padding-top: 8px; }
          .footer { text-align: center; margin-top: 25px; border-top: 2px dashed #333; padding-top: 15px; font-size: 10px; color: #999; }
          .estado { display: inline-block; padding: 2px 10px; border-radius: 3px; font-size: 10px; font-weight: bold; }
          @media print { body { padding: 0; } }
        </style>
      </head><body>
        <div class="header">
          <h1>Heladería Conejito</h1>
          <p>RUC: 12345678901</p>
          <p>Av. Principal 123, Ica - Perú</p>
          <p>Tel: (056) 123-456</p>
        </div>
        <table class="info-table">
          <tr><td>BOLETA N°</td><td>${order.codigoPedido}</td></tr>
          <tr><td>Fecha</td><td>${new Date(order.createdAt).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</td></tr>
          <tr><td>Cliente</td><td>${order.usuarioNombre}</td></tr>
          <tr><td>Método de pago</td><td>${order.metodoPago}</td></tr>
          <tr><td>Entrega</td><td>${order.metodoEntrega}${order.direccionEntrega ? " - " + order.direccionEntrega : ""}</td></tr>
          <tr><td>Estado</td><td><span class="estado">${order.estado}</span></td></tr>
        </table>
        <table class="items">
          <thead><tr><th>Producto</th><th>Cant</th><th>P.Unit</th><th>Subtotal</th></tr></thead>
          <tbody>
            ${order.detalles.map(d => `<tr><td>${d.nombre}</td><td>${d.cantidad}</td><td>S/.${Number(d.precioUnitario).toFixed(2)}</td><td>S/.${Number(d.subtotal).toFixed(2)}</td></tr>`).join("")}
          </tbody>
        </table>
        <div class="totals">
          <table>
            <tr><td>Subtotal</td><td>S/.${Number(order.subtotal).toFixed(2)}</td></tr>
            <tr><td>Costo de envío</td><td>S/.${Number(order.costoEnvio).toFixed(2)}</td></tr>
            <tr class="grand-total"><td>TOTAL</td><td>S/.${Number(order.total).toFixed(2)}</td></tr>
          </table>
        </div>
        <div class="footer">
          <p>¡Gracias por tu compra!</p>
          <p>Vuelve pronto a Heladería Conejito</p>
          <p style="margin-top:10px;font-size:8px;">www.heladeriaconejito.com</p>
        </div>
      </body></html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 500);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#fffbf7] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#ff6b9d] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !order) return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col items-center justify-center gap-4">
      <p className="text-red-500">{error || "Boleta no encontrada"}</p>
      <button onClick={() => navigate(-1)} className="text-[#ff6b9d] font-medium hover:underline">Volver</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-3xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
          <h1 className="text-lg font-bold text-[#2d2d2d]">Boleta de Venta</h1>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all text-sm"
          >
            <Printer className="w-4 h-4" /> Descargar / Imprimir
          </motion.button>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-8 max-w-3xl mx-auto w-full">
        <div ref={printRef} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
          <div id="boleta-content">
            <div className="text-center mb-8 border-b-2 border-dashed border-gray-200 pb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#2d2d2d]">Heladería Conejito</h2>
              <p className="text-gray-400 text-sm">RUC: 12345678901</p>
              <p className="text-gray-400 text-sm">Av. Principal 123, Ica - Perú</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div>
                <p className="text-gray-500">BOLETA N°</p>
                <p className="font-bold text-[#2d2d2d] text-lg">{order.codigoPedido}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Fecha</p>
                <p className="font-semibold text-[#2d2d2d]">{new Date(order.createdAt).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
              </div>
              <div>
                <p className="text-gray-500">Cliente</p>
                <p className="font-semibold text-[#2d2d2d]">{order.usuarioNombre}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Estado</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  order.estado === "ENTREGADO" ? "bg-green-100 text-green-700" :
                  order.estado === "CANCELADO" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>{order.estado}</span>
              </div>
              <div>
                <p className="text-gray-500">Método de pago</p>
                <p className="font-semibold text-[#2d2d2d] flex items-center gap-1"><CreditCard className="w-4 h-4" /> {order.metodoPago}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Entrega</p>
                <p className="font-semibold text-[#2d2d2d] flex items-center gap-1 justify-end">
                  {order.metodoEntrega?.toLowerCase().includes("recojo") ? <Store className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                  {order.metodoEntrega}
                </p>
              </div>
              {order.direccionEntrega && (
                <div className="col-span-2">
                  <p className="text-gray-500">Dirección de entrega</p>
                  <p className="font-semibold text-[#2d2d2d]">{order.direccionEntrega}</p>
                </div>
              )}
            </div>

            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2 border-[#2d2d2d]">
                  <th className="text-left py-3 text-xs uppercase tracking-wider text-gray-500">Producto</th>
                  <th className="text-center py-3 text-xs uppercase tracking-wider text-gray-500">Cant</th>
                  <th className="text-right py-3 text-xs uppercase tracking-wider text-gray-500">P.Unit</th>
                  <th className="text-right py-3 text-xs uppercase tracking-wider text-gray-500">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.detalles.map((d) => (
                  <tr key={d.id} className="border-b border-dotted border-gray-200">
                    <td className="py-4 font-medium text-[#2d2d2d]">{d.nombre}</td>
                    <td className="py-4 text-center text-gray-600">{d.cantidad}</td>
                    <td className="py-4 text-right text-gray-600">S/.{Number(d.precioUnitario).toFixed(2)}</td>
                    <td className="py-4 text-right font-semibold text-[#2d2d2d]">S/.{Number(d.subtotal).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t-2 border-[#2d2d2d] pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-[#2d2d2d]">S/.{Number(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Costo de envío</span>
                <span className="font-medium text-[#2d2d2d]">S/.{Number(order.costoEnvio).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200">
                <span className="text-[#2d2d2d]">TOTAL</span>
                <span className="text-[#ff6b9d]">S/.{Number(order.total).toFixed(2)}</span>
              </div>
            </div>

            <div className="text-center mt-10 border-t-2 border-dashed border-gray-200 pt-8">
              <p className="text-gray-400 text-sm">¡Gracias por tu compra!</p>
              <p className="text-gray-400 text-xs mt-1">Vuelve pronto a Heladería Conejito</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
