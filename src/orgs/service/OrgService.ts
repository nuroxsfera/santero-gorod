import { InMemoryOrgRepository } from "../repository/InMemoryOrgRepository";
import type { OrgQuery } from "../domain/types";

export class OrgService {
  constructor(private readonly repo = new InMemoryOrgRepository()) {}
  list(query: OrgQuery) {
    return this.repo.list(query);
  }
}

let singleton: OrgService | null = null;
export function getOrgService() {
  if (!singleton) singleton = new OrgService();
  return singleton;
}
