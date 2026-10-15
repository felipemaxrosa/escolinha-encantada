import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs } from "@/content/programs";
import { home } from "@/content/home";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const toneStyles = {
  primary: { card: "bg-primary-100/60", chip: "bg-primary-600 text-white", dot: "text-primary-600" },
  mint: { card: "bg-mint-100/60", chip: "bg-mint-600 text-white", dot: "text-mint-600" },
  secondary: { card: "bg-secondary-100/60", chip: "bg-secondary-600 text-white", dot: "text-secondary-600" },
} as const;

export function ProgramsGrid() {
  return (
    <Section>
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-4xl">{home.sections.programs.title}</h2>
          <p className="mt-3 text-lg text-ink-soft">
            {home.sections.programs.intro}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {programs.map((p, i) => {
            const t = toneStyles[p.tone];
            return (
              <Reveal key={p.slug} delay={i * 0.1}>
                <div
                  className={cn(
                    "flex h-full flex-col gap-4 rounded-3xl p-7 shadow-card",
                    t.card,
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase",
                      t.chip,
                    )}
                  >
                    {p.ageBand}
                  </span>
                  <h3 className="text-2xl">{p.name}</h3>
                  <p className="text-ink-soft">{p.summary}</p>
                  <ul className="mt-auto space-y-2 pt-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm">
                        <span className={cn("mt-0.5 font-bold", t.dot)}>•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/programas#${p.slug}`}
                    className="inline-flex items-center gap-1.5 pt-2 font-semibold text-ink transition-all hover:gap-2.5"
                  >
                    Saber mais <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
