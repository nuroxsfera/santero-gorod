import { describe, it, expect } from "vitest";
import { parseRssMinimal } from "../ingestion/parseRssMinimal";
import { rssItemToArticle } from "../ingestion/fetchRssMeta";

const FIXTURE = `<?xml version="1.0"?>
<rss version="2.0"><channel>
<title>Test Source</title>
<link>https://example.com/</link>
<item>
  <title>Hello City</title>
  <link>https://example.com/a/1</link>
  <pubDate>Mon, 01 Jan 2024 12:00:00 GMT</pubDate>
</item>
</channel></rss>`;

describe("RSS metadata → article", () => {
  it("maps item with isDemo false", () => {
    const ch = parseRssMinimal(FIXTURE, "Fallback");
    expect(ch.items).toHaveLength(1);
    const article = rssItemToArticle(ch.items[0], "test");
    expect(article.isDemo).toBe(false);
    expect(article.originalUrl).toBe("https://example.com/a/1");
    expect(article.title).toBe("Hello City");
  });
});
