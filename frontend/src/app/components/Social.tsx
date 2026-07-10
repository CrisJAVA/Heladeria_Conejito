import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Instagram, Facebook, MessageCircle, Bell } from "lucide-react";

const socialLinks = [
  {
    icon: Instagram,
    name: "Instagram",
    handle: "@heladeria.ica",
    color: "from-[#ff6b9d] to-[#ff8fab]",
    description: "Síguenos para ver nuestros nuevos sabores",
  },
  {
    icon: Facebook,
    name: "Facebook",
    handle: "Heladería Ica",
    color: "from-[#a7e4f2] to-[#c3ecf6]",
    description: "Únete a nuestra comunidad",
  },
  {
    icon: MessageCircle,
    name: "WhatsApp",
    handle: "+51 956 789 123",
    color: "from-[#4ade80] to-[#22c55e]",
    description: "Pedidos y consultas rápidas",
  },
];

const instagramPosts = [
  {
    image: "https://images.unsplash.com/photo-1629385701021-fcd568a743e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGFydGlzYW4lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzkxMTk3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: "234",
  },
  {
    image: "https://images.unsplash.com/photo-1718810125230-e8e2271354f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxpY2UlMjBjcmVhbSUyMGFydGlzYW4lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzkxMTk3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: "189",
  },
  {
    image: "https://images.unsplash.com/photo-1663721206074-02fb7b026da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrc2hha2UlMjBkZXNzZXJ0JTIwY29sb3JmdWx8ZW58MXx8fHwxNzc5MTE5Nzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: "312",
  },
  {
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGFydGlzYW4lMjByZXN0YXVyYW50fGVufDF8fHx8MTc3OTExOTc4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: "267",
  },
];

const socialUrls: Record<string, string> = {
  Instagram: "https://instagram.com",
  Facebook: "https://facebook.com",
  WhatsApp: "https://wa.me/51956789123",
};

export default function Social() {
  const [email, setEmail] = useState("");
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#f0f9ff] to-[#fff5f7]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ff6b9d] to-[#a7e4f2] bg-clip-text text-transparent">
              Síguenos y descubre
            </span>
            <br />
            <span className="text-[#2d2d2d]">nuevos sabores</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mantente al día con nuestras promociones, nuevos productos y sorpresas especiales
          </p>
        </motion.div>

        {/* Social media links */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {socialLinks.map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <social.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{social.name}</h3>
                <p className={`text-transparent bg-clip-text bg-gradient-to-r ${social.color} font-medium mb-3`}>
                  {social.handle}
                </p>
                <p className="text-gray-600">{social.description}</p>
                <button onClick={() => { const url = socialUrls[social.name]; if (url) window.open(url, "_blank"); }} className="mt-6 w-full py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-100 rounded-xl font-medium hover:border-gray-200 transition-colors hover:bg-gray-100 cursor-pointer">
                  Conectar →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram feed preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 sm:p-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#ff8fab] flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Instagram</h3>
                <p className="text-gray-600">@heladeria.ica</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://instagram.com", "_blank")}
              className="px-6 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#ff8fab] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow"
            >
              Seguir
            </motion.button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {instagramPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer aspect-square rounded-2xl overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <div className="text-white font-medium">❤️ {post.likes}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-[#ff6b9d] via-[#ff8fab] to-[#ffd93d] rounded-3xl p-8 sm:p-12 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">
            Recibe nuestras promociones
          </h3>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Suscríbete y sé el primero en enterarte de nuevos sabores, ofertas exclusivas y eventos especiales
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!email || !email.includes("@")) {
                  toast.error("Ingresa un correo válido");
                  return;
                }
                toast.success("¡Suscripción exitosa! Pronto recibirás nuestras promociones.");
                setEmail("");
              }}
              className="px-8 py-4 bg-white text-[#ff6b9d] rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Suscribirme
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
