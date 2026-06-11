import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Clock, MapPin, Smartphone, MessageCircle, Camera, Star,
  Image, Phone, Mail, Send, ChevronLeft, ChevronRight, IceCream
} from "lucide-react";
import Footer from "../app/components/Footer";

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

const testimonials = [
  {
    name: "María Fernanda",
    text: "Los helados de Conejito son deliciosos, mis favoritos son el de fresa y lúcuma. ¡Siempre vuelvo por más!",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6MPIGsi7JQbC9KzWrOGHavwJK8liUhv5DHs-I51ot8Nxa_MTvFIFFC-pTPQYJK2vI68vJDIWlI3gNRatAzdCqu7eubhfWjFN4bUNNQfXWsNJ36FfoAeIZs7OsSOY2O67iqils74Y2WvLIgSp6jcSsXMEPEZbADr3lC6Yvr7elnnX6PNLtKLMzeZY-ywyyFKSdJVd4HvofCj0OXygUpNWYU5lyz848_mBLmsjRnUk9CONBm7g3001XVX5c0YPLBu7MSWQcfiU8pJM",
  },
  {
    name: "Carlos Ramírez",
    text: "Excelente atención y ambiente muy acogedor. Perfecto para disfrutar con amigos y familia.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ1HaK7Xu0s7palUT18Uph3hh_eazpxGH6jD5O63wHYg6tqt_Ghwgjvaii-DxxcZQ2XF0jQpr_m6PIsCCTmgcY6pNmi-V4NwSWrs2JLenGBwYr3xsCiWUejowC2ejRuoxrhO7UnrM_BASOWNiNKBNgmWm7AWyiO1HxtcS0cAA_enOLcWyUcfA0hnFld0VsAaK0toqtsW5riLE2b0fQlG73CaENlKSkBzX2CYVq6TAKPkfasnNzJpWC5BbtL_UpsdMzZbMlw7Kluug",
  },
  {
    name: "Natalia Quispe",
    text: "Me encanta la variedad de sabores, se nota la calidad en cada helado. ¡Totalmente recomendados!",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkaVbidUIsFJyyggF10blfEYCKrjyKNGKZH81PeXWmWHT5uhjhscrrgkLBTbOsC-P0f4EV70zvemNU00-uC5O-YgUNzaciWPXqtjjkx3vVAWO4lgcjyliIRU7vyel1PnNT0C9tmfvYKTvXa4uzTSkN_S_d_5qRETmrta7OMkY_aYykAdnBmfhJoeVL8fdP55tPoBjK2uJZI7Rd0Gn3UKw3biJI3qcbUGrw23PO105i7WDCY2OLkVdmrHBx4qpzcJQHkktt73s0xYI",
  },
];

const gallery = [
  {
    alt: "Interior del local",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1S3t78LaE3V66TrUo56gj9LHgF3sltCBTy7XmjoOjgGsAGBsPaVt6Ufm3TnO20_VGqeY-SBfbP2d1A_kZTSaZynJgQ4kfZltz4Y8fEhBe6ZC4WDickv5J61n_w1MJBw-_kG6PXRYpxJmCTAx4Qh1f1p2ZOf94HdoBeGRBiPU7gOgdje-QyU1wwUBTCgnr_k3vBHEHDTcX3wQSFeKSvkqVHiyXrFiM3fIXU6Jk4Q8BjZnngk2WcVPUoQyDToOta5EI5uo8G4Fz7dk",
  },
  {
    alt: "Detalle de helados",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpI-_vpVg3QDlny6Td8p1yUFmyGMa0vRpC43TOjPVyiP663cSSF3Ea4YzenXHxa_6v6ci1T0HR-c0gajpD9bLy7C9G3Cjdu2AGDR6heWXqxvvG7HVkrlPjSJVDpiyWr-0W9Bl7qNKB7pfbdO9QwKX_bg4I18eR1OsMVtQiA-YviflnPXyP7I_zOcl3lsn908OnxOvBMhFfHYvnkJis3V-OuxQIgH42RZSEOAgQfqVnMCzdKxq2x-yuQekyGC9uxluoFe9ItLFUQSk",
  },
  {
    alt: "Zona de mesas",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9hr8VuK7UNu0fhdCUAxt2w7NMI0IN1JVCMlTGWhL4NhdyRYM7XvihGZm8hT61Mwp78sm49G9pjCLLeBIXgyEXWuVRFSzDmZRlUJlidb2ucITFuzqEVTfBYONdjpt9LCBAWEETovBGGIDUGKgkZ5tjwEKyWYRQfIhIcwyFEYf05vzzVsqCpWLq5fA8hGuB_z2cuQRxF9AYIGEQtu8TrDr_GRdL-pPAdT_yeeieqJIrrC23-T2_ys9D1sDlSWexGpH0dMMN9myF8nU",
  },
  {
    alt: "Fachada",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8pnJfQKqUY2hDusTrJss55-oxIWIdYDlt29eAGmi6ddGpwE0Byez9BOl1OHb5KUX8filDi_C6Lrn6715YMW2u57_T_fEF8Ok53QyJlmHgtS7Z5Ybi1EZcPukQzdf6ttmVedlEMo2RGchl5rP382Jp4ltrALaeUt_Hjn5A-hSRrtObsKuITw5v_dCgLlvUIBLWSweA8ohly7JKHcG1-RlxEhH9IwlHwvdpsEh54hBd3PIIvfZHIcugkFOwqVHueBCE_Y2-6E-zH7Q",
  },
];

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffbf7] flex flex-col relative">
      <BackgroundDecorations />

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-4xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-[#ff6b9d] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-[#2d2d2d]">Contáctanos</h1>
            <div className="p-2 bg-[#ff6b9d]/10 rounded-xl">
              <Smartphone className="w-5 h-5 text-[#ff6b9d]" />
            </div>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-grow pb-24">
        {/* Hero / Map */}
        <section className="w-full px-4 md:px-8 pt-6 max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-sm h-64 w-full relative">
            <div className="absolute inset-0 bg-gray-200">
              <img
                alt="Mapa de Ica, Perú"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeXHfLiFK2mPLA-Zj6MwnT1R9yLUPSoJqV3vCE-5H9z2zmLB57GAjLgc9g1V8jzJw-297lN8RFInJEK4wfq54Agpri32vqj4Ni6pxqF4tD-Ry6ORVmFsdQvMqylvgu_x0Mv2HAFhI2IN___cvNMcP2s1sj8BnCq2MzsfYdwC34s2dg1YdkVMoFTOgeYVTG85LmUax2dhDe8UQJDhsGugMmkuLTv-vrHK_KcKGfSn5bk-_nSiMYJnZwXyGCKcbsNb5WgXAYULrNOk4"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-gray-200 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#ff6b9d]" />
              <span className="text-sm text-[#2d2d2d]">Juan Pablo Fernandini 203, Ica 11001</span>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8 mt-6 max-w-4xl mx-auto">
          {/* Horario */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#ffd93d]/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#b8860b]" />
              </div>
              <h2 className="text-xl font-bold text-[#2d2d2d]">HORARIO DE ATENCIÓN</h2>
            </div>
            <div className="space-y-3 text-[#4a4a4a]">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>Lunes - Viernes</span>
                <span className="font-semibold">10:00 - 22:00</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>Sábado</span>
                <span className="font-semibold">09:00 - 23:00</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>Domingo</span>
                <span className="font-semibold">09:00 - 23:00</span>
              </div>
              <p className="text-[#ff6b9d] font-bold mt-4 text-center tracking-widest">¡TE ESPERAMOS!</p>
            </div>
          </div>

          {/* Info del Local */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#ff6b9d]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#ff6b9d]" />
              </div>
              <h2 className="text-xl font-bold text-[#2d2d2d]">INFORMACIÓN DEL LOCAL</h2>
            </div>
            <ul className="space-y-4 text-[#4a4a4a]">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#2d7d46]" />
                <span>Juan Pablo Fernandini 203, Ica 11001</span>
              </li>
              <li className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-[#ff6b9d]" />
                <span>+51 999 999 999</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span>+51 988 888 888</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>Heladería Conejito Ica</span>
              </li>
              <li className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-pink-600" />
                <span>@conejitoheladeria</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Formulario */}
        <section className="px-4 md:px-8 mt-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-[#2d2d2d]">Envíanos un mensaje</h2>
            <Send className="w-6 h-6 text-[#ff6b9d]" />
          </div>
          <form className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Nombre</label>
              <input
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#ff6b9d] focus:ring-1 focus:ring-[#ff6b9d] outline-none transition-all"
                placeholder="Escribe tu nombre"
                type="text"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Correo Electrónico</label>
              <input
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#ff6b9d] focus:ring-1 focus:ring-[#ff6b9d] outline-none transition-all"
                placeholder="ejemplo@correo.com"
                type="email"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Teléfono</label>
              <input
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#ff6b9d] focus:ring-1 focus:ring-[#ff6b9d] outline-none transition-all"
                placeholder="999 999 999"
                type="tel"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Mensaje</label>
              <textarea
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#ff6b9d] focus:ring-1 focus:ring-[#ff6b9d] outline-none transition-all resize-none"
                placeholder="¿En qué podemos ayudarte?"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ff7e9d] text-[#761235] font-bold text-lg py-4 rounded-xl shadow-md active:scale-95 transition-transform hover:opacity-90"
            >
              Enviar mensaje
            </button>
          </form>
        </section>

        {/* Testimonios */}
        <section className="mt-16 bg-[#ffd9df]/30 py-12">
          <div className="text-center mb-8 px-4 md:px-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-[#2d2d2d] flex items-center justify-center gap-2">
              <span className="text-[#ff6b9d]">♥</span> Lo que dicen nuestros clientes <span className="text-[#ff6b9d]">♥</span>
            </h2>
          </div>
          <div className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-6 max-w-4xl mx-auto scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {testimonials.map((t) => (
              <div key={t.name} className="flex-shrink-0 w-80 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-[#ffd9df] overflow-hidden">
                  <img alt={t.name} className="w-full h-full object-cover" src={t.img} />
                </div>
                <div className="flex justify-center gap-1 mb-3 text-[#ffd93d]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic mb-4">"{t.text}"</p>
                <p className="text-xs font-semibold text-[#ff6b9d] uppercase tracking-wider">{t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Galería */}
        <section className="mt-16 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Image className="w-7 h-7 text-[#ff6b9d]" />
            <h2 className="text-xl font-bold text-[#2d2d2d]">Conoce nuestro ambiente</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((photo, i) => (
              <div key={i} className="h-48 rounded-2xl overflow-hidden shadow-sm group cursor-pointer relative">
                <img
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={photo.img}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#ff6b9d] hover:bg-[#ff6b9d] hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#ff6b9d] hover:bg-[#ff6b9d] hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
