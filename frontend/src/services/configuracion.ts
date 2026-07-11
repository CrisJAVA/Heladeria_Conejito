const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

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

function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export async function obtenerConfiguracion(): Promise<ConfiguracionDTO> {
  const res = await fetch(`${API_BASE}/configuracion`);
  if (!res.ok) throw new Error("Error al obtener la configuraciÃ³n");
  return res.json();
}

export async function actualizarConfiguracion(dto: ConfiguracionDTO): Promise<ConfiguracionDTO> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/configuracion`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al guardar la configuraciÃ³n");
  return res.json();
}
