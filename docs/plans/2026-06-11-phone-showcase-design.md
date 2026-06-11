# Diseño: Teléfono animado en ArmadorCTA (efecto askape)

**Fecha:** 2026-06-11
**Estado:** Aprobado

## Objetivo

Reemplazar la copa flotante de la columna derecha de `ArmadorCTA.tsx` por un
mockup de teléfono que muestra el mini-flujo del armador. Al hacer scroll por
la sección, el contenido interno del teléfono se desplaza hacia arriba y se
recorta contra el marco (`overflow: hidden`), como en askape.com.

## Decisiones

| Decisión | Elección |
|----------|----------|
| Ubicación | Columna derecha de `ArmadorCTA` (reemplaza la copa) |
| Mano PNG | No — teléfono flotante solo; la mano puede sumarse después como Capa 3 |
| Contenido | Mini-flujo del armador: tamaño → salsa → toppings → total + WhatsApp |
| Animación | CSS scroll-driven (`animation-timeline: view()`) con fallback progresivo |

## Componentes

- **`src/sections/PhoneShowcase.tsx`** (nuevo): componente presentacional,
  decorativo (`aria-hidden="true"`). Dos piezas:
  - *Marco* (`phone-frame`): bordes oscuros redondeados, isla dinámica,
    barra de estado falsa ("9:41"), `overflow: hidden`.
  - *Pantalla* (`phone-screen`): cards apiladas que imitan los pasos reales
    del armador, derivadas de `fresasConCrema` vía `desglosarSeleccion` con
    una `Seleccion` de demo. Total calculado con `calcularPrecio` — nada de
    precios ni labels hardcodeados.
- **`ArmadorCTA.tsx`**: reemplaza el `<img>` de la copa por `<PhoneShowcase />`,
  conserva el halo circular y algunos chips flotantes de toppings.

## Animación (`src/app/index.css`)

- Dentro de `@supports (animation-timeline: view())`: keyframes
  `translateY(+) → translateY(−)` sobre `.phone-screen` con
  `animation-timeline: view()` y `animation-range`. Cero JavaScript.
- Fallback (Safari < 26, Firefox): las cards usan el patrón `data-reveal`
  existente con `transitionDelay` escalonado (igual que `ComoPedir`).
  En navegadores con `view()` el reveal por card se neutraliza vía
  `@supports` para no duplicar animaciones.
- `prefers-reduced-motion: reduce` desactiva todo movimiento (ya cubierto
  por la regla global de `[data-reveal]`; se extiende a `.phone-screen`).

## Fuera de alcance (YAGNI)

- Mano PNG (Capa 3) — se puede agregar luego sin tocar el resto.
- Interactividad dentro del teléfono.
- Dependencias o librerías nuevas.

## Revisión v2 (mismo día): simulación del flujo en loop

Tras ver la v1, el usuario pidió que el teléfono simule la interacción real.
Decisión: **3 escenas en loop (~10s)** — se descartó simular el tap en
"Arma tu pedido" porque el botón real está al lado en la misma sección.

1. **Catálogo** — productos configurables reales con "Desde $…", tap simulado
   sobre Fresas con crema.
2. **Armado** — los 4 pasos se completan solos (chips seleccionados + precio base).
3. **Resumen** — desglose, total y botón "Enviar pedido" con tap final.

Cambio de técnica: la narrativa es temporal, no espacial, así que se abandona
el scroll-driven (`view()`) por una máquina de estados con `setTimeout`
(`DURACIONES_MS`, 8 pasos). El loop arranca al entrar al viewport
(IntersectionObserver propio), se pausa al salir, y con
`prefers-reduced-motion` queda fijo en el resumen sin animar.
El tap usa `animate-ping` de Tailwind; las transiciones entre escenas son
opacity/translate con utilidades estándar. Se eliminó el CSS `.phone-screen`
de index.css.
