import React from 'react';

/**
 * Minimal, dependency-free Markdown renderer for blog posts.
 * - Emits React elements only (no dangerouslySetInnerHTML), so raw HTML in a post is rendered as text.
 * - Links are limited to http(s), mailto, site-relative and #anchors.
 * - Images are limited to site-relative paths and res.cloudinary.com, matching the CSP in netlify.toml.
 *   Anything else throws at build time instead of silently breaking in production.
 * - A single newline inside a paragraph renders as a line break.
 */

const IMG_OK = /^(\/(?!\/)|https:\/\/res\.cloudinary\.com\/)/;
const HREF_OK = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i;

const INLINE =
  /(`+)([\s\S]+?)\1|!\[([^\]]*)\]\(([^)\s]+)\)|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([\s\S]+?)\*\*|\*([^*\s][^*]*?)\*/g;

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function renderInline(text: string, kp: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = new RegExp(INLINE.source, 'g');
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${kp}-${i++}`;
    if (m[2] !== undefined) {
      out.push(
        <code
          key={key}
          className="font-mono text-[0.9em] rounded bg-white/10 px-1.5 py-0.5"
        >
          {m[2]}
        </code>
      );
    } else if (m[4] !== undefined) {
      if (!IMG_OK.test(m[4])) {
        throw new Error(
          `Blog image not allowed by CSP (use /path or res.cloudinary.com): ${m[4]}`
        );
      }
      out.push(
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={key}
          src={m[4]}
          alt={m[3]}
          loading="lazy"
          className="my-8 w-full rounded-xl border border-white/10"
        />
      );
    } else if (m[6] !== undefined) {
      const href = HREF_OK.test(m[6]) ? m[6] : '#';
      const external = /^https?:\/\//i.test(href);
      out.push(
        <a
          key={key}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-orange underline underline-offset-4 hover:text-orange/80"
        >
          {renderInline(m[5], key)}
        </a>
      );
    } else if (m[7] !== undefined) {
      out.push(
        <strong key={key} className="font-semibold text-white">
          {renderInline(m[7], key)}
        </strong>
      );
    } else if (m[8] !== undefined) {
      out.push(<em key={key}>{renderInline(m[8], key)}</em>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type Block =
  | { t: 'h'; level: 2 | 3 | 4; text: string }
  | { t: 'p'; text: string }
  | { t: 'list'; ordered: boolean; items: string[] }
  | { t: 'code'; text: string }
  | { t: 'quote'; text: string }
  | { t: 'hr' }
  | { t: 'table'; head: string[]; rows: string[][] };

const RE_HEADING = /^(#{1,4})\s+(.*)$/;
const RE_HR = /^(-{3,}|\*{3,})$/;
const RE_UL = /^[-*]\s+(.*)$/;
const RE_OL = /^\d+\.\s+(.*)$/;
const RE_TABLE_SEP = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/;

const splitRow = (line: string) =>
  line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

function startsBlock(line: string, next: string | undefined): boolean {
  return (
    RE_HEADING.test(line) ||
    RE_HR.test(line.trim()) ||
    RE_UL.test(line) ||
    RE_OL.test(line) ||
    line.startsWith('```') ||
    line.startsWith('>') ||
    (line.trim().startsWith('|') && next !== undefined && RE_TABLE_SEP.test(next.trim()))
  );
}

function parseBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (line.startsWith('```')) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) buf.push(lines[i++]);
      i++;
      blocks.push({ t: 'code', text: buf.join('\n') });
      continue;
    }
    const h = RE_HEADING.exec(line);
    if (h) {
      const level = Math.min(Math.max(h[1].length, 2), 4) as 2 | 3 | 4;
      blocks.push({ t: 'h', level, text: h[2].trim() });
      i++;
      continue;
    }
    if (RE_HR.test(line.trim())) { blocks.push({ t: 'hr' }); i++; continue; }

    if (line.trim().startsWith('|') && i + 1 < lines.length && RE_TABLE_SEP.test(lines[i + 1].trim())) {
      const head = splitRow(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(splitRow(lines[i++]));
      blocks.push({ t: 'table', head, rows });
      continue;
    }
    if (line.startsWith('>')) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) buf.push(lines[i++].replace(/^>\s?/, ''));
      blocks.push({ t: 'quote', text: buf.join('\n') });
      continue;
    }
    const isUl = RE_UL.test(line);
    const isOl = RE_OL.test(line);
    if (isUl || isOl) {
      const re = isUl ? RE_UL : RE_OL;
      const items: string[] = [];
      while (i < lines.length) {
        const mm = re.exec(lines[i]);
        if (mm) { items.push(mm[1]); i++; }
        else if (/^\s+\S/.test(lines[i]) && items.length) { items[items.length - 1] += ' ' + lines[i].trim(); i++; }
        else break;
      }
      blocks.push({ t: 'list', ordered: isOl, items });
      continue;
    }
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !(buf.length && startsBlock(lines[i], lines[i + 1]))) {
      buf.push(lines[i++]);
    }
    blocks.push({ t: 'p', text: buf.join('\n') });
  }
  return blocks;
}

function renderLines(text: string, kp: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  text.split('\n').forEach((ln, idx) => {
    if (idx > 0) out.push(<br key={`${kp}-br${idx}`} />);
    out.push(...renderInline(ln, `${kp}-l${idx}`));
  });
  return out;
}

export function Markdown({ source }: { source: string }) {
  const blocks = parseBlocks(source);
  return (
    <div>
      {blocks.map((b, n) => {
        const k = `b${n}`;
        switch (b.t) {
          case 'h': {
            const id = slugifyHeading(b.text);
            const cls =
              b.level === 2
                ? 'font-display text-2xl md:text-3xl font-semibold text-white mt-16 mb-5 scroll-mt-24'
                : b.level === 3
                ? 'font-display text-xl font-semibold text-white mt-12 mb-4 scroll-mt-24'
                : 'font-display text-lg font-semibold text-white mt-10 mb-3 scroll-mt-24';
            const Tag = (`h${b.level}`) as 'h2' | 'h3' | 'h4';
            return <Tag key={k} id={id} className={cls}>{renderInline(b.text, k)}</Tag>;
          }
          case 'p':
            return (
              <p key={k} className="text-[17px] leading-8 text-foreground/85 my-6">
                {renderLines(b.text, k)}
              </p>
            );
          case 'list': {
            const Tag = b.ordered ? 'ol' : 'ul';
            return (
              <Tag
                key={k}
                className={`my-6 pl-6 space-y-3 text-[17px] leading-8 text-foreground/85 ${
                  b.ordered ? 'list-decimal' : 'list-disc'
                } marker:text-orange`}
              >
                {b.items.map((it, j) => (
                  <li key={`${k}-${j}`}>{renderInline(it, `${k}-${j}`)}</li>
                ))}
              </Tag>
            );
          }
          case 'code':
            return (
              <pre
                key={k}
                className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-surface p-4 font-mono text-sm leading-6"
              >
                <code>{b.text}</code>
              </pre>
            );
          case 'quote':
            return (
              <blockquote
                key={k}
                className="my-6 border-l-2 border-orange pl-5 italic text-foreground/80"
              >
                {renderLines(b.text, k)}
              </blockquote>
            );
          case 'hr':
            return <hr key={k} className="my-10 border-white/10" />;
          case 'table':
            return (
              <div key={k} className="my-8 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    <tr>
                      {b.head.map((c, j) => (
                        <th key={j} className="px-4 py-3 font-medium">{renderInline(c, `${k}-h${j}`)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {b.rows.map((r, ri) => (
                      <tr key={ri}>
                        {r.map((c, ci) => (
                          <td key={ci} className="px-4 py-3 align-top text-foreground/85">
                            {renderInline(c, `${k}-${ri}-${ci}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
