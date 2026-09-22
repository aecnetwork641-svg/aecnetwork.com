# Analytics (Planned)

Not yet implemented in this scaffold.

## Recommended Events to Track (public site → admissions funnel)

Matches the journey in the product vision: Discover → Explore → Ask AI →
Enquire → Register → Learn → Attend → Assess → Pay → Progress →
Communicate → Complete.

- `program_viewed` (slug)
- `trial_requested` (program slug, source page)
- `admission_application_submitted`
- `contact_form_submitted`
- `login_success` / `login_failed` (role)

## Recommended Tooling

- Privacy-respecting analytics (e.g. Plausible/PostHog) over third-party
  ad-network trackers, given the audience includes minors' data via
  parents/guardians.
- Server-side event logging for admissions funnel events (more reliable
  than client-only tracking, and keeps PII out of third-party scripts
  where possible).

## Data Sensitivity

Student data (attendance, grades, payments) is sensitive, especially for
minors. Do not route this data through general-purpose web analytics —
keep it in the application database with normal access controls only.
