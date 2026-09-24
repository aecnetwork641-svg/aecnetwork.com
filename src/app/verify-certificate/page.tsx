"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CertificateVerificationSearchPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/verify-certificate/${encodeURIComponent(code.trim())}` as any);
    }
  };

  return (
    <div className="container-aec py-16 max-w-xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-aec-navy text-aec-gold mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <h1 className="font-display text-2xl font-bold text-slate-900">Certificate Verification</h1>
        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
          Verify the authenticity of graduation and completion certificates issued by the AEC Network Academic Board.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 text-left mb-1">
              Enter Credential Code / Certificate ID
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. AEC-CRD-8891-2026 or certificate ID"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono text-slate-900 placeholder-slate-400 focus:border-aec-navy focus:outline-none focus:ring-1 focus:ring-aec-navy"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-aec-navy px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-aec-navy/90 transition"
          >
            Verify Credential &rarr;
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500">
          <p>
            Have questions about certificate authentication?{" "}
            <Link href="/contact" className="font-semibold text-aec-navy hover:underline">
              Contact Academic Registry
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
