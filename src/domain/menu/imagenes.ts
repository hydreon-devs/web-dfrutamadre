/**
 * Imagen ilustrativa de cada producto (assets en public/).
 * Única fuente: la usan el catálogo del armador, el carrito y la demo
 * del teléfono en la landing.
 */
const IMG_PRODUCTO: Record<string, string> = {
  "fresas-con-crema": "/assets/cup-fresas-con-crema.webp",
  "duraznos-con-crema": "/assets/cup-duraznos.webp",
  "salpiconada": "/assets/cup-salpiconada.webp",
  "merengon": "/assets/merengon.webp",
  "mermelada-fresa": "/assets/mascot-fresa.webp",
  "vaso-crema": "/assets/mascot-fresa.webp",
  "chococono": "/assets/mascot-fresa.webp",
  "agua": "/assets/mascot-fresa.webp",
};

export function imgProducto(id: string): string {
  return IMG_PRODUCTO[id] ?? "/assets/mascot-fresa.webp";
}
