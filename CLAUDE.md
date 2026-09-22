# CLAUDE.md — Working Notes for AI-Assisted Development

This file orients any AI assistant (or new developer) continuing work on
AEC Network.

## Ground Rules

1. **Never invent real AEC facts.** No addresses, phone numbers, emails,
   accreditation, partner names, rankings, awards, testimonials, or
   statistics. Use placeholders and env vars (`NEXT_PUBLIC_ORG_*`) instead.
2. **Don't delete working functionality** without checking `PROGRESS.md`
   first — confirm whether it's intentional scaffold or something already
   wired to real data.
3. **Stack is fixed**: Next.js (App Router) + TypeScript strict + Tailwind +
   Prisma + PostgreSQL + Auth.js + Zod + Vitest + Playwright. Don't
   introduce a competing stack (e.g. a separate backend framework) without
   explicit direction.
4. **Role-based access** for portals is enforced in `src/middleware.ts`
   against `PORTAL_ROLE_MAP`. Any new portal route must fall under an
   existing prefix (`/student`, `/teacher`, `/parent`, `/admin`) to inherit
   protection.
5. **Schema changes** go in `prisma/schema.prisma`, then
   `npx prisma migrate dev --name <change>`. Keep `docs/ARCHITECTURE.md` in
   sync with any structural change.

## Current State (see PROGRESS.md for detail)

- Public site: homepage + nav structure + about/programs/admissions/
  contact/blog pages built, using placeholder copy.
- Portals: dashboard shells exist for all four roles with UI ready to bind
  to real queries; no live data wiring yet (no API routes built).
- Auth: Credentials-based Auth.js config exists; forms don't yet POST to
  a real endpoint.
- Database: full schema covers academics, admissions, finance, HR,
  communication. Not yet migrated against a live database in this
  environment (no network access when this scaffold was generated).

## Next Priorities

See `TASKS.md`.
