import { home } from "@/content/home";
import type { FaqEntry } from "@/sanity/queries";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq({ items }: { items: FaqEntry[] }) {
  if (items.length === 0) return null;
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl">{home.sections.faq.title}</h2>
          <p className="mt-3 text-lg text-ink-soft">{home.sections.faq.intro}</p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="rounded-3xl bg-surface px-6 shadow-card md:px-8"
        >
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
