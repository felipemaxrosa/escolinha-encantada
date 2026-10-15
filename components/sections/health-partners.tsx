import { HeartPulse } from "lucide-react";
import { healthPartners } from "@/content/health";

export function HealthPartners() {
  return (
    <div className="rounded-3xl bg-secondary-100/50 p-8 md:p-10">
      <div className="mx-auto mb-6 max-w-2xl text-center">
        <h2 className="text-2xl">Educação e saúde de mãos dadas</h2>
        <p className="mt-2 text-ink-soft">
          Contamos com parcerias de profissionais de saúde para acompanhar o
          desenvolvimento das crianças.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {healthPartners.map((p) => (
          <li
            key={p.name}
            className="flex items-start gap-3 rounded-2xl bg-surface p-4 shadow-card"
          >
            <HeartPulse
              className="mt-0.5 size-5 shrink-0 text-secondary-600"
              aria-hidden
            />
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-ink-soft">{p.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
