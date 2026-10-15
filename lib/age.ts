export type Program = "bercario" | "creche" | "pre-escolar";

/** Sugere o programa a partir da idade da criança (em meses completos). */
export function suggestProgram(birth: Date, ref: Date = new Date()): Program {
  const months =
    (ref.getFullYear() - birth.getFullYear()) * 12 +
    (ref.getMonth() - birth.getMonth());
  if (months < 12) return "bercario";
  if (months < 36) return "creche";
  return "pre-escolar";
}
