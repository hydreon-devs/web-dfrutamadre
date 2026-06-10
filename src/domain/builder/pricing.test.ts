import { describe, expect, it } from "vitest";
import { calcularPrecio, desglosarSeleccion, extrasDePaso } from "./pricing";
import { pasoCompleto, seleccionInicial, seleccionValida } from "./validation";
import { fresasConCrema } from "../menu/fresas-con-crema";
import type { Seleccion } from "./types";

const base: Seleccion = {
  tamano: ["med"],
  salsa: ["lecherita"],
  clasicos: [],
  premium: [],
};

describe("calcularPrecio", () => {
  it("solo tamaño: el precio es el base", () => {
    expect(calcularPrecio(fresasConCrema, { ...base, tamano: ["peq"] })).toBe(15000);
    expect(calcularPrecio(fresasConCrema, { ...base, tamano: ["med"] })).toBe(18000);
    expect(calcularPrecio(fresasConCrema, { ...base, tamano: ["gra"] })).toBe(25000);
  });

  it("la salsa no tiene costo", () => {
    const conSalsa = calcularPrecio(fresasConCrema, { ...base, salsa: ["arequipe"] });
    const sinSalsa = calcularPrecio(fresasConCrema, { ...base, salsa: ["sin-salsa"] });
    expect(conSalsa).toBe(18000);
    expect(sinSalsa).toBe(18000);
  });

  it("clásicos: 2 incluidos, cada extra +3000", () => {
    const dos = { ...base, clasicos: ["oreo", "milo"] };
    const cuatro = { ...base, clasicos: ["oreo", "milo", "mani", "gelatina"] };
    expect(calcularPrecio(fresasConCrema, dos)).toBe(18000);
    expect(calcularPrecio(fresasConCrema, cuatro)).toBe(18000 + 2 * 3000);
  });

  it("premium: 1 incluido, cada extra +3500", () => {
    const uno = { ...base, premium: ["queso"] };
    const tres = { ...base, premium: ["queso", "gansito", "helado"] };
    expect(calcularPrecio(fresasConCrema, uno)).toBe(18000);
    expect(calcularPrecio(fresasConCrema, tres)).toBe(18000 + 2 * 3500);
  });

  it("combinado: base + extras clásicos + extras premium", () => {
    const sel: Seleccion = {
      tamano: ["gra"],
      salsa: ["chocolate"],
      clasicos: ["oreo", "milo", "mani"],
      premium: ["queso", "gansito"],
    };
    expect(calcularPrecio(fresasConCrema, sel)).toBe(25000 + 3000 + 3500);
  });

  it("selección vacía no revienta", () => {
    expect(calcularPrecio(fresasConCrema, {})).toBe(0);
  });
});

describe("extrasDePaso", () => {
  const clasicos = fresasConCrema.pasos.find((p) => p.id === "clasicos")!;

  it("no hay extras dentro de los incluidos", () => {
    expect(extrasDePaso(clasicos, { clasicos: ["oreo"] })).toBe(0);
    expect(extrasDePaso(clasicos, { clasicos: ["oreo", "milo"] })).toBe(0);
  });

  it("cuenta los que pasan de los incluidos", () => {
    expect(extrasDePaso(clasicos, { clasicos: ["oreo", "milo", "mani"] })).toBe(1);
  });
});

describe("desglosarSeleccion", () => {
  it("devuelve labels y costos por paso", () => {
    const sel: Seleccion = {
      tamano: ["med"],
      salsa: ["arequipe"],
      clasicos: ["oreo", "milo", "mani"],
      premium: ["queso"],
    };
    const d = desglosarSeleccion(fresasConCrema, sel);
    expect(d[0].base).toBe(18000);
    expect(d[0].labels).toEqual(["Mediano"]);
    expect(d[1].labels).toEqual(["Arequipe"]);
    expect(d[2].extras).toBe(1);
    expect(d[2].costoExtras).toBe(3000);
    expect(d[3].extras).toBe(0);
  });
});

describe("validación", () => {
  it("single requiere exactamente 1 elegida", () => {
    const tamano = fresasConCrema.pasos[0];
    expect(pasoCompleto(tamano, { tamano: [] })).toBe(false);
    expect(pasoCompleto(tamano, { tamano: ["med"] })).toBe(true);
  });

  it("multi siempre está completo (puede ir vacío)", () => {
    const clasicos = fresasConCrema.pasos.find((p) => p.id === "clasicos")!;
    expect(pasoCompleto(clasicos, { clasicos: [] })).toBe(true);
  });

  it("seleccionValida exige todos los pasos completos", () => {
    expect(seleccionValida(fresasConCrema, base)).toBe(true);
    expect(seleccionValida(fresasConCrema, { ...base, salsa: [] })).toBe(false);
  });

  it("seleccionInicial respeta las preselecciones de pasos single", () => {
    expect(seleccionInicial(fresasConCrema)).toEqual({
      tamano: ["med"],
      salsa: ["lecherita"],
      clasicos: [],
      premium: [],
    });
  });
});
