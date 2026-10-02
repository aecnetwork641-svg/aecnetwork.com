"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to process request. Please try again.");
      } else {
        setSuccessMessage(data.message || "Password reset link has been sent to your email.");
      }
    } catch (err: any) {
      setErrorMessage("Network error. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 via-sky-50/70 to-slate-200/80 overflow-hidden">
      {/* Ambient luminous crystal orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#4DA3D9]/20 blur-[90px]" />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-aec-navy/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-sky-200/25 blur-[110px]" />

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-white/80 bg-white/65 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(11,31,58,0.15),0_0_0_1px_rgba(255,255,255,0.7)_inset] overflow-hidden">
        {/* Top Crystal Highlight */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

        <div className="text-center">
          <Link href="/" className="inline-flex justify-center transition hover:opacity-95">
            <Image
              src="/images/aec-network-logo-horizontal.svg"
              alt="AEC Network - A Project by AEC Network"
              width={280}
              height={82}
              className="w-auto h-12 sm:h-14 object-contain mx-auto"
              priority
            />
          </Link>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900">
            Forgot Password?
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Enter your registered email and we&apos;ll send you a password reset link.
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-xl bg-rose-50/80 backdrop-blur-md border border-rose-200 p-3.5 text-xs font-semibold text-rose-800 flex items-start gap-2">
            <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage ? (
          <div className="space-y-6">
            <div className="rounded-2xl bg-emerald-50/80 backdrop-blur-md border border-emerald-200 p-4 text-xs font-medium text-emerald-900 flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold text-sm text-emerald-950 mb-1">Check Your Email</p>
                <p>{successMessage}</p>
                <p className="mt-2 text-slate-500">Please check your inbox (and spam folder) for instructions to reset your password.</p>
              </div>
            </div>

            <Link
              href="/login"
              className="w-full flex justify-center items-center gap-2 rounded-xl bg-aec-navy px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-aec-navy/90 transition"
            >
              &larr; Return to Sign In
            </Link>
          </div>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Registered Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. yourname@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:outline-none focus:ring-4 focus:ring-[#4DA3D9]/20 transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-xl bg-aec-navy px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-aec-navy/90 focus:outline-none focus:ring-2 focus:ring-aec-navy focus:ring-offset-2 transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <span>Send Reset Link &rarr;</span>
              )}
            </button>

            <div className="pt-2 text-center text-xs text-slate-500">
              <span>Remembered your password? </span>
              <Link href="/login" className="font-semibold text-aec-navy hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
