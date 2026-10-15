import type { AlertListResult, AlertQuery, CityAlert } from "../domain/types";

export interface AlertRepository {
  list(query: AlertQuery): Promise<AlertListResult>;
  getById(id: string): Promise<CityAlert | null>;
}
