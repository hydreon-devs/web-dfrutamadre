import { useEffect, useState } from "react";
import { BRAND } from "../domain/menu";
import { IconInstagram, Logo } from "../shared/ui";
import { cn } from "../shared/lib/cn";

export function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 py-3 transition-all duration-250",
        solid && "bg-crema/86 backdrop-blur-md shadow-[0_6px_22px_rgb(200_70_95/0.1)] py-2",
      )}
    >
      <div className="container-fm flex items-center justify-between gap-4">
        <a href="#top" aria-label={BRAND.nombre}>
          <Logo size={0.96} />
        </a>
        <nav className="flex items-center gap-2">
          <a
            className="hidden sm:block font-round font-bold text-[.98rem] text-cacao px-3 py-2 rounded-full transition-colors hover:bg-coral-tint hover:text-coral-700"
            href="#menu"
          >
            Menú
          </a>
          <a
            className="hidden sm:block font-round font-bold text-[.98rem] text-cacao px-3 py-2 rounded-full transition-colors hover:bg-coral-tint hover:text-coral-700"
            href="#como"
          >
            Cómo pedir
          </a>
          <a
            className="inline-flex items-center gap-1.5 font-round font-bold text-[.92rem] text-white bg-coral px-3.5 py-2 rounded-full shadow-fm-sm transition-all hover:-translate-y-px hover:brightness-105"
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener"
          >
            <IconInstagram />
            <span className="hidden min-[420px]:inline">@{BRAND.instagram}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
