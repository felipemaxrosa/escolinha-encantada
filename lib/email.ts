import { Resend } from "resend";
import type { EnrollmentInput } from "@/lib/validations/enrollment";

const PROGRAM_LABELS: Record<string, string> = {
  bercario: "Berçário",
  creche: "Creche",
  "pre-escolar": "Pré-escolar",
};

const PROGRAM_COLOR: Record<string, string> = {
  bercario: "#DC4F2A",     // coral
  creche: "#1F7E53",       // menta
  "pre-escolar": "#6E42BC", // lavanda
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
  const programColor = PROGRAM_COLOR[data.program] ?? "#DC4F2A";

  const { error } = await resend.emails.send({
    from: `Escolinha Encantada <${from}>`,
    to,
    bcc: process.env.LEAD_BCC_EMAIL || undefined,
    replyTo: data.email,
    subject: `Nova inscrição — ${data.childName} (${program})`,
    html: buildHtml(data, program, programColor),
    text: buildText(data, program),
  });

  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Template HTML
// Técnica: tabelas para compatibilidade máxima (Outlook, Gmail, Apple Mail).
// Inline styles em tudo — clientes de email ignoram <style> externo.
// ---------------------------------------------------------------------------
function buildHtml(
  data: EnrollmentInput,
  program: string,
  programColor: string,
): string {
  const birth = new Date(data.birthDate).toLocaleDateString("pt-PT");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://escolinha-encantada.vercel.app";

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 12px 6px 0;color:#6B5E54;font-size:13px;white-space:nowrap;vertical-align:top;width:40%">${label}</td>
      <td style="padding:6px 0;color:#2E2A27;font-size:14px;font-weight:600;vertical-align:top">${value}</td>
    </tr>`;

  const section = (title: string, rows: string) => `
    <div style="margin-bottom:20px">
      <div style="font-family:'Trebuchet MS',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B5E54;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #EEE8E3">${title}</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%"><tbody>${rows}</tbody></table>
    </div>`;

  const visitRows = data.wantsVisit
    ? row("Pretende visitar", "Sim") +
      (data.visitDate ? row("Data da visita", data.visitDate) : "") +
      (data.visitPeriod ? row("Período", data.visitPeriod === "manha" ? "Manhã" : "Tarde") : "")
    : row("Pretende visitar", "Não");

  return `<!DOCTYPE html>
<html lang="pt-PT">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5EFE8;font-family:'Nunito','Trebuchet MS',Arial,sans-serif">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5EFE8">
<tbody><tr><td align="center" style="padding:32px 16px">

  <!-- Card principal -->
  <table cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(80,50,30,.12)">
  <tbody>

    <!-- Cabeçalho -->
    <tr>
      <td style="background:#DC4F2A;padding:28px 32px 24px">
        <!-- Quatro quadrados do logo -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px"><tbody><tr>
          <td style="width:10px;height:10px;background:#DC4F2A;border-radius:3px;border:1.5px solid rgba(255,255,255,.6)"></td>
          <td width="3"></td>
          <td style="width:10px;height:10px;background:#FBC01C;border-radius:3px"></td>
          <td width="3"></td>
          <td style="width:10px;height:10px;background:#6E42BC;border-radius:3px"></td>
          <td width="3"></td>
          <td style="width:10px;height:10px;background:#1F7E53;border-radius:3px"></td>
        </tr></tbody></table>
        <div style="font-family:'Trebuchet MS',sans-serif;font-size:22px;font-weight:700;color:#FFFFFF;margin-bottom:4px">Escolinha Encantada</div>
        <div style="font-size:13px;color:rgba(255,255,255,.8)">Nova inscrição recebida pelo site</div>
      </td>
    </tr>

    <!-- Badge do programa -->
    <tr>
      <td style="padding:20px 32px 0">
        <span style="display:inline-block;background:${programColor};color:#fff;font-family:'Trebuchet MS',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:5px 14px;border-radius:999px">${program}</span>
      </td>
    </tr>

    <!-- Corpo -->
    <tr>
      <td style="padding:20px 32px 28px">

        ${section("Criança",
          row("Nome", data.childName) +
          row("Data de nascimento", birth) +
          row("Programa", program)
        )}

        ${section("Encarregado de educação",
          row("Nome", data.guardianName) +
          row("Email", `<a href="mailto:${data.email}" style="color:#DC4F2A;text-decoration:none">${data.email}</a>`) +
          row("Telefone", `<a href="tel:${data.phone}" style="color:#DC4F2A;text-decoration:none">${data.phone}</a>`) +
          (data.preferredStart ? row("Início pretendido", data.preferredStart) : "")
        )}

        ${section("Visita à escola", visitRows)}

        ${data.message ? section("Mensagem",
          `<tr><td colspan="2" style="padding:6px 0;color:#2E2A27;font-size:14px;line-height:1.6">${data.message.replace(/\n/g, "<br>")}</td></tr>`
        ) : ""}

        <!-- CTA -->
        <div style="margin-top:24px;padding:16px;background:#FFF9F3;border-radius:12px;border:1px solid #EEE8E3;text-align:center">
          <div style="font-size:13px;color:#6B5E54;margin-bottom:10px">Para responder ao encarregado, basta usar o botão abaixo — o email vai directamente para ele.</div>
          <a href="mailto:${data.email}?subject=Re: Inscrição de ${data.childName} na Escolinha Encantada" style="display:inline-block;background:#DC4F2A;color:#fff;font-family:'Trebuchet MS',sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:10px 22px;border-radius:999px">Responder a ${data.guardianName.split(" ")[0]}</a>
        </div>

      </td>
    </tr>

    <!-- Rodapé -->
    <tr>
      <td style="background:#FFF9F3;border-top:1px solid #EEE8E3;padding:18px 32px;text-align:center">
        <div style="font-size:12px;color:#6B5E54;line-height:1.8">
          <strong style="color:#2E2A27">Escolinha Encantada</strong><br>
          Travessa Sanches da Gama, 50 — Arregaça, 3030-022 Coimbra<br>
          239 702 002 · 916 135 882 · <a href="mailto:escolinhaencantada@hotmail.com" style="color:#DC4F2A;text-decoration:none">escolinhaencantada@hotmail.com</a>
        </div>
        <div style="margin-top:10px">
          <a href="${siteUrl}" style="font-size:11px;color:#6B5E54;text-decoration:none">${siteUrl.replace(/^https?:\/\//, "")}</a>
        </div>
      </td>
    </tr>

  </tbody></table>
  <!-- /Card -->

</td></tr></tbody></table>
</body></html>`;
}

// ---------------------------------------------------------------------------
// Fallback em texto simples (para clientes que não renderizam HTML)
// ---------------------------------------------------------------------------
function buildText(data: EnrollmentInput, program: string): string {
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
    if (data.visitPeriod)
      lines.push(`Período: ${data.visitPeriod === "manha" ? "Manhã" : "Tarde"}`);
  }
  if (data.message) lines.push("", "Mensagem:", data.message);
  return lines.join("\n");
}
