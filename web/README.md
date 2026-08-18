# Ordinary Fella's — Web

The Next.js frontend for the Ordinary Fella's marketing site. See `../website-architecture-v1.md`
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

See `.env.example`. The contact form submits directly to FormSubmit.co (`NEXT_PUBLIC_FORMSUBMIT_TO`)
— a temporary plugin standing in until a real backend exists. No server-side env vars are
required for the form to work.

## Project layout

- `app/` — routes, layouts, route handlers
- `components/ui/` — shadcn primitives, one folder per component
- `components/layout/`, `components/marketing/` — layout shell and marketing composites
- `features/contact/` — the contact form feature (submits to FormSubmit.co)
- `store/` — Redux Toolkit store, hooks, slices
- `lib/` — site config, metadata builders, env access, validation

## Known follow-ups

- Contact form submission is temporarily wired to FormSubmit.co (`lib/formsubmit.ts`). Replace
  with a real backend/CRM integration when one exists — the Redux slice's submit thunk is the
  one place that needs to change.
- `next.config.ts` CSP keeps `'unsafe-inline'` for the two static JSON-LD `<script>` tags
  (see the comment there for why — moving to a nonce-based CSP would force every marketing
  page to dynamic rendering, which conflicts with the architecture's SSG requirement).
- Team page lists founders by name/role/experience only — no photos yet. Three members
  (Kranthi, Kelvin, Clayton) have their experience bullets intentionally left blank pending
  their input — see `lib/site-config.ts`.
