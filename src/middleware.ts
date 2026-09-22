import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Gates each portal by role. Enforces server-side route guarding
 * for Student, Teacher, Parent, Admin, Academic, Finance, HR, and Supervisor portals.
 */
const PORTAL_ROLE_MAP: Record<string, string[]> = {
  "/student": ["STUDENT"],
  "/teacher": ["TEACHER"],
  "/parent": ["PARENT"],
  "/admin": ["ADMIN", "SUPER_ADMIN", "DIRECTOR", "STAFF"],
  "/academic": ["ADMIN", "SUPER_ADMIN", "ACADEMIC_HEAD", "DIRECTOR"],
  "/finance": ["ADMIN", "SUPER_ADMIN", "FINANCE_MANAGER", "DIRECTOR"],
  "/hr": ["ADMIN", "SUPER_ADMIN", "HR_MANAGER", "DIRECTOR"],
  "/supervisor": ["ADMIN", "SUPER_ADMIN", "SUPERVISOR", "ACADEMIC_HEAD", "HR_MANAGER"]
};

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const role = (req.nextauth.token as { role?: string } | null)?.role;

    for (const prefix of Object.keys(PORTAL_ROLE_MAP)) {
      if (path.startsWith(prefix)) {
        const allowed = PORTAL_ROLE_MAP[prefix];
        if (!role || !allowed?.includes(role)) {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

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
