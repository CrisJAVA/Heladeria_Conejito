// Servicios del panel de administraciÃ³n: pedidos, usuarios, dashboard y configuraciÃ³n.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

function getToken(): string {
  const t = localStorage.getItem("auth_token");
  if (!t) throw new Error("No autenticado");
  return t;
}

async function handleResponse(res: Response): Promise<any> {
  const text = await res.text();
  if (!res.ok) {
    let message = "Error en la solicitud";
    try {
      const json = JSON.parse(text);
      message = json.error || json.message || message;
    } catch {
      message = text || message;
    }
    throw new Error(message);
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function authHeaders() {
  return { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` };
}

// ---------- Pedidos (admin) ----------
export interface DetalleResponse {
  id: number;
  productoId: number;
  nombre: string;
  imagenUrl: string | null;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface PedidoAdminResponse {
  id: number;
  codigoPedido: string;
  usuarioNombre: string;
  metodoEntrega: string | null;
  metodoPago: string | null;
  subtotal: number;
  costoEnvio: number;
  total: number;
  estado: string;
  direccionEntrega: string | null;
  numeroOperacion: string | null;
  createdAt: string;
  detalles: DetalleResponse[];
}

export async function listarPedidosAdmin(): Promise<PedidoAdminResponse[]> {
  const res = await fetch(`${API_BASE}/pedidos`, { headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}

export async function cambiarEstadoPedido(id: number, estado: string): Promise<PedidoAdminResponse> {
  const res = await fetch(`${API_BASE}/pedidos/${id}/estado`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ estado }),
  });
  return handleResponse(res);
}

// ---------- Usuarios (admin) ----------
export interface UsuarioAdminDTO {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  direccion: string | null;
  rol: string;
  activo: boolean;
  createdAt: string;
  totalPedidos: number;
  totalGastado: number;
  puntosActuales: number;
  nivel: string;
  ultimoPedido: string | null;
}

export async function listarUsuariosAdmin(): Promise<UsuarioAdminDTO[]> {
  const res = await fetch(`${API_BASE}/usuarios`, { headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}

export async function cambiarEstadoUsuario(id: number, activo: boolean): Promise<void> {
  const res = await fetch(`${API_BASE}/usuarios/${id}/estado`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ activo }),
  });
  if (!res.ok) throw new Error("Error al cambiar estado del usuario");
}

export async function cambiarRolUsuario(id: number, rol: string): Promise<void> {
  const res = await fetch(`${API_BASE}/usuarios/${id}/rol`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ rol }),
  });
  if (!res.ok) throw new Error("Error al cambiar rol del usuario");
}

// ---------- Dashboard ----------
export interface ProductoVendidoDTO {
  nombre: string;
  cantidadVendida: number;
  totalVendido: number;
}

export interface DashboardStatsDTO {
  ventasHoy: number;
  pedidosActivos: number;
  clientesNuevosHoy: number;
  totalClientes: number;
  pedidosPorEstado: Record<string, number>;
  productosMasVendidos: ProductoVendidoDTO[];
  pedidosRecientes: PedidoAdminResponse[];
  ventasUltimos7Dias: Record<string, number>;
}

export async function obtenerDashboardStats(): Promise<DashboardStatsDTO> {
  const res = await fetch(`${API_BASE}/dashboard/stats`, { headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}

// ---------- ConfiguraciÃ³n ----------
export interface ConfiguracionDTO {
  id?: number;
  nombreNegocio: string;
  descripcion: string;
  logoUrl?: string | null;
  direccion: string;
  telefono: string;
  email: string;
  horarioSemana: string;
  horarioSabado: string;
  horarioDomingo: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  metodosPago: string;
  puntosPorSol: number;
  puntosRecompensa: number;
}

export async function obtenerConfiguracion(): Promise<ConfiguracionDTO> {
  const res = await fetch(`${API_BASE}/configuracion`);
  return handleResponse(res);
}

export async function actualizarConfiguracion(dto: ConfiguracionDTO): Promise<ConfiguracionDTO> {
  const res = await fetch(`${API_BASE}/configuracion`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(dto),
  });
  return handleResponse(res);
}
