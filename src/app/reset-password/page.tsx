"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!token || !email) {
      setErrorMessage("Invalid reset link. Missing token or email parameter.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to reset password. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setErrorMessage("A network error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="text-center space-y-4">
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs font-semibold text-amber-900">
          ⚠️ Invalid or missing password reset link. Please request a new link from the forgot password page.
        </div>
        <Link
          href="/forgot-password"
          className="inline-block rounded-xl bg-aec-navy px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-aec-navy/90"
        >
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <div>
      {errorMessage && (
        <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs font-semibold text-rose-800 flex items-start gap-2">
          <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {success ? (
        <div className="space-y-6">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-900 flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-bold text-sm text-emerald-950 mb-1">Password Changed Successfully!</p>
              <p>Your portal password has been updated. You can now log in using your new password.</p>
            </div>
          </div>

          <Link
            href="/login"
            className="w-full flex justify-center items-center gap-2 rounded-xl bg-aec-navy px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-aec-navy/90 transition"
          >
            Go to Login &rarr;
          </Link>
        </div>
      ) : (
        <form className="mt-4 space-y-5" onSubmit={handleSubmit}>
          <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
            Resetting password for: <strong className="text-slate-900">{email}</strong>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              minLength={6}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-aec-navy focus:outline-none focus:ring-1 focus:ring-aec-navy transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              minLength={6}
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
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Set New Password &rarr;</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xl">
        <div className="text-center">
          <Link href="/" className="inline-flex justify-center transition hover:opacity-95">
            <Logo variant="full" size="md" />
          </Link>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900">
            Reset Your Password
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Choose a secure new password for your account.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-6 text-xs text-slate-500">Loading form...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
