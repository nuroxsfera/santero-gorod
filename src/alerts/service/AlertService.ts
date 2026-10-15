import type { AlertRepository } from "../repository/types";
import type { AlertListResult, AlertQuery, CityAlert } from "../domain/types";
import { InMemoryAlertRepository } from "../repository/InMemoryAlertRepository";

export class AlertService {
  constructor(private readonly repo: AlertRepository) {}

  list(query: AlertQuery): Promise<AlertListResult> {
    return this.repo.list(query);
  }

  getById(id: string): Promise<CityAlert | null> {
    return this.repo.getById(id);
  }
}

let singleton: AlertService | null = null;

export function getAlertService(): AlertService {
  if (!singleton) singleton = new AlertService(new InMemoryAlertRepository());
  return singleton;
}
