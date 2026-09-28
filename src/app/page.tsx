import Link from "next/link";
import PricingSection from "@/components/PricingSection";
import HeroSlider from "@/components/HeroSlider";
import { getCourseImage } from "@/lib/course-images";

const PROGRAMS = [
  {
    title: "Quran & Tajweed Mastery",
    slug: "quran-islamic-studies",
    level: "Beginner to Advanced",
    image: getCourseImage("Islamic", "quran-islamic-studies"),
    blurb: "Structured, teacher-led learning of Noorani Qaida, Tajweed rules, fluent Nazra recitation, and Hifz memorization."
  },
  {
    title: "GCSE & A Levels Prep",
    slug: "gcse",
    level: "UK & International Boards",
    image: getCourseImage("School & Exam Prep", "gcse"),
    blurb: "Expert subject coaching in Math, Sciences, and Humanities with 10-year past paper walkthroughs and grade boosters."
  },
  {
    title: "Computer Programming & Coding",
    slug: "computer-programming",
    level: "Beginner to Advanced",
    image: getCourseImage("IT & Programming", "computer-programming"),
    blurb: "Practical hands-on coding in Python, C++, and JavaScript with real-world game development and logic building."
  },
  {
    title: "Mathematics & Analytical Thinking",
    slug: "mathematics",
    level: "Grades 1–12",
    image: getCourseImage("STEM & Languages", "mathematics"),
    blurb: "Curriculum-aligned mathematical instruction from fundamental numeracy and algebra to geometry, trigonometry, and calculus."
  },
  {
    title: "Web Designing & Development",
    slug: "web-development",
    level: "Full Stack Track",
    image: getCourseImage("IT & Programming", "web-development"),
    blurb: "Learn modern responsive UI/UX, HTML5, CSS3, Tailwind, React, Next.js, and backend database systems."
  },
  {
    title: "SAT & Digital SAT Tutoring",
    slug: "sat-tutoring",
    level: "College Prep (Target 1500+)",
    image: getCourseImage("School & Exam Prep", "sat-tutoring"),
    blurb: "Adaptive testing tactics, Desmos calculator shortcuts, and evidence-based reading/writing score boosters."
  },
  {
    title: "English Language Mastery",
    slug: "english",
    level: "All Levels",
    image: getCourseImage("STEM & Languages", "english"),
    blurb: "Spoken communication fluency, functional grammar, reading comprehension, and academic essay writing."
  },
  {
    title: "Islamic Studies & Quran Translation",
    slug: "translation-of-quran",
    level: "All Age Groups",
    image: getCourseImage("Islamic", "translation-of-quran"),
    blurb: "Word-by-word translation, contextual Tafseer, Hadith studies, Fiqh, and Prophetic Seerah values."
  },
  {
    title: "Science (Physics, Chemistry, Biology)",
    slug: "science",
    level: "Primary & Secondary",
    image: getCourseImage("STEM & Languages", "science"),
    blurb: "Concept-first scientific inquiry, visual experiments, diagrammatic explanations, and term exam prep."
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
      {/* HERO BANNER SLIDER */}
      <HeroSlider />

      {/* QUICK STATS & CREDENTIALS STRIP */}
      <section className="container-aec">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 md:p-8 shadow-md grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="border-r border-slate-100 last:border-0 pr-4">
            <p className="font-display text-2xl md:text-4xl font-extrabold text-[#5fcf80]">100%</p>
            <p className="text-xs font-extrabold text-[#37423b] mt-1">Verified Faculty</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Ijazah & Subject Specialists</p>
          </div>
          <div className="border-r border-slate-100 last:border-0 pr-4">
            <p className="font-display text-2xl md:text-4xl font-extrabold text-[#37423b]">1-on-1</p>
            <p className="text-xs font-extrabold text-[#37423b] mt-1">Personalized Tutoring</p>
            <p className="text-[11px] text-slate-500 mt-0.5">& Interactive Group Cohorts</p>
          </div>
          <div className="border-r border-slate-100 last:border-0 pr-4">
            <p className="font-display text-2xl md:text-4xl font-extrabold text-[#5fcf80]">24/7</p>
            <p className="text-xs font-extrabold text-[#37423b] mt-1">Parent & Student Portals</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Live Attendance & Progress</p>
          </div>
          <div>
            <p className="font-display text-2xl md:text-4xl font-extrabold text-emerald-600">Free</p>
            <p className="text-xs font-extrabold text-[#37423b] mt-1">Complimentary Trial</p>
            <p className="text-[11px] text-slate-500 mt-0.5">No Credit Card Required</p>
          </div>
        </div>
      </section>

      {/* 3. WHAT AEC OFFERS */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="container-aec">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#5fcf80]">
                Comprehensive Academy
              </p>
              <h2 className="font-display text-3xl font-extrabold text-[#37423b]">
                What AEC Network Delivers
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you seek foundational Quranic recitation, linguistic proficiency in English or Arabic, or core school academic mastery, our platform combines personalized tutoring with an enterprise LMS.
              </p>
              <div className="pt-2 flex flex-col gap-3">
                {[
                  "Interactive live class rooms with verified meeting security",
                  "Modular digital curriculum with video lessons and quizzes",
                  "Automated attendance records with immediate parent notices",
                  "Official verifiable completion certificates"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-[#5fcf80] flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link href="/admissions/how-to-enroll" className="mentor-btn-outline text-xs px-6 py-2.5">
                  Learn How Admissions Work
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6">
                <p className="font-display text-base font-extrabold text-[#37423b]">Quran & Islamic Studies</p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Tajweed rules, articulation points (Makharij), Nazra recitation, and Hifz memorization with certified instructors.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6">
                <p className="font-display text-base font-extrabold text-[#37423b]">Languages & Linguistics</p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  English for academic and communicative proficiency, along with classical and modern Arabic grammar.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6">
                <p className="font-display text-base font-extrabold text-[#37423b]">STEM & School Tutoring</p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Mathematics, Science, and board exam support customized to primary and secondary school syllabi.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6">
                <p className="font-display text-base font-extrabold text-[#37423b]">One-on-One Mentorship</p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Individual pacing, dedicated instructor attention, and adaptable weekly timetables for busy schedules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROGRAMS */}
      <section className="container-aec space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#5fcf80]">Curriculum Portfolio</p>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-[#37423b]">Featured Academic Programs</h2>
          </div>
          <Link href="/programs" className="text-xs font-bold text-[#5fcf80] hover:text-[#46b967] transition flex items-center gap-1">
            <span>View all programs catalog</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <Link key={p.slug} href={`/programs/${p.slug}` as never} className="mentor-card group flex flex-col justify-between">
              <div>
                {/* Program Card Cover Image */}
                <div className="w-full h-52 overflow-hidden bg-slate-100 relative">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-[#5fcf80] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    {p.level}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-extrabold text-[#37423b] group-hover:text-[#5fcf80] transition line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">{p.blurb}</p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs mt-auto">
                <span className="font-semibold text-slate-500">1-on-1 / Group</span>
                <span className="font-bold text-[#5fcf80] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Explore</span>
                  <span>→</span>
                </span>
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

      {/* 10B. PRICING & FEE STRUCTURE */}
      <PricingSection />

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
