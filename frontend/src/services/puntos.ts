const API_BASE = "http://localhost:8080/api";

export interface MisPuntos {
  id: number | null;
  puntosActuales: number;
  puntosAcumulados: number;
  nivel: string | null;
  nivelColor: string | null;
  afiliado: boolean;
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

function getHeaders(): HeadersInit {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function obtenerMisPuntos(): Promise<MisPuntos> {
  const res = await fetch(`${API_BASE}/puntos/mis-puntos`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
}

export async function afiliarse(): Promise<{ mensaje: string; puntos: MisPuntos }> {
  const res = await fetch(`${API_BASE}/puntos/afiliarse`, {
    method: "POST",
    headers: getHeaders(),
  });
  return handleResponse(res);
}
