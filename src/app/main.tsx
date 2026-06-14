import { StrictMode } from "react";
import { Analytics } from "@vercel/analytics/react"
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

const app = (
  <StrictMode>
    <App />
    <Analytics /> 
  </StrictMode>
);

// En el navegador: hidratar si el HTML viene pre-renderizado del build,
// montar desde cero en dev. En el pre-render (Node) no hay window.
if (typeof window !== "undefined") {
  const root = document.getElementById("root")!;
  if (root.hasChildNodes()) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
}

/** Llamada por vite-prerender-plugin en `npm run build` para generar HTML estático. */
export async function prerender() {
  // El build "edge" de react-dom funciona en Node sin dejar el proceso colgado
  // (los builds de navegador de React 19 cuelgan el build: react#32965).
  const { renderToString } = await import("react-dom/server.edge");
  const html = renderToString(app);
  return { html };
}
