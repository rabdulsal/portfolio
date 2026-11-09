import type { MetadataRoute } from 'next';
import { SITE_URL, getAllPosts, postUrl } from '@/lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().filter((p) => p.status === 'published');
  return [
    { url: `${SITE_URL}/` },
    ...(posts.length ? [{ url: `${SITE_URL}/blog/` }] : []),
    ...posts.map((p) => ({ url: postUrl(p.slug), lastModified: p.publishedAt })),
  ];
}
