export default function FeesPage() {
  return (
    <div className="container-aec max-w-3xl py-16">
      <h1 className="font-display text-3xl font-bold text-aec-navy">Fee Structure</h1>
      <p className="mt-3 text-aec-navy/70">
        Pricing is intentionally left blank here — pull real values from the{" "}
        <code>FeeStructure</code> table rather than displaying invented prices.
      </p>
      <div className="mt-8 overflow-hidden rounded-xl2 border border-aec-navy/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-aec-cream">
            <tr>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Billing Cycle</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-aec-navy/10">
              <td className="px-4 py-3 text-aec-navy/50" colSpan={3}>
                No fee data connected yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
