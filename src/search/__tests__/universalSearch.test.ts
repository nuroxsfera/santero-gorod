import { describe, it, expect } from "vitest";
import { universalSearch } from "../universalSearch";
import { PILOT_CITY } from "@/config/pilot";

describe("universalSearch v0", () => {
  it("returns hits or empty for query", async () => {
    const res = await universalSearch({
      query: "зоопарк",
      localityId: PILOT_CITY.localityId,
    });
    expect(res.query).toBe("зоопарк");
    expect(res.hits.some((h) => h.kind === "place")).toBe(true);
  });

  it("empty query yields no hits", async () => {
    const res = await universalSearch({ query: "  " });
    expect(res.hits).toHaveLength(0);
  });
});
