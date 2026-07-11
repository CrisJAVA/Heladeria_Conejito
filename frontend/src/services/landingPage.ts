const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export interface SeccionLanding {
  id?: number;
  sectionKey: string;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  colorFrom: string;
  colorTo: string;
  activo: boolean;
}

function getToken(): string {
  const t = localStorage.getItem("auth_token");
  if (!t) throw new Error("No autenticado");
  return t;
}

export async function listarSecciones(): Promise<SeccionLanding[]> {
  const res = await fetch(`${API_BASE}/landing-secciones`);
  return res.json();
}

export async function actualizarSeccion(sectionKey: string, data: Partial<SeccionLanding>): Promise<SeccionLanding> {
  const res = await fetch(`${API_BASE}/landing-secciones/${sectionKey}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Error al actualizar");
  }
  return res.json();
}
