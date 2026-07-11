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

export interface NotificacionDTO {
  id: number;
  titulo: string;
  mensaje: string;
  leida: boolean;
  tipo: string;
  referenciaId: number | null;
  createdAt: string;
}

export async function listarNotificaciones(): Promise<NotificacionDTO[]> {
  const res = await fetch(`${API_BASE}/notificaciones`, { headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}

export async function contarNoLeidas(): Promise<number> {
  const res = await fetch(`${API_BASE}/notificaciones/no-leidas`, { headers: { Authorization: `Bearer ${getToken()}` } });
  const data = await handleResponse(res);
  return data.count;
}

export async function marcarLeida(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/notificaciones/${id}/leer`, { method: "PUT", headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}

export async function marcarTodasLeidas(): Promise<void> {
  const res = await fetch(`${API_BASE}/notificaciones/leer-todas`, { method: "PUT", headers: { Authorization: `Bearer ${getToken()}` } });
  return handleResponse(res);
}
