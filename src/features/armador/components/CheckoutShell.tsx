import type { ReactNode } from "react";
import { IconBack, Logo } from "../../../shared/ui";

interface CheckoutShellProps {
  titulo: string;
  onBack: () => void;
  backLabel?: string;
  children: ReactNode;
  /** Barra fija inferior opcional */
  bar?: ReactNode;
}

export function CheckoutShell({ titulo, onBack, backLabel = "Volver", children, bar }: CheckoutShellProps) {
  return (
    <div className="min-h-dvh bg-crema pb-28">
      <header className="sticky top-0 z-40 bg-crema/90 backdrop-blur-md shadow-[0_4px_18px_rgb(200_70_95/0.08)]">
        <div className="container-fm flex items-center justify-between gap-3 py-2.5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 bg-white border-2 border-linea text-coral-700 font-round font-bold px-3.5 py-2 rounded-full transition-all hover:bg-coral-tint hover:-translate-x-0.5"
            aria-label="Volver"
          >
            <IconBack /> <span>{backLabel}</span>
          </button>
          <span className="font-round font-extrabold text-cacao">{titulo}</span>
          <Logo size={0.72} />
        </div>
      </header>

      <main className="container-fm max-w-[640px] pt-6">{children}</main>

      {bar && (
        <footer className="fixed inset-x-0 bottom-0 z-55 bg-white shadow-[0_-8px_24px_rgb(200_70_95/0.14)]">
          <div className="container-fm flex items-center justify-between gap-3 py-3">{bar}</div>
        </footer>
      )}
    </div>
  );
}
