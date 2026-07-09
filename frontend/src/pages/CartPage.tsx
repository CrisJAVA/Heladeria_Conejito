import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Minus, Plus, ShoppingBag, ArrowLeft, Clock, Store, Truck,
  Smartphone, CreditCard, Banknote, QrCode, IceCream, Check,
  X, Eye, EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { crearPedido } from "../services/pedidos";
import Footer from "../app/components/Footer";

const SHIPPING_COST = 8;

function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#ff6b9d]/5" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#ffd93d]/5" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="absolute top-1/3 -left-10 w-40 h-40 rounded-full bg-[#ff6b9d]/5" />
      <IceCream className="absolute top-40 left-8 w-12 h-12 text-[#ff6b9d]/5 rotate-12" />
      <IceCream className="absolute bottom-40 right-12 w-16 h-16 text-[#ffd93d]/5 -rotate-12" />
    </div>
  );
}

type PaymentStep = "select" | "yape" | "plin" | "card" | "cash" | "confirming" | "success";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CartPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, updateQuantity, removeFromCart, subtotal, clearCart, syncing } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<PaymentStep>("select");
  const [processing, setProcessing] = useState(false);
  const [orderResult, setOrderResult] = useState<{ codigo: string; total: number; id: number } | null>(null);

  const [yapeOp, setYapeOp] = useState("");
  const [plinOp, setPlinOp] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState(user?.direccion || "");
  const [cardForm, setCardForm] = useState({ titular: "", numero: "", vencimiento: "", cvv: "" });
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
  const [showCardCvv, setShowCardCvv] = useState(false);

  const total = deliveryMethod === "delivery" ? subtotal + SHIPPING_COST : subtotal;

  const metodoPagoId = paymentMethod === "yape" ? 1 : paymentMethod === "plin" ? 2 : paymentMethod === "card" ? 3 : 4;
  const metodoEntregaId = deliveryMethod === "pickup" ? 1 : 2;

  const handleConfirmClick = () => {
    if (!user) { toast.error("Debes iniciar sesión para realizar un pedido"); navigate("/login"); return; }
    if (!paymentMethod) return;
    if (paymentMethod === "cash") { handlePlaceOrder(); return; }
    setPaymentStep(paymentMethod as PaymentStep);
  };

  const validateCard = (): boolean => {
    const errors: Record<string, string> = {};
    if (!cardForm.titular.trim()) errors.titular = "El titular es obligatorio";
    if (!cardForm.numero.trim() || cardForm.numero.replace(/\s/g, "").length < 13) errors.numero = "Número de tarjeta inválido";
    if (!cardForm.vencimiento.trim() || !/^\d{2}\/\d{2}$/.test(cardForm.vencimiento.trim())) errors.vencimiento = "Formato MM/AA";
    if (!cardForm.cvv.trim() || cardForm.cvv.length < 3) errors.cvv = "CVV inválido";
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (numeroOperacion?: string) => {
    setProcessing(true);
    setPaymentStep("confirming");
    try {
      const res = await crearPedido({
        metodoEntregaId,
        metodoPagoId,
        direccionEntrega: deliveryMethod === "delivery" ? deliveryAddress : undefined,
        numeroOperacion,
        detalles: items.map((i) => ({ productoId: i.id || 0, nombre: i.name, imagenUrl: i.image, cantidad: i.quantity, precioUnitario: i.price })),
      });
      setOrderResult({ codigo: res.codigoPedido, total: res.total, id: res.id });
      setPaymentStep("success");
      clearCart();
      toast.success("Pedido realizado correctamente");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo procesar el pedido");
      setPaymentStep("select");
    } finally {
      setProcessing(false);
    }
  };

  const handleCardPay = () => { if (!validateCard()) return; handlePlaceOrder(); };

  if (items.length === 0 && !orderResult) {
    return (
      <div className="min-h-screen bg-[#fffbf7] flex flex-col relative">
          <BackgroundDecorations />
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-5xl mx-auto w-full">
            <motion.button whileHover={{ x: -3 }} onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" /> Volver
            </motion.button>
            <h1 className="text-lg font-bold text-[#2d2d2d]">Tu Pedido</h1>
            <div className="w-20" />
          </div>
        </header>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-[#ff6b9d]/5 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-[#ff6b9d]/40" />
            </div>
            <h2 className="text-xl font-bold text-[#2d2d2d] mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-6">Agrega productos del menú para empezar</p>
            <Link to="/menu" className="inline-flex px-8 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all">Explorar menú</Link>
          </div>
        </motion.div>
        <Footer />
      </div>
    );
  }

  if (paymentStep === "success" && orderResult) {
    return (
      <div className="min-h-screen bg-[#fffbf7] flex flex-col relative">
        <BackgroundDecorations />
        <main className="flex-1 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-[#2d2d2d] mb-2">Pedido realizado correctamente</h2>
            <p className="text-gray-500 mb-6">Gracias por tu compra. Te esperamos pronto.</p>
            <div className="bg-[#fffbf7] rounded-2xl p-6 mb-6 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Número de pedido</span><span className="font-bold text-[#2d2d2d]">{orderResult.codigo}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Total</span><span className="font-bold text-[#ff6b9d]">S/.{orderResult.total.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Estado</span><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">PENDIENTE</span></div>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate(`/boleta/${orderResult.id}`)} className="w-full py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">Ver Boleta</button>
              <button onClick={() => navigate("/mis-pedidos")} className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-all">Ver mis pedidos</button>
              <button onClick={() => navigate("/menu")} className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-all">Seguir comprando</button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col relative">
      <BackgroundDecorations />
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-4xl mx-auto w-full">
          <motion.button whileHover={{ x: -3 }} onClick={() => paymentStep === "select" ? navigate(-1) : setPaymentStep("select")} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver
          </motion.button>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-[#2d2d2d]">Tu Pedido</h1>
            {syncing && <span className="w-4 h-4 border-2 border-[#ff6b9d] border-t-transparent rounded-full animate-spin" />}
            <div className="p-2 bg-[#ffd93d]/20 rounded-xl"><ShoppingBag className="w-5 h-5 text-[#b8860b]" /></div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium">Vaciar</motion.button>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {paymentStep === "select" && (
            <motion.div key="select" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                <div><h2 className="text-xl font-bold text-[#2d2d2d]">Revisa y confirma tu selección</h2><p className="text-sm text-gray-500">{items.length} producto{items.length !== 1 ? "s" : ""}</p></div>
              </motion.div>

              <motion.div variants={containerVariants} className="space-y-4 mb-10">
                {items.map((item) => (
                  <motion.div key={item.name} layout variants={itemVariants} className="bg-white rounded-2xl p-4 flex gap-4 relative group transition-all hover:scale-[1.005] border border-gray-100 shadow-sm hover:shadow-md">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div><h3 className="font-bold text-lg text-[#2d2d2d]">{item.name}</h3><p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{item.description}</p></div>
                        <button onClick={() => removeFromCart(item.name)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-gray-100 rounded-full px-1 py-1">
                          <motion.button whileTap={{ scale: 0.8 }} onClick={() => updateQuantity(item.name, -1)} className="w-8 h-8 flex items-center justify-center text-[#ff6b9d] font-bold hover:bg-gray-200 rounded-full transition-colors"><Minus className="w-4 h-4" /></motion.button>
                          <span className="px-4 font-bold text-[#2d2d2d] min-w-[2rem] text-center">{item.quantity}</span>
                          <motion.button whileTap={{ scale: 0.8 }} onClick={() => updateQuantity(item.name, 1)} className="w-8 h-8 flex items-center justify-center text-[#ff6b9d] font-bold hover:bg-gray-200 rounded-full transition-colors"><Plus className="w-4 h-4" /></motion.button>
                        </div>
                        <span className="font-bold text-xl text-[#ff6b9d]">S/.{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div variants={containerVariants} className="space-y-8">
                  <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg text-[#2d2d2d] mb-4">Resumen del pedido</h3>
                    <div className="space-y-2 border-b border-gray-100 pb-4 mb-4">
                      <div className="flex justify-between text-gray-500 text-sm"><span>Subtotal</span><span className="font-semibold text-[#2d2d2d]">S/.{subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between text-gray-500 text-sm"><span>Delivery</span><span className="font-semibold text-[#2d2d2d]">{deliveryMethod === "delivery" ? `S/.${SHIPPING_COST.toFixed(2)}` : "S/.0.00"}</span></div>
                    </div>
                    <div className="flex justify-between items-center"><span className="font-bold text-lg text-[#2d2d2d]">Total</span><span className="font-bold text-2xl text-[#ff6b9d]">S/.{total.toFixed(2)}</span></div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="bg-[#ffd9df] p-6 rounded-2xl flex items-center gap-4 border border-[#ff7e9d]/20">
                    <div className="w-12 h-12 bg-[#761235] rounded-full flex items-center justify-center"><Clock className="w-6 h-6 text-white" /></div>
                    <div><p className="text-xs font-semibold text-[#841e3f] uppercase tracking-wider">Tiempo Estimado</p><h4 className="text-xl font-bold text-[#761235]">30 - 40 min</h4></div>
                  </motion.div>
                </motion.div>

                <motion.div variants={containerVariants} className="space-y-8">
                  <motion.div variants={itemVariants}>
                    <h3 className="font-bold text-lg text-[#2d2d2d] mb-4">Método de entrega</h3>
                    <div className="space-y-3">
                      {[
                        { id: "pickup" as const, icon: Store, label: "Recoger en tienda", desc: "Sin costo adicional" },
                        { id: "delivery" as const, icon: Truck, label: "Delivery", desc: "Llegamos a toda la ciudad" },
                      ].map((m) => (
                        <label key={m.id} onClick={() => setDeliveryMethod(m.id)} className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${deliveryMethod === m.id ? "border-[#ff6b9d] bg-[#ffd9df]" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryMethod === m.id ? "border-[#ff6b9d]" : "border-gray-300"}`}>
                            {deliveryMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b9d]" />}
                          </div>
                          <m.icon className={`w-5 h-5 ${deliveryMethod === m.id ? "text-[#ff6b9d]" : "text-gray-400"}`} />
                          <div className="flex flex-col"><span className="font-semibold text-[#2d2d2d]">{m.label}</span><span className="text-sm text-gray-500">{m.desc}</span></div>
                        </label>
                      ))}
                    </div>
                    {deliveryMethod === "delivery" && (
                      <div className="mt-3 space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Dirección de entrega *</label>
                        <input
                          type="text"
                          placeholder="Ingresa tu dirección"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none transition-all"
                        />
                      </div>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className="font-bold text-lg text-[#2d2d2d] mb-4">Método de pago</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "yape", icon: Smartphone, label: "Yape" },
                        { id: "plin", icon: QrCode, label: "Plin" },
                        { id: "card", icon: CreditCard, label: "Tarjeta" },
                        { id: "cash", icon: Banknote, label: "Efectivo" },
                      ].map((method) => (
                        <label key={method.id} onClick={() => setPaymentMethod(method.id)} className={`flex flex-col items-center justify-center p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === method.id ? "border-[#ff6b9d] bg-[#ffd9df] ring-2 ring-[#ff6b9d]/20" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
                          <method.icon className={`w-8 h-8 mb-2 ${paymentMethod === method.id ? "text-[#ff6b9d]" : "text-gray-400"}`} />
                          <span className={`font-semibold text-sm ${paymentMethod === method.id ? "text-[#ff6b9d]" : "text-[#2d2d2d]"}`}>{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="text-center">
                <motion.button whileHover={paymentMethod ? { scale: 1.02 } : {}} whileTap={paymentMethod ? { scale: 0.98 } : {}}
                  disabled={!paymentMethod} onClick={handleConfirmClick}
                  className={`py-4 px-12 rounded-2xl font-bold text-lg transition-all shadow-lg w-full md:w-auto ${paymentMethod ? "bg-[#ff7e9d] text-[#761235] hover:shadow-xl cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                  {paymentMethod ? "Confirmar pedido" : "Selecciona un método de pago"}
                </motion.button>
                <p className="mt-4 text-sm text-gray-500">Al confirmar aceptas nuestros términos y condiciones</p>
              </motion.div>
            </motion.div>
          )}

          {paymentStep === "yape" && (
            <motion.div key="yape" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-[#6b3fa0] flex items-center justify-center mx-auto mb-4 shadow-lg"><Smartphone className="w-10 h-10 text-white" /></div>
                  <h2 className="text-2xl font-bold text-[#2d2d2d]">Pago con Yape</h2>
                  <p className="text-gray-500 text-sm mt-1">Escanea el código QR y realiza el pago</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-gray-200 mb-6">
                  <div className="w-48 h-48 bg-gradient-to-br from-[#6b3fa0] to-[#8b5cf6] rounded-2xl mx-auto flex items-center justify-center shadow-inner">
                    <QrCode className="w-32 h-32 text-white opacity-70" />
                  </div>
                </div>
                <div className="bg-[#f8f5ff] rounded-2xl p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Titular</span><span className="font-semibold text-[#2d2d2d]">Heladería Conejito</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Celular</span><span className="font-semibold text-[#2d2d2d]">999 999 999</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Total a pagar</span><span className="font-bold text-[#ff6b9d]">S/.{total.toFixed(2)}</span></div>
                </div>
                <div className="space-y-1.5 mb-6">
                  <label className="text-sm font-medium text-gray-700">Número de operación *</label>
                  <input type="text" placeholder="Ingresa el número de operación de Yape" value={yapeOp} onChange={(e) => setYapeOp(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none transition-all" />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={!yapeOp.trim() || processing} onClick={() => handlePlaceOrder(yapeOp.trim())} className="w-full py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {processing ? "Procesando..." : "Confirmar Pago"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {paymentStep === "plin" && (
            <motion.div key="plin" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-[#00b8a9] flex items-center justify-center mx-auto mb-4 shadow-lg"><QrCode className="w-10 h-10 text-white" /></div>
                  <h2 className="text-2xl font-bold text-[#2d2d2d]">Pago con Plin</h2>
                  <p className="text-gray-500 text-sm mt-1">Escanea el código QR y realiza el pago</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-gray-200 mb-6">
                  <div className="w-48 h-48 bg-gradient-to-br from-[#00b8a9] to-[#00d4c0] rounded-2xl mx-auto flex items-center justify-center shadow-inner">
                    <QrCode className="w-32 h-32 text-white opacity-70" />
                  </div>
                </div>
                <div className="bg-[#f0fffd] rounded-2xl p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Titular</span><span className="font-semibold text-[#2d2d2d]">Heladería Conejito</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Número</span><span className="font-semibold text-[#2d2d2d]">999 888 777</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Total a pagar</span><span className="font-bold text-[#ff6b9d]">S/.{total.toFixed(2)}</span></div>
                </div>
                <div className="space-y-1.5 mb-6">
                  <label className="text-sm font-medium text-gray-700">Número de operación *</label>
                  <input type="text" placeholder="Ingresa el número de operación de Plin" value={plinOp} onChange={(e) => setPlinOp(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none transition-all" />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={!plinOp.trim() || processing} onClick={() => handlePlaceOrder(plinOp.trim())} className="w-full py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {processing ? "Procesando..." : "Confirmar Pago"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {paymentStep === "card" && (
            <motion.div key="card" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#3b82f6] flex items-center justify-center mx-auto mb-4 shadow-lg"><CreditCard className="w-10 h-10 text-white" /></div>
                  <h2 className="text-2xl font-bold text-[#2d2d2d]">Pago con Tarjeta</h2>
                  <p className="text-gray-500 text-sm mt-1">Ingresa los datos de tu tarjeta (simulación académica)</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Titular de la tarjeta</label>
                    <input type="text" placeholder="Nombre del titular" value={cardForm.titular} onChange={(e) => setCardForm({ ...cardForm, titular: e.target.value })} className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none transition-all ${cardErrors.titular ? "border-red-300" : "border-gray-200"}`} />
                    {cardErrors.titular && <p className="text-red-500 text-xs">{cardErrors.titular}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Número de tarjeta</label>
                    <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} value={cardForm.numero} onChange={(e) => setCardForm({ ...cardForm, numero: e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim() })} className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none transition-all ${cardErrors.numero ? "border-red-300" : "border-gray-200"}`} />
                    {cardErrors.numero && <p className="text-red-500 text-xs">{cardErrors.numero}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Vencimiento</label>
                      <input type="text" placeholder="MM/AA" maxLength={5} value={cardForm.vencimiento} onChange={(e) => setCardForm({ ...cardForm, vencimiento: e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5) })} className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none transition-all ${cardErrors.vencimiento ? "border-red-300" : "border-gray-200"}`} />
                      {cardErrors.vencimiento && <p className="text-red-500 text-xs">{cardErrors.vencimiento}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">CVV</label>
                      <div className="relative">
                        <input type={showCardCvv ? "text" : "password"} placeholder="123" maxLength={4} value={cardForm.cvv} onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} className={`w-full px-4 pr-10 py-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b9d] outline-none transition-all ${cardErrors.cvv ? "border-red-300" : "border-gray-200"}`} />
                        <button type="button" onClick={() => setShowCardCvv(!showCardCvv)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showCardCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                      </div>
                      {cardErrors.cvv && <p className="text-red-500 text-xs">{cardErrors.cvv}</p>}
                    </div>
                  </div>
                </div>
                <div className="bg-[#f0f4ff] rounded-2xl p-4 mb-6 flex justify-between items-center"><span className="text-sm text-gray-600">Total a pagar</span><span className="font-bold text-xl text-[#ff6b9d]">S/.{total.toFixed(2)}</span></div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={processing} onClick={handleCardPay} className="w-full py-3 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50">
                  {processing ? "Procesando..." : "Pagar Ahora"}
                </motion.button>
                <p className="text-center text-xs text-gray-400 mt-3">* Simulación académica. No se procesarán pagos reales.</p>
              </div>
            </motion.div>
          )}

          {paymentStep === "cash" && (
            <motion.div key="cash" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center mx-auto mb-4 shadow-lg"><Banknote className="w-10 h-10 text-white" /></div>
                <h2 className="text-2xl font-bold text-[#2d2d2d] mb-2">Pago en Efectivo</h2>
                <p className="text-gray-500 text-sm mb-6">
                  {deliveryMethod === "pickup" ? "Tu pedido ha sido registrado. Podrás realizar el pago al momento de recogerlo en tienda." : "Pago contra entrega. Ten el monto exacto preparado para agilizar la entrega."}
                </p>
                <div className="bg-[#f0fdf4] rounded-2xl p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Método de entrega</span><span className="font-semibold text-[#2d2d2d]">{deliveryMethod === "pickup" ? "Recojo en tienda" : "Delivery"}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Total a pagar</span><span className="font-bold text-lg text-[#ff6b9d]">S/.{total.toFixed(2)}</span></div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={processing} onClick={() => handlePlaceOrder()} className="w-full py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50">
                  {processing ? "Procesando..." : "Confirmar Pedido"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {paymentStep === "confirming" && (
            <motion.div key="confirming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-[#ff6b9d] border-t-transparent rounded-full mb-4" />
              <p className="text-lg font-medium text-[#2d2d2d]">Procesando pedido...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
