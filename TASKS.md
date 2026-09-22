# TASKS — Prioritized Backlog

## P0 — Core Systems & Portals (Completed in Round 3)
1. [x] Extended Prisma schema covering Academics, CRM, Finance, HR, and Audit logs.
2. [x] Server-side RBAC engine (`src/lib/permissions.ts`) with role guards and salary protection.
3. [x] Central Event Hub & Notification system (`src/lib/events.ts`, `src/lib/notifications.ts`)
       supporting automatic teacher assignments, absence alerts, and payment notices.
4. [x] Complete Teacher Portal across 14 modules (`src/app/teacher/*`):
       Dashboard with all 9 widgets, Profile, Classes, Students, Timetable,
       Attendance (with interactive `AttendanceMarker` and auto parent absence alerts),
       Assignments, Assessments, Exams, Results, Student Progress, Messages,
       Notifications, Resources.
5. [x] Academic Management Portal (`src/app/academic/*` and `src/app/admin/academics/*`):
       Programs, Classes, Timetable grid, Attendance oversight, Exams & Results, Progress reports.
6. [x] Fees & Finance Module (`src/app/finance/*` and `src/app/admin/finance/*`):
       Total collected, pending fees, student invoices, receipts, expenses, and financial statements.
7. [x] HR & Leave Management (`src/app/hr/*` and `src/app/admin/hr/*`):
       Employee profiles, leave approval pipeline, staff attendance check-ins, payroll & salaries.
8. [x] Supervisor Portal (`src/app/supervisor/*`):
       Department team members, leave endorsements, and cohort monitoring.
9. [x] Admin Ecosystem & Admissions CRM (`src/app/admin/*`):
       Overview KPI grid with `DEMO_MODE` badge, students roster, teachers directory,
       9-stage visual CRM Lead Pipeline, audit trail logs, announcements, and settings.
10. [x] AEC AI Counselor (`src/app/api/counselor/route.ts` & `src/components/AICounselorWidget.tsx`):
       Server-side grounded guidance, rate limiting, and interactive chat drawer.
11. [x] Public Certificate Verification (`src/app/verify-certificate/[id]/page.tsx`):
       Credential authentication by unique verification code.
12. [x] Unit test suite (`tests/unit/*`):
       Permissions, calculations (attendance, billing, leave, payroll), and notification formatting.

## P1 — Live Deployment & Integrations
13. Connect live PostgreSQL database instance and run `npx prisma migrate dev`.
14. Configure production SMTP email provider credentials in `.env` (`EMAIL_SERVER_*`).
15. Configure WhatsApp Business API / Twilio SMS gateway in `.env`.
16. Connect payment gateway (Stripe or regional provider).
17. Replace placeholder organizational details with verified AEC production content.

## P2 — Growth & Launch
18. i18n rollout per `docs/I18N.md`.
19. Analytics per `docs/ANALYTICS.md`.
20. Playwright E2E tests for end-to-end user journeys.
