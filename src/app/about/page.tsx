import Link from "next/link";

export const metadata = {
  title: "About Us | AEC Network - Empowering Learners Through Knowledge, Structure & Opportunity",
  description: "Learn about Akbar Education Communication (AEC) Network, our mission, vision, structured educational approach, vetted educators, and comprehensive learning tracks.",
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50/50 pb-20">
      {/* Hero Header */}
      <section className="border-b border-aec-navy/10 bg-gradient-to-b from-aec-cream/40 via-white to-slate-50/50 py-16 md:py-24">
        <div className="container-aec max-w-5xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-aec-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-aec-teal">
            About AEC Network
          </span>
          <h1 className="mt-4 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-aec-navy leading-tight">
            Empowering Learners Through Knowledge, Structure & Opportunity
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-700 leading-relaxed max-w-4xl">
            <strong>Akbar Education Communication (AEC) Network</strong> is an online educational institution committed to providing accessible, structured, and learner-focused education to students across different age groups and locations worldwide.
          </p>
          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed max-w-4xl">
            AEC brings together Islamic education, academic tutoring, language learning, examination preparation, and technology-focused education through flexible online learning programs. Our aim is to connect students with dedicated educators and provide a structured learning environment that supports continuous academic and personal development.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-sm text-slate-700 leading-relaxed max-w-4xl">
            💡 <strong>Our Educational Model:</strong> Combines live instruction, structured curricula, personalized tutoring, continuous assessment, and ongoing learning support. Students can choose between <strong>one-to-one tutoring</strong> and <strong>interactive group classes</strong>, depending on their learning requirements and preferred schedule.
          </div>
        </div>
      </section>

      <div className="container-aec max-w-5xl mt-14 space-y-20">
        {/* 01 — Mission & Vision */}
        <section id="mission-vision" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-aec-navy text-white text-xs font-bold">
              01
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-aec-navy">
              Mission & Vision
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="rounded-2xl border border-aec-teal/20 bg-white p-7 shadow-md flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-aec-teal/10 px-3 py-1 text-xs font-bold text-aec-teal mb-3">
                  Our Mission
                </span>
                <h3 className="font-display text-xl font-bold text-aec-navy">
                  Accessible, Structured & Meaningful Education
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Our mission is to make quality education accessible, structured, and meaningful for learners from different backgrounds. AEC aims to provide students with opportunities to learn through qualified educators, organized curricula, personalized guidance, and modern online learning technology.
                </p>

                <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    We focus on creating an environment where students can:
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-aec-teal font-bold">✓</span>
                      <span>Build strong academic foundations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-aec-teal font-bold">✓</span>
                      <span>Develop Islamic knowledge, Tajweed and understanding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-aec-teal font-bold">✓</span>
                      <span>Improve language and communication skills (English & Arabic)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-aec-teal font-bold">✓</span>
                      <span>Prepare thoroughly for international academic examinations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-aec-teal font-bold">✓</span>
                      <span>Develop technology, coding and professional digital skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-aec-teal font-bold">✓</span>
                      <span>Learn consistently through structured programs with individual guidance</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-6 rounded-lg bg-slate-50 p-3 text-xs text-slate-600 italic border border-slate-100">
                &ldquo;Our approach emphasizes learning, practice, assessment, feedback, and continuous improvement rather than simply completing lessons.&rdquo;
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl border border-aec-navy/10 bg-white p-7 shadow-md flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-aec-navy/10 px-3 py-1 text-xs font-bold text-aec-navy mb-3">
                  Our Vision
                </span>
                <h3 className="font-display text-xl font-bold text-aec-navy">
                  A Globally Accessible Educational Network
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Our vision is to develop AEC into a globally accessible educational network that connects learners worldwide with knowledge, qualified educators, and meaningful learning opportunities.
                </p>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  We aspire to build a learning community where modern technology and effective teaching methods work together to make education more flexible, accessible, and learner-centered.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="rounded-xl bg-aec-cream/50 p-3.5 border border-aec-navy/5">
                    <p className="font-bold text-xs text-aec-navy">🌐 Global Reach</p>
                    <p className="text-xs text-slate-600 mt-0.5">Connecting students across Pakistan, UK, USA, Australia, UAE, and GCC.</p>
                  </div>
                  <div className="rounded-xl bg-aec-cream/50 p-3.5 border border-aec-navy/5">
                    <p className="font-bold text-xs text-aec-navy">⚡ Modern Pedagogy</p>
                    <p className="text-xs text-slate-600 mt-0.5">Combining live audio-video instruction, digital whiteboards, and LMS tracking.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link href="/about/mission-vision" className="text-xs font-semibold text-aec-teal hover:underline flex items-center gap-1">
                  <span>Read full Mission & Vision details</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Why AEC */}
        <section id="why-aec" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-aec-navy text-white text-xs font-bold">
              02
            </span>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-aec-navy">
                Why Choose AEC Network?
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Every learner deserves an educational pathway that matches their goals, ability, and circumstances.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xl">🌟</span>
                <h3 className="font-display text-base font-bold text-aec-navy">
                  Diverse Learning Opportunities
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                AEC brings different educational disciplines together under one cohesive institution:
              </p>
              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                  <strong className="text-slate-900">🕌 Islamic Education:</strong> Qur&apos;an Recitation, Noorani Qaida, Tajweed, Hifz, Islamic Studies, Qur&apos;an Translation, Hadith, Fiqh, Seerah.
                </div>
                <div>
                  <strong className="text-slate-900">📚 Academic Education:</strong> Mathematics, Science, English, Arabic, and general school support.
                </div>
                <div>
                  <strong className="text-slate-900">🎓 Exam Prep:</strong> GCSE / IGCSE, O & A Levels, NAPLAN, SAT, and GRE preparation.
                </div>
                <div>
                  <strong className="text-slate-900">💻 Technology:</strong> Computer Programming (Python, C++, JavaScript), Web Design & Development, SMM.
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xl">⏱️</span>
                <h3 className="font-display text-base font-bold text-aec-navy">
                  Flexible Learning Model
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students can access <strong>1-on-1 private tutoring</strong> or <strong>interactive group classes</strong>, allowing AEC to accommodate different learning preferences, family schedules, and time-zone differences for local and overseas students.
              </p>
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs text-emerald-800">
                ✓ Personalized pace, customizable lesson timings (Morning, Evening, Weekend) and flexible scheduling.
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xl">📋</span>
                <h3 className="font-display text-base font-bold text-aec-navy">
                  Structured Education
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rather than relying on unstructured online lessons, AEC&apos;s pedagogical model uses clear learning objectives, organized curricula, periodic assessments, attendance tracking, and cumulative progress reporting.
              </p>
              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700">
                ✓ Weekly syllabi benchmarks, assignment reviews, and milestone evaluations.
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xl">👨‍👩‍👧‍👦</span>
                <h3 className="font-display text-base font-bold text-aec-navy">
                  Parent & Student Support
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                AEC incorporates dedicated <strong>Student and Parent Portals</strong> providing live access to attendance records, academic progress, teacher feedback, assignments, fee invoices, and timetable updates.
              </p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-800">
                ✓ Transparent multi-child portal access and direct academic coordinator communication.
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Our Approach */}
        <section id="approach" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-aec-navy text-white text-xs font-bold">
              03
            </span>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-aec-navy">
                Our Educational Approach
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                How learning works at AEC: A student-centered pathway from assessment to mastery.
              </p>
            </div>
          </div>

          {/* Visual Model Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-slate-900 to-aec-navy p-6 text-white shadow-lg">
            <p className="text-xs font-bold uppercase tracking-wider text-aec-teal text-center mb-4">
              The AEC Six-Stage Learning Cycle
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                <p className="font-extrabold text-aec-teal text-sm">01</p>
                <p className="font-bold mt-1">Assess</p>
                <p className="text-[10px] text-white/70 mt-0.5">Baseline placement</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                <p className="font-extrabold text-aec-teal text-sm">02</p>
                <p className="font-bold mt-1">Plan</p>
                <p className="text-[10px] text-white/70 mt-0.5">Custom schedule</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                <p className="font-extrabold text-aec-teal text-sm">03</p>
                <p className="font-bold mt-1">Learn</p>
                <p className="text-[10px] text-white/70 mt-0.5">Live instruction</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                <p className="font-extrabold text-aec-teal text-sm">04</p>
                <p className="font-bold mt-1">Practice</p>
                <p className="text-[10px] text-white/70 mt-0.5">Exercises & drills</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                <p className="font-extrabold text-aec-teal text-sm">05</p>
                <p className="font-bold mt-1">Evaluate</p>
                <p className="text-[10px] text-white/70 mt-0.5">Feedback & tests</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                <p className="font-extrabold text-aec-teal text-sm">06</p>
                <p className="font-bold mt-1">Improve</p>
                <p className="text-[10px] text-white/70 mt-0.5">Targeted growth</p>
              </div>
            </div>
          </div>

          {/* 6 Step Detailed Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <span className="text-xs font-bold text-aec-teal">Stage 01</span>
              <h3 className="font-bold text-sm text-aec-navy mt-1">Assessment & Placement</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We begin by diagnosing the learner&apos;s current proficiency, educational background, strengths, and goals to establish an optimal starting point.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <span className="text-xs font-bold text-aec-teal">Stage 02</span>
              <h3 className="font-bold text-sm text-aec-navy mt-1">Personalized Scheduling</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Students receive a personalized schedule suited to their availability, accommodating time zones across the UK, Australia, North America, and Middle East.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <span className="text-xs font-bold text-aec-teal">Stage 03</span>
              <h3 className="font-bold text-sm text-aec-navy mt-1">Interactive Instruction</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Live classes where instructors explain concepts clearly, answer student queries, conduct practical drills, and give instant verbal corrections.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <span className="text-xs font-bold text-aec-teal">Stage 04</span>
              <h3 className="font-bold text-sm text-aec-navy mt-1">Practice & Application</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Students solidify understanding through homework assignments, worksheets, coding tasks, Tajweed recitation practice, and interactive revision.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <span className="text-xs font-bold text-aec-teal">Stage 05</span>
              <h3 className="font-bold text-sm text-aec-navy mt-1">Continuous Evaluation</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Ongoing assessment through weekly quizzes, milestone mock exams, teacher evaluation rubrics, and automated progress logging.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <span className="text-xs font-bold text-aec-teal">Stage 06</span>
              <h3 className="font-bold text-sm text-aec-navy mt-1">Progress & Improvement</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Student development is reviewed periodically so learning strategies can be adapted and areas needing extra attention are strengthened.
              </p>
            </div>
          </div>
        </section>

        {/* 04 — Our Teachers */}
        <section id="teachers" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-aec-navy text-white text-xs font-bold">
              04
            </span>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-aec-navy">
                Our Teachers & Faculty
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Dedicated Educators. Focused Learning.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm text-slate-700 leading-relaxed">
              Teachers are at the center of the AEC learning experience. AEC aims to maintain a teaching network of qualified and dedicated educators with appropriate academic and teaching standards for each program.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="font-bold text-xs text-aec-navy flex items-center gap-1.5">
                  <span>🎯</span> Clear Instruction
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Teachers explain complex concepts in an organized and understandable manner matched to student age and level.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="font-bold text-xs text-aec-navy flex items-center gap-1.5">
                  <span>👤</span> Personalized Guidance
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Dedicated teacher attention and pace adjustments tailored to individual learner needs and strengths.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="font-bold text-xs text-aec-navy flex items-center gap-1.5">
                  <span>📚</span> Academic Support
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Assisting with subject-specific homework, exam past papers, and conceptual problem-solving.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="font-bold text-xs text-aec-navy flex items-center gap-1.5">
                  <span>📊</span> Regular Feedback
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Transparent progress updates helping students and parents identify strengths and areas for practice.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="font-bold text-xs text-aec-navy flex items-center gap-1.5">
                  <span>💬</span> Consistent Communication
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Active dialogue between teachers, students, and guardians for an accountable learning environment.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="font-bold text-xs text-aec-navy flex items-center gap-1.5">
                  <span>📜</span> Verified Qualifications
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Ijazah-certified Quran tutors, subject-specialist graduates, and experienced language instructors.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="font-semibold text-slate-700">Faculty Disciplines:</span>
                <span className="bg-aec-cream px-2 py-0.5 rounded text-aec-navy">Quran & Tajweed</span>
                <span className="bg-aec-cream px-2 py-0.5 rounded text-aec-navy">English Language</span>
                <span className="bg-aec-cream px-2 py-0.5 rounded text-aec-navy">Arabic</span>
                <span className="bg-aec-cream px-2 py-0.5 rounded text-aec-navy">Mathematics</span>
                <span className="bg-aec-cream px-2 py-0.5 rounded text-aec-navy">Science</span>
                <span className="bg-aec-cream px-2 py-0.5 rounded text-aec-navy">Computer Science</span>
              </div>
              <Link href="/about/teachers" className="text-xs font-semibold text-aec-teal hover:underline">
                View Faculty Directory →
              </Link>
            </div>
          </div>
        </section>

        {/* What We Offer (5 Specialized Tracks) */}
        <section id="what-we-offer" className="scroll-mt-24 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full bg-aec-navy/10 px-3 py-1 text-xs font-bold text-aec-navy uppercase">
              Curriculum Scope
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-aec-navy mt-2">
              What We Offer
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-2">
              AEC provides structured educational opportunities across multiple learning disciplines:
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-aec-teal transition">
              <span className="text-2xl">🕌</span>
              <h3 className="font-bold text-sm text-aec-navy mt-2">Islamic Education</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Qur&apos;an recitation, Noorani Qaida, Tajweed, Hifz, Islamic Studies, Qur&apos;an Translation, Hadith, Fiqh, and Seerah.
              </p>
              <Link href="/programs/quran-islamic-studies" className="inline-block mt-3 text-xs font-semibold text-aec-teal hover:underline">
                Explore Islamic Tracks →
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-aec-teal transition">
              <span className="text-2xl">📚</span>
              <h3 className="font-bold text-sm text-aec-navy mt-2">Academic Education</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Mathematics, Science (Physics, Chemistry, Biology), English, Arabic, and curriculum-based school support.
              </p>
              <Link href="/programs/mathematics" className="inline-block mt-3 text-xs font-semibold text-aec-teal hover:underline">
                Explore STEM & Languages →
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-aec-teal transition">
              <span className="text-2xl">🎓</span>
              <h3 className="font-bold text-sm text-aec-navy mt-2">Examination Preparation</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                GCSE, IGCSE, O Levels, A Levels, Digital SAT, NAPLAN, and GRE preparation with past paper analytics.
              </p>
              <Link href="/programs/gcse" className="inline-block mt-3 text-xs font-semibold text-aec-teal hover:underline">
                Explore Board Exam Prep →
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-aec-teal transition">
              <span className="text-2xl">💻</span>
              <h3 className="font-bold text-sm text-aec-navy mt-2">Technology & Digital Skills</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Computer Programming (Python, C++, JS), Web Design & UI/UX, Full Stack Development, and Social Media Marketing (SMM).
              </p>
              <Link href="/programs/computer-programming" className="inline-block mt-3 text-xs font-semibold text-aec-teal hover:underline">
                Explore Tech Courses →
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-aec-teal transition sm:col-span-2 lg:col-span-2">
              <span className="text-2xl">👨‍🏫</span>
              <h3 className="font-bold text-sm text-aec-navy mt-2">Personalized Tutoring Options</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Flexible <strong>One-to-One</strong> private tutoring for targeted pace and <strong>Interactive Group Cohorts</strong> for collaborative learning. Schedules are customized to your family&apos;s routine.
              </p>
              <Link href="/admissions/free-trial" className="inline-block mt-3 text-xs font-semibold text-aec-teal hover:underline">
                Book a Free 1-on-1 Trial Class →
              </Link>
            </div>
          </div>
        </section>

        {/* AEC Learning Journey (9 Step Roadmap) */}
        <section id="journey" className="scroll-mt-24 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full bg-aec-teal/10 px-3 py-1 text-xs font-bold text-aec-teal uppercase">
              Step-by-Step Experience
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-aec-navy mt-2">
              Your Learning Journey at AEC
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-2">
              A transparent 9-step roadmap from initial exploration to academic achievement:
            </p>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aec-navy text-white text-[11px] font-bold">1</span>
                <h4 className="font-bold text-xs text-aec-navy">Discover</h4>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5">
                Explore programs and identify your learning interests and subjects.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aec-navy text-white text-[11px] font-bold">2</span>
                <h4 className="font-bold text-xs text-aec-navy">Consult</h4>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5">
                Discuss your educational goals, timeline, and schedule requirements.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aec-navy text-white text-[11px] font-bold">3</span>
                <h4 className="font-bold text-xs text-aec-navy">Assess</h4>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5">
                Determine your current level and establish an appropriate learning pathway.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm bg-gradient-to-br from-emerald-50/50 to-white border-emerald-200">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-[11px] font-bold">4</span>
                <h4 className="font-bold text-xs text-emerald-900">Trial Class</h4>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5">
                Experience an interactive AEC class and meet your assigned instructor.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aec-navy text-white text-[11px] font-bold">5</span>
                <h4 className="font-bold text-xs text-aec-navy">Learn</h4>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5">
                Begin structured one-to-one or small group lessons with teacher guidance.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aec-navy text-white text-[11px] font-bold">6</span>
                <h4 className="font-bold text-xs text-aec-navy">Practice</h4>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5">
                Complete homework exercises, worksheets, and practical activities.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aec-navy text-white text-[11px] font-bold">7</span>
                <h4 className="font-bold text-xs text-aec-navy">Evaluate</h4>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5">
                Track progress through periodic assessments, quizzes, and teacher feedback.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aec-navy text-white text-[11px] font-bold">8</span>
                <h4 className="font-bold text-xs text-aec-navy">Improve</h4>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5">
                Strengthen concepts that require additional revision and practice.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm bg-gradient-to-br from-aec-gold/10 to-white border-aec-gold/30">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aec-navy text-white text-[11px] font-bold">9</span>
                <h4 className="font-bold text-xs text-aec-navy">Achieve</h4>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5">
                Work toward your academic, spiritual, and career milestones with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner: Start Your Journey */}
        <section className="rounded-2xl border border-aec-teal/30 bg-gradient-to-br from-aec-navy via-slate-900 to-aec-navy p-8 md:p-12 text-center text-white shadow-xl">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-aec-teal mb-3">
            Ready to Begin?
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold">
            Start Your Learning Journey with AEC Network
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of motivated learners receiving structured 1-on-1 tutoring and Islamic education. Book your complimentary trial session today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admissions/free-trial"
              className="btn-primary px-6 py-3 text-sm font-semibold shadow-lg"
            >
              Book a Free Trial Class
            </Link>
            <Link
              href="/programs"
              className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 px-6 py-3 text-sm font-semibold"
            >
              Explore Academic Programs
            </Link>
            <Link
              href="/contact"
              className="btn-secondary bg-transparent text-white border-white/20 hover:bg-white/10 px-6 py-3 text-sm font-semibold"
            >
              Contact Admissions
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
