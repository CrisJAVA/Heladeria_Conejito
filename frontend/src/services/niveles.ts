const API_BASE = "http://localhost:8080/api";

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

export async function listarNiveles(): Promise<NivelFidelizacionDTO[]> {
  const res = await fetch(`${API_BASE}/niveles`);
  return handleResponse(res);
}

export async function actualizarNivel(id: number, dto: NivelFidelizacionDTO): Promise<NivelFidelizacionDTO> {
  const res = await fetch(`${API_BASE}/niveles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  return handleResponse(res);
}
