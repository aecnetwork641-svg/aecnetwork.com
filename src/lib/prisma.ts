import { PrismaClient } from "@prisma/client";

const SUPABASE_FALLBACK_URL =
  "postgresql://postgres.rikvucrhiuakrtuxfvmp:pak560641%40%40@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres?sslmode=require";

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "") {
  process.env.DATABASE_URL = SUPABASE_FALLBACK_URL;
}
if (!process.env.DIRECT_URL || process.env.DIRECT_URL.trim() === "") {
  process.env.DIRECT_URL = SUPABASE_FALLBACK_URL;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url:
          process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== ""
            ? process.env.DATABASE_URL
            : SUPABASE_FALLBACK_URL
      }
    }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

