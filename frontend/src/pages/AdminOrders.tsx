import { useNavigate } from "react-router-dom";

const orders = [
  {
    id: "#1234",
    client: "María García",
    phone: "+51 956 123 456",
    items: ["2x Cono Triple Arcoíris", "1x Pizza Personal"],
    total: "S/ 42.00",
    payment: "Efectivo",
    status: "En preparación",
    statusClass: "bg-[#ffe173] text-[#554500]",
    statusIcon: "cooking",
    date: "10:30 AM",
    fullDate: "8 Jun 2026",
  },
  {
    id: "#1233",
    client: "Carlos Mendoza",
    phone: "+51 956 234 567",
    items: ["1x Milkshake de Fresa"],
    total: "S/ 15.00",
    payment: "Tarjeta",
    status: "Listo",
    statusClass: "bg-green-100 text-green-700",
    statusIcon: "check",
    date: "10:25 AM",
    fullDate: "8 Jun 2026",
  },
  {
    id: "#1232",
    client: "Ana Torres",
    phone: "+51 956 345 678",
    items: ["1x Combo Familiar"],
    total: "S/ 45.00",
    payment: "Yape",
    status: "Entregado",
    statusClass: "bg-[#cde5ff] text-[#004064]",
    statusIcon: "local_shipping",
    date: "10:15 AM",
    fullDate: "8 Jun 2026",
  },
  {
    id: "#1231",
    client: "Roberto Silva",
    phone: "+51 956 456 789",
    items: ["3x Copa de Chocolate", "1x Pizza BBQ"],
    total: "S/ 52.00",
    payment: "Efectivo",
    status: "En preparación",
    statusClass: "bg-[#ffe173] text-[#554500]",
    statusIcon: "cooking",
    date: "10:20 AM",
    fullDate: "8 Jun 2026",
  },
  {
    id: "#1230",
    client: "Lucía Ramírez",
    phone: "+51 956 567 890",
    items: ["2x Milkshake", "2x Cono Simple"],
    total: "S/ 38.00",
    payment: "Plin",
    status: "Pendiente",
    statusClass: "bg-[#e7e8e9] text-[#564245]",
    statusIcon: "schedule",
    date: "10:10 AM",
    fullDate: "8 Jun 2026",
  },
];

const filters = ["Todos", "Pendiente", "En preparación", "Listo", "Entregado", "Cancelado"];

export default function AdminOrders() {
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
          vertical-align: middle;
        }
      `}</style>

      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#e1e3e4] bg-white flex flex-col py-6 px-4 z-50">
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>icecream</span>
          </div>
          <div>
            <h1 className="text-[24px] leading-[32px] font-bold text-[#191c1d]">Admin Panel</h1>
            <p className="text-[11px] font-medium text-[#564245] uppercase tracking-wider">Heladería Ica</p>
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
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#ff7e9d] text-[#761235] font-bold rounded-xl shadow-sm text-[14px] leading-[20px]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
            Pedidos
          </button>
          <button
            onClick={() => navigate("/admin/clientes")}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#564245] hover:bg-[#f3f4f5] transition-colors rounded-xl text-[14px] leading-[20px]"
          >
            <span className="material-symbols-outlined">group</span>
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

      <main className="ml-64 w-[calc(100%-16rem)] min-h-screen">
        <header className="sticky top-0 h-16 flex justify-between items-center px-8 z-40 bg-[#f8f9fa]/80 backdrop-blur-md border-b border-[#e1e3e4]">
          <div className="flex items-center gap-2">
            <span className="text-[14px] text-[#564245]">Admin /</span>
            <span className="text-[14px] text-[#a43756] font-bold">Pedidos</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:bg-[#f3f4f5] rounded-full p-2 transition-all relative">
              <span className="material-symbols-outlined text-[#564245]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#a43756] rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-[#e1e3e4]">
              <div className="text-right hidden sm:block">
                <p className="text-[12px] leading-[16px] text-[#191c1d] font-bold">Admin</p>
                <p className="text-[10px] text-[#564245]">Administrador</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ffd9df] flex items-center justify-center text-[#3f0017] font-bold border-2 border-white shadow-sm overflow-hidden">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-[30px] leading-[36px] font-bold text-[#191c1d]">Pedidos</h2>
            <p className="text-[16px] leading-[24px] text-[#564245]">Gestiona y monitorea todos los pedidos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#ff7e9d] p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_30px_rgba(255,126,157,0.12)] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                </div>
              </div>
              <p className="text-[32px] font-black text-white leading-none">18</p>
              <p className="text-[14px] text-white/90 mt-1">Pedidos Activos</p>
            </div>
            <div className="bg-[#fdd73b] p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_30px_rgba(255,126,157,0.12)] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#554500]" style={{ fontVariationSettings: "'FILL' 1" }}>cooking</span>
                </div>
              </div>
              <p className="text-[32px] font-black text-[#554500] leading-none">8</p>
              <p className="text-[14px] text-[#554500]/80 mt-1">En Preparación</p>
            </div>
            <div className="bg-[#7cacd7] p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_30px_rgba(255,126,157,0.12)] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
              <p className="text-[32px] font-black text-white leading-none">5</p>
              <p className="text-[14px] text-white/80 mt-1">Listos</p>
            </div>
            <div className="bg-[#ffd9df] p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_30px_rgba(255,126,157,0.12)] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3f0017]" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                </div>
              </div>
              <p className="text-[32px] font-black text-[#3f0017] leading-none">45</p>
              <p className="text-[14px] text-[#3f0017]/80 mt-1">Completados Hoy</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#564245]">search</span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-[#f3f4f5] border-none focus:ring-2 focus:ring-[#ff7e9d] rounded-xl text-[14px] outline-none transition-all"
                  placeholder="Buscar por ID o cliente..."
                  type="text"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`px-6 py-2 rounded-full text-[14px] whitespace-nowrap shadow-sm ${
                      filter === "Todos"
                        ? "bg-[#ff7e9d] text-[#761235] font-bold"
                        : "bg-[#edeeef] text-[#564245] hover:bg-[#e7e8e9] transition-colors"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e1e3e4]">
                    <th className="px-6 py-5 text-[12px] leading-[16px] uppercase tracking-wider text-[#564245]">ID Pedido</th>
                    <th className="px-6 py-5 text-[12px] leading-[16px] uppercase tracking-wider text-[#564245]">Cliente</th>
                    <th className="px-6 py-5 text-[12px] leading-[16px] uppercase tracking-wider text-[#564245]">Productos</th>
                    <th className="px-6 py-5 text-[12px] leading-[16px] uppercase tracking-wider text-[#564245] text-center">Total</th>
                    <th className="px-6 py-5 text-[12px] leading-[16px] uppercase tracking-wider text-[#564245]">Estado</th>
                    <th className="px-6 py-5 text-[12px] leading-[16px] uppercase tracking-wider text-[#564245]">Hora</th>
                    <th className="px-6 py-5 text-[12px] leading-[16px] uppercase tracking-wider text-[#564245] text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1e3e4]">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-white transition-colors group">
                      <td className="px-6 py-5 font-black text-[#191c1d]">{order.id}</td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-[#191c1d]">{order.client}</div>
                        <div className="text-[12px] leading-[16px] text-[#564245]">{order.phone}</div>
                      </td>
                      <td className="px-6 py-5">
                        {order.items.map((item, i) => (
                          <div key={i} className={i === 0 ? "text-[14px] text-[#191c1d]" : "text-[12px] text-[#564245]"}>
                            {item}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="text-[#a43756] font-black text-[22px] leading-[28px]">{order.total}</div>
                        <div className="text-[10px] text-[#564245]">{order.payment}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 ${order.statusClass} rounded-full text-[11px] font-bold`}
                        >
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {order.statusIcon}
                          </span>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[14px] font-bold">{order.date}</div>
                        <div className="text-[11px] text-[#564245]">{order.fullDate}</div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-[#a43756] hover:bg-[#ffd9df]/30 rounded-lg transition-all" title="Ver detalles">
                            <span className="material-symbols-outlined">visibility</span>
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all" title="Marcar como listo">
                            <span className="material-symbols-outlined">check_circle</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-white border-t border-[#e1e3e4] flex justify-between items-center">
              <span className="text-[12px] leading-[16px] text-[#564245]">Mostrando 5 de 18 pedidos activos</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e1e3e4] text-[#564245] hover:bg-[#f3f4f5] transition-all">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#a43756] text-white text-[12px] font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e1e3e4] text-[#564245] hover:bg-[#f3f4f5] transition-all text-[12px]">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e1e3e4] text-[#564245] hover:bg-[#f3f4f5] transition-all">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
