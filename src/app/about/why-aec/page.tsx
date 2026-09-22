import Link from "next/link";

export default function WhyAecPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <Link href="/about" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to About
        </Link>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Why Choose AEC Network
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          How our learning ecosystem stands apart through verified pedagogy, individual attention, and institutional structure.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card">
          <div className="h-8 w-8 rounded-lg bg-aec-teal/10 text-aec-teal flex items-center justify-center font-bold text-sm mb-3">
            01
          </div>
          <h2 className="font-display text-lg font-bold text-aec-navy">Dedicated 1-on-1 & Cohort Options</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Whether your student requires private, self-paced focus or thrives within interactive small peer groups, our schedule adapts to your family&apos;s routine.
          </p>
        </div>

        <div className="card">
          <div className="h-8 w-8 rounded-lg bg-aec-teal/10 text-aec-teal flex items-center justify-center font-bold text-sm mb-3">
            02
          </div>
          <h2 className="font-display text-lg font-bold text-aec-navy">Vetted & Qualified Instructors</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            We do not use unverified tutors. Our faculty includes credentialed Tajweed scholars with Ijazah, certified ESL specialists, and university STEM graduates.
          </p>
        </div>

        <div className="card">
          <div className="h-8 w-8 rounded-lg bg-aec-teal/10 text-aec-teal flex items-center justify-center font-bold text-sm mb-3">
            03
          </div>
          <h2 className="font-display text-lg font-bold text-aec-navy">Real-Time Parent Portal</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Guardians receive multi-child dashboard access to track daily attendance, automated absence alerts, assignment scores, and teacher evaluation feedback.
          </p>
        </div>

        <div className="card">
          <div className="h-8 w-8 rounded-lg bg-aec-teal/10 text-aec-teal flex items-center justify-center font-bold text-sm mb-3">
            04
          </div>
          <h2 className="font-display text-lg font-bold text-aec-navy">Integrated Learning Platform</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            From live class video integration to modular lesson notes, quizzes, and verifiable completion certificates, everything operates under one unified system.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-aec-navy/10 bg-aec-navy text-white p-8">
        <h2 className="font-display text-xl font-bold">Experience the AEC Standard</h2>
        <p className="mt-2 text-sm text-white/70 max-w-xl">
          Book a complimentary free trial class to meet an instructor and evaluate our curriculum firsthand.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/admissions/free-trial" className="btn-primary">
            Book Free Trial
          </Link>
          <Link href="/about/approach" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
            Our Teaching Approach →
          </Link>
        </div>
      </div>
    </div>
  );
}
