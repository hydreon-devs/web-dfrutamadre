import { useEffect } from "react";
import { createPortal } from "react-dom";
import { formatPrecio } from "../lib/format";
import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  /** Imagen ilustrativa del producto a confirmar. */
  imagen: string;
  nombre: string;
  precio: number;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Modal de confirmación accesible. Se cierra con Esc o tap en el overlay.
 * No agrega nada por sí mismo: solo dispara onConfirm / onCancel.
 */
export function ConfirmDialog({ open, imagen, nombre, precio, onConfirm, onCancel }: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    // Bloquea el scroll del fondo mientras el modal está abierto
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onCancel]);

  if (!open) return null;

  // Portal a <body>: evita que un ancestro con transform (view-fade,
  // data-reveal, hover de las cards) ancle el `fixed` fuera del viewport.
  return createPortal(
    <div
      className="fixed inset-0 z-100 grid place-items-center bg-cacao/40 backdrop-blur-sm px-5 view-fade-enter"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Agregar ${nombre} al pedido`}
        className="w-full max-w-[340px] bg-white rounded-card shadow-fm-md p-5 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid place-items-center w-20 h-20 mx-auto bg-blush rounded-media overflow-hidden mb-3">
          <img
            src={imagen}
            alt=""
            className="w-[82%] h-[82%] object-contain drop-shadow-[0_6px_10px_rgb(200_70_95/0.18)]"
          />
        </div>
        <p className="font-round font-bold text-cacao-soft text-[.92rem]">¿Agregar al pedido?</p>
        <h3 className="font-round font-extrabold text-coral-700 text-[1.2rem] leading-tight mt-0.5">
          {nombre}
        </h3>
        <p className="font-round font-extrabold text-coral text-[1.1rem] mt-1">
          {formatPrecio(precio)}
        </p>
        <div className="flex gap-2.5 mt-5">
          <Button variant="secondary" size="sm" block onClick={onCancel}>
            Cancelar
          </Button>
          <Button size="sm" block onClick={onConfirm}>
            Sí, agregar
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
