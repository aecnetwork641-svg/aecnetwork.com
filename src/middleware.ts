import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Strict Role-Based Access Control for all AEC Network private portals.
 */
const PORTAL_ROLE_MAP: Record<string, string[]> = {
  "/student": ["STUDENT"],
  "/teacher": ["TEACHER"],
  "/parent": ["PARENT"],
  "/admin": ["ADMIN", "SUPER_ADMIN", "DIRECTOR", "ADMISSIONS", "ADMISSIONS_OFFICER", "COUNSELOR"],
  "/academic": ["ADMIN", "SUPER_ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "DIRECTOR"],
  "/finance": ["ADMIN", "SUPER_ADMIN", "FINANCE", "FINANCE_MANAGER", "DIRECTOR"],
  "/hr": ["ADMIN", "SUPER_ADMIN", "HR", "HR_MANAGER", "DIRECTOR"],
  "/supervisor": ["ADMIN", "SUPER_ADMIN", "SUPERVISOR", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "HR", "HR_MANAGER"]
};

export async function middleware(req: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_SECRET || "aec-network-development-secret-key-32-chars-minimum";
    const isHttps = req.nextUrl.protocol === "https:" || req.headers.get("x-forwarded-proto") === "https" || req.url.startsWith("https://");

    // NextAuth on HTTPS (Vercel) uses __Secure- prefix. Try both secure and non-secure cookie formats.
    let token = await getToken({ req, secret, secureCookie: isHttps });
    if (!token && isHttps) {
      token = await getToken({ req, secret, secureCookie: false });
    }
    if (!token && !isHttps) {
      token = await getToken({ req, secret, secureCookie: true });
    }

    const path = req.nextUrl.pathname;
    const role = (token as { role?: string } | null)?.role;

    for (const prefix of Object.keys(PORTAL_ROLE_MAP)) {
      if (path === prefix || path.startsWith(prefix + "/")) {
        // Unauthenticated access check
        if (!token) {
          const loginUrl = new URL("/login", req.url);
          loginUrl.searchParams.set("callbackUrl", path);
          return NextResponse.redirect(loginUrl);
        }

        // Role authorization check
        const allowed = PORTAL_ROLE_MAP[prefix];
        if (!role || (allowed && !allowed.includes(role))) {
          // Redirect unauthorized user to their own portal or login with error
          const userPortalUrl = new URL("/login?error=AccessDenied", req.url);
          return NextResponse.redirect(userPortalUrl);
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[MIDDLEWARE_ERROR]", error);
    const loginUrl = new URL("/login?error=AuthError", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/student/:path*",
    "/teacher/:path*",
    "/parent/:path*",
    "/admin/:path*",
    "/academic/:path*",
    "/finance/:path*",
    "/hr/:path*",
    "/supervisor/:path*"
  ]
};

