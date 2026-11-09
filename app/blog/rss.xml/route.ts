import { SITE_URL, getAllPosts, postUrl } from '@/lib/blog';

export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const posts = getAllPosts().filter((p) => p.status === 'published');
  const items = posts
    .map(
      (p) => `<item>
<title>${esc(p.title)}</title>
<link>${postUrl(p.slug)}</link>
<guid isPermaLink="true">${postUrl(p.slug)}</guid>
<pubDate>${new Date(p.publishedAt + 'T12:00:00Z').toUTCString()}</pubDate>
<description>${esc(p.excerpt)}</description>
</item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Rashad Salaam</title>
<link>${SITE_URL}/blog/</link>
<atom:link href="${SITE_URL}/blog/rss.xml/" rel="self" type="application/rss+xml" />
<description>Agentic engineering, security, and the boring work that matters.</description>
<language>en-us</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
