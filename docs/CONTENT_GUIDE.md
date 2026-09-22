# Content Guide

## Rule #1: No Invented Facts

Never write real-sounding but fabricated content for:

- Addresses, phone numbers, email addresses
- University/organization partnerships or accreditation
- Rankings or awards
- Testimonials or quotes attributed to real/implied people
- Student/teacher counts or other statistics
- Guarantees ("100% pass rate", "guaranteed results", etc.)

## What to do instead

- Use an explicit placeholder in the UI (e.g. "Contact details will appear
  here once provided") rather than a plausible-looking fake value.
- Pull organization-identifying info from environment variables
  (`NEXT_PUBLIC_ORG_*` in `.env`) so it's configured once verified, not
  hardcoded across components.
- Mark any placeholder copy in code comments as `// PLACEHOLDER —` so it's
  greppable before launch: `grep -r "PLACEHOLDER" src/`.

## Tone

Professional, warm, and clear — appropriate for an international
Pakistani-origin education organization. Avoid generic SaaS marketing
clichés ("revolutionize", "game-changing", "10x your learning").

## Voice by Audience

- **Prospective students/parents (public site):** reassuring, concrete,
  action-oriented (clear next step on every page).
- **Enrolled students (portal):** direct, task-focused ("Your next
  assignment is due...").
- **Teachers (portal):** efficient, minimal friction for daily tasks
  (attendance, grading).
- **Admin/staff (portal):** data-dense, scannable, exportable.
