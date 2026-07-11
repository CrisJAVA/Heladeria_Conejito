const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

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

export async function listarPromocionesActivas(): Promise<PromocionDTO[]> {
  const res = await fetch(`${API_BASE}/promociones`);
  if (!res.ok) throw new Error("Error al obtener promociones");
  return res.json();
}

export async function listarTodasPromociones(): Promise<PromocionDTO[]> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/promociones/todas`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al obtener promociones");
  return res.json();
}

export async function crearPromocion(dto: PromocionDTO): Promise<PromocionDTO> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/promociones`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al crear promociÃ³n");
  return res.json();
}

export async function actualizarPromocion(id: number, dto: PromocionDTO): Promise<PromocionDTO> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/promociones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al actualizar promociÃ³n");
  return res.json();
}

export async function cambiarEstadoPromocion(id: number, activa: boolean): Promise<PromocionDTO> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/promociones/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ activa }),
  });
  if (!res.ok) throw new Error("Error al cambiar estado de la promociÃ³n");
  return res.json();
}

export async function eliminarPromocion(id: number): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/promociones/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al eliminar promociÃ³n");
}
