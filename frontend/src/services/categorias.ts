const API_BASE = "http://localhost:8080/api";

export interface CategoriaDTO {
  id: number;
  nombre: string;
  descripcion?: string;
}

export async function listarCategorias(): Promise<CategoriaDTO[]> {
  const res = await fetch(`${API_BASE}/categorias`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
}
