# Architecture

## Overview

AEC Network is a single Next.js (App Router) application serving both the
public marketing site and four authenticated portals, backed by one
PostgreSQL database via Prisma.

```
┌─────────────────────────────────────────────┐
│                Next.js App                   │
│  ┌───────────────┐   ┌─────────────────────┐ │
│  │ Public routes  │   │ Portal routes       │ │
│  │ /, /about,     │   │ /student, /teacher,  │ │
│  │ /programs, ... │   │ /parent, /admin      │ │
│  └───────┬────────┘   └──────────┬──────────┘ │
│          │                       │            │
│          └────────┬──────────────┘            │
│                    │                            │
│           middleware.ts (role gate)             │
│                    │                            │
│              lib/auth.ts (Auth.js JWT)           │
│                    │                            │
│              lib/prisma.ts (Prisma Client)       │
└────────────────────┼────────────────────────────┘
                      │
               PostgreSQL (prisma/schema.prisma)
```

## Domain Modules (see `prisma/schema.prisma`)

- **Identity & Auth** — `User`, role enum (`SUPER_ADMIN`, `ADMIN`,
  `TEACHER`, `STUDENT`, `PARENT`, `STAFF`).
- **LMS / Academics** — `Program`, `Course` (category/level/subject/
  instructor/learningObjectives/prerequisites/status), `Module`, `Lesson`
  (video/text/pdf/assignment/quiz), `LessonProgress`, `Quiz`/
  `QuizQuestion`/`QuizAttempt`, `CourseFAQ`, `Class`, `TimetableSlot`,
  `Enrollment`, `Attendance`, `Assignment`, `Submission`, `Exam`, `Result`,
  `Resource`.
- **Online Classes** — `Class.meetingPlatform` (`MeetingPlatform`: Zoom /
  Google Meet / Microsoft Teams / Other), `meetingLink`, `timezone`,
  `isRecurring`, `ClassStatus`. Credentials are never stored on the model —
  see "Online Class Meetings" below.
- **People** — `Student` (+ `certificates`, `documents`, `tasks`,
  `feedbackReceived`), `Teacher` (+ `coursesTaught`, `feedback`),
  `ParentProfile` (each 1:1 with `User`, carrying role-specific fields).
- **Admissions** — `Lead` (now tracks `reviewedById` and
  `convertedStudentId`), `AdmissionApplication`, `TrialBooking`.
- **Finance** — `FeeStructure`, `Invoice`, `Payment`.
- **HR** — `Department`, `Employee`, `LeaveRequest`, `Payslip`.
- **Communication** — `Message`, `Notification`, `FAQ`, `BlogPost`,
  `TeacherFeedback`.

## Online Class Meetings

`src/lib/meeting.ts` is the single module allowed to touch meeting
platform credentials. It reads per-platform env vars
(`ZOOM_API_KEY`/`SECRET`, `GOOGLE_MEET_CLIENT_ID`/`SECRET`,
`TEAMS_CLIENT_ID`/`SECRET`) and exposes:

- `getConfiguredPlatforms()` — which platforms have credentials set,
  without ever returning the credentials.
- `getJoinLinkForClass(class, viewer)` — returns a join link only when the
  caller has already confirmed the viewer is the assigned teacher or an
  enrolled student for that class (via the scoped-query helpers below);
  never call it in a public/unauthenticated context.
- `createMeetingForClass(...)` — stub for the actual Zoom/Meet/Teams API
  call; implement once a provider is chosen.

## Student Enrollment Workflow

`src/lib/workflows/enrollment.ts` implements the 13-step pipeline as
discrete, independently-callable functions backed by Prisma transactions:
Lead creation → admissions review → Student profile + program assignment
→ class + teacher assignment → timetable generation → schedule/fee
notifications (via `src/lib/notifications.ts`) → invoice creation → a
readiness check for "student begins learning". Each stage is meant to be
triggered from its own Admin/Finance portal action rather than run as one
monolithic job.

## Data Isolation (Student & Parent Portals)

`src/lib/scoped-queries.ts` is the only sanctioned way student/parent
portal pages resolve *whose* data to query:

- `getCurrentStudentScope()` resolves the signed-in user's own
  `Student.id` from the session — a portal page must use this id in every
  `where` clause, never an id read from the URL.
- `getCurrentParentScope(requestedChildId?)` resolves the signed-in
  parent's `ParentProfile` and validates any `?child=` selector against
  that parent's own `children` before it's used — an id for someone else's
  child is silently ignored in favor of the parent's first child.

`src/components/ChildSwitcher.tsx` only ever sets the `?child=` URL param;
it grants no access itself — the server-side validation above is what
actually enforces isolation. See `src/app/student/attendance`,
`.../results`, `.../fees`, `.../certificates` and the equivalent
`src/app/parent/*` pages for the reference query pattern to copy for
every other portal page.

## Access Control

`src/middleware.ts` maps URL prefixes to allowed roles
(`PORTAL_ROLE_MAP`). Auth.js issues a JWT with `role` and `id` claims
(`src/lib/auth.ts`); the middleware reads `role` via `withAuth` and
redirects unauthorized requests to `/login`, while `id` is what
`scoped-queries.ts` uses to look up the signed-in Student/Parent record.

## Rendering Strategy

- Public marketing pages: mostly static/server components, safe to
  statically generate where content doesn't depend on the database.
- Portal dashboards: server components that query Prisma directly
  (Next.js Server Components can call `prisma` without a separate API
  layer) — always through `scoped-queries.ts` for Student/Parent pages;
  use Route Handlers (`app/api/**`) only where a client needs to POST data
  (forms, enrollment-workflow triggers) or where mutations require
  validation via Zod.

## Open Decisions (flag for AEC stakeholders)

- Payment gateway choice (region-appropriate for Pakistan + international
  students).
- Video/conferencing provider for live one-to-one and group classes (Zoom
  vs Google Meet vs Microsoft Teams — `MeetingPlatform` supports all
  three; only one need be implemented first).
- Email/SMS/WhatsApp provider for notifications.
