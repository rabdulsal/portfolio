import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogShell from '@/components/custom/BlogShell';
import { Markdown } from '@/lib/markdown';
import {
  SITE_URL, absoluteImage, formatDate, getAllPosts, getPost, postUrl,
} from '@/lib/blog';

// Production: only slugs that exist at build time are served; everything else is a 404.
// Dev: slugs render on demand, so a newly staged draft previews without restarting the server.
// Drafts still 404 in production — getPost() only sees published posts there.
export const dynamicParams = process.env.NODE_ENV !== 'production';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const image = absoluteImage(post.socialImage) || absoluteImage(post.featuredImage);
  return {
    title: `${post.title} | Rashad Salaam`,
    description: post.excerpt,
    keywords: post.seoKeywords,
    authors: [{ name: post.author }],
    alternates: { canonical: postUrl(post.slug) },
    robots: post.status === 'draft' ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: postUrl(post.slug),
      publishedTime: post.publishedAt || undefined,
      authors: [post.author],
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: post.title,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

// Global closing footer for published posts. Blurbs rotate across posts:
// the pick is a stable hash of the slug, so a given post always shows the
// same blurb while the set as a whole rotates. Add a blurb here to extend
// the rotation; there is one place to change the wording later.
const FOOTER_CTAS = [
  {
    label: 'Free guide',
    title: 'When customers ask AI who to hire',
    body: 'AI search answers the question before your website gets a click. This short guide covers what changed, the four-step loop, and a weekly checklist to get picked.',
    href: '/aeo',
    linkText: 'Get the free guide →',
  },
  {
    label: 'Fractional cybersecurity',
    title: 'Someone whose job is to think about how systems fail',
    body: 'If your business runs on systems like the ones in these posts, and you do not have someone whose job is to think about how they fail, I do that work on a fractional basis. Security reviews, incident readiness, and the boring controls that keep a bad day from becoming a bad quarter.',
    href: '/book',
    linkText: 'Book a call →',
  },
];

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const cta =
    FOOTER_CTAS[
      [...post.slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % FOOTER_CTAS.length
    ];

  const image = absoluteImage(post.featuredImage);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt || undefined,
    author: { '@type': 'Person', name: post.author, url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Salaam Solutions LLC', url: SITE_URL },
    mainEntityOfPage: postUrl(post.slug),
    image: image ? [image] : undefined,
    keywords: post.seoKeywords || undefined,
  };

  return (
    <BlogShell>
      <article className="max-w-3xl mx-auto px-6 pt-12">
        <Link
          href="/blog/"
          className="font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-white"
        >
          ← All posts
        </Link>

        <p className="mt-10 font-mono text-[11px] tracking-widest uppercase text-orange">
          {post.series ? `${post.series}${post.seriesNumber ? ` · No. ${post.seriesNumber}` : ''}` : 'Blog'}
          {post.status === 'draft' && ' · DRAFT (dev only)'}
        </p>
        <h1 className="mt-3 font-display text-3xl md:text-5xl font-semibold leading-tight text-white">
          {post.title}
        </h1>
        <p className="mt-5 font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
          {post.author} · {formatDate(post.publishedAt)} · {post.readMinutes} min read
        </p>

        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage}
            alt=""
            className="mt-10 w-full rounded-xl border border-white/10"
          />
        )}

        <div className="mt-10">
          <Markdown source={post.body} />
        </div>

        {post.status === 'published' && (
          <aside className="mt-14 mb-4 border-t border-white/10 pt-8">
            <p className="font-mono text-[11px] tracking-widest uppercase text-orange">
              {cta.label}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white">
              {cta.title}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{cta.body}</p>
            {cta.href.startsWith('http') ? (
              <a
                href={cta.href}
                className="mt-5 inline-block font-mono text-xs tracking-widest uppercase text-orange hover:text-white"
              >
                {cta.linkText}
              </a>
            ) : (
              <Link
                href={cta.href}
                className="mt-5 inline-block font-mono text-xs tracking-widest uppercase text-orange hover:text-white"
              >
                {cta.linkText}
              </Link>
            )}
          </aside>
        )}
      </article>

      {/* "<" escaped so post text can never close the script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </BlogShell>
  );
}
