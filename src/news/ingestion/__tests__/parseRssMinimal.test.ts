import { describe, it, expect } from "vitest";
import { parseRssMinimal, stripHtml } from "../parseRssMinimal";

const FIXTURE = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title></title>
  <link>https://toggazeta.ru/</link>
  <description>Интернет издание Тогучинского района</description>
  <item>
    <title>В Тогучине выпал первый снег</title>
    <link>https://toggazeta.ru/v-toguchine-vypal-pervyj-sneg/</link>
    <pubDate>Thu, 15 Oct 2026 06:20:53 +0000</pubDate>
  </item>
  <item>
    <title><![CDATA[Тест &amp; кавычки]]></title>
    <link>https://toggazeta.ru/test/</link>
    <pubDate>invalid-date</pubDate>
  </item>
  <item>
    <title>Без ссылки</title>
  </item>
</channel>
</rss>`;

describe("parseRssMinimal", () => {
  it("extracts title, link, date; skips bad items", () => {
    const ch = parseRssMinimal(FIXTURE, "Тогучинская газета");
    expect(ch.sourceName).toContain("Тогучин");
    expect(ch.homeUrl).toBe("https://toggazeta.ru/");
    expect(ch.items).toHaveLength(2);
    expect(ch.items[0].title).toBe("В Тогучине выпал первый снег");
    expect(ch.items[0].originalUrl).toContain("v-toguchine");
    expect(ch.items[0].publishedAt).toMatch(/^2026-10-15/);
    expect(ch.items[1].title).toContain("Тест");
    expect(ch.items[1].publishedAt).toBeNull();
  });

  it("stripHtml removes tags", () => {
    expect(stripHtml("<p>Привет <b>мир</b></p>")).toBe("Привет мир");
  });
});
