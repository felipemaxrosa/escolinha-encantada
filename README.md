# Escolinha Encantada

Website moderno da **Escolinha Encantada** — creche, berçário e pré-escolar no centro de Coimbra, desde 1994. Desenhado em torno da jornada dos pais até à inscrição, com o conteúdo-chave (hero, galeria, instalações, equipa) editável pela escola num CMS, sem tocar no código.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Sanity](https://img.shields.io/badge/CMS-Sanity-F03E2F?logo=sanity&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

🔗 **Demo:** <https://escolinha-encantada.vercel.app> &nbsp;·&nbsp; **Studio (CMS):** <https://escolinha-encantada.sanity.studio>

---

## Destaques

- **Server-first** — React Server Components por padrão; JavaScript no cliente só onde é preciso (navegação, formulário, galeria).
- **Conteúdo editável sem código** — as fotos e textos-chave vivem no Sanity; a escola edita e o site atualiza sozinho (ISR).
- **Formulário de inscrição funcional** — um único schema `zod` valida cliente e servidor, com honeypot, _rate-limit_ por IP e envio do lead por email.
- **SEO cuidado** — metadata única por página, dados estruturados JSON-LD (`ChildCare`, `FAQPage`), `sitemap`, `robots` e Open Graph.
- **Acessível e responsivo** — contraste validado, navegável por teclado, respeita `prefers-reduced-motion`, _mobile-first_.
- **Português europeu** (pt-PT) de ponta a ponta.

## Stack

| Área | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript |
| Estilos | Tailwind CSS v4 (tokens `@theme`) |
| CMS | Sanity v6 (`next-sanity`, `@sanity/image-url`) |
| Formulários | react-hook-form + zod |
| Email | Resend |
| UI / Motion | Radix UI · motion · lucide-react |
| Qualidade | Vitest · ESLint · Prettier |
| Deploy | Vercel |

## Arquitetura de conteúdo

Modelo híbrido — cada coisa no sítio certo:

| No **Sanity** (a escola edita) | No **código** (`content/*.ts`, versionado) |
| --- | --- |
| Hero da home · galeria · instalações · equipa · depoimentos | Navegação · contactos · programas · metodologia · FAQ · SEO |

Mover um campo do código para o Sanity mais tarde é trivial: criar o _schema_ e trocar a fonte da _query_.

## Começar

**Pré-requisitos:** Node.js ≥ 20 e [pnpm](https://pnpm.io).

```bash
pnpm install
cp .env.example .env.local    # preencher as variáveis (ver abaixo)
pnpm dev                      # http://localhost:3000
```

O site arranca mesmo sem o Sanity configurado — as páginas caem para _placeholders_ de marca em vez de quebrarem.

## Variáveis de ambiente

Copiar `.env.example` para `.env.local` e preencher. Nunca commitar `.env.local`.

| Variável | Descrição |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` · `NEXT_PUBLIC_SANITY_DATASET` | Projeto e dataset Sanity (dataset público → leitura sem token). |
| `SANITY_API_READ_TOKEN` | Leitura de _drafts_/_preview_ (server-only). Opcional. |
| `SANITY_API_WRITE_TOKEN` | Escrita — **só local**, usado pelo script de _seed_. |
| `SANITY_REVALIDATE_SECRET` | Valida o _webhook_ de revalidação do Sanity. |
| `RESEND_API_KEY` · `LEAD_RECIPIENT_EMAIL` · `LEAD_FROM_EMAIL` · `LEAD_BCC_EMAIL` | Envio das inscrições por email. |
| `NEXT_PUBLIC_SITE_URL` | URL público (canonical, sitemap, Open Graph). |
| `RATE_LIMIT_MAX` | Máximo de submissões do formulário por IP (default `5`). |

## Scripts

| Comando | Função |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` · `pnpm start` | _Build_ de produção · servir |
| `pnpm typecheck` | Verificação de tipos (`tsc --noEmit`) |
| `pnpm lint` · `pnpm format` | ESLint · Prettier |
| `pnpm test` · `pnpm test:run` | Vitest (_watch_ · uma vez) |

## CMS — Sanity Studio

O Studio corre **à parte** da aplicação Next.js (não é uma rota do site):

```bash
pnpm exec sanity dev       # Studio local em http://localhost:3333
pnpm exec sanity deploy    # publica em https://escolinha-encantada.sanity.studio
```

**Seed de conteúdo** — povoa o dataset com as fotos reais (galeria + instalações), de forma idempotente:

```bash
node --env-file=.env.local scripts/seed-sanity.mjs   # requer SANITY_API_WRITE_TOKEN
```

## Estrutura

```
app/          Rotas (App Router): páginas · /api (inscrição, revalidate) · sitemap/robots/manifest
components/    ui · layout · sections · forms · media · motion
content/       Copy estrutural tipada (pt-PT)
sanity/        Schemas · client · queries · image
lib/           Validações (zod) · email · rate-limit · SEO · utils
scripts/       Seed do Sanity · preparação de assets
```

## Testes

```bash
pnpm test:run
```

A Vitest cobre a lógica de negócio: validação do formulário, sugestor de programa por idade e a rota de inscrição (honeypot, _rate-limit_, erros de validação e de envio).

## Deploy

Deploy automático na **Vercel** a partir de `main`, com _preview_ por cada _branch_. As variáveis de ambiente são configuradas no painel da Vercel. O Studio publica-se em separado com `pnpm exec sanity deploy`.

---

Projeto privado · © Escolinha Encantada
