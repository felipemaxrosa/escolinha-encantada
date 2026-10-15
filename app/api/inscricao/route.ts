import { enrollmentSchema } from "@/lib/validations/enrollment";
import { sendEnrollmentEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Pedido inválido." }, { status: 400 });
  }

  // Honeypot anti-spam: se preenchido, finge sucesso e descarta em silêncio.
  if (isHoneypotFilled(body)) {
    return Response.json({ ok: true });
  }

  const parsed = enrollmentSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
  }

  if (!rateLimit(ipFrom(req))) {
    return Response.json(
      { ok: false, error: "Demasiados pedidos. Tente novamente mais tarde." },
      { status: 429 },
    );
  }

  try {
    await sendEnrollmentEmail(parsed.data);
  } catch {
    return Response.json(
      { ok: false, error: "Não foi possível enviar a inscrição. Tente novamente." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}

function isHoneypotFilled(body: unknown): boolean {
  if (typeof body !== "object" || body === null) return false;
  const w = (body as Record<string, unknown>).website;
  return typeof w === "string" && w.length > 0;
}

function ipFrom(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return xff?.split(",")[0]?.trim() || "unknown";
}
