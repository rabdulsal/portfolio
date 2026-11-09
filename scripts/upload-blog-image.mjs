#!/usr/bin/env node
/**
 * Upload a blog image to Cloudinary (signed upload) and print the URL to paste into a post.
 *
 *   node scripts/upload-blog-image.mjs <file> [public-id-slug] [--env /path/to/.env]
 *
 * Needs CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, read from the
 * environment, then ./.env.local, then the optional --env file. Secrets are never printed.
 * The image lands in the "blog/" folder and the printed URL uses f_auto,q_auto so Cloudinary
 * serves the best format. res.cloudinary.com is already allowed by the site CSP.
 */
import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { basename, extname } from 'path';

const args = process.argv.slice(2);
const envIdx = args.indexOf('--env');
const envFile = envIdx >= 0 ? args.splice(envIdx, 2)[1] : null;
const [file, slugArg] = args;
if (!file) { console.error('usage: upload-blog-image.mjs <file> [public-id-slug] [--env path]'); process.exit(1); }

for (const f of ['.env.local', envFile].filter(Boolean)) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    const i = line.indexOf('=');
    if (i > 0 && !line.startsWith('#')) {
      const k = line.slice(0, i).trim();
      if (!process.env[k]) process.env[k] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
    }
  }
}
const cloud = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const key = process.env.CLOUDINARY_API_KEY;
const secret = process.env.CLOUDINARY_API_SECRET;
if (!cloud || !key || !secret) {
  console.error('Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET (try --env ../RedditScout/.env)');
  process.exit(1);
}

const publicId = (slugArg || basename(file, extname(file))).toLowerCase().replace(/[^a-z0-9-]+/g, '-');
const params = { folder: 'blog', public_id: publicId, overwrite: 'true', timestamp: String(Math.floor(Date.now() / 1000)) };
const toSign = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join('&');
const signature = createHash('sha1').update(toSign + secret).digest('hex');

const form = new FormData();
form.append('file', new Blob([readFileSync(file)]), basename(file));
Object.entries({ ...params, api_key: key, signature }).forEach(([k, v]) => form.append(k, v));

const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: 'POST', body: form });
const j = await res.json();
if (!res.ok) { console.error('Upload failed:', j.error?.message || res.status); process.exit(1); }
console.log(`${j.width}x${j.height}, ${j.bytes} bytes`);
console.log('Use in front matter / markdown:');
console.log(`https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${j.public_id}`);
