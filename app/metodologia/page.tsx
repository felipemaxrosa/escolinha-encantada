import type { Metadata } from "next";
import Link from "next/link";
import {
  methodologyIntro,
  methodologySteps,
  values,
} from "@/content/methodology";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Metodologia High/Scope",
  description:
    "Aprendizagem pela ação — planear, fazer e rever. Como ensinamos na Escolinha Encantada, em Coimbra.",
};

export default function MetodologiaPage() {
  return (
    <>
      <Section>
        <Container className="mx-auto max-w-3xl text-center">
          <Badge tone="secondary">Metodologia</Badge>
          <h1 className="mt-4 text-5xl">Aprender fazendo</h1>
          <p className="mt-4 text-lg text-ink-soft">{methodologyIntro}</p>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <h2 className="mb-10 text-center text-3xl">O ciclo que nos guia</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {methodologySteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="flex h-full flex-col gap-3 rounded-3xl bg-cream p-7 shadow-card">
                  <span className="flex size-11 items-center justify-center rounded-full bg-accent-200 font-display text-xl font-bold text-ink">
                    {i + 1}
                  </span>
                  <h3 className="text-xl">{s.title}</h3>
                  <p className="text-ink-soft">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl">A criança no centro</h2>
            <p className="text-ink-soft">
              Procuramos passar o conhecimento primeiro através da experiência e
              só depois através do conceito. O educador é um facilitador: apoia a
              iniciativa, observa e dá sentido às descobertas de cada criança.
            </p>
            <p className="text-ink-soft">
              Respeitamos cada criança como ser pensante e artístico, com tempo e
              espaço suficientes para aprender — sem competição e sem pressas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-surface p-5 shadow-card"
              >
                <h3 className="text-base font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="primary">
        <Container className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl">Desde 1994 a cuidar da infância</h2>
          <p className="mt-3 text-ink-soft">
            Há mais de três décadas que acompanhamos famílias de Coimbra, com a
            mesma dedicação de sempre.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href={site.cta.href}>{site.cta.label}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
