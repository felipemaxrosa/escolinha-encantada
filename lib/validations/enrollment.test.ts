import { describe, it, expect } from "vitest";
import { enrollmentSchema } from "./enrollment";

const valid = {
  childName: "Rui",
  birthDate: "2024-05-01",
  program: "creche",
  guardianName: "Ana Silva",
  email: "ana@mail.pt",
  phone: "912345678",
  consent: true,
};

describe("enrollmentSchema", () => {
  it("aceita um payload válido", () => {
    expect(enrollmentSchema.safeParse(valid).success).toBe(true);
  });

  it("aceita telemóvel com prefixo +351", () => {
    expect(
      enrollmentSchema.safeParse({ ...valid, phone: "+351 912345678" }).success,
    ).toBe(true);
  });

  it("rejeita telemóvel inválido", () => {
    expect(
      enrollmentSchema.safeParse({ ...valid, phone: "123" }).success,
    ).toBe(false);
  });

  it("rejeita email inválido", () => {
    expect(
      enrollmentSchema.safeParse({ ...valid, email: "nao-e-email" }).success,
    ).toBe(false);
  });

  it("rejeita sem consentimento RGPD", () => {
    expect(
      enrollmentSchema.safeParse({ ...valid, consent: false }).success,
    ).toBe(false);
  });

  it("rejeita data de nascimento no futuro", () => {
    expect(
      enrollmentSchema.safeParse({ ...valid, birthDate: "2099-01-01" }).success,
    ).toBe(false);
  });

  // O programa passou de enum fixo para string (a lista válida vem do Sanity,
  // via as opções do formulário); o schema exige apenas que não seja vazio.
  it("rejeita programa vazio", () => {
    expect(
      enrollmentSchema.safeParse({ ...valid, program: "" }).success,
    ).toBe(false);
  });
});
