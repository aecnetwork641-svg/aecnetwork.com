import Link from "next/link";

const LINKS = [
  { title: "How to Enroll", href: "/admissions/how-to-enroll", desc: "Step-by-step enrollment process." },
  { title: "Free Trial", href: "/admissions/free-trial", desc: "Book a no-obligation trial class." },
  { title: "Admission Form", href: "/admissions/apply", desc: "Submit your application." },
  { title: "Fee Structure", href: "/admissions/fees", desc: "Program pricing (populate from FeeStructure model)." },
  { title: "FAQs", href: "/admissions/faqs", desc: "Common admissions questions." }
];

export default function AdmissionsPage() {
  return (
    <div className="container-aec py-16">
      <h1 className="font-display text-3xl font-bold text-aec-navy">Admissions</h1>
      <p className="mt-3 max-w-2xl text-aec-navy/70">Everything you need to join AEC Network.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href as never} className="card block">
            <p className="font-semibold text-aec-navy">{l.title}</p>
            <p className="mt-2 text-sm text-aec-navy/70">{l.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
