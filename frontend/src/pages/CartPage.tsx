import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, ArrowLeft, Clock, Store, Truck, Smartphone, CreditCard, Banknote, QrCode, IceCream } from "lucide-react";
import { useCart } from "../context/CartContext";
import Footer from "../app/components/Footer";

const SHIPPING_COST = 8;

function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#ff6b9d]/5" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#ffd93d]/5" />
      <div className="absolute top-1/3 -left-10 w-40 h-40 rounded-full bg-[#ff6b9d]/5" />
      <div className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full bg-[#ffd93d]/10" />
      <IceCream className="absolute top-40 left-8 w-12 h-12 text-[#ff6b9d]/5 rotate-12" />
      <IceCream className="absolute bottom-40 right-12 w-16 h-16 text-[#ffd93d]/5 -rotate-12" />
    </div>
  );
}

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const total = deliveryMethod === "delivery" ? subtotal + SHIPPING_COST : subtotal;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fffbf7] flex flex-col relative">
        <BackgroundDecorations />
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-5xl mx-auto w-full">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" /> Volver
            </button>
            <h1 className="text-lg font-bold text-[#2d2d2d]">Tu Pedido</h1>
            <div className="w-20" />
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-[#ff6b9d]/5 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-[#ff6b9d]/40" />
            </div>
            <h2 className="text-xl font-bold text-[#2d2d2d] mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-6">Agrega productos del menú para empezar</p>
            <Link
              to="/menu"
              className="inline-flex px-8 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all"
            >
              Explorar menú
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col relative">
      <BackgroundDecorations />
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-4xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-[#2d2d2d]">Tu Pedido</h1>
            <div className="p-2 bg-[#ffd93d]/20 rounded-xl">
              <ShoppingBag className="w-5 h-5 text-[#b8860b]" />
            </div>
          </div>
          <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium">
            Vaciar
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#2d2d2d]">Revisa y confirma tu selección</h2>
            <p className="text-sm text-gray-500">{items.length} producto{items.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {items.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-4 flex gap-4 relative group transition-all hover:scale-[1.005] border border-gray-100 shadow-sm hover:shadow-md"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-[#2d2d2d]">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{item.description}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center bg-gray-100 rounded-full px-1 py-1">
                    <button
                      onClick={() => updateQuantity(item.name, -1)}
                      className="w-8 h-8 flex items-center justify-center text-[#ff6b9d] font-bold hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-[#2d2d2d] min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.name, 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#ff6b9d] font-bold hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-bold text-xl text-[#ff6b9d]">S/.{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg text-[#2d2d2d] mb-4">Resumen del pedido</h3>
              <div className="space-y-2 border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2d2d2d]">S/.{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Delivery</span>
                  <span className="font-semibold text-[#2d2d2d]">
                    {deliveryMethod === "delivery" ? `S/.${SHIPPING_COST.toFixed(2)}` : "S/.0.00"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-[#2d2d2d]">Total</span>
                <span className="font-bold text-2xl text-[#ff6b9d]">S/.{total.toFixed(2)}</span>
              </div>
            </section>

            <section className="bg-[#ffd9df] p-6 rounded-2xl flex items-center gap-4 border border-[#ff7e9d]/20">
              <div className="w-12 h-12 bg-[#761235] rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#841e3f] uppercase tracking-wider">Tiempo Estimado</p>
                <h4 className="text-xl font-bold text-[#761235]">30 - 40 min</h4>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="font-bold text-lg text-[#2d2d2d] mb-4">Método de entrega</h3>
              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                    deliveryMethod === "pickup"
                      ? "border-[#ff6b9d] bg-[#ffd9df]"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    deliveryMethod === "pickup" ? "border-[#ff6b9d]" : "border-gray-300"
                  }`}>
                    {deliveryMethod === "pickup" && <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b9d]" />}
                  </div>
                  <Store className={`w-5 h-5 ${deliveryMethod === "pickup" ? "text-[#ff6b9d]" : "text-gray-400"}`} />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#2d2d2d]">Recoger en tienda</span>
                    <span className="text-sm text-gray-500">Sin costo adicional</span>
                  </div>
                </label>
                <label
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                    deliveryMethod === "delivery"
                      ? "border-[#ff6b9d] bg-[#ffd9df]"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    deliveryMethod === "delivery" ? "border-[#ff6b9d]" : "border-gray-300"
                  }`}>
                    {deliveryMethod === "delivery" && <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b9d]" />}
                  </div>
                  <Truck className={`w-5 h-5 ${deliveryMethod === "delivery" ? "text-[#ff6b9d]" : "text-gray-400"}`} />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#2d2d2d]">Delivery</span>
                    <span className="text-sm text-gray-500">Llegamos a toda la ciudad</span>
                  </div>
                </label>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg text-[#2d2d2d] mb-4">Método de pago</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "yape", icon: Smartphone, label: "Yape" },
                  { id: "plin", icon: QrCode, label: "Plin" },
                  { id: "card", icon: CreditCard, label: "Tarjeta" },
                  { id: "cash", icon: Banknote, label: "Efectivo" },
                ].map((method) => (
                  <label
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center justify-center p-4 border rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? "border-[#ff6b9d] bg-[#ffd9df] ring-2 ring-[#ff6b9d]/20"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <method.icon className={`w-8 h-8 mb-2 ${paymentMethod === method.id ? "text-[#ff6b9d]" : "text-gray-400"}`} />
                    <span className={`font-semibold text-sm ${paymentMethod === method.id ? "text-[#ff6b9d]" : "text-[#2d2d2d]"}`}>
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="text-center">
          <button
            disabled={!paymentMethod}
            className={`py-4 px-12 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg w-full md:w-auto ${
              paymentMethod
                ? "bg-[#ff7e9d] text-[#761235] hover:shadow-xl cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {paymentMethod ? "Confirmar pedido" : "Selecciona un método de pago"}
          </button>
          <p className="mt-4 text-sm text-gray-500">Al confirmar aceptas nuestros términos y condiciones</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
