/**
 * Horizon 1 auth model: guest only.
 * No accounts, passwords, or OAuth. Stable anonymous id for local features.
 */

const STORAGE_KEY = "santero.guest.v1";

export interface GuestSession {
  id: string;
  createdAt: string;
  displayName: string | null;
}

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getOrCreateGuestSession(): GuestSession {
  if (typeof window === "undefined") {
    return { id: "server", createdAt: new Date().toISOString(), displayName: null };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GuestSession;
      if (parsed?.id) return parsed;
    }
  } catch {
    /* ignore */
  }
  const session: GuestSession = {
    id: randomId(),
    createdAt: new Date().toISOString(),
    displayName: null,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
  return session;
}

export function setGuestDisplayName(name: string | null): GuestSession {
  const s = getOrCreateGuestSession();
  const next = { ...s, displayName: name?.trim() || null };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }
  return next;
}
