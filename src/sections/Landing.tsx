import { useReveal } from "../shared/ui";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { MenuSection } from "./MenuSection";
import { ArmadorCTA } from "./ArmadorCTA";
import { ComoPedir } from "./ComoPedir";
import { Social } from "./Social";
import { Info } from "./Info";
import { Footer } from "./Footer";

interface LandingProps {
  onOpenArmador: () => void;
  /** Abre el wizard de un producto configurable, con opciones preseleccionadas (ej. tamaño) */
  onArmarProducto: (productoId: string, preseleccion?: Record<string, string>) => void;
  /** Suma 1 unidad de un producto directo al pedido sin salir de la landing */
  onAgregarDirecto: (productoId: string) => void;
}

export function Landing({ onOpenArmador, onArmarProducto, onAgregarDirecto }: LandingProps) {
  const reveal = useReveal();

  return (
    <div ref={reveal}>
      <Header />
      <Hero onOpenArmador={onOpenArmador} />
      <ComoPedir />
      <ArmadorCTA onOpenArmador={onOpenArmador} />
      <MenuSection onArmarProducto={onArmarProducto} onAgregarDirecto={onAgregarDirecto} />
      <Social />
      <Info />
      <Footer onOpenArmador={onOpenArmador} />
    </div>
  );
}
