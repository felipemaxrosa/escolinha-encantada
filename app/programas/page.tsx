import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/content/programs";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImagePlaceholder } from "@/components/media/image-placeholder";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Berçário, Creche e Pré-escolar",
  description:
    "Programas por idade, dos primeiros meses aos 6 anos, com rotinas, carinho e aprendizagem pela ação, em Coimbra.",
};

const toneText = {
  primary: "text-primary-700",
  mint: "text-mint-600",
  secondary: "text-secondary-600",
} as const;

const toneBadge = {
  primary: "primary",
  mint: "mint",
  secondary: "secondary",
} as const;

const toneMarker = {
  primary: "marker:text-primary-600",
  mint: "marker:text-mint-600",
  secondary: "marker:text-secondary-600",
} as const;

export default function ProgramasPage() {
  return (
    <>
      <Section>
        <Container className="mx-auto max-w-3xl text-center">
          <Badge tone="primary">Programas</Badge>
          <h1 className="mt-4 text-5xl">Um programa para cada idade</h1>
          <p className="mt-4 text-lg text-ink-soft">
            Do berçário ao pré-escolar, acompanhamos cada fase do desenvolvimento
            com o cuidado que ela merece.
          </p>
        </Container>
      </Section>

      {programs.map((p, i) => (
        <Section
          key={p.slug}
          id={p.slug}
          tone={i % 2 === 0 ? "surface" : "cream"}
          className="scroll-mt-24"
        >
          <Container className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className={cn("space-y-4", i % 2 === 1 && "md:order-2")}>
              <Badge tone={toneBadge[p.tone]}>{p.ageBand}</Badge>
              <h2 className="text-4xl">{p.name}</h2>
              <p className={cn("text-lg font-semibold", toneText[p.tone])}>
                {p.tagline}
              </p>
              <p className="text-ink-soft">{p.summary}</p>
              <ul
                className={cn(
                  "list-disc space-y-2 pl-5 marker:text-lg",
                  toneMarker[p.tone],
                )}
              >
                {p.highlights.map((h) => (
                  <li key={h} className="pl-1">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <Reveal className={cn(i % 2 === 1 && "md:order-1")}>
              <ImagePlaceholder
                className="aspect-[4/3] w-full"
                label={`${p.name} — Escolinha Encantada`}
              />
            </Reveal>
          </Container>
        </Section>
      ))}

      <Section tone="mint">
        <Container className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl">Pronto para começar?</h2>
          <p className="mt-3 text-ink-soft">
            Agende uma visita e conheça o espaço onde o seu filho vai crescer
            feliz.
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
