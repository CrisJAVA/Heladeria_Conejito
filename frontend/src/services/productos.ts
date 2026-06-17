const API_BASE = "http://localhost:8080/api";

export interface ProductoDTO {
  id?: number;
  categoriaId: number;
  categoriaNombre?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  stock: number;
  disponible: boolean;
  destacado: boolean;
}

export async function listarProductos(): Promise<ProductoDTO[]> {
  const res = await fetch(`${API_BASE}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function crearProducto(dto: ProductoDTO): Promise<ProductoDTO> {
  const res = await fetch(`${API_BASE}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}
