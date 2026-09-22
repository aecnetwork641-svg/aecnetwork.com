export default function BlogPage() {
  return (
    <div className="container-aec py-16">
      <h1 className="font-display text-3xl font-bold text-aec-navy">Blog & Resources</h1>
      <p className="mt-3 max-w-2xl text-aec-navy/70">
        Articles, study resources and Islamic/academic resources will list
        here from the <code>BlogPost</code> model once content is published.
      </p>
      <div className="mt-10 card">
        <p className="text-sm text-aec-navy/50">No published posts yet.</p>
      </div>
    </div>
  );
}
