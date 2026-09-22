export default function ScopedDataNote({ text }: { text: string }) {
  return (
    <p className="mt-2 text-xs text-aec-navy/40">
      {text} Enforced server-side via <code>src/lib/scoped-queries.ts</code> —
      never by a client-supplied id.
    </p>
  );
}
