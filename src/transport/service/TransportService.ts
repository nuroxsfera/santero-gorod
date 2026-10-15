import type { TransportCatalogResult, TransportQuery } from "../domain/types";
import { InMemoryTransportRepository } from "../repository/InMemoryTransportRepository";

export class TransportService {
  constructor(private readonly repo = new InMemoryTransportRepository()) {}

  catalog(query: TransportQuery): Promise<TransportCatalogResult> {
    return this.repo.catalog(query);
  }
}

let singleton: TransportService | null = null;

export function getTransportService(): TransportService {
  if (!singleton) singleton = new TransportService();
  return singleton;
}
