import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("junta classes condicionais ignorando falsy", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });

  it("resolve conflitos do Tailwind (a última vence)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
