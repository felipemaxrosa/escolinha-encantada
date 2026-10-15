import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/content/site";

export function StickyMobileCta() {
  const tel = `+351${site.contact.mobile.replace(/\s/g, "")}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur md:hidden">
      <a
        href={`tel:${tel}`}
        className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface font-semibold text-ink"
      >
        <Phone className="size-5" aria-hidden /> Ligar
      </a>
      <Link
        href={site.cta.href}
        className="inline-flex h-12 flex-[1.4] items-center justify-center rounded-full bg-primary-600 font-semibold text-white"
      >
        {site.cta.label}
      </Link>
    </div>
  );
}
