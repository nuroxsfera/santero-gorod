import { InMemoryModerationRepository } from "../repository/InMemoryModerationRepository";
import type { ModerationQuery } from "../domain/types";

export class ModerationService {
  constructor(private readonly repo = new InMemoryModerationRepository()) {}

  list(query: ModerationQuery) {
    return this.repo.list(query);
  }
}

let singleton: ModerationService | null = null;

export function getModerationService(): ModerationService {
  if (!singleton) singleton = new ModerationService();
  return singleton;
}
