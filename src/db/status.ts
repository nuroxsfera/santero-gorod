import { getDatabaseUrl, isDatabaseConfigured } from "./config";

export type DbStatus =
  | { configured: false; connected: false; message: string }
  | { configured: true; connected: boolean; message: string; latencyMs?: number };

/**
 * Lightweight connectivity probe. Does not require `pg` at build time:
 * uses dynamic import only when URL is present.
 */
export async function probeDatabase(): Promise<DbStatus> {
  if (!isDatabaseConfigured()) {
    return {
      configured: false,
      connected: false,
      message: "DATABASE_URL not set — using in-memory stores",
    };
  }

  const url = getDatabaseUrl()!;
  const started = Date.now();
  try {
    // Dynamic import so CI build works without DATABASE_URL / native binding issues in edge
    const { default: pg } = await import("pg");
    const client = new pg.Client({
      connectionString: url,
      connectionTimeoutMillis: 4000,
      ssl: url.includes("sslmode=require") || url.includes("neon.tech")
        ? { rejectUnauthorized: false }
        : undefined,
    });
    await client.connect();
    await client.query("SELECT 1");
    await client.end();
    return {
      configured: true,
      connected: true,
      message: "Postgres reachable",
      latencyMs: Date.now() - started,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "connection failed";
    return {
      configured: true,
      connected: false,
      message: msg,
      latencyMs: Date.now() - started,
    };
  }
}
