# Rockbase — Web

The Next.js frontend for the Rockbase marketing site. See `../website-architecture-v1.md`
for the full technical architecture and `../CLAUDE.md` for stack conventions.

## Stack

Next.js 16 (App Router, Turbopack), TypeScript strict, Tailwind CSS 4, shadcn/ui (Base UI),
Redux Toolkit for client state, Motion for animation, hand-written validation (no schema
library — see `lib/validation.ts`).

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev      # Turbopack dev server
pnpm build    # Production build (also type-checks)
pnpm lint     # ESLint
```

## Environment variables

See `.env.example`. `API_BASE_URL` points at the Spring Boot API and is unset by default —
until it's set, `POST /api/leads` returns a `503` explaining the backend isn't configured
yet, rather than faking a success response.

## Project layout

- `app/` — routes, layouts, route handlers
- `components/ui/` — shadcn primitives, one folder per component
- `components/layout/`, `components/marketing/` — layout shell and marketing composites
- `features/contact/` — the contact form feature
- `store/` — Redux Toolkit store, hooks, slices
- `lib/` — site config, metadata builders, env access, validation, the API client layer

## Known follow-ups

- Spring Boot API doesn't exist yet — `lib/api/client.ts` is the integration seam; wire
  `API_BASE_URL` once it's deployed and the contact form works end-to-end with zero
  frontend changes.
- `next.config.ts` CSP keeps `'unsafe-inline'` for the two static JSON-LD `<script>` tags
  (see the comment there for why — moving to a nonce-based CSP would force every marketing
  page to dynamic rendering, which conflicts with the architecture's SSG requirement).
- About page team section uses role-only placeholders, no invented names/photos — replace
  with the founders' real details before launch.
