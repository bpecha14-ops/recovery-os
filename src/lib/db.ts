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
 * - Falls back to a project-relative SQLite file when DATABASE_URL is unset,
 *   so a missing .env never crashes the app.
 * - If the client was never generated, `getDb()` rejects and callers degrade
 *   gracefully (the site itself keeps working).
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export async function getDb(): Promise<PrismaClient> {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "file:./db/custom.db";
  }
  if (!globalForPrisma.prisma) {
    const { PrismaClient: Client } = await import("@prisma/client");
    globalForPrisma.prisma = new Client({ log: ["query"] });
  }
  return globalForPrisma.prisma;
}
