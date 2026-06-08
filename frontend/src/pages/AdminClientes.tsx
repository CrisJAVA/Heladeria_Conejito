import { useNavigate } from "react-router-dom";

const clients = [
  {
    id: 1,
    initial: "M",
    avatarBg: "bg-[#ffb1c0]/40",
    avatarText: "text-[#841e3f]",
    name: "María García",
    memberSince: "Desde Ene 2024",
    email: "maria.garcia@email.com",
    phone: "+51 956 123 456",
    orders: 45,
    totalSpent: "S/ 1,890",
    points: 2450,
    level: "Gold",
    levelClass: "bg-[#fdd73b] text-[#554500]",
    lastOrder: "Hoy",
  },
  {
    id: 2,
    initial: "C",
    avatarBg: "bg-[#9bcbf8]/40",
    avatarText: "text-[#104a70]",
    name: "Carlos Mendoza",
    memberSince: "Desde Feb 2024",
    email: "carlos.mendoza@email.com",
    phone: "+51 956 234 567",
    orders: 32,
    totalSpent: "S/ 1,280",
    points: 1850,
    level: "Silver",
    levelClass: "bg-[#cde5ff] text-[#004064]",
    lastOrder: "Ayer",
  },
  {
    id: 3,
    initial: "A",
    avatarBg: "bg-[#ffd9df]/40",
    avatarText: "text-[#841e3f]",
    name: "Ana Torres",
    memberSince: "Desde Mar 2024",
    email: "ana.torres@email.com",
    phone: "+51 956 345 678",
    orders: 28,
    totalSpent: "S/ 1,120",
    points: 1560,
    level: "Silver",
    levelClass: "bg-[#cde5ff] text-[#004064]",
    lastOrder: "Hoy",
  },
  {
    id: 4,
    initial: "R",
    avatarBg: "bg-[#ffe173]/40",
    avatarText: "text-[#554500]",
    name: "Roberto Silva",
    memberSince: "Desde Abr 2024",
    email: "roberto.silva@email.com",
    phone: "+51 956 456 789",
    orders: 15,
    totalSpent: "S/ 630",
    points: 890,
    level: "Bronze",
    levelClass: "bg-[#D98E73]/20 text-[#D98E73]",
    lastOrder: "2 días",
  },
  {
    id: 5,
    initial: "L",
    avatarBg: "bg-[#191c1d]/10",
    avatarText: "text-[#841e3f]",
    name: "Lucía Ramírez",
    memberSince: "Desde May 2024",
    email: "lucia.ramirez@email.com",
    phone: "+51 956 567 890",
    orders: 8,
    totalSpent: "S/ 320",
    points: 450,
    level: "Bronze",
    levelClass: "bg-[#D98E73]/20 text-[#D98E73]",
    lastOrder: "3 días",
  },
];

const filters = ["Todos", "Gold", "Silver", "Bronze"];

export default function AdminClientes() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#e1e3e4] bg-white flex flex-col py-6 px-4 z-50">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>icecream</span>
          </div>
          <div>
            <h1 className="text-[24px] leading-[32px] font-bold text-[#191c1d]">Admin Panel</h1>
            <p className="text-[#564245] text-[12px] leading-[16px] tracking-wider uppercase">Heladería Ica</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => navigate("/admin")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/productos")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">icecream</span>
            Productos
          </button>
          <button
            onClick={() => navigate("/admin/pedidos")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            Pedidos
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#ff7e9d] text-[#761235] font-bold rounded-xl shadow-sm text-[14px] leading-[20px]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            Clientes
          </button>
          <button
            onClick={() => navigate("/admin/configuracion")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">settings</span>
            Configuración
          </button>
        </nav>

        <div className="mt-auto border-t border-[#e1e3e4] pt-4">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6]/10 transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 flex justify-between items-center px-8 z-40 bg-[#f8f9fa]/80 backdrop-blur-md">
        <h2 className="text-[24px] leading-[32px] font-bold text-[#a43756]">Customers</h2>
        <div className="flex items-center gap-6">
          <button className="relative hover:bg-[#f3f4f5] rounded-full p-2 transition-all">
            <span className="material-symbols-outlined text-[#564245]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-[#e1e3e4]">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-[#191c1d] text-[14px] leading-[20px]">Admin</p>
              <p className="text-[#564245] text-[12px] leading-[16px]">Administrador</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#ffd9df] flex items-center justify-center text-[#a43756] font-bold">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="ml-64 mt-16 p-8 w-[calc(100%-16rem)]">
        <div className="mb-8">
          <h3 className="text-[30px] leading-[36px] font-bold text-[#191c1d] mb-1">Clientes</h3>
          <p className="text-[#564245] text-[14px] leading-[20px]">Gestiona tu base de clientes y programa de fidelización</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:translate-y-[-4px] transition-all duration-300">
            <div className="w-12 h-12 bg-[#ffb1c0]/20 rounded-full flex items-center justify-center text-[#a43756] mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
            </div>
            <p className="text-[#564245] text-[12px] leading-[16px] mb-1">Total Clientes</p>
            <p className="text-[22px] leading-[28px] font-black text-[#191c1d]">2,543</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:translate-y-[-4px] transition-all duration-300 border-b-2 border-[#fdd73b]">
            <div className="w-12 h-12 bg-[#ffe173]/20 rounded-full flex items-center justify-center text-[#705d00] mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-[#564245] text-[12px] leading-[16px] mb-1">Nivel Gold</p>
            <p className="text-[22px] leading-[28px] font-black text-[#191c1d]">145</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:translate-y-[-4px] transition-all duration-300">
            <div className="w-12 h-12 bg-[#cde5ff]/40 rounded-full flex items-center justify-center text-[#30628a] mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
            </div>
            <p className="text-[#564245] text-[12px] leading-[16px] mb-1">Puntos Canjeados</p>
            <p className="text-[22px] leading-[28px] font-black text-[#191c1d]">892</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:translate-y-[-4px] transition-all duration-300">
            <div className="w-12 h-12 bg-[#ffd9df]/30 rounded-full flex items-center justify-center text-[#841e3f] mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
            </div>
            <p className="text-[#564245] text-[12px] leading-[16px] mb-1">Nuevos Hoy</p>
            <p className="text-[22px] leading-[28px] font-black text-[#191c1d]">24</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] overflow-hidden border border-[#e1e3e4]">
          <div className="p-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#e1e3e4]">
            <div className="relative w-full max-w-2xl">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#564245]/50">search</span>
              <input
                className="w-full bg-[#f3f4f5] border-none rounded-full py-3 pl-12 pr-6 focus:ring-2 focus:ring-[#ff7e9d] transition-all text-[14px] outline-none"
                placeholder="Buscar clientes..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-6 py-2 rounded-full text-[14px] active:scale-95 transition-all ${
                    filter === "Todos"
                      ? "bg-[#ff7e9d] text-[#761235] font-bold"
                      : "bg-[#f3f4f5] text-[#564245] font-medium hover:bg-[#e7e8e9]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f3f4f5]/50">
                  <th className="px-8 py-4 font-bold text-[12px] leading-[16px] text-[#564245] uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 font-bold text-[12px] leading-[16px] text-[#564245] uppercase tracking-wider">Contacto</th>
                  <th className="px-6 py-4 font-bold text-[12px] leading-[16px] text-[#564245] uppercase tracking-wider">Pedidos</th>
                  <th className="px-6 py-4 font-bold text-[12px] leading-[16px] text-[#564245] uppercase tracking-wider">Total Gastado</th>
                  <th className="px-6 py-4 font-bold text-[12px] leading-[16px] text-[#564245] uppercase tracking-wider">Puntos</th>
                  <th className="px-6 py-4 font-bold text-[12px] leading-[16px] text-[#564245] uppercase tracking-wider">Nivel</th>
                  <th className="px-8 py-4 font-bold text-[12px] leading-[16px] text-[#564245] uppercase tracking-wider">Último Pedido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7e8e9]">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-[#f3f4f5] transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full ${client.avatarBg} flex items-center justify-center ${client.avatarText} font-bold`}
                        >
                          {client.initial}
                        </div>
                        <div>
                          <p className="font-bold text-[#191c1d] text-[14px]">{client.name}</p>
                          <p className="text-[#564245] text-[12px] leading-[16px]">{client.memberSince}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[#564245] text-[14px]">{client.email}</p>
                      <p className="text-[#564245]/60 text-[12px] leading-[16px]">{client.phone}</p>
                    </td>
                    <td className="px-6 py-4 font-black text-[#191c1d]">{client.orders}</td>
                    <td className="px-6 py-4 font-black text-[#a43756]">{client.totalSpent}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#e8c426] scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span className="text-[#191c1d] font-bold">{client.points}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`${client.levelClass} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}
                      >
                        {client.level}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-[#564245]">{client.lastOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-6 flex items-center justify-between bg-[#f3f4f5]/30 border-t border-[#e1e3e4]">
            <p className="text-[#564245] text-[12px] leading-[16px]">Mostrando 1 a 5 de 2,543 clientes</p>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#564245] hover:bg-[#e7e8e9] disabled:opacity-30">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-[#a43756] text-white font-bold text-[14px]">1</button>
              <button className="w-10 h-10 rounded-full text-[#564245] hover:bg-[#e7e8e9] font-medium text-[14px]">2</button>
              <button className="w-10 h-10 rounded-full text-[#564245] hover:bg-[#e7e8e9] font-medium text-[14px]">3</button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#564245] hover:bg-[#e7e8e9]">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#a43756] rounded-full text-white flex items-center justify-center shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
      </button>
    </div>
  );
}
