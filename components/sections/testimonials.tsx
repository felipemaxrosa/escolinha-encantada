import { Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { home } from "@/content/home";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export function Testimonials() {
  return (
    <Section>
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-4xl">{home.sections.testimonials.title}</h2>
          <p className="mt-3 text-lg text-ink-soft">
            {home.sections.testimonials.intro}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="flex h-full flex-col gap-4 rounded-3xl bg-surface p-7 shadow-card">
                <Quote className="size-8 text-primary-300" aria-hidden />
                <blockquote className="flex-1 text-lg">{t.quote}</blockquote>
                <figcaption className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{t.author}</span>
                  <span>· {t.relation}</span>
                  {t.isPlaceholder && (
                    <Badge tone="neutral" className="text-[10px]">
                      exemplo
                    </Badge>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
