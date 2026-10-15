import type { EventRepository } from "../repository/types";
import type { CityEvent, EventListResult, EventQuery } from "../domain/types";
import { InMemoryEventRepository } from "../repository/InMemoryEventRepository";

export class EventService {
  constructor(private readonly repo: EventRepository) {}

  list(query: EventQuery): Promise<EventListResult> {
    return this.repo.list(query);
  }

  getById(id: string): Promise<CityEvent | null> {
    return this.repo.getById(id);
  }
}

let singleton: EventService | null = null;

export function getEventService(): EventService {
  if (!singleton) singleton = new EventService(new InMemoryEventRepository());
  return singleton;
}
