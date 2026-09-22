const FAQS = [
  { q: "What ages does AEC teach?", a: "Placeholder — specify actual age ranges supported." },
  { q: "Can I switch teachers?", a: "Placeholder — describe the actual policy." },
  { q: "What payment methods are supported?", a: "Placeholder — list actual supported payment methods." }
];

export default function AdmissionsFaqPage() {
  return (
    <div className="container-aec max-w-3xl py-16">
      <h1 className="font-display text-3xl font-bold text-aec-navy">Admissions FAQs</h1>
      <div className="mt-8 space-y-4">
        {FAQS.map((f) => (
          <details key={f.q} className="card">
            <summary className="cursor-pointer font-semibold text-aec-navy">{f.q}</summary>
            <p className="mt-2 text-sm text-aec-navy/70">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
