interface DripProps {
  /** Color CSS del goteo, ej. "var(--color-crema)" */
  color?: string;
  flip?: boolean;
}

/** Divisor con forma de crema goteando entre secciones */
export function Drip({ color = "var(--color-crema)", flip = false }: DripProps) {
  return (
    <svg
      className="block w-full h-[clamp(28px,5vw,70px)]"
      viewBox="0 0 1200 70"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <path
        d="M0,0 L1200,0 L1200,30 C1150,55 1120,40 1090,46 C1050,54 1040,30 1000,34
        C960,38 950,62 905,58 C865,54 860,30 820,36 C780,42 778,64 735,60
        C695,56 690,32 650,38 C612,44 610,66 568,60 C530,55 528,32 488,38
        C450,44 448,64 405,60 C368,56 362,34 322,38 C285,42 282,64 240,60
        C205,56 198,34 160,40 C122,46 118,62 78,56 C45,51 38,34 0,40 Z"
        fill={color}
      />
    </svg>
  );
}
