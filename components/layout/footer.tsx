import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/media/logo";
import { FacebookIcon } from "@/components/media/social-icons";

// Avaliado no build (fora do render) para não ler o relógio durante o prerender.
const currentYear = new Date().getFullYear();

export function Footer() {
  const c = site.contact;

  return (
    <footer className="mt-auto border-t border-ink/10 bg-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-ink-soft">{site.tagline}</p>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-lg">Contactos</h2>
          <address className="space-y-1 text-sm text-ink-soft not-italic">
            <p>{c.street}</p>
            <p>
              {c.area}, {c.postalCode} {c.city}
            </p>
            <p>Tel. {c.landlines.join(" · ")}</p>
            <p>Tlm. {c.mobile}</p>
            <p>
              <a href={`mailto:${c.email}`} className="hover:text-primary-700">
                {c.email}
              </a>
            </p>
          </address>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-lg">Navegação</h2>
          <ul className="space-y-1 text-sm text-ink-soft">
            {site.nav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-primary-700">
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={site.cta.href} className="hover:text-primary-700">
                {site.cta.label}
              </Link>
            </li>
          </ul>
          <a
            href={c.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 pt-2 text-sm text-ink-soft hover:text-primary-700"
          >
            <FacebookIcon /> Facebook
          </a>
        </div>
      </Container>

      <div className="border-t border-ink/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 pb-24 text-xs text-ink-soft md:flex-row md:pb-5">
          <p>
            © {currentYear} {site.name} · NIPC {c.nif}
          </p>
          <a
            href={c.complaintsUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary-700"
          >
            Livro de Reclamações
          </a>
        </Container>
      </div>
    </footer>
  );
}
