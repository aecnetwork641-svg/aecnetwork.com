import Link from "next/link";
import Image from "next/image";

interface FacultyMember {
  name: string;
  role: string;
  discipline: string;
  experience: string;
  qualification: string;
  image: string;
  badge: string;
}

const FACULTY: FacultyMember[] = [
  {
    name: "Qari Ahmad Al-Azhari",
    role: "Dean of Quranic Sciences",
    discipline: "Quran, Tajweed & Qirat",
    experience: "14+ Years Teaching",
    qualification: "Ijazah Holder (Hafs & Shu'bah), Al-Azhar Graduate",
    image: "/images/courses/qirat.jpg",
    badge: "Verified Scholar",
  },
  {
    name: "Dr. Rachel Evans",
    role: "Head of International Board Prep",
    discipline: "GCSE, IGCSE & A Levels",
    experience: "15+ Years Tutoring",
    qualification: "Ph.D. Education, Former Cambridge/Edexcel Examiner",
    image: "/images/courses/gcse.png",
    badge: "UK Examiner",
  },
  {
    name: "Engr. Salman Farooq",
    role: "Lead Software & STEM Mentor",
    discipline: "Coding, Full-Stack & CS",
    experience: "10+ Years Industry & Academic",
    qualification: "M.S. Computer Science, Senior Cloud Architect",
    image: "/images/courses/coding.png",
    badge: "Tech Lead",
  },
  {
    name: "Sarah Jenkins (M.Ed Sydney)",
    role: "Senior Academic Coordinator",
    discipline: "English & NAPLAN Prep",
    experience: "11+ Years Pedagogy",
    qualification: "M.Ed Curriculum & Assessment, Sydney Australia",
    image: "/images/courses/english.jpg",
    badge: "Australia Faculty",
  },
];

export default function FacultyTeamSection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="container-aec py-16">
      {showHeader && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-aec-teal/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-aec-teal border border-aec-teal/20">
            Dedicated Educators
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3A]">
            Meet Our Expert Faculty & Academic Team
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Learn from verified Quran scholars, certified examiners, language authorities, and senior technology mentors who provide dedicated 1-on-1 personalized guidance.
          </p>
        </div>
      )}

      {/* Faculty Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {FACULTY.map((member) => (
          <div
            key={member.name}
            className="group rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-aec-teal/50 flex flex-col justify-between"
          >
            <div>
              {/* Profile Image with subtle overlay */}
              <div className="relative h-56 w-full overflow-hidden bg-[#0B1F3A]/5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 rounded-full bg-[#0B1F3A] text-white px-3 py-1 text-[10px] font-bold shadow-md border border-white/20">
                  {member.badge}
                </div>
                <div className="absolute bottom-3 left-3 rounded-md bg-[#0F766E] text-white px-2.5 py-0.5 text-[11px] font-semibold shadow-sm">
                  {member.experience}
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-aec-teal">
                  {member.discipline}
                </p>
                <h3 className="mt-1 font-display text-base font-bold text-[#0B1F3A] group-hover:text-aec-teal transition">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {member.role}
                </p>
                <p className="mt-3 text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  🎓 {member.qualification}
                </p>
              </div>
            </div>

            {/* Direct Connect CTA */}
            <div className="p-5 pt-0">
              <Link
                href="/admissions/free-trial"
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-50 border border-slate-200 py-2.5 text-xs font-bold text-[#0B1F3A] transition group-hover:bg-[#0F766E] group-hover:text-white group-hover:border-[#0F766E]"
              >
                <span>Book Class With Instructor</span>
                <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Team Contact Box */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#06101E] p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            Direct Academic Consultation
          </span>
          <h3 className="font-display text-2xl font-bold">
            Need Guidance Choosing the Right Teacher or Program?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our academic counseling team assesses student readiness and pairs learners with matching time zones, gender preferences, and customized curricula.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-xl bg-[#0F766E] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#0b5a54] shadow-md"
          >
            Contact Academic Team
          </Link>
          <a
            href="https://wa.me/923435999397"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/30 bg-white/10 backdrop-blur-md px-6 py-3 text-xs font-bold text-white transition hover:bg-white/20"
          >
            💬 WhatsApp Live Support
          </a>
        </div>
      </div>
    </section>
  );
}
