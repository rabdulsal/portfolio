import HomeClient, { type LatestPost } from '@/components/custom/HomeClient';
import { formatDate, getAllPosts } from '@/lib/blog';

export const revalidate = 300;

// Only site-relative or Cloudinary images, matching the CSP; placeholders are dropped.
const safeImage = (img?: string) =>
  img && /^(\/(?!\/)|https:\/\/res\.cloudinary\.com\/|https:\/\/lh3\.googleusercontent\.com\/)/.test(img) ? img : undefined;

export default async function Page() {
  const p = (await getAllPosts())[0];
  const latestPost: LatestPost | null = p
    ? {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        dateLabel: formatDate(p.publishedAt),
        readMinutes: p.readMinutes,
        series: p.series,
        seriesNumber: p.seriesNumber,
        image: safeImage(p.featuredImage),
      }
    : null;
  return <HomeClient latestPost={latestPost} />;
}
