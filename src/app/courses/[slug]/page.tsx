import Link from "next/link";

// Placeholder shape matching the Course/Module/Lesson/CourseFAQ Prisma models.
// Replace with a real `prisma.course.findUnique({ where: { slug }, include: {...} })` call.
function getDemoCourse(slug: string) {
  const title = slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title,
    slug,
    category: "General",
    level: "Beginner",
    subject: "General",
    deliveryMode: "one-to-one",
    durationWeeks: 8,
    status: "DRAFT" as const,
    description:
      "Course description will render here once connected to the Course model. This page's structure (hero, overview, curriculum, instructor, requirements, outcomes, schedule, FAQs, enrollment) is fully built.",
    learningObjectives: [
      "Objective 1 — populate from Course.learningObjectives",
      "Objective 2 — populate from Course.learningObjectives"
    ],
    prerequisites: ["Prerequisite — populate from Course.prerequisites"],
    modules: [
      {
        title: "Module 1 — Getting Started",
        lessons: [
          { title: "Welcome & Orientation", type: "VIDEO" },
          { title: "Course Handbook", type: "PDF" },
          { title: "Module 1 Quiz", type: "QUIZ" }
        ]
      },
      {
        title: "Module 2 — Core Concepts",
        lessons: [
          { title: "Lesson 2.1", type: "TEXT" },
          { title: "Lesson 2.2", type: "VIDEO" },
          { title: "Module 2 Assignment", type: "ASSIGNMENT" }
        ]
      }
    ],
    instructor: {
      name: "Instructor profile pending",
      bio: "Teacher bio will render here from Teacher.bio once an instructor is assigned via Course.primaryInstructorId."
    },
    faqs: [
      { question: "How is this course delivered?", answer: "Delivery mode and schedule are shown below once a Class is linked to this course." }
    ]
  };
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getDemoCourse(params.slug);

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-aec-navy/10 bg-gradient-to-b from-aec-cream to-white">
        <div className="container-aec grid gap-8 py-16 lg:grid-cols-[2fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-aec-gold">
              {course.category} · {course.level}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-aec-navy sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-aec-navy/70">{course.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-aec-navy/50">
              <span className="rounded-full border border-aec-navy/10 px-3 py-1">
                {course.deliveryMode}
              </span>
              {course.durationWeeks && (
                <span className="rounded-full border border-aec-navy/10 px-3 py-1">
                  {course.durationWeeks} weeks
                </span>
              )}
              <span className="rounded-full border border-aec-navy/10 px-3 py-1">
                Status: {course.status}
              </span>
            </div>
          </div>

          {/* ENROLLMENT CTA */}
          <div className="card">
            <p className="font-semibold text-aec-navy">Enroll in this course</p>
            <p className="mt-2 text-sm text-aec-navy/60">
              Enrollment creates a <code>Lead</code> → review → an{" "}
              <code>Enrollment</code> record (see the enrollment workflow in{" "}
              <code>src/lib/workflows/enrollment.ts</code>).
            </p>
            <Link href="/admissions/apply" className="btn-primary mt-4 w-full">
              Enroll Now
            </Link>
            <Link href="/admissions/free-trial" className="btn-secondary mt-3 w-full">
              Book a Free Trial
            </Link>
          </div>
        </div>
      </section>

      <div className="container-aec grid gap-12 py-16 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-12">
          {/* OVERVIEW */}
          <section>
            <h2 className="font-display text-xl font-bold text-aec-navy">Overview</h2>
            <p className="mt-3 text-sm text-aec-navy/70">{course.description}</p>
          </section>

          {/* WHAT STUDENTS LEARN */}
          <section>
            <h2 className="font-display text-xl font-bold text-aec-navy">What You'll Learn</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {course.learningObjectives.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-aec-navy/70">
                  <span className="text-aec-teal">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          {/* REQUIREMENTS */}
          <section>
            <h2 className="font-display text-xl font-bold text-aec-navy">Requirements</h2>
            <ul className="mt-3 space-y-2">
              {course.prerequisites.map((p) => (
                <li key={p} className="text-sm text-aec-navy/70">• {p}</li>
              ))}
            </ul>
          </section>

          {/* CURRICULUM */}
          <section>
            <h2 className="font-display text-xl font-bold text-aec-navy">Curriculum</h2>
            <div className="mt-4 space-y-4">
              {course.modules.map((m, i) => (
                <div key={m.title} className="rounded-xl2 border border-aec-navy/10">
                  <div className="border-b border-aec-navy/10 bg-aec-cream px-5 py-3">
                    <p className="font-semibold text-aec-navy">
                      Module {i + 1}: {m.title}
                    </p>
                  </div>
                  <ul className="divide-y divide-aec-navy/5">
                    {m.lessons.map((l) => (
                      <li key={l.title} className="flex items-center justify-between px-5 py-3 text-sm">
                        <span className="text-aec-navy/80">{l.title}</span>
                        <span className="rounded-full bg-aec-navy/5 px-2 py-0.5 text-xs text-aec-navy/50">
                          {l.type}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* SCHEDULE */}
          <section>
            <h2 className="font-display text-xl font-bold text-aec-navy">Schedule</h2>
            <p className="mt-3 text-sm text-aec-navy/60">
              Once a <code>Class</code> is linked to this course, its{" "}
              <code>TimetableSlot</code>s (day/time/timezone) will render
              here.
            </p>
          </section>

          {/* FAQS */}
          <section>
            <h2 className="font-display text-xl font-bold text-aec-navy">FAQs</h2>
            <div className="mt-4 space-y-3">
              {course.faqs.map((f) => (
                <details key={f.question} className="card">
                  <summary className="cursor-pointer font-semibold text-aec-navy">{f.question}</summary>
                  <p className="mt-2 text-sm text-aec-navy/70">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* INSTRUCTOR */}
        <aside>
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-aec-gold">Instructor</p>
            <p className="mt-2 font-semibold text-aec-navy">{course.instructor.name}</p>
            <p className="mt-2 text-sm text-aec-navy/60">{course.instructor.bio}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
