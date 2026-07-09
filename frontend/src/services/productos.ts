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
  if (!res.ok) {
    const text = await res.text();
    console.log("GET /api/productos error body:", text);
    throw new Error("Error al obtener productos");
  }
  const data = await res.json();
  console.log("Productos recibidos:", data);
  return data;
}

export async function obtenerProducto(id: number): Promise<ProductoDTO> {
  const res = await fetch(`${API_BASE}/productos/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return res.json();
}

function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export async function crearProducto(dto: ProductoDTO): Promise<ProductoDTO> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

export async function actualizarProducto(id: number, dto: ProductoDTO): Promise<ProductoDTO> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
}

export async function eliminarProducto(id: number): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/productos/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
}
