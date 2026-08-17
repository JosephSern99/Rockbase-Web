# Company Website — Technical Architecture v1.0

**Status:** Proposed
**Audience:** All four founding members
**Scope:** The marketing and lead-generation website described in `Company Website Draft 1.0` and `Design`

---

## 1. What we are actually building

A four-page marketing site with a lead-capture engine behind it. The business goals, in priority order:

1. **Be found.** Rank on Google and get cited by AI assistants when someone searches for a web development / RPA / content writing partner.
2. **Convert.** Turn a visitor into a named lead with an email address and a stated service interest.
3. **Prove credibility.** Case studies and testimonials that make a stranger trust us with a budget.
4. **Track.** Keep a durable record of every lead, every client, every engagement — so we have a pipeline, not a pile of emails.

Everything below serves those four goals. Anything that does not serve them is out of scope for v1.

**Expected traffic year one:** tens to low hundreds of visitors per day. This is not a scale problem. It is a *speed of iteration* and *discoverability* problem.

---

## 2. Architecture at a glance

```
Visitors / Google / AI crawlers
            |
     Cloudflare (DNS, WAF, bot filtering)
            |
     Next.js frontend  ──────────────► Vercel
            |
     Spring Boot API   ──────────────► AWS App Runner
            |                              |
     PostgreSQL (RDS)              Integrations
     S3 (media assets)             (SES, PostHog, Sentry)
```

One frontend. One backend deployable. One database. That is the whole system.

---

## 3. The stack, and why each piece

### 3.1 Frontend — Next.js

| Item | Choice | Version target |
|---|---|---|
| Framework | Next.js, App Router | 15.x |
| Language | TypeScript (strict mode on) | 5.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui (copy-in, not a dependency) | latest |
| Animation | Motion (`motion` package) | latest |
| Forms | React Hook Form + Zod | latest |
| 3D (Phase 3 only) | react-three-fiber + drei | latest |

**Why Next.js and not Astro or Qwik.** Astro is genuinely faster for pure content sites and Qwik has clever resumability. Neither matters here. Three of you already know React, the whole team can be productive in Next.js this week, and the ecosystem is deep enough that any future hire knows it. Astro would win a benchmark and lose the project.

**Rendering strategy — decide this per page and write it down:**

| Page | Strategy | Reason |
|---|---|---|
| Home | Static (SSG) | Never changes without a deploy |
| About Us / Our Story / Mission / Team | Static (SSG) | Same |
| Services (all three) | Static (SSG) | Same |
| Case studies index + detail | ISR, 60s revalidate | Content comes from the DB, changes weekly |
| Customer reviews | ISR, 60s revalidate | Same |
| Contact Us | Static shell + client form | Form posts to the API |
| Refer a friend | Static shell + client form | Same |

Everything the crawler needs to read must be in the server-rendered HTML. If a bot has to run JavaScript to see our service descriptions, we have failed at goal #1.

**Non-negotiables for discoverability:**
- JSON-LD structured data on every page: `Organization`, `Service`, `Review`, `BreadcrumbList`, `FAQPage`
- `sitemap.xml` and `robots.txt` generated at build time
- Semantic HTML — one `<h1>`, real heading hierarchy, real `<article>` and `<nav>`
- An `/llms.txt` file describing what we do in plain text (cheap, and increasingly read by AI crawlers)
- Open Graph and Twitter card images per page
- Lighthouse budget enforced in CI: performance ≥ 90, accessibility ≥ 95

### 3.2 Backend — Spring Boot

| Item | Choice |
|---|---|
| Runtime | Java 21 (LTS, supported to 2031) |
| Framework | Spring Boot 3.x |
| Web | Spring Web (REST, JSON) |
| Persistence | Spring Data JPA + Hibernate |
| Migrations | Flyway |
| Validation | Jakarta Bean Validation |
| Security | Spring Security |
| API docs | springdoc-openapi |
| Build | Gradle (Kotlin DSL) or Maven — pick one, never both |
| Testing | JUnit 5, AssertJ, Testcontainers |

**Structure: modular monolith.** One deployable JAR. Inside it, packages that do not reach into each other's internals:

```
com.company.site
├── lead          POST /api/leads, admin listing, status transitions
├── referral      code generation, redemption, expiry
├── content       case studies, services, team members
├── review        testimonial submission + approval workflow
├── notification  email dispatch (SES), templating
├── admin         authentication, admin-only endpoints
└── shared        common types, exceptions, config
```

Rule: modules talk to each other through public service interfaces, never through each other's repositories. If we ever need to split this into services, the seams are already cut. We almost certainly never will.

**Why not microservices, Kubernetes, or a service mesh.** Four people. Client work to deliver. The operational cost of a distributed system is paid daily and the benefit arrives at a scale we will not reach for years. Revisit only when a single module genuinely needs independent scaling or an independent release cadence.

**Why not Node/NestJS for the backend.** Three of four are strongest in Java. A TypeScript backend means 25% of the team owns 100% of the backend. That is a bus factor problem and a code review problem.

### 3.3 Database — PostgreSQL

**Why Postgres over MySQL,** given the team knows both:

- `JSONB` columns — store UTM parameters, form metadata, and audit payloads without schema churn
- Native full-text search — powers site search in Phase 2 with no extra infrastructure
- `pgvector` extension — the "custom trained natural-language site search" in the Phase 2.0 draft needs vector similarity. Postgres does it in the same database. MySQL would mean adding a second datastore.
- Better constraint support (partial indexes, exclusion constraints, proper `CHECK`)

The SQL your team already writes works unchanged. This is a low-cost, high-option-value choice.

**Instance:** AWS RDS `db.t4g.micro`, single-AZ, 7-day automated backups, encryption at rest on. Move to Multi-AZ when revenue justifies it (~$15/month extra). Enable Performance Insights.

### 3.4 Hosting

| Component | Where | Why |
|---|---|---|
| Next.js frontend | Vercel | Zero-ops, best-in-class Next.js support, free tier covers year one |
| Spring Boot API | AWS App Runner | Container in, HTTPS URL out. No load balancer, no task definitions, no VPC wrangling. Auto-scales, scales to a low floor. |
| Database | AWS RDS PostgreSQL | Managed backups, patching, point-in-time restore |
| Media assets | AWS S3 + CloudFront | Cheap, durable, fast |
| DNS / WAF / CDN | Cloudflare (free tier) | DDoS protection, bot filtering, and Turnstile for form spam |

**If the team wants AWS-only** (defensible — it is a capability we sell), swap Vercel for **AWS Amplify Hosting**, which supports Next.js SSR natively. Do *not* hand-roll Next.js on Lambda or ECS. That is a multi-week project with ongoing maintenance and it buys nothing.

**Migration path if we outgrow App Runner:** the container image is unchanged; move to ECS Fargate behind an ALB. This is a Terraform change, not a code change. That is the point.

### 3.5 Supporting services

| Need | Service | Cost |
|---|---|---|
| Transactional email | AWS SES | ~$1/mo |
| Product analytics + funnels | PostHog (free tier) | $0 |
| Search analytics | Google Search Console | $0 |
| Error tracking (both tiers) | Sentry (free tier) | $0 |
| Form spam prevention | Cloudflare Turnstile | $0 |
| Secrets | AWS Secrets Manager | ~$1/mo |
| Uptime monitoring | Better Stack / UptimeRobot free | $0 |

**Estimated total monthly cost: US$70–110.**

---

## 4. Data model

Two distinct layers. Keep them separate — do not let spam submissions pollute the client records.

### Layer 1 — Inbound (raw, untrusted)

**`lead`**

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `full_name` | text | |
| `email` | citext | indexed |
| `phone` | text | nullable |
| `company_name` | text | nullable, free text at this stage |
| `service_interest` | text | FK-ish to `service.slug` |
| `message` | text | |
| `source_page` | text | which page the form was on |
| `utm` | jsonb | source, medium, campaign, term, content |
| `referral_code` | text | nullable, FK to `referral.code` |
| `consent_marketing` | boolean | explicit checkbox, not pre-ticked |
| `consent_at` | timestamptz | |
| `status` | enum | `new`, `contacted`, `qualified`, `won`, `lost`, `spam` |
| `assigned_to` | uuid | FK `admin_user` |
| `created_at` | timestamptz | |

### Layer 2 — CRM (curated, trusted)

**`company`** — `id`, `name`, `industry`, `size_band`, `website`, `country`, `created_at`

**`contact`** — `id`, `company_id` FK, `full_name`, `email`, `phone`, `role`, `is_primary`

**`engagement`** — `id`, `company_id` FK, `service_id` FK, `title`, `status`, `started_at`, `ended_at`, `value_myr`, `notes`
> This is the track record. Every completed engagement here becomes a potential case study and a potential testimonial request.

A `lead` gets promoted: when it reaches `qualified`, an admin links or creates a `company` and `contact`. Raw leads are never deleted, but they are not the source of truth about clients.

### Content

**`service`** — `id`, `slug`, `name`, `summary`, `body_md`, `icon`, `display_order`, `is_active`
> Three rows to start: `web-development`, `robotic-process-automation`, `content-writing`. Driving the services filter off the database, not hardcoded arrays, means adding a fourth service is a data change.

**`case_study`** — `id`, `slug`, `service_id` FK, `title`, `client_display_name`, `industry`, `summary`, `body_md`, `hero_image_key`, `external_url`, `published_at`
> Covers "O&G trading website", "Coffee shop website", and the RPA and content samples from the draft.

**`testimonial`** — `id`, `company_id` FK nullable, `author_name`, `author_role`, `author_company`, `rating`, `body`, `status` (`pending`/`approved`/`rejected`), `published_at`
> Never publish straight from a public form. Everything goes through approval.

**`team_member`** — `id`, `full_name`, `role`, `bio`, `photo_key`, `linkedin_url`, `display_order`

### Referrals

**`referral`**

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `referrer_name` | text | |
| `referrer_email` | citext | |
| `code` | text unique | short, URL-safe, e.g. `AXK4T9` |
| `discount_percent` | int | default 10 |
| `status` | enum | `issued`, `redeemed`, `expired` |
| `redeemed_lead_id` | uuid | FK `lead`, nullable |
| `issued_at` / `expires_at` / `redeemed_at` | timestamptz | |

**Note the absence of friend name, friend email, and friend phone.** See §6.

### Audit

**`activity_log`** — `id`, `entity_type`, `entity_id`, `actor_id`, `action`, `payload` jsonb, `created_at`

**`admin_user`** — `id`, `email`, `password_hash` (bcrypt), `role`, `mfa_secret`, `is_active`

---

## 5. Security baseline

Non-negotiable before launch:

- [ ] TLS everywhere; HSTS with a long max-age
- [ ] Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy set in Next.js middleware
- [ ] CORS on the API restricted to our own domains only
- [ ] Every public form: Cloudflare Turnstile + server-side rate limit (per IP, per email) + honeypot field
- [ ] Input validation on **both** tiers — Zod on the client, Bean Validation on the server. Client validation is UX; server validation is security.
- [ ] All queries via JPA / parameterised. No string-concatenated SQL, ever.
- [ ] Secrets in AWS Secrets Manager. Nothing sensitive in the repo, in `.env` committed files, or in `NEXT_PUBLIC_*` variables.
- [ ] Admin panel behind authentication with mandatory MFA
- [ ] RDS not publicly accessible; reachable only from the App Runner VPC connector
- [ ] Dependabot enabled on both repos; `npm audit` and OWASP dependency-check in CI
- [ ] Structured logging with PII redaction (never log full email addresses or phone numbers at INFO)
- [ ] Backups verified by an actual restore test before launch, not just enabled

---

## 6. Two decisions that need a team conversation

### 6.1 The referral form and PDPA

The current draft collects **friend name, friend email, and friend phone number** from the referrer. This means we hold a third party's personal data, obtained from someone with no authority to provide it. Under Malaysia's Personal Data Protection Act 2010 this is a real exposure, and it is worse the moment we take on a client in Singapore or the EU.

**Recommended design instead:**

1. Referrer submits their own name and email.
2. We generate a unique referral code and a shareable link.
3. The referrer sends it to their friend themselves — WhatsApp, email, however they like.
4. The friend arrives, fills in their own details, and the code attaches the discount.

We never store data about a person who has not contacted us. This also converts better — a message from a friend outperforms a cold email from a company nobody knows.

If the team still wants to send the invitation on the referrer's behalf, we need at minimum: an explicit checkbox where the referrer confirms they have the friend's permission, a clear identification of us as sender in the email, a one-click opt-out, and automatic purge of unredeemed friend data after 30 days. That is more work than the link approach, for a worse result.

### 6.2 The homepage carousel

Carousels damage Largest Contentful Paint, which is a Core Web Vitals ranking signal, and interaction rates past the first slide are consistently near zero. If we keep it: slide one must be server-rendered static content that does not depend on JavaScript, and the remaining slides lazy-load. Better option is a static hero with a strong headline and three service cards below it.

---

## 7. Repository layout

Single repository, two applications. Coherent pull requests beat repo purity at this size.

```
company-website/
├── web/                    Next.js app
│   ├── app/                App Router pages
│   ├── components/
│   ├── content/            MDX for static copy (mission, story)
│   └── lib/
├── api/                    Spring Boot app
│   ├── src/main/java/
│   ├── src/main/resources/db/migration/    Flyway
│   └── src/test/java/
├── infra/                  Terraform
│   ├── modules/
│   └── environments/{staging,production}/
├── docker-compose.yml      Local Postgres + API for development
└── .github/workflows/
```

**Environments:** local (Docker Compose) → staging → production. Staging must be a real deployment on the same infrastructure, not a developer's laptop.

**CI pipeline on every pull request:** lint, type-check, unit tests, Testcontainers integration tests, build both apps, Lighthouse budget check on a preview deploy. Merge to `main` deploys staging. A tagged release deploys production.

---

## 8. Delivery plan

### Phase 0 — Prove the pipeline (weeks 1–2)
Repository, CI, Terraform, Flyway schema v1, and a deployed "hello world" that goes all the way from the browser through Next.js to Spring Boot to Postgres. Nothing else. If the pipeline is not proven now, every later estimate is fiction.

### Phase 1 — Ship it (weeks 3–8)
- The four pages from the sitemap, fully static, fully responsive
- Contact form → `lead` table → email notification to the team
- Minimal admin: log in, list leads, change status
- Analytics, error tracking, Search Console verified
- **Launch at the end of week 8.** A live site accruing search authority beats a perfect site launching in month six.

### Phase 2 — Convert and prove (weeks 9–14)
- Referral code issue and redemption flow
- Testimonial submission with approval workflow
- Case study CMS and the services filter, both driven from the database
- Lead → company → engagement promotion in the admin panel

### Phase 3 — The ambitious material from the draft
Scroll-driven storytelling, WebGPU 3D, semantic site search via `pgvector`, an onboarding assistant, GEO work. None of this should influence a single decision made before week 14, with one exception: **keep content structured in the database from day one**, because that structured content is what gets embedded for semantic search later.

---

## 9. Explicitly out of scope

Written down so nobody re-litigates it mid-sprint:

- Microservices, Kubernetes, service mesh
- GraphQL (we have one consumer and simple resources; REST is correct here)
- A headless CMS as a third system
- MongoDB or any second datastore
- Multi-region deployment
- A custom design system built from scratch
- Server-side A/B testing infrastructure
- Real-time features, WebSockets, queues

Each of these is a reasonable thing to want and an unreasonable thing to build with four people who also need to bill hours.

---

## 10. Open questions for the team

1. Vercel or AWS Amplify for the frontend? (Recommendation: Vercel now, revisit if a client demands AWS-only.)
2. Gradle or Maven? Pick one this week.
3. Who owns the frontend and who owns the backend? Two and two, with one person rotating for review.
4. What is our domain, and is it registered?
5. Do we have three case studies ready to publish at launch? If not, that is the critical path — not the code.
