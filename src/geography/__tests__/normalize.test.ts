import { describe, it, expect } from "vitest";
import { normalizeSearchText, matchesQuery, levenshtein } from "../lib/normalize";

describe("normalizeSearchText", () => {
  it("lowercases and maps ё to е", () => {
    expect(normalizeSearchText("Орёл")).toBe("орел");
  });
  it("collapses spaces", () => {
    expect(normalizeSearchText("  Нижний   Новгород ")).toBe("нижний новгород");
  });
});

describe("matchesQuery", () => {
  it("exact match scores highest", () => {
    const r = matchesQuery("москва", [], "москва");
    expect(r.hit).toBe(true);
    expect(r.score).toBe(1000);
  });
  it("prefix match works", () => {
    const r = matchesQuery("санкт-петербург", [], "санкт");
    expect(r.hit).toBe(true);
    expect(r.score).toBeGreaterThanOrEqual(900);
  });
  it("alias match works", () => {
    const r = matchesQuery("санкт-петербург", ["Питер", "Петербург"], "питер");
    expect(r.hit).toBe(true);
  });
  it("miss returns no hit", () => {
    const r = matchesQuery("казань", [], "новосибирск");
    expect(r.hit).toBe(false);
  });
});

describe("levenshtein", () => {
  it("identical strings", () => {
    expect(levenshtein("а", "а")).toBe(0);
  });
  it("one edit", () => {
    expect(levenshtein("москва", "москаа")).toBe(1);
  });
});
