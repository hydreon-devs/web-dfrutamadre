# D'Fruta Madre — Landing Page

Landing de marca + armador de pedidos por WhatsApp para D'Fruta Madre (fresas con crema a domicilio en Girardota, Antioquia).

- **Stack:** Vite + React + TypeScript + Tailwind CSS 4
- **Sin backend:** el pedido se arma en el navegador y se entrega por enlace `wa.me`
- **Mobile-first**

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run test     # tests del dominio (Vitest)
npm run lint     # ESLint
```

## Estructura

```
src/
  app/          # arranque: main, App, estilos globales
  domain/       # lógica pura de negocio (cero React)
  features/     # armador (wizard, carrito, entrega, WhatsApp)
  sections/     # secciones de la landing de marca
  shared/       # ui/ y lib/ transversales
prototype/      # prototipo visual original (solo referencia)
```

Ver `AGENTS.md` para el contexto completo del proyecto, reglas de negocio y convenciones.

## Deploy

Pensado para Vercel: framework Vite, build `npm run build`, output `dist/`.
