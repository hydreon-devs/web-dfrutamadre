# D'Fruta Madre — Landing Page

## Qué es este proyecto

Landing page para **D'Fruta Madre**, marca de fresas con crema y derivados en **Girardota, Antioquia**. El objetivo es generar pedidos por WhatsApp. La página es dos cosas en una:

1. **Landing de marca** (hero, menú, prueba social, contacto): su trabajo es convencer.
2. **Mini-app de pedidos ("el armador")**: su trabajo es construir un pedido paso a paso y entregarlo a WhatsApp listo para enviar.

No hay checkout, ni pagos online, ni cuentas de usuario, ni backend, ni base de datos. El pedido vive solo en memoria hasta que se envía a WhatsApp.

## Stack

- **Vite + React + TypeScript + Tailwind CSS 4**, desplegado en **Vercel**.
- **Vitest** para tests unitarios del dominio.
- **Mobile-first**: la mayoría de usuarios llega desde el celular (QR / Instagram). Se diseña primero para móvil.
- Todo el contenido y la UI están **en español**.

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción (tsc + vite build)
npm run test     # tests del dominio con Vitest
npm run lint     # ESLint
```

## Pieza central: handoff a WhatsApp

- El pedido se entrega con un enlace `https://wa.me/573008415368?text=<mensaje>`.
- El `<mensaje>` es el resumen del pedido convertido a texto y codificado con `encodeURIComponent`.
- Al tocar "Pedir ya" se abre WhatsApp con el mensaje pre-escrito; el cliente solo presiona enviar.
- El mensaje debe ser **compacto** (límite práctico de longitud de URL).

## Reglas de negocio (fresas con crema)

| Regla | Valor |
|---|---|
| Tamaños / precio base | Pequeño 12 oz = $15.000 · Mediano 16 oz = $18.000 · Grande 24 oz = $25.000 |
| Salsa | Se elige **una sola**, sin costo (lecherita, arequipe, chocolate, o sin salsa) |
| Toppings clásicos | **2 incluidos** en el precio base; cada adicional **+$3.000** |
| Toppings premium | **1 incluido** en el precio base; cada adicional **+$3.500** |
| Crema | Solo "crema de la casa" |
| Cobertura | Domicilios **solo en Girardota** |
| Horario | Martes a Domingo · 2:00 – 8:00 PM |
| Contacto | WhatsApp +57 300 841 53 68 · Instagram @fresas.de.girardota |

Por ahora el armador **solo cubre fresas con crema**. Duraznos con crema, merengón, etc. se agregarán después vía configuración (ver filosofía abajo). Salpiconada y oblea son solo punto físico, probablemente nunca entren al armador de domicilios.

## Arquitectura

**Feature-based + capa de dominio puro.** La lógica de negocio (motor del armador, precios, menú) vive aislada y sin React; la UI y las features dependen de ella, no al revés.

```
src/
  app/                    # arranque: main, App, estilos globales
  domain/                 # lógica pura de negocio (CERO React)
    builder/              # motor genérico: types.ts, pricing.ts, validation.ts
    menu/                 # productos como datos: fresas-con-crema.ts, index.ts
  features/
    armador/              # mini-app de pedidos: components/, hooks/, ProductBuilder.tsx, whatsapp.ts
  sections/               # secciones de la landing de marca (Hero, Menu, ComoPedir, ...)
  shared/                 # transversal: ui/ (sistema visual), lib/ (helpers como formato de precio)
```

### La regla de dependencias (inviolable)

- Las dependencias apuntan **hacia el dominio**, nunca hacia afuera.
- `sections/` y `features/` pueden importar de `domain/` y `shared/`.
- `domain/` **no importa** de `features/`, `sections/`, ni de React.
- Si te ves importando un componente dentro de `domain/`, un límite se está rompiendo.

### Filosofía del armador: motor genérico configurado por datos

No es un armador "de fresas", sino un **motor de armado genérico** que se configura con datos (principio Open/Closed):

- Cada producto se describe como un objeto de configuración con **pasos**. Hay dos tipos de paso:
  - **`single`**: elige exactamente 1. Puede fijar el precio base (`defineBase`, ej. tamaño) o ser gratis (ej. salsa).
  - **`multi`**: elige varios, con N `incluidos` gratis y un `costoExtra` por cada adicional (ej. toppings).
- `<ProductBuilder producto={config} />` renderiza **cualquier** config. Agregar un producto nuevo = escribir un objeto de configuración en `domain/menu/`, **no tocar la UI**.
- `calcularPrecio(producto, seleccion)` es una **función pura** en `domain/builder/pricing.ts`: sin estado, sin React, testeable con unit tests.

### Estado del armador

- **`pedido`**: lista de ítems (cada fresa armada). Permite varias fresas con distinta configuración.
- **`itemEnConstruccion`**: el ítem que se llena paso a paso en el wizard.
- Flujo: wizard (tamaño → salsa → clásicos → premium) → resumen del carrito → datos de entrega (dirección obligatoria, referencia, pago efectivo/transferencia) → vista previa y envío a WhatsApp.

## Convenciones de trabajo

- **TypeScript estricto.** Nada de `any` gratuito.
- **Nunca hardcodear precios, toppings ni textos del menú en la UI.** Todo sale de `domain/menu/`. Subir un precio = editar un archivo de datos.
- Precios formateados en es-CO: `15000` → `"$15.000"` (helper en `shared/lib/`).
- Tailwind CSS 4 (config CSS-first con `@theme`, sin `tailwind.config.js`).
- Mobile-first: estilos base para móvil, breakpoints para pantallas grandes.
- Los assets de imagen viven en `public/assets/`.

## Buenas prácticas de TypeScript

- **Sin `any`.** Si no conoces el tipo, usa `unknown` y reduce con guardas; nunca silencies el compilador con `any` o `as any`.
- **Tipos explícitos en los límites.** Props de componentes, retornos de funciones públicas y firmas del dominio se tipan a mano. Dentro de una función deja que TypeScript infiera.
- **`type` para uniones y formas de datos; `interface` para contratos de objeto extensibles.** Sé consistente dentro de un mismo archivo.
- **Prefiere uniones literales a `enum`** (ej. `type Tamano = "pequeno" | "mediano" | "grande"`). Son más simples y serializan mejor.
- **Inmutabilidad por defecto.** Usa `const`, marca datos del menú como `as const` o `readonly`, y no mutes props ni el estado directamente.
- **Modela los estados imposibles fuera de existencia.** Usa uniones discriminadas en vez de varios booleanos sueltos (`status: "cargando" | "listo" | "error"`).
- **Nada de lógica de negocio en la UI.** Cálculos y validaciones viven en `domain/` como funciones puras; los componentes solo orquestan.
- **Maneja lo opcional explícitamente.** Activa/respeta `strictNullChecks`; usa `?.`, `??` y early returns en vez de asumir que un valor existe.
- **Imports ordenados:** primero librerías externas, luego `domain/` y `shared/`, al final relativos. Evita imports circulares (la regla de dependencias lo previene).

## Convenciones de nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes y archivos de componente | `PascalCase.tsx` | `ProductBuilder.tsx`, `Hero.tsx` |
| Hooks | `useCamelCase.ts` | `useReveal.ts` |
| Módulos de dominio / helpers / datos | `kebab-case.ts` o minúsculas | `fresas-con-crema.ts`, `pricing.ts`, `format.ts` |
| Tests | `<archivo>.test.ts` | `pricing.test.ts` |
| Tipos e interfaces | `PascalCase` | `Producto`, `Seleccion`, `PasoSingle` |
| Variables y funciones | `camelCase` | `calcularPrecio`, `itemEnConstruccion` |
| Constantes globales / inmutables | `UPPER_SNAKE_CASE` | `WHATSAPP_NUMERO` |
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

## Carpeta `prototype/`

Contiene el **prototipo visual original** (HTML + JSX con Babel standalone + CSS plano). Es **solo referencia visual y de UX** — no es base de código y no se importa desde `src/`. Úsalo para consultar diseño, copy, paleta y flujo:

- `ds.css` / `app.css`: sistema de diseño (paleta coral/verde/crema, gingham, tipografías).
- `landing.jsx`: secciones de la landing.
- `armador-wizard.jsx`: UX del wizard (una pregunta por pantalla).
- `checkout.jsx`: carrito, datos de entrega, formato del mensaje de WhatsApp.
- `app-data.js`: datos del menú completos (marca, tamaños, salsas, toppings, especiales, reseñas).
