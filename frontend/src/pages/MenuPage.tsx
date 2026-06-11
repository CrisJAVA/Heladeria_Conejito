import { Link } from "react-router-dom";

export default function MenuPage() {
  const categories = ["Helados", "Milkshakes", "Pizzas", "Combos", "Postres"];

  const products = [
    {
      name: "Copa Artesanal XL",
      price: "S/. 18.50",
      description: "Tres bolas de helado premium a elección, topping de chocolate belga, nueces tostadas y crema chantilly.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDv_RVb0ZUBbz77RnGJUt9I2OcDLfzgfw5nAsKBpJjmO-xXTHH592Vzw1dVpJT6-yrWbj3QmcdZh2zzXLD9JKUFJPr0VazUnICAEGDvUr02p0BdnbLIFf82EtOw5SLEGI6shkjqgbkcgSZzzWS-CCJPqOGXWdsv3uOCf-fwDWuulMhLwLUZfU3w1txekT1-YL_XV001b2m907f8hFTXJwi20Ehszj5UB8it36fmLbKQ3-bxFo7QL-kYSCV30KGgEcC_DrOAOQO7yHI",
      available: true,
    },
    {
      name: "Pizza Pepperoni",
      price: "S/. 32.00",
      description: "Masa artesanal de 24h, salsa de tomates italianos, doble mozzarella y pepperoni premium.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy3hhCK9WgoyFL6fenrM2a0Qq8_54M0Dl8ka5OkrCvF4NBlQZwGCCKy_eBI0pXLBm0Ybg1TFEr64g8bFjuqHkx8jBKdEXcmTC0ELAK0NPn2RPchAQXRx3kUfzgOIX6_mCGj0D75VaIrGARUw7DAitNI3hZ3PsvDKO2NpVx2pDaytC3Ht8PRqn9Yr0wbddcifYfua1frGZ9Li3yEsIG-5cgDYSRD5ufzOzeWt8WeCTkPUFCFdhLdY7ePkAD7YY_TdaXgENiWvb4GcM",
      available: true,
    },
    {
      name: "Milkshake Choco-Lover",
      price: "S/. 15.00",
      description: "Batido de helado de chocolate suizo con trozos de brownie y crema chantilly casera.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcstMdBNxJhIpWQB9OcPGp7fsPOnzGt7mBR68FeQfFuYj9nu1i1SkNGmLH_N-gPsMdojN-rO1DNBcD3xzpxvInlov6AwW2VNyYORV3tdGs6he3F5k_mYOXSzMI9PUbbTc-LiSEgLW7JhMI8jD0Ud-Si8no6VWLjox4fVzPi5U1eTZyiZ-VmP7tTp1Ud78i0lcGJOyrB0OY8EiDzm4_l3rXz3Z3QE7cKW3fa3zLYdeS5bqVZRMXgVFji4bkZsA1G_-o9gwC8WFCKAw",
      available: false,
    },
  ];

  const bestSellers = [
    {
      name: "Helado Oreo Delight",
      price: "S/. 12.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy9D4lwSSnk4LqUR-1-o7THGJswto4FbKBte_gkuzJmPt5rjbFrBBXcMzDyKQkLzea-rLueN0OYUsWJRNkCFeBm-Uco4z7VScmIAkgjMMWtgTO2wselyPb6-YXtWiXYwN6-sFWeKBW-HJULGfbtERgSMDDuNAtQwYWXJq4yfDykDsvW48dOzZb5tsa47TKsiYO3XNFiOGD1FYECOy9lB3tJEJ6juPB1NLqqp5Ns6s5GZRWDoRs35KA8X6UwJkPchoA1bl1pd2KVzc",
    },
    {
      name: "Pack 4 Donuts",
      price: "S/. 20.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ0rSUsoGCy2a9lvuCncV_aVE2hWf00NvGASMH2G35bURApre6i1GeLf9cpf--OiWv1s9k42QsVbfArjHUBjQ9aHH5tvPUHBO_RZx58o2zBX4atGkF7ZJKqqpgJ52M9CKfPouQTKOy2adZz3ktke0oewkpnKAkUphefA2R4eM9c72fTRD6pq1xV9B_MKIXJu_Jba4gRbDL9N9POj3m1Vmf97W3VGoKy4X2MjhVQKwio391rvmvBwGMLdBDNAq2YmIDKhNpTWABpsA",
    },
    {
      name: "Pie de Limón",
      price: "S/. 9.50",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGpEzetzMsTyWiZmALj2sCwYcLHEnPKZmygOtMyRh1Rm_hnVYMfEFbZo89Hcp1Lh7ToBs0TrFZ-gwy8q5Bgjhw1xS4HkSievO0MUbS11E19juUZaZIi2Z3Y5glBmgbqaG6UeOIf8prHbnwv8m4kpjxGgAUrRvUxgVo3H6ykaNYqwFSSgQ44BM5KQiCk8GVPOZPyqqPAz1ju7eTWTevmaWUxfyqtzEqk9tFPyq9BaLPrK5dLdSMkgSlVtwYZgxV-KpLUQx8I6DWcwk",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0" style={{ backgroundColor: "#f8f9fa", color: "#191c1d" }}>
      <header className="top-0 z-50 border-b shadow-sm flex justify-between items-center px-8 py-4 w-full sticky" style={{ backgroundColor: "#f8f9fa", borderColor: "#dcc0c4" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#ff7e9d", color: "#761235" }}>
            <img
              alt="Heladería Conejito Logo"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaBkx-B-5ibJHHi0aigLmZoMCKIL9ViUgelkwjoCp1VQYGlyNQ9Oc7v45K5806EDH5XLuLfKqs16SxMwFI6arhp-mRoCwFnCaJc5QFsaR8wObvjSIOW3P7vrTDe8N3ndW4L5so3NtJvhlOyjg76w6N_YrB22EG-Vr4YXnPeYxPvklq1gKdaWoJqLmyyMSlwJ__t_XP3981yt0Q1cHJBzFgJ_k1hlKp_e5j1SwqgDXWS3ydHghbgvKCE_PLnBWRy6v1EtolnggoeV4"
            />
          </div>
          <h1 className="text-[30px] leading-[36px] font-bold" style={{ color: "#a43756" }}>Dulce Gestión</h1>
        </div>
        <button className="hover:opacity-80 transition-colors p-2 rounded-full active:scale-95" style={{ color: "#a43756" }}>
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-12">
        <section className="space-y-4">
          <h2 className="text-[24px] leading-[32px] font-semibold" style={{ color: "#191c1d" }}>Categorías</h2>
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#ff7e9d transparent" }}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-6 py-2 whitespace-nowrap rounded-2xl font-medium text-[12px] leading-[16px] tracking-[0.05em] transition-all ${
                  i === 0
                    ? "shadow-md hover:scale-105"
                    : "border hover:border-[#ff7e9d]"
                }`}
                style={
                  i === 0
                    ? { backgroundColor: "#a43756", color: "#ffffff" }
                    : { backgroundColor: "#ffffff", color: "#564245", borderColor: "#dcc0c4" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl h-56 flex items-center shadow-xl group" style={{ backgroundColor: "#a43756" }}>
          <div className="absolute inset-0 z-0">
            <img
              alt="Promo Background"
              className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBhFZZXQpK_XSBGMs3s4FROWJ_1H2_kDkQKsFE0_SDwphLDc6mXaK_GYdkMqnrCGTU3dgInXSeQKtyG4addKwgyFIhMaV-vCv4rmTXE83IFVLKf-HOpR5oHnseHyKpioGPvFjWORMxhqr4ENa170-Y9VXYsdkxILZT82Q8XQ5H_Wf9b6oBuo3a24xmHl0tXSxythOQJHP07NFdDrWeKkOHkoX5KVw79Q5v3FnUYqtzu5biWdAmklUX-bSJ7mnu2c26HK9qMM_RT08"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #a43756, transparent)" }}></div>
          </div>
          <div className="relative z-10 px-8 max-w-md space-y-4">
            <h2 className="text-[30px] leading-[36px] font-bold text-white leading-tight">
              Disfruta tus sabores favoritos sin esperas
            </h2>
            <button
              className="px-6 py-3 font-medium text-[12px] leading-[16px] tracking-[0.05em] rounded-xl shadow-lg hover:shadow-2xl transition-shadow active:scale-95"
              style={{ backgroundColor: "#fdd73b", color: "#715d00" }}
            >
              Ordenar ahora
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#564245" }}>search</span>
            <input
              className="w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-2 focus:ring-[#ff7e9d] outline-none transition-all"
              placeholder="Buscar sabores o productos..."
              type="text"
              style={{ backgroundColor: "#ffffff", borderColor: "#dcc0c4" }}
            />
          </div>
          <div className="md:col-span-4 flex gap-2">
            <select
              className="flex-1 px-4 py-3 border rounded-2xl text-[14px] leading-[20px] focus:ring-2 outline-none transition-all"
              style={{ backgroundColor: "#ffffff", borderColor: "#dcc0c4" }}
            >
              <option>Todas las categorías</option>
              <option>Helados</option>
              <option>Pizzas</option>
            </select>
            <button
              className="px-6 font-medium text-[12px] leading-[16px] tracking-[0.05em] rounded-2xl border transition-colors"
              style={{ backgroundColor: "#e7e8e9", color: "#191c1d", borderColor: "#dcc0c4" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ff7e9d"; e.currentTarget.style.color = "#761235"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#e7e8e9"; e.currentTarget.style.color = "#191c1d"; }}
            >
              Filtrar
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-[24px] leading-[32px] font-semibold" style={{ color: "#191c1d" }}>Todos los Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-2xl overflow-hidden transition-all group border border-transparent"
                style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 10px 30px rgba(255,126,157,0.12)"; e.currentTarget.style.borderColor = "rgba(255,126,157,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0px 4px 20px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "transparent"; }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={product.image}
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-[12px] leading-[16px] font-medium tracking-[0.05em] rounded-full ${
                      product.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.available ? "Disponible" : "Agotado"}
                  </span>
                </div>
                <div className={`p-6 space-y-3 ${!product.available && "opacity-80"}`}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-[16px] leading-[24px] font-bold" style={{ color: "#191c1d" }}>{product.name}</h3>
                    <span className="font-bold text-[22px] leading-[28px]" style={{ color: "#a43756" }}>{product.price}</span>
                  </div>
                  <p className="text-[14px] leading-[20px] line-clamp-2" style={{ color: "#564245" }}>{product.description}</p>
                  {product.available ? (
                    <button
                      className="w-full py-3 font-medium text-[12px] leading-[16px] tracking-[0.05em] rounded-xl transition-all flex items-center justify-center gap-2"
                      style={{ backgroundColor: "#ff7e9d", color: "#761235" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#a43756"; e.currentTarget.style.color = "#ffffff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ff7e9d"; e.currentTarget.style.color = "#761235"; }}
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Agregar
                    </button>
                  ) : (
                    <button className="w-full py-3 font-medium text-[12px] leading-[16px] tracking-[0.05em] rounded-xl cursor-not-allowed" style={{ backgroundColor: "#edeeef", color: "#564245" }} disabled>
                      No disponible
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end px-2">
            <div>
              <h2 className="text-[24px] leading-[32px] font-semibold" style={{ color: "#191c1d" }}>Más Vendidos</h2>
              <p className="text-[14px] leading-[20px]" style={{ color: "#564245" }}>Los favoritos de nuestra comunidad en Ica</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors" style={{ borderColor: "#dcc0c4" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ff7e9d"; e.currentTarget.style.color = "#761235"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "inherit"; }}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors" style={{ borderColor: "#dcc0c4" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ff7e9d"; e.currentTarget.style.color = "#761235"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "inherit"; }}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-hidden p-2">
            {bestSellers.map((item) => (
              <div
                key={item.name}
                className="flex-shrink-0 w-64 bg-white rounded-2xl p-4 shadow-sm border transition-colors"
                style={{ borderColor: "rgba(220,192,196,0.3)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ff7e9d"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(220,192,196,0.3)"; }}
              >
                <div className="w-full h-40 rounded-xl overflow-hidden mb-4" style={{ backgroundColor: "#edeeef" }}>
                  <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                </div>
                <h4 className="font-bold mb-1" style={{ color: "#191c1d" }}>{item.name}</h4>
                <p className="font-bold mb-4" style={{ color: "#a43756" }}>{item.price}</p>
                <button
                  className="w-full py-2 font-medium text-[12px] leading-[16px] tracking-[0.05em] rounded-lg transition-all"
                  style={{ backgroundColor: "rgba(255,126,157,0.1)", color: "#a43756" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ff7e9d"; e.currentTarget.style.color = "#761235"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,126,157,0.1)"; e.currentTarget.style.color = "#a43756"; }}
                >
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full py-12 mt-auto border-t flex flex-col items-center gap-6 px-8" style={{ backgroundColor: "#191c1d", borderColor: "#dcc0c4" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-7xl">
          <div className="space-y-4">
            <div className="font-bold text-lg" style={{ color: "#a43756" }}>Heladería Conejito</div>
            <p className="opacity-80 text-[12px] leading-[16px] font-medium tracking-[0.05em]" style={{ color: "#e1e3e4" }}>
              Tu oasis de frescura en el corazón de Ica. Helados artesanales y pizzas deliciosas desde 2020.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-white">Contacto</h4>
            <div className="opacity-80 text-[12px] leading-[16px] space-y-2" style={{ color: "#e1e3e4" }}>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">location_on</span> Av. Principal 123, Ica, Perú
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">call</span> +51 999 999 999
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">mail</span> hola@heladeriaica.pe
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-white">Horarios</h4>
            <div className="opacity-80 text-[12px] leading-[16px] space-y-2" style={{ color: "#e1e3e4" }}>
              <p className="flex justify-between"><span>Lunes-Viernes</span> <span>10:00 - 22:00</span></p>
              <p className="flex justify-between"><span>Sábado</span> <span>09:00 - 23:00</span></p>
              <p className="flex justify-between"><span>Domingo</span> <span>09:00 - 21:00</span></p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-white">Enlaces</h4>
            <div className="flex flex-col gap-2 opacity-80 text-[12px] leading-[16px]" style={{ color: "#e1e3e4" }}>
              <a className="hover:opacity-100 transition-colors" href="#">Privacidad</a>
              <a className="hover:opacity-100 transition-colors" href="#">Términos</a>
              <a className="hover:opacity-100 transition-colors" href="#">Contacto</a>
            </div>
          </div>
        </div>
        <div className="w-full pt-8 border-t border-white/10 flex flex-col items-center gap-4">
          <div className="font-medium text-[12px] leading-[16px] tracking-[0.05em] text-white">
            &copy; 2024 Heladería Conejito. Sabores que inspiran.
          </div>
        </div>
      </footer>

      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 flex justify-around items-center z-50 rounded-t-xl shadow-lg border-t px-4" style={{ backgroundColor: "#f8f9fa", borderColor: "#dcc0c4" }}>
        <Link className="flex flex-col items-center justify-center rounded-full px-4 py-1 active:scale-110 transition-transform duration-200" to="/menu" style={{ backgroundColor: "#ff7e9d", color: "#761235" }}>
          <span className="material-symbols-outlined">restaurant_menu</span>
          <span className="font-medium text-[12px] leading-[16px] tracking-[0.05em]">Menú</span>
        </Link>
        <Link className="flex flex-col items-center justify-center transition-colors" to="#" style={{ color: "#564245" }}>
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="font-medium text-[12px] leading-[16px] tracking-[0.05em]">Pedidos</span>
        </Link>
        <Link className="flex flex-col items-center justify-center transition-colors" to="#" style={{ color: "#564245" }}>
          <span className="material-symbols-outlined">person</span>
          <span className="font-medium text-[12px] leading-[16px] tracking-[0.05em]">Perfil</span>
        </Link>
        <Link className="flex flex-col items-center justify-center transition-colors" to="#" style={{ color: "#564245" }}>
          <span className="material-symbols-outlined">info</span>
          <span className="font-medium text-[12px] leading-[16px] tracking-[0.05em]">Nosotros</span>
        </Link>
      </nav>

      <button className="md:hidden fixed bottom-20 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-[55] active:scale-90 transition-transform" style={{ backgroundColor: "#a43756", color: "#ffffff" }}>
        <span className="material-symbols-outlined text-[28px]">shopping_basket</span>
        <span className="absolute -top-1 -right-1 w-6 h-6 text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white" style={{ backgroundColor: "#fdd73b", color: "#715d00" }}>2</span>
      </button>
    </div>
  );
}
