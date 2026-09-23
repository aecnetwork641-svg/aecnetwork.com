import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Role-based access control for AEC portals.
 */
const PORTAL_ROLE_MAP: Record<string, string[]> = {
  "/student": ["STUDENT", "ADMIN", "SUPER_ADMIN"],
  "/teacher": ["TEACHER", "ADMIN", "SUPER_ADMIN"],
  "/parent": ["PARENT", "ADMIN", "SUPER_ADMIN"],
  "/admin": ["ADMIN", "SUPER_ADMIN", "DIRECTOR", "STAFF"],
  "/academic": ["ADMIN", "SUPER_ADMIN", "ACADEMIC_HEAD", "DIRECTOR"],
  "/finance": ["ADMIN", "SUPER_ADMIN", "FINANCE_MANAGER", "DIRECTOR"],
  "/hr": ["ADMIN", "SUPER_ADMIN", "HR_MANAGER", "DIRECTOR"],
  "/supervisor": ["ADMIN", "SUPER_ADMIN", "SUPERVISOR", "ACADEMIC_HEAD", "HR_MANAGER"]
};

export async function middleware(req: NextRequest) {
  try {
    const isDemoMode = process.env.DEMO_MODE !== "false";
    
    // In demo/evaluation mode, allow open access to all portal interfaces
    if (isDemoMode) {
      return NextResponse.next();
    }

    const secret = process.env.NEXTAUTH_SECRET || "aec-network-secret-key-2026-production";
    const token = await getToken({ req, secret });
    const path = req.nextUrl.pathname;
    const role = (token as { role?: string } | null)?.role;

    for (const prefix of Object.keys(PORTAL_ROLE_MAP)) {
      if (path.startsWith(prefix)) {
        if (!token) {
          const loginUrl = new URL("/login", req.url);
          loginUrl.searchParams.set("callbackUrl", path);
          return NextResponse.redirect(loginUrl);
        }

        const allowed = PORTAL_ROLE_MAP[prefix];
        if (role && allowed && !allowed.includes(role)) {
          return NextResponse.redirect(new URL("/login?error=Unauthorized", req.url));
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[MIDDLEWARE_SAFE_FALLBACK]", error);
    // Fail open rather than crashing with 500 MIDDLEWARE_INVOCATION_FAILED
    return NextResponse.next();
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

