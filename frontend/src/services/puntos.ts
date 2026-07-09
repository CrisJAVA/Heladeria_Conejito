const API_BASE = "http://localhost:8080/api";

export interface PuntosDTO {
  puntosActuales: number;
  puntosAcumulados: number;
  nivelActual: string | null;
  nivelColorHex: string | null;
  siguienteNivel: string | null;
  puntosParaSiguienteNivel: number | null;
  puntosMinimosSiguienteNivel: number | null;
}

export interface HistorialPuntosDTO {
  id: number;
  puntos: number;
  tipo: string;
  concepto: string | null;
  createdAt: string;
}

function getToken(): string {
  const t = localStorage.getItem("auth_token");
  if (!t) throw new Error("No autenticado");
  return t;
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

export async function obtenerMisPuntos(): Promise<PuntosDTO> {
  const res = await fetch(`${API_BASE}/puntos/mis-puntos`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return handleResponse(res);
}

export async function obtenerHistorialPuntos(): Promise<HistorialPuntosDTO[]> {
  const res = await fetch(`${API_BASE}/puntos/historial`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return handleResponse(res);
}
