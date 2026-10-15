import { describe, it, expect } from "vitest";
import { InMemoryNewsRepository } from "../repository/InMemoryNewsRepository";
import { DEMO_ARTICLES } from "../data/demo";

const MOSCOW_ID = "0c5b2444-70a0-4932-980c-b4ed0d6f2ee5";

describe("InMemoryNewsRepository feed", () => {
  const repo = new InMemoryNewsRepository(DEMO_ARTICLES);

  it("marks feed as demo", async () => {
    const res = await repo.getFeed({ limit: 50 });
    expect(res.isDemo).toBe(true);
    expect(res.items.every((a) => a.isDemo)).toBe(true);
  });

  it("city feedMode returns moscow + federal", async () => {
    const res = await repo.getFeed({
      feedMode: "city",
      localityId: MOSCOW_ID,
      regionId: "RU-MOW",
      limit: 50,
    });
    expect(res.items.length).toBeGreaterThan(0);
    const ids = res.items.map((a) => a.id);
    expect(ids.some((id) => id.startsWith("demo-msk"))).toBe(true);
    expect(ids.some((id) => id.startsWith("demo-federal"))).toBe(true);
    expect(ids.some((id) => id.includes("kazan"))).toBe(false);
  });

  it("federal feedMode only federal", async () => {
    const res = await repo.getFeed({ feedMode: "federal", limit: 50 });
    expect(res.items.every((a) => a.geo.scope === "federal")).toBe(true);
  });

  it("category filter works", async () => {
    const res = await repo.getFeed({ categoryId: "sport", limit: 50 });
    expect(res.items.every((a) => a.categoryId === "sport")).toBe(true);
  });

  it("text search works", async () => {
    const res = await repo.getFeed({ query: "вело", limit: 50 });
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items.some((a) => a.title.toLowerCase().includes("вело"))).toBe(true);
  });

  it("sorts by publishedAt desc", async () => {
    const res = await repo.getFeed({ limit: 50 });
    for (let i = 1; i < res.items.length; i++) {
      expect(res.items[i - 1].publishedAt >= res.items[i].publishedAt).toBe(true);
    }
  });

  it("getById returns article", async () => {
    const a = await repo.getById("demo-msk-1");
    expect(a?.title).toBeTruthy();
    expect(a?.isDemo).toBe(true);
  });

  it("getById missing returns null", async () => {
    expect(await repo.getById("no-such-id")).toBeNull();
  });
});
