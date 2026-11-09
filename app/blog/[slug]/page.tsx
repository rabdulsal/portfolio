import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogShell from '@/components/custom/BlogShell';
import { Markdown } from '@/lib/markdown';
import {
  SITE_URL, absoluteImage, formatDate, getAllPosts, getPost, postUrl,
} from '@/lib/blog';

// Only slugs that exist at build time are served; everything else is a 404.
export const dynamicParams = false;

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

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

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
      </article>

      {/* "<" escaped so post text can never close the script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </BlogShell>
  );
}
