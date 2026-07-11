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
  return res.json();
}

export interface ResenaDTO {
  id: number;
  usuarioId: number;
  usuarioNombre: string;
  productoId: number;
  calificacion: number;
  comentario: string;
  createdAt: string;
}

export async function listarResenas(productoId: number): Promise<ResenaDTO[]> {
  const res = await fetch(`${API_BASE}/resenas/producto/${productoId}`);
  return handleResponse(res);
}

export async function obtenerStats(productoId: number): Promise<{ promedio: number; total: number }> {
  const res = await fetch(`${API_BASE}/resenas/producto/${productoId}/stats`);
  return handleResponse(res);
}

export async function crearResena(productoId: number, calificacion: number, comentario: string): Promise<ResenaDTO> {
  const res = await fetch(`${API_BASE}/resenas/producto/${productoId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ calificacion, comentario }),
  });
  return handleResponse(res);
}
