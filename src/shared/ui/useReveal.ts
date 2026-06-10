import { useEffect, useRef } from "react";

/** Marca con la clase `is-in` los nodos [data-reveal] cuando entran al viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.matches("[data-reveal]")
      ? [el]
      : Array.from(el.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return ref;
}
