import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = { width: "1em", height: "1em", viewBox: "0 0 24 24" } as const;
const stroke = {
  ...base,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const IconWhatsApp = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M.06 24l1.68-6.13A11.83 11.83 0 0 1 .15 11.9C.15 5.4 5.45.1 11.95.1c3.17 0 6.15 1.23 8.39 3.47a11.8 11.8 0 0 1 3.47 8.38c0 6.5-5.3 11.8-11.8 11.8a11.9 11.9 0 0 1-5.65-1.44L.06 24zM6.6 20.1c1.62.96 3.17 1.54 5.35 1.54 5.4 0 9.8-4.39 9.8-9.79 0-5.41-4.38-9.79-9.79-9.79-5.41 0-9.8 4.38-9.8 9.79 0 2.29.67 4 1.79 5.79l-.99 3.61 3.64-.95zm10.96-5.51c-.07-.12-.27-.2-.57-.35-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42z" />
  </svg>
);

export const IconInstagram = (p: P) => (
  <svg {...stroke} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...stroke} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l2 5v3a1 1 0 0 1-1 1A17 17 0 0 1 4 5a1 1 0 0 1 1-1z" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...stroke} strokeWidth={3} {...p}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const IconPlus = (p: P) => (
  <svg {...stroke} strokeWidth={2.6} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (p: P) => (
  <svg {...stroke} strokeWidth={2.6} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...stroke} strokeWidth={2.6} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconBack = (p: P) => (
  <svg {...stroke} strokeWidth={2.6} {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconHeart = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M12 21s-7.5-4.6-10-9.2C.4 8.5 1.7 4.6 5.2 4.1c2-.3 3.6.8 4.8 2.3 1.2-1.5 2.8-2.6 4.8-2.3 3.5.5 4.8 4.4 3.2 7.7C19.5 16.4 12 21 12 21z" />
  </svg>
);

export const IconStar = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.8 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
  </svg>
);

export const IconEdit = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
);

export const IconTrash = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const IconSend = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M21 3 9.8 14.2M21 3l-8.5 18.5-2.7-7.3L3 11.5 21 3z" />
  </svg>
);

export const IconCart = (p: P) => (
  <svg {...stroke} {...p}>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h3l2.4 12.4a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L22 7H6" />
  </svg>
);
