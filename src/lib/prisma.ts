import { PrismaClient } from "@prisma/client";

const RAW_URL =
  process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== ""
    ? process.env.DATABASE_URL
    : "postgresql://postgres.rikvucrhiuakrtuxfvmp:pak560641%40%40@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres?sslmode=require";

function formatDbUrl(url: string): string {
  let formatted = url;
  if (!formatted.includes("connect_timeout")) {
    formatted += (formatted.includes("?") ? "&" : "?") + "connect_timeout=30";
  }
  if (!formatted.includes("pool_timeout")) {
    formatted += (formatted.includes("?") ? "&" : "?") + "pool_timeout=30";
  }
  return formatted;
}

const FINAL_URL = formatDbUrl(RAW_URL);
process.env.DATABASE_URL = FINAL_URL;
process.env.DIRECT_URL = FINAL_URL;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: FINAL_URL
      }
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

globalForPrisma.prisma = prisma;

