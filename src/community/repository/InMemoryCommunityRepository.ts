import type { CommunityPost } from "../domain/types";
import { PILOT_CITY } from "@/config/pilot";

const SEED: CommunityPost[] = [
  {
    id: "comm-1",
    title: "Пример объявления соседа (демо)",
    body: "UGC проходит модерацию. Это не опубликованный live-пост.",
    localityId: PILOT_CITY.localityId,
    status: "published",
    authorLabel: "Гость",
    createdAt: new Date().toISOString(),
    isDemo: true,
  },
];

export class InMemoryCommunityRepository {
  private posts = [...SEED];

  async listPublished(localityId?: string | null) {
    let items = this.posts.filter((p) => p.status === "published");
    if (localityId) items = items.filter((p) => p.localityId === localityId);
    return { items, isDemo: true as const };
  }
}
