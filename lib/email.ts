import { Resend } from "resend";
import type { EnrollmentInput } from "@/lib/validations/enrollment";

const PROGRAM_LABELS: Record<string, string> = {
  bercario: "Berçário",
  creche: "Creche",
  "pre-escolar": "Pré-escolar",
};

/** Envia a inscrição por email via Resend. Lança em caso de falha. */
export async function sendEnrollmentEmail(data: EnrollmentInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_RECIPIENT_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !to) {
    throw new Error(
      "Email não configurado: defina RESEND_API_KEY e LEAD_RECIPIENT_EMAIL.",
    );
  }

  const resend = new Resend(apiKey);
  const program = PROGRAM_LABELS[data.program] ?? data.program;

  const { error } = await resend.emails.send({
    from: `Escolinha Encantada <${from}>`,
    to,
    bcc: process.env.LEAD_BCC_EMAIL || undefined,
    replyTo: data.email,
    subject: `Nova inscrição — ${data.childName} (${program})`,
    text: buildBody(data, program),
  });

  if (error) throw new Error(error.message);
}

function buildBody(data: EnrollmentInput, program: string): string {
  const lines = [
    "Nova inscrição recebida pelo site.",
    "",
    `Criança: ${data.childName}`,
    `Data de nascimento: ${new Date(data.birthDate).toLocaleDateString("pt-PT")}`,
    `Programa: ${program}`,
    `Encarregado de educação: ${data.guardianName}`,
    `Email: ${data.email}`,
    `Telefone: ${data.phone}`,
  ];
  if (data.preferredStart) lines.push(`Início pretendido: ${data.preferredStart}`);
  if (data.wantsVisit) {
    lines.push("Pretende agendar visita: Sim");
    if (data.visitDate) lines.push(`Data da visita: ${data.visitDate}`);
    if (data.visitPeriod) {
      lines.push(`Período: ${data.visitPeriod === "manha" ? "Manhã" : "Tarde"}`);
    }
  }
  if (data.message) lines.push("", "Mensagem:", data.message);
  return lines.join("\n");
}
