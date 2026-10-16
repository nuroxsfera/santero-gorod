import type { ModerationItem, ModerationQuery } from "../domain/types";

const SEED: ModerationItem[] = [
  {
    id: "mod-demo-1",
    targetType: "news",
    targetId: "demo-seed",
    reason: "Пример очереди модерации (demo)",
    status: "pending",
    createdAt: new Date().toISOString(),
    decidedAt: null,
    isDemo: true,
  },
];

export class InMemoryModerationRepository {
  private items = [...SEED];

  async list(query: ModerationQuery): Promise<{
    items: ModerationItem[];
    total: number;
    isDemo: boolean;
  }> {
    let items = [...this.items];
    if (query.status && query.status !== "all") {
      items = items.filter((i) => i.status === query.status);
    }
    const limit = query.limit ?? 20;
    return {
      items: items.slice(0, limit),
      total: items.length,
      isDemo: true,
    };
  }
}
