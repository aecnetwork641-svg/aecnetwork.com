import Link from "next/link";
import PageHeaderBanner from "@/components/PageHeaderBanner";

const LINKS = [
  { title: "How to Enroll", href: "/admissions/how-to-enroll", desc: "Step-by-step guidance through our complete admission and onboarding process.", icon: "📋" },
  { title: "Book a Free Trial", href: "/admissions/free-trial", desc: "Experience a live interactive 1-on-1 trial class with zero financial obligation.", icon: "✨" },
  { title: "Online Admission Form", href: "/admissions/apply", desc: "Submit your student registration and select preferred study schedule tracks.", icon: "📝" },
  { title: "Fee Structure & Plans", href: "/admissions/fees", desc: "Transparent tuition rates, multi-subject discounts, and secure digital invoicing.", icon: "💳" },
  { title: "Requirements & Guidelines", href: "/admissions/requirements", desc: "Technical setup prerequisites, classroom etiquette, and parent guidelines.", icon: "🎯" },
  { title: "Admissions FAQs", href: "/admissions/faqs", desc: "Answers to frequently asked questions on scheduling, teachers, and trial classes.", icon: "❓" }
];

export default function AdmissionsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Mentor Style Page Head Banner */}
      <PageHeaderBanner
        title="Admissions & Enrollment"
        subtitle="Start your learning journey with AEC Network. Explore our transparent enrollment steps, fee schedules, requirements, and book a free trial class."
        badge="Enrollment Hub"
        breadcrumbCurrent="Admissions"
        bgImage="/images/banner-1.jpg"
      />

      <div className="container-aec">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href as never}
              className="mentor-card p-6 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="text-2xl mb-3">{l.icon}</div>
                <h3 className="font-display font-bold text-lg text-aec-navy group-hover:text-aec-teal transition">
                  {l.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {l.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-aec-teal">
                <span>View Details</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
