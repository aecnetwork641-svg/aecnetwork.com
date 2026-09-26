"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xl">
        <div className="text-center">
          <Link href="/" className="inline-flex justify-center transition hover:opacity-95">
            <Logo variant="full" size="md" />
          </Link>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900">
            Forgot Password?
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Enter your registered email and we&apos;ll send you a password reset link.
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs font-semibold text-rose-800 flex items-start gap-2">
            <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage ? (
          <div className="space-y-6">
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-900 flex items-start gap-3">
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
              className="w-full flex justify-center items-center gap-2 rounded-xl bg-aec-navy px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-aec-navy/90 transition"
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
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-aec-navy focus:outline-none focus:ring-1 focus:ring-aec-navy transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-xl bg-aec-navy px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-aec-navy/90 focus:outline-none focus:ring-2 focus:ring-aec-navy focus:ring-offset-2 transition disabled:opacity-60"
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
