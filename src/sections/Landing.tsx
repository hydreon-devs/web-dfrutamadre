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
}

export function Landing({ onOpenArmador }: LandingProps) {
  const reveal = useReveal();

  return (
    <div ref={reveal}>
      <Header />
      <Hero onOpenArmador={onOpenArmador} />
      <MenuSection />
      <ArmadorCTA onOpenArmador={onOpenArmador} />
      <ComoPedir />
      <Social />
      <Info />
      <Footer onOpenArmador={onOpenArmador} />
    </div>
  );
}
