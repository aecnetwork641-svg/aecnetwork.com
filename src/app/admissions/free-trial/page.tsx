export default function FreeTrialPage() {
  return (
    <div className="container-aec max-w-xl py-16">
      <h1 className="font-display text-3xl font-bold text-aec-navy">Book a Free Trial</h1>
      <p className="mt-3 text-aec-navy/70">
        Fill in your details and our team will confirm a trial class time.
        This form posts to a <code>TrialBooking</code> record — wire up an
        API route (e.g. <code>/api/admissions/trial</code>) to persist it.
      </p>
      <form className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-aec-navy">Full Name</label>
          <input className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" required />
        </div>
        <div>
          <label className="text-sm font-medium text-aec-navy">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" required />
        </div>
        <div>
          <label className="text-sm font-medium text-aec-navy">Phone (optional)</label>
          <input className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" />
        </div>
        <div>
          <label className="text-sm font-medium text-aec-navy">Program of Interest</label>
          <select className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2">
            <option>Quran & Islamic Studies</option>
            <option>English</option>
            <option>Arabic</option>
            <option>Mathematics</option>
            <option>Academic Support</option>
          </select>
        </div>
        <button type="submit" className="btn-primary w-full">Request Trial</button>
      </form>
    </div>
  );
}
