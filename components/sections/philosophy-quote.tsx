import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function PhilosophyQuote() {
  return (
    <Section tone="secondary">
      <Container>
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-display text-3xl leading-snug text-balance md:text-4xl">
              “A melhor maneira de criar as crianças boas é torná-las felizes.”
            </blockquote>
            <figcaption className="mt-4 text-ink-soft">— Oscar Wilde</figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
