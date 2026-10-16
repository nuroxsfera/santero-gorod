import { describe, it, expect } from "vitest";
import { weatherCodeToRu } from "../service/openMeteo";

describe("weatherCodeToRu", () => {
  it("maps clear and rain", () => {
    expect(weatherCodeToRu(0)).toBe("Ясно");
    expect(weatherCodeToRu(61)).toBe("Дождь");
  });
});
