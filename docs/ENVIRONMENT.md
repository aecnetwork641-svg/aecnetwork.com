# Environment & Deployment

## Required Environment Variables

See `.env.example` for the full list. Key ones:

- `DATABASE_URL` — PostgreSQL connection string.
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET` — Auth.js session config.
- `EMAIL_SERVER_*`, `EMAIL_FROM` — transactional email.
- `PAYMENT_PROVIDER_KEY`/`SECRET` — payment gateway (choose provider first,
  see `docs/ARCHITECTURE.md` open decisions).
- `NEXT_PUBLIC_ORG_*` — organization display info (only set once verified).

## Local Development

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

## Suggested Hosting

- App: Vercel (native Next.js support) or any Node-compatible host.
- Database: managed PostgreSQL (Neon, Supabase, RDS, etc.) — pick one with
  good backup/PITR support given student/financial data is sensitive.
- File storage (admission documents, resources): S3-compatible bucket;
  don't store uploads on the app server's local disk.

## Environments

Recommend three: `development` → `staging` → `production`, with staging
gated behind auth (basic auth or IP allowlist) since it will contain
near-real student data during UAT.

## Backups & Data Retention

Student, financial and HR data require a documented backup and retention
policy before production launch — confirm requirements with AEC
stakeholders (especially around minors' data).
