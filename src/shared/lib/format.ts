/** Formato de precio colombiano: 15000 -> "$15.000" */
export function formatPrecio(n: number): string {
  return "$" + n.toLocaleString("es-CO", { maximumFractionDigits: 0 });
}
