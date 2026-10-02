"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import PageHeaderBanner from "@/components/PageHeaderBanner";
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

      let targetUrl = "/admin";
      if (callbackUrl && !callbackUrl.includes("/login")) {
        targetUrl = callbackUrl;
      } else if (userRole) {
        targetUrl = getRoleRedirectPath(userRole);
      }

      // Hard redirect to ensure auth cookies are cleanly transferred
      window.location.href = targetUrl;
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/80 bg-white/65 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(11,31,58,0.15),0_0_0_1px_rgba(255,255,255,0.7)_inset] relative overflow-hidden">
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
          Sign In to Portal
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Unified access for Students, Parents, Teachers & Administrators
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-xl bg-rose-50/80 backdrop-blur-md border border-rose-200 p-3.5 text-xs font-semibold text-rose-800 flex items-start gap-2 animate-in fade-in duration-200">
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
            className="w-full rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.02)_inset] focus:bg-white/95 focus:border-[#4DA3D9] focus:outline-none focus:ring-4 focus:ring-[#4DA3D9]/20 transition-all duration-200"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-aec-teal hover:text-aec-navy transition"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            autoComplete="current-password"
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
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In &rarr;</span>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-200/60 text-center text-xs text-slate-500">
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
    <div className="relative min-h-[85vh] space-y-12 pb-20 bg-gradient-to-br from-slate-100 via-sky-50/70 to-slate-200/80 overflow-hidden">
      {/* Ambient luminous crystal orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#4DA3D9]/20 blur-[90px]" />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-aec-navy/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-sky-200/25 blur-[110px]" />

      {/* Mentor Style Page Head Banner */}
      <PageHeaderBanner
        title="AEC Portals Access"
        subtitle="Unified secure access point for Students, Parents, Teachers, Supervisors, and Academic Administrators."
        badge="Portals Hub"
        breadcrumbCurrent="Portals"
        bgImage="/images/banner-3.png"
      />

      <div className="container-aec relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-12 text-sm text-slate-500">Loading secure login portal...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
