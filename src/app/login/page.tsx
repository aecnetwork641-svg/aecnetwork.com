"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getRoleRedirectPath } from "@/lib/permissions";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (urlError === "AccessDenied" || urlError === "Unauthorized") {
      setErrorMessage("Access denied: You do not have permission to access that portal.");
    } else if (urlError === "AuthError") {
      setErrorMessage("An authentication error occurred. Please log in again.");
    }
  }, [urlError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password
      });

      if (!res || res.error) {
        setErrorMessage(
          res?.error === "CredentialsSignin"
            ? "Invalid email address or password. Please try again."
            : res?.error || "Login failed. Please verify your credentials."
        );
        setLoading(false);
        return;
      }

      // Fetch the updated session to determine the user's role
      const session = await getSession();
      const userRole = (session?.user as { role?: string } | undefined)?.role;

      if (callbackUrl && !callbackUrl.includes("/login")) {
        router.push(callbackUrl as any);
      } else {
        const redirectPath = getRoleRedirectPath(userRole);
        router.push(redirectPath as any);
      }
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xl">
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2 font-display text-2xl font-bold text-aec-navy">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-aec-navy text-white text-base font-black shadow-inner">
            AEC
          </span>
          <span>
            AEC <span className="text-aec-teal">Network</span>
          </span>
        </Link>
        <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900">
          Sign In to Portal
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Unified access for Students, Parents, Teachers & Administrators
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs font-semibold text-rose-800 flex items-start gap-2 animate-in fade-in duration-200">
          <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. name@aecnetwork.local"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-aec-navy focus:outline-none focus:ring-1 focus:ring-aec-navy transition"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Password
            </label>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            autoComplete="current-password"
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
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In &rarr;</span>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
        <p>
          Need admission or help with your credentials?{" "}
          <Link href="/contact" className="font-semibold text-aec-navy hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center py-12 text-sm text-slate-500">Loading secure login portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
