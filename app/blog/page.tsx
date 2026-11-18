import type { Metadata } from 'next';
import Link from 'next/link';
import BlogShell from '@/components/custom/BlogShell';
import BlogHero from '@/components/custom/BlogHero';
import { SITE_URL, formatDate, getAllPosts, type Post } from '@/lib/blog';

export function generateMetadata(): Metadata {
  const hasPosts = getAllPosts().length > 0;
  return {
    title: 'Blog | Rashad Salaam',
    description:
      'Writing on agentic engineering and AI security: what broke, why, and what to check on Monday.',
    alternates: {
      canonical: `${SITE_URL}/blog/`,
      types: { 'application/rss+xml': `${SITE_URL}/blog/rss.xml/` },
    },
    // Keep an empty index out of search results until the first post ships.
    robots: hasPosts ? undefined : { index: false, follow: true },
  };
}

// Only images the CSP allows (site-relative or Cloudinary); placeholders are ignored.
const thumbOf = (img?: string) =>
  img && /^(\/(?!\/)|https:\/\/res\.cloudinary\.com\/)/.test(img) ? img : undefined;

function PostRow({ p }: { p: Post }) {
  return (
    <article className="py-8 flex flex-col-reverse sm:flex-row gap-6 sm:gap-8 sm:items-start">
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
          {p.series ? `${p.series}${p.seriesNumber ? ` · No. ${p.seriesNumber}` : ''} · ` : ''}
          {formatDate(p.publishedAt)} · {p.readMinutes} min read
          {p.status === 'draft' && <span className="text-orange"> · DRAFT (dev only)</span>}
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-white">
          <Link href={`/blog/${p.slug}/`} className="hover:text-orange transition-colors">
            {p.title}
          </Link>
        </h2>
        <p className="mt-3 text-foreground/80 leading-7">{p.excerpt}</p>
      </div>
      {thumbOf(p.featuredImage) && (
        <Link href={`/blog/${p.slug}/`} className="shrink-0 block sm:w-44" tabIndex={-1} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbOf(p.featuredImage)}
            alt=""
            loading="lazy"
            className="w-full aspect-square object-cover rounded-lg border border-white/10"
          />
        </Link>
      )}
    </article>
  );
}

export default function BlogIndex() {
  const posts = getAllPosts();
  // Drafts are dev-only (see lib/blog.ts). Keep them out of the published
  // list so a staged post can never masquerade as published.
  const published = posts.filter((p) => p.status === 'published');
  const drafts = posts.filter((p) => p.status === 'draft');
  return (
    <BlogShell>
      <BlogHero />
      <div className="max-w-3xl mx-auto px-6 pt-4">
        <div className="divide-y divide-white/10 border-t border-white/10">
          {posts.length === 0 && (
            <p className="py-10 text-muted-foreground">The first post is on its way.</p>
          )}
          {published.map((p) => (
            <PostRow key={p.slug} p={p} />
          ))}
        </div>
        {drafts.length > 0 && (
          <div className="mt-12">
            <p className="font-mono text-[11px] tracking-widest uppercase text-orange">
              Staged drafts — dev only, not published
            </p>
            <div className="divide-y divide-white/10 border-t border-orange/30 mt-4">
              {drafts.map((p) => (
                <PostRow key={p.slug} p={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </BlogShell>
  );
}
