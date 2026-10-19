"use client";

import { useState, type ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import {
  enrollmentSchema,
  type EnrollmentInput,
} from "@/lib/validations/enrollment";
import { suggestProgram } from "@/lib/age";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export function EnrollmentForm({
  programs,
}: {
  programs: { slug: string; name: string }[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EnrollmentInput>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: { program: "creche", wantsVisit: false, consent: false },
  });

  const wantsVisit = useWatch({ control, name: "wantsVisit" });

  async function onSubmit(data: EnrollmentInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function onBirthChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    if (v) {
      const d = new Date(v);
      if (!Number.isNaN(d.getTime())) setValue("program", suggestProgram(d));
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl bg-mint-100/60 p-10 text-center"
      >
        <CheckCircle2 className="size-12 text-mint-600" aria-hidden />
        <h3 className="text-2xl">Inscrição recebida!</h3>
        <p className="text-ink-soft">
          Obrigado. Entraremos em contacto consigo brevemente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot anti-spam (escondido) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("website")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Nome da criança"
          htmlFor="childName"
          required
          error={errors.childName?.message}
        >
          <Input
            id="childName"
            aria-invalid={!!errors.childName}
            {...register("childName")}
          />
        </Field>
        <Field
          label="Data de nascimento"
          htmlFor="birthDate"
          required
          error={errors.birthDate?.message}
        >
          <Input
            id="birthDate"
            type="date"
            aria-invalid={!!errors.birthDate}
            {...register("birthDate", { onChange: onBirthChange })}
          />
        </Field>
      </div>

      <Field
        label="Programa pretendido"
        htmlFor="program"
        error={errors.program?.message}
      >
        <Select id="program" {...register("program")}>
          {programs.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="O seu nome"
          htmlFor="guardianName"
          required
          error={errors.guardianName?.message}
        >
          <Input
            id="guardianName"
            aria-invalid={!!errors.guardianName}
            {...register("guardianName")}
          />
        </Field>
        <Field
          label="Email"
          htmlFor="email"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Telefone"
          htmlFor="phone"
          required
          hint="9 dígitos (ex. 912345678)"
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
        <Field label="Início pretendido" htmlFor="preferredStart">
          <Input id="preferredStart" type="month" {...register("preferredStart")} />
        </Field>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-ink/10 bg-surface p-4">
        <input
          type="checkbox"
          className="size-5 accent-primary-600"
          {...register("wantsVisit")}
        />
        <span className="font-medium">Quero agendar uma visita</span>
      </label>

      {wantsVisit && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Data da visita" htmlFor="visitDate">
            <Input id="visitDate" type="date" {...register("visitDate")} />
          </Field>
          <Field label="Período" htmlFor="visitPeriod">
            <Select id="visitPeriod" {...register("visitPeriod")}>
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
            </Select>
          </Field>
        </div>
      )}

      <Field
        label="Mensagem (opcional)"
        htmlFor="message"
        error={errors.message?.message}
      >
        <Textarea id="message" {...register("message")} />
      </Field>

      <div className="space-y-1.5">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 size-5 accent-primary-600"
            aria-invalid={!!errors.consent}
            {...register("consent")}
          />
          <span className="text-sm text-ink-soft">
            Autorizo o tratamento dos meus dados para efeitos de contacto, nos
            termos do RGPD. <span className="text-primary-600">*</span>
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs font-medium text-error" role="alert">
            {errors.consent.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="rounded-xl bg-error/10 p-3 text-sm text-error" role="alert">
          Não foi possível enviar a inscrição. Verifique os dados e tente
          novamente.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? "A enviar…" : "Enviar inscrição"}
      </Button>
    </form>
  );
}
