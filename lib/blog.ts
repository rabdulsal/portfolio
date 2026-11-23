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

function loadFilePosts(): Post[] {
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
 * Sheet-driven posts (added 2026-11-23): the Content Master Sheet Blog tab is
 * a live source for Portfolio posts, read server-side with the same API key
 * the Boss Man API uses (GOOGLE_SHEET_API_KEY + GOOGLE_SHEET_ID, set in
 * Netlify and in .env.local). Column layout is the post-site map:
 * A status, B post, C persona, D title, E slug, F excerpt, G site, H body,
 * I seo_keywords, J image_url, K extra images, L notes, M published_url,
 * N week_of. Only rows with site "Portfolio" are taken. Any failure (missing
 * env, network, bad payload) returns [] so the file posts always still work.
 * Production fetches are cached by Next for SHEET_REVALIDATE seconds, so
 * flipping a row to "published" goes live without a deploy; dev fetches are
 * uncached, so drafts appear locally as soon as they are staged.
 */
const SHEET_REVALIDATE = 300;

async function loadSheetPosts(): Promise<Post[]> {
  const key = process.env.GOOGLE_SHEET_API_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!key || !sheetId) return [];
  try {
    const range = encodeURIComponent("Blog!A2:N300");
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${key}`;
    const init: RequestInit & { next?: { revalidate: number } } =
      process.env.NODE_ENV === "production"
        ? { next: { revalidate: SHEET_REVALIDATE } }
        : { cache: "no-store" };
    const res = await fetch(url, init);
    if (!res.ok) return [];
    const json = (await res.json()) as { values?: string[][] };
    const rows = json.values || [];
    const posts: Post[] = [];
    for (const row of rows) {
      const cell = (i: number) => (row[i] || "").trim();
      if (cell(6).toLowerCase() !== "portfolio") continue;
      const slug = cell(4);
      if (!/^[a-z0-9-]+$/.test(slug)) continue;
      const statusRaw = cell(0).toLowerCase();
      if (statusRaw !== "draft" && statusRaw !== "published") continue;
      const body = cell(7).replace(/^#\s+.*\n+/, "").trim();
      if (!cell(3) || !body) continue;
      const week = cell(13);
      const image = cell(9) || undefined;
      posts.push({
        slug,
        title: cell(3),
        excerpt: cell(5),
        seoKeywords: cell(8),
        author: "Rashad Salaam",
        publishedAt: /^\d{4}-\d{2}-\d{2}$/.test(week) ? week : "",
        readMinutes: Math.max(1, Math.ceil(body.split(/\s+/).length / 200)),
        status: statusRaw,
        featuredImage: image,
        socialImage: image,
        body,
      });
    }
    return posts;
  } catch {
    return [];
  }
}

/**
 * All posts from both sources. On a slug collision the sheet wins: the sheet
 * is the day-to-day working surface, the files are the archive.
 * Production only ever sees posts with status published; `next dev` also
 * shows drafts so you can preview them locally.
 */
export async function getAllPosts(): Promise<Post[]> {
  const bySlug = new Map<string, Post>();
  for (const p of loadFilePosts()) bySlug.set(p.slug, p);
  for (const p of await loadSheetPosts()) bySlug.set(p.slug, p);
  const showDrafts = process.env.NODE_ENV !== "production";
  return Array.from(bySlug.values())
    .filter((p) => showDrafts || p.status === "published")
    .sort((a, b) =>
      (b.publishedAt || "9999").localeCompare(a.publishedAt || "9999"),
    );
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getAllPosts()).find((p) => p.slug === slug);
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
