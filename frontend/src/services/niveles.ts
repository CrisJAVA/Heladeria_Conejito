const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export interface BeneficioDTO {
  id?: number;
  descripcion: string;
  tipo?: string;
  valor?: string;
}

export interface NivelFidelizacionDTO {
  id: number;
  nombre: string;
  puntosMinimos: number;
  puntosPorSoles: number;
  colorHex?: string;
  beneficios: BeneficioDTO[];
}

function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export async function listarNiveles(): Promise<NivelFidelizacionDTO[]> {
  const res = await fetch(`${API_BASE}/niveles`);
  if (!res.ok) throw new Error("Error al obtener niveles");
  return res.json();
}

export async function actualizarNivel(id: number, dto: NivelFidelizacionDTO): Promise<NivelFidelizacionDTO> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/niveles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al actualizar nivel");
  return res.json();
}
