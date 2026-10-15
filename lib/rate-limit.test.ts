import { describe, it, expect, beforeEach } from "vitest";
import { rateLimit, _resetRateLimit } from "./rate-limit";

beforeEach(() => _resetRateLimit());

describe("rateLimit", () => {
  it("permite até ao máximo e bloqueia a seguir", () => {
    const ip = "9.9.9.9";
    for (let i = 0; i < 5; i++) expect(rateLimit(ip, 5)).toBe(true);
    expect(rateLimit(ip, 5)).toBe(false);
  });

  it("conta por chave de forma independente", () => {
    expect(rateLimit("a", 1)).toBe(true);
    expect(rateLimit("a", 1)).toBe(false);
    expect(rateLimit("b", 1)).toBe(true);
  });
});
