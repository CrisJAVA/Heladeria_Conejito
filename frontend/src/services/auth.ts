const API_BASE = "http://localhost:8080/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
  direccion?: string;
}

export interface AuthResponse {
  token: string;
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export interface UserProfile {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  direccion: string | null;
  rol: string;
}

export interface CambiarPasswordRequest {
  passwordActual: string;
  nuevaPassword: string;
  confirmarPassword: string;
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

export async function loginApi(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function registerApi(data: RegisterRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function getPerfil(token: string): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/usuarios/perfil`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

export async function updatePerfil(token: string, data: Partial<UserProfile>): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/usuarios/perfil`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function cambiarPassword(token: string, data: CambiarPasswordRequest): Promise<void> {
  const res = await fetch(`${API_BASE}/usuarios/cambiar-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  await handleResponse(res);
}
