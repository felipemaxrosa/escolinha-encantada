import { describe, it, expect } from "vitest";
import { suggestProgram } from "./age";

describe("suggestProgram", () => {
  it("bebé com menos de 12 meses → berçário", () => {
    expect(
      suggestProgram(new Date("2026-03-01"), new Date("2026-10-15")),
    ).toBe("bercario");
  });

  it("exatamente 12 meses → creche", () => {
    expect(
      suggestProgram(new Date("2025-10-15"), new Date("2026-10-15")),
    ).toBe("creche");
  });

  it("criança entre 1 e 3 anos → creche", () => {
    expect(
      suggestProgram(new Date("2024-06-01"), new Date("2026-10-15")),
    ).toBe("creche");
  });

  it("exatamente 36 meses → pré-escolar", () => {
    expect(
      suggestProgram(new Date("2023-10-15"), new Date("2026-10-15")),
    ).toBe("pre-escolar");
  });

  it("criança com mais de 3 anos → pré-escolar", () => {
    expect(
      suggestProgram(new Date("2022-01-01"), new Date("2026-10-15")),
    ).toBe("pre-escolar");
  });
});
