const STEPS = [
  { title: "Explore Programs", desc: "Browse programs and pick the one that fits your goals." },
  { title: "Book a Free Trial", desc: "Experience a live class before committing." },
  { title: "Submit Admission Form", desc: "Fill in the application with your details." },
  { title: "Placement / Assessment", desc: "A short assessment helps place you in the right level." },
  { title: "Enroll & Pay", desc: "Confirm your class and complete payment." },
  { title: "Start Learning", desc: "Get your timetable and join your first class." }
];

export default function HowToEnrollPage() {
  return (
    <div className="container-aec max-w-3xl py-16">
      <h1 className="font-display text-3xl font-bold text-aec-navy">How to Enroll</h1>
      <ol className="mt-8 space-y-6">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-aec-teal text-sm font-bold text-white">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-aec-navy">{s.title}</p>
              <p className="text-sm text-aec-navy/70">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
