import fs from "fs";
import path from "path";

export const SITE_URL = "https://www.rashadsalaam.com";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  seoKeywords: string;
  author: string;
  publishedAt: string; // YYYY-MM-DD, empty for drafts
  readMinutes: number;
  status: "draft" | "published";
  series?: string;
  seriesNumber?: number;
  linkedinPostId?: string;
  featuredImage?: string;
  socialImage?: string; // 1200x630 for link previews; falls back to featuredImage
  body: string;
}

function parseFrontMatter(
  raw: string,
  file: string,
): { data: Record<string, string>; body: string } {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(
    raw.replace(/\r\n/g, "\n"),
  );
  if (!m) throw new Error(`${file}: missing front matter`);
  const data: Record<string, string> = {};
  m[1].split("\n").forEach((line) => {
    const kv = /^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (!kv) return;
    let v = kv[2].trim();
    if (/^".*"$/.test(v)) v = v.slice(1, -1).replace(/\\"/g, '"');
    data[kv[1]] = v;
  });
  return { data, body: m[2].trim() };
}

/** Published posts must be complete: no leftover placeholders, valid date. Fails the build otherwise. */
function assertPublishable(p: Post, file: string) {
  const problems: string[] = [];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.publishedAt))
    problems.push("publishedAt must be YYYY-MM-DD");
  if (!p.title || !p.excerpt) problems.push("title and excerpt are required");
  if (
    /CONTACT_LINK|FEATURED_IMAGE|IMAGE_\d+/.test(
      p.body + ((p.featuredImage || "") + (p.socialImage || "")),
    )
  ) {
    problems.push(
      "placeholder (CONTACT_LINK / FEATURED_IMAGE / IMAGE_n) still present",
    );
  }
  if (problems.length)
    throw new Error(`${file} cannot be published: ${problems.join("; ")}`);
}

function loadAll(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, body } = parseFrontMatter(
        fs.readFileSync(path.join(BLOG_DIR, file), "utf8"),
        file,
      );
      const slug = data.slug || file.replace(/\.md$/, "");
      if (!/^[a-z0-9-]+$/.test(slug))
        throw new Error(`${file}: invalid slug "${slug}"`);
      const post: Post = {
        slug,
        title: data.title || "",
        excerpt: data.excerpt || "",
        seoKeywords: data.seoKeywords || "",
        author: data.author || "Rashad Salaam",
        publishedAt: data.publishedAt || "",
        readMinutes: Number(data.readMinutes) || 5,
        status: data.status === "published" ? "published" : "draft",
        series: data.series || undefined,
        seriesNumber: data.seriesNumber ? Number(data.seriesNumber) : undefined,
        linkedinPostId: data.linkedinPostId || undefined,
        featuredImage: data.featuredImage || undefined,
        socialImage: data.socialImage || undefined,
        body,
      };
      if (post.status === "published") assertPublishable(post, file);
      return post;
    });
}

/**
 * Production builds only ever see posts with status: published.
 * `next dev` also shows drafts so you can preview them locally.
 */
export function getAllPosts(): Post[] {
  const showDrafts = process.env.NODE_ENV !== "production";
  return loadAll()
    .filter((p) => showDrafts || p.status === "published")
    .sort((a, b) =>
      (b.publishedAt || "9999").localeCompare(a.publishedAt || "9999"),
    );
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export const postUrl = (slug: string) => `${SITE_URL}/blog/${slug}/`;

export function absoluteImage(img?: string): string | undefined {
  if (!img || /^[A-Z_]+$/.test(img)) return undefined; // placeholder
  return img.startsWith("/") ? `${SITE_URL}${img}` : img;
}

export function formatDate(iso: string): string {
  if (!iso) return "Draft";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
