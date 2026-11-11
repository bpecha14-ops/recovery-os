import fs from "node:fs";
import path from "node:path";
import type { PrismaClient } from "@prisma/client";

/**
 * Build-safe lazy Prisma singleton.
 *
 * Why lazy: `next build` evaluates route modules while collecting page data.
 * A top-level `new PrismaClient()` breaks the build in any environment where
 * the Prisma client was not generated yet (a fresh `bun install` without
 * `prisma generate` — e.g. a clean CI/deploy runner). With this module the
 * client is only constructed on the first real request.
 *
 * - Falls back to an absolute project-relative SQLite path when DATABASE_URL
 *   is unset, and creates the directory on demand, so a missing .env or a
 *   fresh checkout without db/ never crashes the app.
 * - If the client was never generated, `getDb()` rejects and callers degrade
 *   gracefully (the site itself keeps working).
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function resolveDbUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const dbDir = path.join(process.cwd(), "db");
  try {
    fs.mkdirSync(dbDir, { recursive: true });
  } catch {
    /* read-only fs or no permissions — let Prisma surface the error */
  }
  return `file:${path.join(dbDir, "custom.db")}`;
}

export async function getDb(): Promise<PrismaClient> {
  if (!globalForPrisma.prisma) {
    process.env.DATABASE_URL = resolveDbUrl();
    const { PrismaClient: Client } = await import("@prisma/client");
    globalForPrisma.prisma = new Client({ log: ["query"] });
  }
  return globalForPrisma.prisma;
}
