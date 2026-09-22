export default function LoginPage() {
  return (
    <div className="container-aec flex max-w-md flex-col justify-center py-20">
      <h1 className="font-display text-2xl font-bold text-aec-navy">Sign In</h1>
      <p className="mt-2 text-sm text-aec-navy/70">
        One login for Student, Teacher, Parent and Staff/Admin portals — role
        is read from the <code>User.role</code> field and routes accordingly
        (see <code>src/middleware.ts</code>).
      </p>
      <form className="card mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-aec-navy">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" required />
        </div>
        <div>
          <label className="text-sm font-medium text-aec-navy">Password</label>
          <input type="password" className="mt-1 w-full rounded-lg border border-aec-navy/20 px-4 py-2" required />
        </div>
        <button type="submit" className="btn-primary w-full">Sign In</button>
      </form>
      <p className="mt-4 text-center text-xs text-aec-navy/40">
        Demo credentials (after running the seed script):
        admin@demo.aecnetwork.local / Demo@12345
      </p>
    </div>
  );
}
