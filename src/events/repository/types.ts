import type { CityEvent, EventListResult, EventQuery } from "../domain/types";

export interface EventRepository {
  list(query: EventQuery): Promise<EventListResult>;
  getById(id: string): Promise<CityEvent | null>;
}
