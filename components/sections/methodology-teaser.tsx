import Link from "next/link";
import { methodologyIntro, methodologySteps } from "@/content/methodology";
import { home } from "@/content/home";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function MethodologyTeaser() {
  return (
    <Section>
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-4xl">{home.sections.methodology.title}</h2>
          <p className="mt-3 text-lg text-ink-soft">{methodologyIntro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {methodologySteps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="flex h-full flex-col gap-3 rounded-3xl bg-surface p-7 shadow-card">
                <span className="flex size-11 items-center justify-center rounded-full bg-accent-200 font-display text-xl font-bold text-ink">
                  {i + 1}
                </span>
                <h3 className="text-xl">{s.title}</h3>
                <p className="text-ink-soft">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/metodologia">Conhecer a metodologia</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
