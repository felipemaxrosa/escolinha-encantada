import { z } from "zod";

export const enrollmentSchema = z.object({
  childName: z.string().min(2, "Indique o nome da criança.").max(80),
  birthDate: z
    .string()
    .min(1, "Indique a data de nascimento.")
    .refine((s) => {
      const d = new Date(s);
      return !Number.isNaN(d.getTime()) && d.getTime() <= Date.now();
    }, "Data inválida ou no futuro."),
  program: z.string().min(1, "Indique o programa pretendido."),
  guardianName: z.string().min(2, "Indique o seu nome.").max(80),
  email: z.email("Email inválido."),
  phone: z
    .string()
    .regex(/^(\+351\s?)?\d{9}$/, "Telefone inválido (9 dígitos)."),
  preferredStart: z.string().optional(),
  wantsVisit: z.boolean().optional(),
  visitDate: z.string().optional(),
  visitPeriod: z.enum(["manha", "tarde"]).optional(),
  message: z.string().max(1000, "Mensagem demasiado longa.").optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, "É necessário o consentimento para prosseguir."),
  // Honeypot anti-spam — deve ficar vazio; verificado no endpoint.
  website: z.string().optional(),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;
