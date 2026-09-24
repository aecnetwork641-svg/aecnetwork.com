export default function AboutPage() {
  return (
    <div className="container-aec py-16">
      <h1 className="font-display text-3xl font-bold text-aec-navy">About AEC</h1>
      <p className="mt-4 max-w-2xl text-aec-navy/70">
        AEC Network (Akbar Education Communication Network) is an education
        organization offering structured online learning. Detailed history,
        mission, leadership and verified achievements will be added here once
        supplied — placeholders are intentionally used instead of invented claims.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="card">
          <p className="font-semibold text-aec-navy">Mission & Vision</p>
          <p className="mt-2 text-sm text-aec-navy/70">Official mission and vision statements of AEC Network.</p>
        </div>
        <div className="card">
          <p className="font-semibold text-aec-navy">Why AEC</p>
          <p className="mt-2 text-sm text-aec-navy/70">Placeholder — add verified differentiators (approach, teacher vetting, support model).</p>
        </div>
        <div className="card">
          <p className="font-semibold text-aec-navy">Our Approach</p>
          <p className="mt-2 text-sm text-aec-navy/70">Placeholder — describe the teaching methodology used across programs.</p>
        </div>
        <div className="card">
          <p className="font-semibold text-aec-navy">Our Teachers</p>
          <p className="mt-2 text-sm text-aec-navy/70">Placeholder — real teacher profiles will be pulled from the Teacher model once populated.</p>
        </div>
      </div>
    </div>
  );
}
