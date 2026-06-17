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
  console.log("GET /api/productos status:", res.status);
  if (!res.ok) {
    const text = await res.text();
    console.log("GET /api/productos error body:", text);
    throw new Error("Error al obtener productos");
  }
  const data = await res.json();
  console.log("Productos recibidos:", data);
  return data;
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
