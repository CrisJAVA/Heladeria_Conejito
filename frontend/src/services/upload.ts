const API_BASE = "http://localhost:8080/api";

function getToken(): string {
  const t = localStorage.getItem("auth_token");
  if (!t) throw new Error("No autenticado");
  return t;
}

async function authFetch(url: string, options?: RequestInit): Promise<Response> {
  const res = await fetch(url, {
    ...options,
    headers: { ...options?.headers, Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Error" }));
    throw new Error(err.error || "Error en la solicitud");
  }
  return res;
}

export async function subirImagen(file: File): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await authFetch(`${API_BASE}/upload/imagen`, { method: "POST", body: formData });
  return res.json();
}

export async function listarImagenes(): Promise<{ filename: string; url: string; size: string; type: string }[]> {
  const res = await authFetch(`${API_BASE}/upload/imagenes`);
  return res.json();
}

export async function eliminarImagen(filename: string): Promise<void> {
  await fetch(`${API_BASE}/upload/imagen/${filename}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}
