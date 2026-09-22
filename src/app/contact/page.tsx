export default function ContactPage() {
  return (
    <div className="container-aec grid gap-10 py-16 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-3xl font-bold text-aec-navy">Contact AEC</h1>
        <p className="mt-3 text-aec-navy/70">
          Real address, phone number, email and WhatsApp link should be set via
          the <code>NEXT_PUBLIC_ORG_*</code> environment variables once
          verified — none are hardcoded here.
        </p>
        <div className="mt-8 space-y-3 text-sm text-aec-navy/70">
          <p>Email: <span className="text-aec-navy/40">not yet configured</span></p>
          <p>Phone: <span className="text-aec-navy/40">not yet configured</span></p>
          <p>WhatsApp: <span className="text-aec-navy/40">not yet configured</span></p>
        </div>
      </div>
      <form className="card space-y-4">
        <div>
          <label className="text-sm font-medium text-aec-navy">Name</label>
          <input className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" required />
        </div>
        <div>
          <label className="text-sm font-medium text-aec-navy">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" required />
        </div>
        <div>
          <label className="text-sm font-medium text-aec-navy">Message</label>
          <textarea className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" rows={4} required />
        </div>
        <button type="submit" className="btn-primary w-full">Send Message</button>
      </form>
    </div>
  );
}
