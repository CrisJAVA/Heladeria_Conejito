const API_BASE = "http://localhost:8080/api";

function getToken(): string {
  const t = localStorage.getItem("auth_token");
  if (!t) throw new Error("No autenticado");
  return t;
}

export interface ProductoTop {
  id: number;
  nombre: string;
  cantidadVendida: number;
  totalIngresos: number;
}

export interface ReporteVentas {
  ventasTotales: number;
  totalPedidos: number;
  ventasHoy: number;
  pedidosHoy: number;
  productosMasVendidos: ProductoTop[];
  ventasPorPeriodo: Record<string, number>;
  pedidosPorEstado: Record<string, number>;
}

export async function obtenerReporte(desde?: string, hasta?: string): Promise<ReporteVentas> {
  const params = new URLSearchParams();
  if (desde) params.set("desde", desde);
  if (hasta) params.set("hasta", hasta);
  const query = params.toString();
  const url = `${API_BASE}/reportes/ventas${query ? "?" + query : ""}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  if (!res.ok) throw new Error("Error al obtener reporte");
  return res.json();
}
