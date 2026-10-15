# Escolinha Encantada

Website da **Escolinha Encantada** — creche, berçário e pré-escolar no centro de Coimbra (Portugal), desde 1994. Construído em Next.js, com o conteúdo-chave (hero, carrosséis, galeria, equipa) gerido num CMS (Sanity) para edição sem código.

## Stack

- **Next.js** (App Router, React 19, TypeScript) · **Tailwind CSS v4**
- **Sanity** — CMS com Studio embutido em `/studio`
- **react-hook-form + zod** — formulário de inscrição
- **Resend** — entrega das inscrições por email
- **Vitest** — testes · **ESLint + Prettier** — lint/formatação
- Deploy: **Vercel**

## Começar

```bash
pnpm install
cp .env.example .env.local   # preencher as variáveis
pnpm dev                     # http://localhost:3000
```

## Scripts

| Comando | Função |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` / `pnpm start` | Build de produção / servir |
| `pnpm typecheck` | Verificação de tipos (`tsc --noEmit`) |
| `pnpm lint` | ESLint |
| `pnpm test` / `pnpm test:run` | Vitest (watch / uma vez) |
| `pnpm format` | Prettier |

## Variáveis de ambiente

Ver `.env.example` — Sanity (`NEXT_PUBLIC_SANITY_*`, tokens), Resend (`RESEND_API_KEY`, `LEAD_*`) e `NEXT_PUBLIC_SITE_URL`. Nunca commitar `.env.local`.

## Estrutura

```
app/         rotas (App Router) + /studio (Sanity) + /api
components/   ui · layout · sections · forms · media · motion
content/      copy estrutural tipada (pt-PT)
sanity/       schemas · client · queries
lib/          utils · validações · email · seo
```
