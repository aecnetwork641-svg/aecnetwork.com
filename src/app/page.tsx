import Link from "next/link";

const PROGRAMS = [
  {
    title: "Quran & Islamic Studies",
    slug: "quran-islamic-studies",
    level: "Beginner to Advanced",
    blurb: "Structured, teacher-led learning of Noorani Qaida, Tajweed, Quran recitation, Memorization (Hifz), and Islamic Studies foundations."
  },
  {
    title: "English Language Mastery",
    slug: "english",
    level: "All Levels",
    blurb: "Spoken communication, functional grammar, reading comprehension, and academic writing guided by experienced ESL educators."
  },
  {
    title: "Arabic Language",
    slug: "arabic",
    level: "Foundational to Fluent",
    blurb: "Classical Arabic (Fusha) and Quranic vocabulary for comprehension and daily conversational fluency."
  },
  {
    title: "Mathematics & Analytical Thinking",
    slug: "mathematics",
    level: "Grades 1–12",
    blurb: "Curriculum-aligned mathematical instruction from fundamental numeracy and mental math to algebra, geometry, and calculus."
  },
  {
    title: "Academic & School Support",
    slug: "academic-support",
    level: "Primary & Secondary",
    blurb: "Subject-specific tutoring, homework guidance, concept reinforcement, and targeted examination preparation."
  },
  {
    title: "Professional & Digital Skills",
    slug: "professional-skills",
    level: "Foundational",
    blurb: "Practical digital literacy, educational technology, and practical skill-building courses for lifelong learners."
  }
];

const JOURNEY_STEPS = [
  { step: "Discover", desc: "Explore academic programs, syllabus outlines, and flexible delivery formats." },
  { step: "Ask AI", desc: "Consult the AEC AI Counselor for instant guidance on courses and study pacing." },
  { step: "Enquire", desc: "Connect with our academic advisory team to assess student readiness." },
  { step: "Register", desc: "Book a complimentary free trial session or submit an admission form." },
  { step: "Learn", desc: "Attend interactive live one-to-one sessions or group class cohorts." },
  { step: "Assess", desc: "Complete modular quizzes, assignments, and periodic milestone evaluations." },
  { step: "Pay", desc: "Manage transparent monthly fee billing through secure digital payment invoices." },
  { step: "Progress", desc: "Review continuous attendance, grades, and detailed teacher feedback reports." },
  { step: "Complete", desc: "Receive verifiable academic certificates upon mastery and program completion." }
];

const FAQS = [
  {
    q: "How does the AEC Network Free Trial class work?",
    a: "You can request a free trial class by filling out our short booking form. An academic counselor will review your preferred subject, assess proficiency level, and coordinate a scheduled live session with an assigned qualified instructor with no financial commitment."
  },
  {
    q: "What is the difference between One-to-One and Group Classes?",
    a: "One-to-One tutoring pairs a student with a dedicated teacher for personalized pacing, customized curriculum focus, and flexible scheduling. Group Classes offer interactive peer discussions, collaborative learning, and a structured cohort timetable."
  },
  {
    q: "How do parents monitor attendance and academic progress?",
    a: "Parents receive access to the dedicated Parent Portal, which features a multi-child switcher, real-time class attendance logs, automated absence alerts, assignment grades, teacher evaluation notes, and fee payment invoices."
  },
  {
    q: "What meeting platforms are used for live classes?",
    a: "Classes are conducted over verified platforms such as Zoom, Google Meet, or Microsoft Teams. Join links are protected and accessible directly from the authenticated Student and Teacher portal dashboards."
  },
  {
    q: "What are the fee payment terms and schedule?",
    a: "Fees are billed according to your selected billing plan (typically monthly or per-term). Invoices are generated automatically and can be settled via digital bank transfer or card with itemized payment receipts."
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-aec-navy/10 bg-gradient-to-b from-aec-cream via-white to-aec-cream/30 py-16 lg:py-24">
        <div className="container-aec grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-aec-teal/30 bg-aec-teal/5 px-3.5 py-1 text-xs font-semibold text-aec-teal mb-6">
              <span className="h-2 w-2 rounded-full bg-aec-teal animate-pulse" />
              Online Education & Academic Excellence
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-aec-navy sm:text-5xl lg:text-6xl leading-[1.1]">
              Learn. Grow. Achieve. <br />
              <span className="text-aec-teal">With AEC Network.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-aec-navy/75 leading-relaxed">
              AEC provides structured online education, certified educators, personalized tutoring,
              and comprehensive academic support for students worldwide. Experience dedicated instruction
              built around your child&apos;s potential.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/admissions/free-trial" className="btn-primary text-base px-7 py-3.5 shadow-md hover:shadow-lg">
                Start Your Free Trial
              </Link>
              <Link href="/programs" className="btn-secondary text-base px-7 py-3.5">
                Explore Programs
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-aec-navy/10 pt-6">
              <div>
                <p className="font-display text-sm font-bold text-aec-navy">Vetted Faculty</p>
                <p className="text-xs text-aec-navy/60 mt-0.5">Subject specialists</p>
              </div>
              <div>
                <p className="font-display text-sm font-bold text-aec-navy">Flexible Pacing</p>
                <p className="text-xs text-aec-navy/60 mt-0.5">1-on-1 & group classes</p>
              </div>
              <div>
                <p className="font-display text-sm font-bold text-aec-navy">Parent Portal</p>
                <p className="text-xs text-aec-navy/60 mt-0.5">Live attendance & reports</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-aec-navy/10 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-aec-navy/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="badge badge-neutral text-xs">AEC Learning Suite</span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-aec-teal/20 bg-aec-teal/5 p-4">
                  <p className="text-xs font-semibold text-aec-teal uppercase tracking-wider">Live Class Schedule</p>
                  <p className="mt-1 font-semibold text-aec-navy">Quranic Foundations & Tajweed</p>
                  <p className="text-xs text-aec-navy/60 mt-0.5">Assigned Instructor • Mon, Wed, Fri</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-aec-navy/10 bg-aec-cream/50 p-3.5">
                    <p className="text-xs text-aec-navy/60">Attendance Rate</p>
                    <p className="font-display text-xl font-bold text-aec-navy mt-1">98%</p>
                    <span className="text-[11px] text-emerald-600 font-medium">Regular Attendance</span>
                  </div>
                  <div className="rounded-xl border border-aec-navy/10 bg-aec-cream/50 p-3.5">
                    <p className="text-xs text-aec-navy/60">Course Modules</p>
                    <p className="font-display text-xl font-bold text-aec-navy mt-1">12 / 16</p>
                    <span className="text-[11px] text-aec-teal font-medium">Active Progress</span>
                  </div>
                </div>
                <div className="rounded-xl border border-aec-navy/10 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-aec-navy">Next Evaluation Milestone</span>
                    <span className="badge badge-info text-[11px]">Upcoming</span>
                  </div>
                  <p className="text-xs text-aec-navy/70 mt-1">Tajweed Oral Recitation Assessment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & VALUE PROPOSITION */}
      <section className="container-aec">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-xs font-bold uppercase tracking-wider text-aec-gold">
            Educational Principles
          </h2>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-aec-navy">
            Engineered for Serious Academic & Personal Growth
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aec-navy text-white font-bold mb-4">
              1
            </div>
            <h3 className="font-display text-lg font-bold text-aec-navy">Qualified, Vetted Educators</h3>
            <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
              Every teacher undergoes identity verification, academic qualification review, and pedagogical evaluation before taking classes.
            </p>
          </div>
          <div className="card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aec-teal text-white font-bold mb-4">
              2
            </div>
            <h3 className="font-display text-lg font-bold text-aec-navy">Structured Curricula</h3>
            <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
              Learning plans follow structured syllabi with explicit lesson objectives, weekly checkpoints, and practical exercises.
            </p>
          </div>
          <div className="card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aec-gold text-white font-bold mb-4">
              3
            </div>
            <h3 className="font-display text-lg font-bold text-aec-navy">Dedicated Parent Oversight</h3>
            <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
              Transparent reporting keeps guardians informed with attendance records, teacher evaluation notes, and term reports.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHAT AEC OFFERS */}
      <section className="bg-white border-y border-aec-navy/10 py-16">
        <div className="container-aec">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-display text-xs font-bold uppercase tracking-wider text-aec-teal">
                Comprehensive Academy
              </h2>
              <p className="mt-2 font-display text-3xl font-bold text-aec-navy">
                What AEC Network Delivers
              </p>
              <p className="mt-4 text-sm text-aec-navy/70 leading-relaxed">
                Whether you seek foundational Quranic recitation, linguistic proficiency in English or Arabic, or core school academic mastery, our platform combines personalized tutoring with an enterprise LMS.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                {[
                  "Interactive live class rooms with verified meeting security",
                  "Modular digital curriculum with video lessons and quizzes",
                  "Automated attendance records with immediate parent notices",
                  "Official verifiable completion certificates"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-sm font-medium text-aec-navy/85">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/admissions/how-to-enroll" className="btn-secondary">
                  Learn How Admissions Work
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-aec-navy/10 bg-aec-cream/40 p-5">
                <p className="font-display text-base font-bold text-aec-navy">Quran & Islamic Studies</p>
                <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
                  Tajweed rules, articulation points (Makharij), Nazra recitation, and Hifz memorization with certified instructors.
                </p>
              </div>
              <div className="rounded-xl border border-aec-navy/10 bg-aec-cream/40 p-5">
                <p className="font-display text-base font-bold text-aec-navy">Languages & Linguistics</p>
                <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
                  English for academic and communicative proficiency, along with classical and modern Arabic grammar.
                </p>
              </div>
              <div className="rounded-xl border border-aec-navy/10 bg-aec-cream/40 p-5">
                <p className="font-display text-base font-bold text-aec-navy">STEM & School Tutoring</p>
                <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
                  Mathematics, Science, and board exam support customized to primary and secondary school syllabi.
                </p>
              </div>
              <div className="rounded-xl border border-aec-navy/10 bg-aec-cream/40 p-5">
                <p className="font-display text-base font-bold text-aec-navy">One-on-One Mentorship</p>
                <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
                  Individual pacing, dedicated instructor attention, and adaptable weekly timetables for busy schedules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROGRAMS */}
      <section className="container-aec">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-wider text-aec-gold">Curriculum Portfolio</h2>
            <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-aec-navy">Featured Academic Programs</p>
          </div>
          <Link href="/programs" className="text-sm font-semibold text-aec-teal hover:text-aec-navy transition">
            View all programs →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <Link key={p.slug} href={`/programs/${p.slug}` as never} className="card group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="badge badge-neutral text-xs">{p.level}</span>
                  <span className="text-xs text-aec-teal font-semibold group-hover:translate-x-0.5 transition-transform">
                    Explore →
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-aec-navy group-hover:text-aec-teal transition">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">{p.blurb}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-aec-navy/5 flex items-center justify-between text-xs text-aec-navy/60">
                <span>1-on-1 / Group</span>
                <span>Structured Syllabus</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. HOW LEARNING WORKS / 6. WHY CHOOSE AEC */}
      <section className="bg-aec-navy py-16 text-white">
        <div className="container-aec">
          <div className="max-w-2xl">
            <h2 className="font-display text-xs font-bold uppercase tracking-wider text-aec-gold">Methodology & Rigor</h2>
            <p className="mt-2 font-display text-2xl sm:text-3xl font-bold">How Learning Works at AEC Network</p>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              We eliminate friction from online education with a cohesive pathway designed for accountability, engagement, and measurable progress.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="text-2xl font-black text-aec-gold">01</span>
              <h3 className="mt-3 font-display text-base font-bold">Assessment & Placement</h3>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                Initial evaluation by academic advisors to determine current proficiency level and learning targets.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="text-2xl font-black text-aec-gold">02</span>
              <h3 className="mt-3 font-display text-base font-bold">Tailored Scheduling</h3>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                Assigning qualified teachers and creating customized timetable slots matching the student&apos;s time zone.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="text-2xl font-black text-aec-gold">03</span>
              <h3 className="mt-3 font-display text-base font-bold">Interactive Instruction</h3>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                Live classes with digital whiteboards, screen sharing, practical drills, and immediate teacher feedback.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="text-2xl font-black text-aec-gold">04</span>
              <h3 className="mt-3 font-display text-base font-bold">Continuous Evaluation</h3>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                Regular quizzes, attendance tracking, and term reports accessible via the Student and Parent portals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ONE-TO-ONE LEARNING & 8. GROUP CLASSES */}
      <section className="container-aec">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* One to One */}
          <div className="card border-aec-teal/30 bg-gradient-to-br from-white to-aec-teal/5">
            <div className="flex items-center justify-between">
              <span className="badge badge-info">Personalized Tutoring</span>
              <span className="text-xs font-semibold text-aec-navy/60">Flexible Timetable</span>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-aec-navy">One-to-One Learning Mode</h3>
            <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
              Ideal for students who thrive with individual attention, customized pacing, and targeted support in specific subjects like Quran Tajweed or advanced Mathematics.
            </p>
            <ul className="mt-5 space-y-2 text-xs text-aec-navy/80">
              <li className="flex items-center gap-2">✓ Dedicated individual instructor</li>
              <li className="flex items-center gap-2">✓ Pacing customized to student capability</li>
              <li className="flex items-center gap-2">✓ Flexible rescheduling options</li>
            </ul>
            <div className="mt-6">
              <Link href="/programs/one-to-one" className="btn-primary w-full text-center">
                Explore 1-on-1 Tutoring
              </Link>
            </div>
          </div>

          {/* Group Cohorts */}
          <div className="card border-aec-gold/30 bg-gradient-to-br from-white to-amber-50/40">
            <div className="flex items-center justify-between">
              <span className="badge badge-warning">Collaborative Cohorts</span>
              <span className="text-xs font-semibold text-aec-navy/60">Structured Schedule</span>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-aec-navy">Group Class Cohorts</h3>
            <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
              Designed for interactive peer learning, language conversational practice, and structured syllabus progression alongside fellow learners.
            </p>
            <ul className="mt-5 space-y-2 text-xs text-aec-navy/80">
              <li className="flex items-center gap-2">✓ Small interactive group sizes</li>
              <li className="flex items-center gap-2">✓ Collaborative exercises and peer discussions</li>
              <li className="flex items-center gap-2">✓ Cost-effective tuition structure</li>
            </ul>
            <div className="mt-6">
              <Link href="/programs/group-classes" className="btn-secondary w-full text-center">
                Explore Group Classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. QUALIFIED TEACHERS */}
      <section className="bg-white border-y border-aec-navy/10 py-16">
        <div className="container-aec">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-xs font-bold uppercase tracking-wider text-aec-teal">Faculty Quality</h2>
            <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-aec-navy">Dedicated, Vetted Educators</p>
            <p className="mt-3 text-sm text-aec-navy/70">
              Our faculty members possess demonstrated subject knowledge, pedagogical experience, and a commitment to nurturing learner confidence.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { role: "Quran & Tajweed Scholars", desc: "Certified Qaris with Ijazah and extensive experience in child and adult recitation pedagogy." },
              { role: "ESL & Language Instructors", desc: "Educators specializing in spoken English, communicative grammar, and IELTS/TOEFL readiness." },
              { role: "Arabic Language Specialists", desc: "Native and fluent academic instructors focusing on Fusha and Quranic comprehension." },
              { role: "Mathematics & Science Faculty", desc: "Experienced curriculum teachers delivering concept-first problem solving." }
            ].map((f, idx) => (
              <div key={idx} className="rounded-xl border border-aec-navy/10 p-5 bg-aec-cream/20">
                <p className="font-display text-sm font-bold text-aec-navy">{f.role}</p>
                <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. STUDENT LEARNING JOURNEY */}
      <section className="container-aec">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-xs font-bold uppercase tracking-wider text-aec-gold">Structured Progression</h2>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-aec-navy">The Complete Learning Journey</p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-9">
          {JOURNEY_STEPS.map((j, i) => (
            <div key={j.step} className="rounded-xl border border-aec-navy/10 bg-white p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-aec-gold">0{i + 1}</span>
                <p className="mt-1 font-display text-xs font-bold text-aec-navy">{j.step}</p>
                <p className="mt-1.5 text-[11px] text-aec-navy/70 leading-snug">{j.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FREE TRIAL CTA & 12. LEARNING RESOURCES */}
      <section className="bg-gradient-to-r from-aec-navy to-slate-900 py-16 text-white">
        <div className="container-aec text-center max-w-3xl">
          <span className="badge bg-aec-gold/20 text-aec-gold border-aec-gold/30 text-xs">No Obligation</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold">
            Experience Our Teaching with a Free Trial Class
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">
            Take the first step today. Meet an instructor, discuss your academic goals, and see firsthand how our structured online classes operate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/admissions/free-trial" className="btn-primary text-base px-8 py-3.5 shadow-lg">
              Book a Free Trial Class
            </Link>
            <Link href="/courses" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 text-base px-8 py-3.5">
              Browse Course Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* 13. FAQS */}
      <section className="container-aec max-w-4xl">
        <div className="text-center">
          <h2 className="font-display text-xs font-bold uppercase tracking-wider text-aec-teal">Clear Answers</h2>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-aec-navy">Frequently Asked Questions</p>
        </div>

        <div className="mt-10 space-y-4">
          {FAQS.map((faq, idx) => (
            <details key={idx} className="card group cursor-pointer">
              <summary className="font-display text-base font-bold text-aec-navy flex items-center justify-between list-none">
                <span>{faq.q}</span>
                <span className="text-aec-teal group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-aec-navy/75 leading-relaxed border-t border-aec-navy/5 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="container-aec mb-12">
        <div className="rounded-2xl2 border border-aec-teal/20 bg-aec-cream p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-aec-navy">
            Ready to Begin Your Educational Journey?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-aec-navy/70 leading-relaxed">
            Connect with our admissions counselors today for course advisory, assessment scheduling, and tailored fee packages.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/admissions/free-trial" className="btn-primary">
              Book a Free Trial
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact AEC Advisory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
