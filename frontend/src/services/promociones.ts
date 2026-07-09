const API_BASE = "http://localhost:8080/api";

export interface PromocionDTO {
  id?: number;
  titulo: string;
  descripcion: string;
  descuento?: string;
  diasVigencia?: string;
  icono?: string;
  color?: string;
  activa: boolean;
  fechaInicio?: string | null;
  fechaFin?: string | null;
}

function getToken(): string | null {
  return localStorage.getItem("auth_token");
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

export async function listarPromocionesActivas(): Promise<PromocionDTO[]> {
  const res = await fetch(`${API_BASE}/promociones`);
  return handleResponse(res);
}

export async function listarTodasPromociones(): Promise<PromocionDTO[]> {
  const res = await fetch(`${API_BASE}/promociones/todas`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return handleResponse(res);
}

export async function crearPromocion(dto: PromocionDTO): Promise<PromocionDTO> {
  const res = await fetch(`${API_BASE}/promociones`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  return handleResponse(res);
}

export async function actualizarPromocion(id: number, dto: PromocionDTO): Promise<PromocionDTO> {
  const res = await fetch(`${API_BASE}/promociones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  return handleResponse(res);
}

export async function cambiarEstadoPromocion(id: number, activa: boolean): Promise<PromocionDTO> {
  const res = await fetch(`${API_BASE}/promociones/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ activa }),
  });
  return handleResponse(res);
}

export async function eliminarPromocion(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/promociones/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Error al eliminar promoción");
}
