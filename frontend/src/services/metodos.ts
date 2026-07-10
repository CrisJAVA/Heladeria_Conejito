const API_BASE = "http://localhost:8080/api";

export interface MetodoEntregaDTO {
  id: number;
  nombre: string;
  descripcion: string | null;
  costo: number;
  activo: boolean;
}

export interface MetodoPagoDTO {
  id: number;
  nombre: string;
  icono: string | null;
  activo: boolean;
}

export async function listarMetodosEntrega(): Promise<MetodoEntregaDTO[]> {
  const res = await fetch(`${API_BASE}/metodos-entrega`);
  if (!res.ok) throw new Error("Error al obtener los métodos de entrega");
  return res.json();
}

export async function listarMetodosPago(): Promise<MetodoPagoDTO[]> {
  const res = await fetch(`${API_BASE}/metodos-pago`);
  if (!res.ok) throw new Error("Error al obtener los métodos de pago");
  return res.json();
}
