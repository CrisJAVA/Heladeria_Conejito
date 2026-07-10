const API_BASE = "http://localhost:8080/api";

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

export interface FavoritoDTO {
  id: number;
  productoId: number;
  productoNombre: string;
  productoPrecio: number;
  productoCategoria: string;
  productoImagenUrl: string | null;
  productoDescripcion?: string;
  productoDisponible: boolean;
}

export async function listarFavoritos(): Promise<FavoritoDTO[]> {
  const res = await fetch(`${API_BASE}/favoritos`, { headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}

export async function agregarFavorito(productoId: number): Promise<FavoritoDTO> {
  const res = await fetch(`${API_BASE}/favoritos/${productoId}`, { method: "POST", headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}

export async function quitarFavorito(productoId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/favoritos/${productoId}`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}

export async function checkFavorito(productoId: number): Promise<boolean> {
  const res = await fetch(`${API_BASE}/favoritos/check/${productoId}`, { headers: { Authorization: `Bearer ${getToken()}` } });
  const data = await handleResponse(res);
  return data.esFavorito;
}
