/** @type {import('next').NextConfig} */

const SUPABASE_DB_URL =
  "postgresql://postgres.rikvucrhiuakrtuxfvmp:pak560641%40%40@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres?sslmode=require";

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "") {
  process.env.DATABASE_URL = SUPABASE_DB_URL;
}
if (!process.env.DIRECT_URL || process.env.DIRECT_URL.trim() === "") {
  process.env.DIRECT_URL = SUPABASE_DB_URL;
}

// Ensure NEXTAUTH_SECRET is never empty
if (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET.trim() === "") {
  process.env.NEXTAUTH_SECRET = "aec-network-development-secret-key-32-chars-minimum";
}

// Ensure NEXTAUTH_URL is never empty to avoid NextAuth parseUrl ERR_INVALID_URL during build/prerender
if (!process.env.NEXTAUTH_URL || process.env.NEXTAUTH_URL.trim() === "") {
  if (process.env.VERCEL_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
  } else if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  } else {
    process.env.NEXTAUTH_URL = "http://localhost:3000";
  }
}

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }]
  }
};

module.exports = nextConfig;
