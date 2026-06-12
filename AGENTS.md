# D'Fruta Madre — Landing Page

## Qué es este proyecto

Landing page para **D'Fruta Madre**, marca de fresas con crema y derivados en **Girardota, Antioquia**. El objetivo es generar pedidos por WhatsApp. La página es dos cosas en una:

1. **Landing de marca** (hero, menú, prueba social, contacto): su trabajo es convencer.
2. **Mini-app de pedidos ("el armador")**: su trabajo es construir un **pedido completo** — con cualquier combinación de productos del menú a domicilio — y entregarlo a WhatsApp listo para enviar.

No hay checkout, ni pagos online, ni cuentas de usuario, ni backend, ni base de datos. El pedido vive solo en memoria hasta que se envía a WhatsApp.

## Stack

- **Vite + React + TypeScript + Tailwind CSS 4**, desplegado en **Vercel**.
- **Vitest** para tests unitarios del dominio.
- **Prerender estático** en build con `vite-prerender-plugin` (SEO sin servidor SSR).
- **Mobile-first**: la mayoría de usuarios llega desde el celular (QR / Instagram). Se diseña primero para móvil.
- Todo el contenido y la UI están **en español**.

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción (tsc + vite build + prerender)
npm run test     # tests del dominio con Vitest
npm run lint     # ESLint
```

## Pieza central: handoff a WhatsApp

- El pedido se entrega con un enlace `https://wa.me/<número>?text=<mensaje>`.
- El número vive en `BRAND.telefonoIntl` (`domain/menu/marca.ts`) — **nunca hardcodearlo**; el número mostrado en pantalla (`telefonoDisplay`) puede ser distinto al que recibe los pedidos.
- El `<mensaje>` es el resumen del pedido convertido a texto y codificado con `encodeURIComponent` (`features/armador/whatsapp.ts` + `shared/lib/whatsapp.ts`).
- Al tocar "Pedir ya" se abre WhatsApp con el mensaje pre-escrito; el cliente solo presiona enviar.
- El mensaje debe ser **compacto** (límite práctico de longitud de URL).
- WhatsApp es **infraestructura, no dominio**: si mañana cambia el canal, solo se toca el adaptador `whatsapp.ts`.

## Catálogo del armador

El armador cubre **todo el menú a domicilio**. El registro vive en `domain/menu/index.ts`:

| Tipo | Productos | Cómo se piden |
|---|---|---|
| **Configurables** (wizard paso a paso) | Fresas con crema · Duraznos con crema · Salpiconada | `<ProductBuilder producto={config} />` |
| **Directos** (precio fijo × cantidad) | Merengón $15.000 · Mermelada de Fresa 24 oz $16.000 · Vaso de Crema 12 oz $15.000 · Chococono $4.000 · Botella de Agua $1.000 | Stepper de cantidad en el catálogo / cards de la landing |

La **oblea** es solo punto físico — no entra al armador.

## Reglas de negocio

### Fresas con crema (4 pasos: tamaño → salsa → clásicos → premium)

| Regla | Valor |
|---|---|
| Tamaños / precio base | Pequeño 12 oz = $15.000 · Mediano 16 oz = $18.000 · Grande 24 oz = $25.000 |
| Salsa | Se elige **una sola**, sin costo (lecherita, arequipe, chocolate, o sin salsa) |
| Toppings clásicos | **2 incluidos** en el precio base; cada adicional **+$3.000** |
| Toppings premium | **1 incluido** en el precio base; cada adicional **+$3.500** |
| Crema | Solo "crema de la casa" |

### Duraznos con crema (2 pasos: tamaño → topping)

| Regla | Valor |
|---|---|
| Tamaños / precio base | Pequeño 12 oz = $18.000 · Mediano 16 oz = $22.000 · Grande 24 oz = $28.000 |
| Topping | Se elige **uno solo**, incluido en el precio. Clásicos y premium en una sola lista, separados visualmente con `grupo` |

### Salpiconada (1 paso: variante)

| Regla | Valor |
|---|---|
| Variantes (todas 12 oz) | Sencilla $8.000 · Con queso $12.000 · Con helado $12.000 · Queso + helado $15.000 |

### Entrega y pago

| Regla | Valor |
|---|---|
| Métodos de pago | Efectivo (con campo opcional "paga con" para calcular vueltas) · Transferencia · **Recoger en tienda** (pide nombre de quien recoge) |
| Dirección | Obligatoria solo para domicilio; al recoger en tienda no se pide |
| Cobertura | Domicilios **solo en Girardota** |
| Horario | Martes a Domingo · 2:00 – 8:00 PM |
| Contacto | El número y los datos de marca salen de `BRAND` en `domain/menu/marca.ts` · Instagram @fresas.de.girardota |

## Arquitectura

**Feature-based + capa de dominio puro.** La lógica de negocio (motor del armador, precios, menú) vive aislada y sin React; la UI y las features dependen de ella, no al revés.

```
src/
  app/                    # arranque: main (mount + prerender), App (navegación), JsonLd, estilos globales
  domain/                 # lógica pura de negocio (CERO React)
    builder/              # motor genérico: types.ts, pricing.ts (+ tests), validation.ts
    menu/                 # productos como datos: fresas-con-crema.ts, duraznos-con-crema.ts,
                          #   salpiconada.ts, marca.ts, imagenes.ts, index.ts (registro)
  features/
    armador/              # mini-app de pedidos: ProductBuilder (wizard), ProductCatalog,
                          #   components/ (carrito, entrega, WhatsApp, steppers), hooks/usePedido, whatsapp.ts
  sections/               # secciones de la landing de marca (Hero, MenuSection, ComoPedir, ...)
  shared/                 # transversal: ui/ (sistema visual), lib/ (cn, formato de precio, wa.me)
```

### La regla de dependencias (inviolable)

- Las dependencias apuntan **hacia el dominio**, nunca hacia afuera.
- `sections/` y `features/` pueden importar de `domain/` y `shared/`.
- `domain/` **no importa** de `features/`, `sections/`, ni de React.
- Si te ves importando un componente dentro de `domain/`, un límite se está rompiendo.

### Filosofía del armador: motor genérico configurado por datos

No es un armador "de fresas", sino un **motor de armado genérico** que se configura con datos (principio Open/Closed). Hay dos clases de producto:

- **`Producto` (configurable)**: se describe como un objeto con **pasos**. Dos tipos de paso:
  - **`single`**: elige exactamente 1. Puede fijar el precio base (`defineBase`, ej. tamaño), ser gratis (ej. salsa) y traer una opción `preseleccion`. Las opciones pueden agruparse visualmente con `grupo` (ej. "Premium" / "Clásicos" en duraznos).
  - **`multi`**: elige varios, con N `incluidos` gratis y un `costoExtra` por cada adicional (ej. toppings de fresas).
- **`ProductoDirecto`**: precio fijo, se agrega con cantidad (merengón, chococono…). Sin wizard.

`<ProductBuilder producto={config} />` renderiza **cualquier** config. Agregar un producto = registrarlo en `domain/menu/index.ts` (`PRODUCTOS_CONFIGURABLES` o `PRODUCTOS_DIRECTOS`), **no tocar la UI**. `calcularPrecio(producto, seleccion)` es una **función pura** en `domain/builder/pricing.ts`: sin estado, sin React, testeable con unit tests.

### Estado y navegación del armador

- **`usePedido`** (`features/armador/hooks/`): lista de ítems heterogéneos — `configurable` (con `seleccion`) y `directo` (con `cantidad`) — con alta, edición, borrado y total.
- **`App.tsx`** navega por estado en memoria (sin router): `landing → catalog → armador → cart → delivery → whatsapp`.
- Entradas al flujo: desde el **catálogo** (`ProductCatalog`), o directo desde las **cards del menú de la landing** — que abren el wizard con preselección (ej. tamaño ya elegido) o suman un producto directo al carrito sin salir de la landing.
- Flujo completo: catálogo/landing → wizard (si es configurable) → carrito (editar, repetir, cantidades) → datos de entrega (domicilio o recogida, método de pago) → vista previa y envío a WhatsApp.

## Convenciones de trabajo

- **TypeScript estricto.** Nada de `any` gratuito.
- **Nunca hardcodear precios, toppings, textos del menú ni datos de contacto en la UI.** Todo sale de `domain/menu/`. Subir un precio = editar un archivo de datos.
- Precios formateados en es-CO: `15000` → `"$15.000"` (helper en `shared/lib/`).
- Tailwind CSS 4 (config CSS-first con `@theme`, sin `tailwind.config.js`).
- Mobile-first: estilos base para móvil, breakpoints para pantallas grandes.
- Los assets de imagen viven en `public/assets/` y se referencian desde `domain/menu/imagenes.ts`.

## Buenas prácticas de TypeScript

- **Sin `any`.** Si no conoces el tipo, usa `unknown` y reduce con guardas; nunca silencies el compilador con `any` o `as any`.
- **Tipos explícitos en los límites.** Props de componentes, retornos de funciones públicas y firmas del dominio se tipan a mano. Dentro de una función deja que TypeScript infiera.
- **`type` para uniones y formas de datos; `interface` para contratos de objeto extensibles.** Sé consistente dentro de un mismo archivo.
- **Prefiere uniones literales a `enum`** (ej. `type MetodoPago = "efectivo" | "transferencia" | "recoger-en-tienda"`). Son más simples y serializan mejor.
- **Inmutabilidad por defecto.** Usa `const`, marca datos del menú como `as const` o `readonly`, y no mutes props ni el estado directamente.
- **Modela los estados imposibles fuera de existencia.** Usa uniones discriminadas en vez de varios booleanos sueltos (ej. `ItemPedido` discrimina por `tipo: "configurable" | "directo"`).
- **Nada de lógica de negocio en la UI.** Cálculos y validaciones viven en `domain/` como funciones puras; los componentes solo orquestan.
- **Maneja lo opcional explícitamente.** Activa/respeta `strictNullChecks`; usa `?.`, `??` y early returns en vez de asumir que un valor existe.
- **Imports ordenados:** primero librerías externas, luego `domain/` y `shared/`, al final relativos. Evita imports circulares (la regla de dependencias lo previene).

## Convenciones de nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes y archivos de componente | `PascalCase.tsx` | `ProductBuilder.tsx`, `Hero.tsx` |
| Hooks | `useCamelCase.ts` | `usePedido.ts`, `useReveal.ts` |
| Módulos de dominio / helpers / datos | `kebab-case.ts` o minúsculas | `fresas-con-crema.ts`, `pricing.ts`, `format.ts` |
| Tests | `<archivo>.test.ts` | `pricing.test.ts` |
| Tipos e interfaces | `PascalCase` | `Producto`, `Seleccion`, `PasoSingle`, `ItemPedido` |
| Variables y funciones | `camelCase` | `calcularPrecio`, `agregarDirecto` |
| Constantes globales / inmutables | `UPPER_SNAKE_CASE` | `PRODUCTOS_DIRECTOS`, `ENTREGA_INICIAL` |
| Booleanos | prefijo `es`/`tiene`/`hay` | `esValido`, `tieneSalsa` |

- Nombres de dominio en **español** (igual que el resto del proyecto): `pedido`, `seleccion`, `tamano`, `toppings`.
- Nombres descriptivos, sin abreviaturas crípticas (`producto`, no `prod`; `seleccion`, no `sel`).
- Un componente por archivo; el nombre del archivo coincide con el del componente exportado.

### Ejemplo: cómo SÍ escribirlo

```ts
// domain/builder/pricing.ts — función pura, tipada, sin React
type Tamano = "pequeno" | "mediano" | "grande";

interface Seleccion {
  tamano: Tamano;
  toppingsClasicos: readonly string[];
}

const COSTO_CLASICO_EXTRA = 3000;

export function calcularPrecio(base: number, seleccion: Seleccion): number {
  const extras = Math.max(0, seleccion.toppingsClasicos.length - 2);
  return base + extras * COSTO_CLASICO_EXTRA;
}
```

### Ejemplo: cómo NO escribirlo

```ts
// MAL: precios hardcodeados en la UI, any, mutación, nombres crípticos
function calc(p: any) {          // any + nombre sin sentido
  let total = 15000;            // precio mágico que debería venir de domain/menu
  for (let i = 0; i < p.t.length; i++) {
    if (i > 2) total = total + 3000;  // regla de negocio enterrada en la UI
  }
  p.total = total;             // muta el argumento de entrada
  return total;
}
```
