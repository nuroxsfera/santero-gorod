/**
 * Database config — Horizon 1.
 * Neon/Postgres when DATABASE_URL is set; otherwise not configured.
 */

export function getDatabaseUrl(): string | null {
  const url = process.env.DATABASE_URL?.trim();
  return url && url.length > 0 ? url : null;
}

export function isDatabaseConfigured(): boolean {
  return getDatabaseUrl() !== null;
}
