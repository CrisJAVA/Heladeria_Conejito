const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

function getToken(): string {
  const t = localStorage.getItem("auth_token");
  if (!t) throw new Error("No autenticado");
  return t;
}

async function handleResponse(res: Response): Promise<any> {
  if (!res.ok) {
    const text = await res.text();
    let message = "Error en la solicitud";
    try { const json = JSON.parse(text); message = json.error || json.message || message; }
    catch { message = text || message; }
    throw new Error(message);
  }
  return res.status === 204 ? null : res.json();
}

export interface CarritoDTO {
  id: number;
  productoId: number;
  productoNombre: string;
  productoPrecio: number;
  productoImagenUrl: string | null;
  productoDescripcion: string;
  cantidad: number;
  productoDisponible: boolean;
}

export async function listarCarrito(): Promise<CarritoDTO[]> {
  const res = await fetch(`${API_BASE}/carrito`, { headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}

export async function agregarAlCarrito(productoId: number, cantidad?: number): Promise<CarritoDTO> {
  const res = await fetch(`${API_BASE}/carrito`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ productoId, cantidad: cantidad || 1 }),
  });
  return handleResponse(res);
}

export async function actualizarCantidad(productoId: number, cantidad: number): Promise<CarritoDTO | null> {
  const res = await fetch(`${API_BASE}/carrito/${productoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ cantidad }),
  });
  return handleResponse(res);
}

export async function eliminarDelCarrito(productoId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/carrito/${productoId}`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}

export async function limpiarCarrito(): Promise<void> {
  const res = await fetch(`${API_BASE}/carrito`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}
