import { describe, it, expect, vi, beforeEach } from "vitest";

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("@/lib/email", () => ({ sendEnrollmentEmail: sendMock }));

import { POST } from "./route";
import { _resetRateLimit } from "@/lib/rate-limit";

const valid = {
  childName: "Rui",
  birthDate: "2024-05-01",
  program: "creche",
  guardianName: "Ana Silva",
  email: "ana@mail.pt",
  phone: "912345678",
  consent: true,
};

function post(body: unknown, ip = "1.1.1.1") {
  return new Request("http://localhost/api/inscricao", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  sendMock.mockReset();
  _resetRateLimit();
});

describe("POST /api/inscricao", () => {
  it("payload válido → 200 e envia o email", async () => {
    const res = await POST(post(valid, "1.0.0.1"));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("payload inválido → 400 e não envia", async () => {
    const res = await POST(post({ ...valid, childName: "" }, "1.0.0.2"));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("honeypot preenchido → 200 e NÃO envia", async () => {
    const res = await POST(post({ ...valid, website: "spam" }, "1.0.0.3"));
    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("JSON malformado → 400", async () => {
    const res = await POST(post("{nao-json", "1.0.0.4"));
    expect(res.status).toBe(400);
  });

  it("falha no envio → 500", async () => {
    sendMock.mockRejectedValueOnce(new Error("down"));
    const res = await POST(post(valid, "1.0.0.5"));
    expect(res.status).toBe(500);
  });

  it("rate-limit → 429 após o máximo", async () => {
    const ip = "1.0.0.6";
    for (let i = 0; i < 5; i++) {
      expect((await POST(post(valid, ip))).status).toBe(200);
    }
    expect((await POST(post(valid, ip))).status).toBe(429);
  });
});
