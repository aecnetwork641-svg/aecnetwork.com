export default function ApplyPage() {
  return (
    <div className="container-aec max-w-xl py-16">
      <h1 className="font-display text-3xl font-bold text-aec-navy">Admission Application</h1>
      <p className="mt-3 text-aec-navy/70">
        Submits to the <code>AdmissionApplication</code> model. Connect an API
        route to handle file uploads (documents) and persist the record.
      </p>
      <form className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-aec-navy">Applicant Name</label>
          <input className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" required />
        </div>
        <div>
          <label className="text-sm font-medium text-aec-navy">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" required />
        </div>
        <div>
          <label className="text-sm font-medium text-aec-navy">Program</label>
          <input className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" placeholder="e.g. quran-islamic-studies" />
        </div>
        <div>
          <label className="text-sm font-medium text-aec-navy">Supporting Documents</label>
          <input type="file" multiple className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" />
        </div>
        <button type="submit" className="btn-primary w-full">Submit Application</button>
      </form>
    </div>
  );
}
