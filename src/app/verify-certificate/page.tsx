"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
    <div className="relative min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 via-sky-50/70 to-slate-200/80 overflow-hidden">
      {/* Ambient luminous crystal orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#4DA3D9]/20 blur-[90px]" />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-aec-navy/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-sky-200/25 blur-[110px]" />

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/80 bg-white/65 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(11,31,58,0.15),0_0_0_1px_rgba(255,255,255,0.7)_inset] overflow-hidden text-center">
        {/* Top Crystal Highlight */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

        {/* Top Official Brand Logo */}
        <div className="flex justify-center pb-5 mb-5 border-b border-slate-200/50">
          <Link href="/" className="inline-block hover:opacity-90 transition">
            <Image
              src="/images/aec-network-logo-horizontal.svg"
              alt="AEC Network - A Project by AEC Network"
              width={280}
              height={82}
              className="w-auto h-11 sm:h-12 object-contain mx-auto"
              priority
            />
          </Link>
        </div>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-aec-navy text-aec-gold mb-4 shadow-md">
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
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 text-left mb-1.5">
              Enter Credential Code / Certificate ID
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. AEC-CRD-8891-2026 or certificate ID"
              required
              className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-3 text-sm font-mono text-slate-900 placeholder-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:outline-none focus:ring-4 focus:ring-[#4DA3D9]/20 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-aec-navy px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-aec-navy/90 transition cursor-pointer"
          >
            Verify Credential &rarr;
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200/60 text-xs text-slate-500">
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
