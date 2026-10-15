/**
 * Minimal RSS 2.0 parse: title, link, pubDate only.
 * Does not extract full HTML body or images (rights-safe default).
 */

export interface RssMetaItem {
  title: string;
  originalUrl: string;
  publishedAt: string | null;
  sourceName: string;
}

export interface RssMetaChannel {
  sourceName: string;
  homeUrl: string | null;
  items: RssMetaItem[];
}

function decodeXml(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function firstTag(block: string, tag: string): string | null {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(re);
  if (!m) return null;
  return decodeXml(m[1]);
}

function parseDate(raw: string | null): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

/** Strip tags from short description if ever needed — not used for storage by default. */
export function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function parseRssMinimal(xml: string, fallbackSourceName: string): RssMetaChannel {
  const channelMatch = xml.match(/<channel[\s\S]*?<\/channel>/i);
  const channel = channelMatch ? channelMatch[0] : xml;

  const channelTitle = firstTag(channel, "title");
  const channelLink = firstTag(channel, "link");
  const channelDesc = firstTag(channel, "description");

  const sourceName =
    (channelTitle && channelTitle.length > 0 ? channelTitle : null) ||
    (channelDesc && channelDesc.length > 0 ? channelDesc : null) ||
    fallbackSourceName;

  const items: RssMetaItem[] = [];
  const itemRe = /<item[\s\S]*?<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(channel)) !== null) {
    const block = m[0];
    const title = firstTag(block, "title");
    const link = firstTag(block, "link");
    if (!title || !link) continue;
    if (!/^https?:\/\//i.test(link)) continue;
    items.push({
      title,
      originalUrl: link,
      publishedAt: parseDate(firstTag(block, "pubDate")),
      sourceName,
    });
  }

  return {
    sourceName,
    homeUrl: channelLink && /^https?:\/\//i.test(channelLink) ? channelLink : null,
    items,
  };
}
