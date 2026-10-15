import { getNewsService } from "@/news";
import { getJobsService } from "@/jobs";
import { getPlaceService } from "@/places";

export type SearchHitKind = "news" | "job" | "place";

export interface SearchHit {
  kind: SearchHitKind;
  id: string;
  title: string;
  subtitle: string;
  isDemo: boolean;
}

export interface UniversalSearchResult {
  query: string;
  hits: SearchHit[];
  isDemo: boolean;
}

/**
 * Cross-module search v0 — client-side fan-out to existing services.
 * Not a full-text index; demo-aware.
 */
export async function universalSearch(params: {
  query: string;
  localityId?: string | null;
  regionId?: string | null;
  limitPerKind?: number;
}): Promise<UniversalSearchResult> {
  const q = params.query.trim();
  const limit = params.limitPerKind ?? 5;
  if (!q) {
    return { query: q, hits: [], isDemo: true };
  }

  const [news, jobs, places] = await Promise.all([
    getNewsService().getFeed({
      query: q,
      localityId: params.localityId ?? null,
      regionId: params.regionId ?? null,
      feedMode: "all",
      limit,
      offset: 0,
    }),
    getJobsService().getVacancies({
      query: q,
      localityId: params.localityId ?? null,
      regionId: params.regionId ?? null,
      limit,
      offset: 0,
    }),
    getPlaceService().search({
      query: q,
      localityId: params.localityId ?? null,
      limit,
      offset: 0,
    }),
  ]);

  const hits: SearchHit[] = [];

  for (const a of news.items) {
    hits.push({
      kind: "news",
      id: a.id,
      title: a.title,
      subtitle: a.sourceName || "Новость",
      isDemo: a.isDemo,
    });
  }
  for (const v of jobs.items) {
    hits.push({
      kind: "job",
      id: v.id,
      title: v.title,
      subtitle: v.employerName || "Вакансия",
      isDemo: v.isDemo,
    });
  }
  for (const p of places.items) {
    hits.push({
      kind: "place",
      id: p.id,
      title: p.name,
      subtitle: p.addressText || p.category,
      isDemo: p.isDemo,
    });
  }

  return {
    query: q,
    hits,
    isDemo: news.isDemo || jobs.isDemo || places.isDemo,
  };
}
