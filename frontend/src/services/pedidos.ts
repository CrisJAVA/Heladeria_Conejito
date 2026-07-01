const API_BASE = "http://localhost:8080/api";

export interface DetalleRequest {
  productoId: number;
  nombre: string;
  imagenUrl?: string;
  cantidad: number;
  precioUnitario: number;
}

export interface PedidoRequest {
  metodoEntregaId: number;
  metodoPagoId: number;
  direccionEntrega?: string;
  numeroOperacion?: string;
  nota?: string;
  detalles: DetalleRequest[];
}

export interface DetalleResponse {
  id: number;
  productoId: number;
  nombre: string;
  imagenUrl: string | null;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface PedidoResponse {
  id: number;
  codigoPedido: string;
  usuarioNombre: string;
  metodoEntrega: string;
  metodoPago: string;
  subtotal: number;
  costoEnvio: number;
  total: number;
  estado: string;
  direccionEntrega: string | null;
  numeroOperacion: string | null;
  createdAt: string;
  detalles: DetalleResponse[];
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

function getToken(): string {
  const t = localStorage.getItem("auth_token");
  if (!t) throw new Error("No autenticado");
  return t;
}

export async function crearPedido(data: PedidoRequest): Promise<PedidoResponse> {
  const res = await fetch(`${API_BASE}/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function listarMisPedidos(): Promise<PedidoResponse[]> {
  const res = await fetch(`${API_BASE}/pedidos/mis-pedidos`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return handleResponse(res);
}

export async function obtenerPedido(id: number): Promise<PedidoResponse> {
  const res = await fetch(`${API_BASE}/pedidos/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return handleResponse(res);
}
