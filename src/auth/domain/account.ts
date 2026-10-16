/**
 * Account model H5 — structure for future OAuth.
 * No provider secrets; guest remains default.
 */

export type AccountMode = "guest" | "registered_pending";

export interface AccountState {
  mode: AccountMode;
  displayName: string | null;
  /** Placeholder until real OAuth */
  provider: "none" | "oauth_pending";
  note: string;
}

export function getAccountState(displayName: string | null): AccountState {
  return {
    mode: "guest",
    displayName,
    provider: "none",
    note: "OAuth (Google/Yandex/…) подключается после секретов владельца. Сейчас только гость.",
  };
}
