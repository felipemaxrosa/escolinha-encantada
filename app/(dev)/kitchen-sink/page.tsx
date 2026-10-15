// Página de validação do design system (dev-only, fora da navegação).
// Remover ou bloquear no robots antes de produção.

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { ImagePlaceholder } from "@/components/media/image-placeholder";
import { Logo } from "@/components/media/logo";

const SWATCH_GROUPS = [
  {
    title: "Primária · Coral (Berçário)",
    items: [
      { cls: "bg-primary-100", label: "100" },
      { cls: "bg-primary-300", label: "300" },
      { cls: "bg-primary-500", label: "500" },
      { cls: "bg-primary-600", label: "600" },
      { cls: "bg-primary-700", label: "700" },
    ],
  },
  {
    title: "Secundária · Lavanda (Pré-escolar)",
    items: [
      { cls: "bg-secondary-100", label: "100" },
      { cls: "bg-secondary-300", label: "300" },
      { cls: "bg-secondary-500", label: "500" },
      { cls: "bg-secondary-600", label: "600" },
    ],
  },
  {
    title: "Menta (Creche)",
    items: [
      { cls: "bg-mint-100", label: "100" },
      { cls: "bg-mint-300", label: "300" },
      { cls: "bg-mint-500", label: "500" },
      { cls: "bg-mint-600", label: "600" },
    ],
  },
  {
    title: "Accent · Botão-de-ouro",
    items: [
      { cls: "bg-accent-200", label: "200" },
      { cls: "bg-accent-400", label: "400" },
    ],
  },
];

const FILLS = [
  { cls: "bg-primary-600", label: "primary-600" },
  { cls: "bg-primary-700", label: "primary-700" },
  { cls: "bg-secondary-500", label: "secondary-500" },
  { cls: "bg-secondary-600", label: "secondary-600" },
  { cls: "bg-mint-600", label: "mint-600" },
];

export default function KitchenSinkPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-16 px-5 py-16">
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-wider text-primary-600 uppercase">
          Kitchen sink · dev
        </p>
        <Logo className="text-3xl" />
        <p className="text-lg text-ink-soft">
          Tokens, cores, tipografia e componentes — validação do design system.
        </p>
      </header>

      <section className="space-y-5">
        <h2 className="text-3xl">Tipografia</h2>
        <Card className="space-y-3">
          <h1 className="text-5xl">Aa · Fredoka display</h1>
          <h2 className="text-4xl">Heading 2</h2>
          <h3 className="text-2xl">Heading 3</h3>
          <p className="text-lg">
            Corpo (Nunito): crianças felizes por aprender e por viver em
            conjunto — afetos, alegria e brincadeira.
          </p>
          <p className="text-base text-ink-soft">
            Secundário · diacríticos pt-PT: ação, coração, português, berçário,
            à é í ó ú ã õ ç.
          </p>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl">Paleta</h2>
        {SWATCH_GROUPS.map((g) => (
          <div key={g.title} className="space-y-2">
            <h3 className="text-lg">{g.title}</h3>
            <div className="flex flex-wrap gap-3">
              {g.items.map((it) => (
                <div key={it.label} className="space-y-1 text-center">
                  <div
                    className={`h-20 w-24 rounded-2xl shadow-card ${it.cls}`}
                  />
                  <span className="text-xs text-ink-soft">{it.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl">Preenchimentos (texto ≥ 4.5:1)</h2>
        <div className="flex flex-wrap gap-3">
          {FILLS.map((f) => (
            <div
              key={f.label}
              className={`flex h-16 items-center justify-center rounded-full px-6 font-semibold text-white ${f.cls}`}
            >
              {f.label}
            </div>
          ))}
          <div className="flex h-16 items-center justify-center rounded-full bg-accent-400 px-6 font-semibold text-ink">
            accent-400 · ink
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl">Componentes</h2>

        <div className="space-y-3">
          <h3 className="text-lg">Botões</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Inscrição</Button>
            <Button variant="secondary">Agendar visita</Button>
            <Button variant="outline">Saber mais</Button>
            <Button variant="ghost">Contacto</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Pequeno</Button>
            <Button size="md">Médio</Button>
            <Button size="lg">Grande</Button>
            <Button disabled>Desativado</Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg">Badges</h3>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">Berçário</Badge>
            <Badge tone="mint">Creche</Badge>
            <Badge tone="secondary">Pré-escolar</Badge>
            <Badge tone="accent">Desde 1994</Badge>
            <Badge tone="neutral">Coimbra</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg">Card + ImagePlaceholder</h3>
          <Card className="grid gap-4 sm:grid-cols-2">
            <ImagePlaceholder className="aspect-video" label="Exemplo de foto" />
            <div className="space-y-2">
              <h4 className="text-xl">Um dia na escola</h4>
              <p className="text-ink-soft">
                Placeholder de marca para quando falta uma foto real.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg">Accordion (FAQ)</h3>
          <Accordion
            type="single"
            collapsible
            className="rounded-3xl bg-surface px-6 shadow-card"
          >
            <AccordionItem value="1">
              <AccordionTrigger>A partir de que idade aceitam?</AccordionTrigger>
              <AccordionContent>
                Desde os primeiros meses, no berçário, até à entrada na escola.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionTrigger>Qual é o horário?</AccordionTrigger>
              <AccordionContent>
                Horário alargado para acompanhar a rotina das famílias.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg">Reveal (scroll-in)</h3>
          <Reveal>
            <Card>
              <p>Este cartão faz fade/slide ao entrar no ecrã.</p>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
