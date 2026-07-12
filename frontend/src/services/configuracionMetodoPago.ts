const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export interface ConfiguracionMetodoPagoDTO {
  id?: number;
  tipo: "YAPE" | "PLIN";
  nombreTitular?: string;
  numeroCelular?: string;
  usuarioVisible?: string;
  imagenUrl?: string;
  mensaje?: string;
  activo: boolean;
  updatedAt?: string;
}

async function authFetch(url: string, options?: RequestInit): Promise<Response> {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Error en la solicitud" }));
    throw new Error(err.error || err.message || "Error en la solicitud");
  }
  return res;
}

export async function listarConfiguracionesMetodoPago(): Promise<ConfiguracionMetodoPagoDTO[]> {
  const res = await authFetch(`${API_BASE}/configuracion-metodos-pago`);
  return res.json();
}

export async function listarMetodosPagoActivos(): Promise<ConfiguracionMetodoPagoDTO[]> {
  const res = await fetch(`${API_BASE}/configuracion-metodos-pago/activos`);
  if (!res.ok) throw new Error("Error al obtener métodos de pago activos");
  return res.json();
}

export async function obtenerConfiguracionMetodoPago(tipo: "YAPE" | "PLIN"): Promise<ConfiguracionMetodoPagoDTO> {
  const res = await authFetch(`${API_BASE}/configuracion-metodos-pago/${tipo}`);
  return res.json();
}

export async function actualizarConfiguracionMetodoPago(
  tipo: "YAPE" | "PLIN",
  data: Partial<ConfiguracionMetodoPagoDTO>
): Promise<ConfiguracionMetodoPagoDTO> {
  const res = await authFetch(`${API_BASE}/configuracion-metodos-pago/${tipo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function subirImagenMetodoPago(
  tipo: "YAPE" | "PLIN",
  imagenUrl: string
): Promise<ConfiguracionMetodoPagoDTO> {
  const res = await authFetch(`${API_BASE}/configuracion-metodos-pago/${tipo}/imagen`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imagenUrl }),
  });
  return res.json();
}

export async function cambiarEstadoMetodoPago(
  tipo: "YAPE" | "PLIN",
  activo: boolean
): Promise<ConfiguracionMetodoPagoDTO> {
  const res = await authFetch(`${API_BASE}/configuracion-metodos-pago/${tipo}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ activo }),
  });
  return res.json();
}
