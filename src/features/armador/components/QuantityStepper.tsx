import { IconMinus, IconPlus } from "../../../shared/ui";

interface QuantityStepperProps {
  cantidad: number;
  onChange: (cantidad: number) => void;
}

export function QuantityStepper({ cantidad, onChange }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        aria-label="Reducir cantidad"
        onClick={() => onChange(cantidad - 1)}
        disabled={cantidad <= 0}
        className="grid place-items-center w-9 h-9 rounded-full border-2 border-linea bg-white text-coral-700 font-round font-extrabold text-lg transition-all hover:border-coral hover:bg-coral-tint disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-linea disabled:hover:bg-white"
      >
        <IconMinus />
      </button>
      <span className="font-round font-extrabold text-cacao text-[1.15rem] w-7 text-center">
        {cantidad}
      </span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        onClick={() => onChange(cantidad + 1)}
        className="grid place-items-center w-9 h-9 rounded-full border-2 border-linea bg-white text-coral-700 font-round font-extrabold text-lg transition-all hover:border-coral hover:bg-coral-tint"
      >
        <IconPlus />
      </button>
    </div>
  );
}