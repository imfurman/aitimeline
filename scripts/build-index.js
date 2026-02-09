#!/usr/bin/env node

/**
 * build-index.js
 * Scans all .md files in /events/, parses frontmatter, and generates:
 * - js/events.json
 * - /event/<slug>/index.html static pages for indexing
 * - sitemap.xml with root + per-event URLs
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const EVENTS_DIR = path.join(ROOT_DIR, 'events');
const OUTPUT_FILE = path.join(ROOT_DIR, 'js', 'events.json');
const EVENT_PAGES_DIR = path.join(ROOT_DIR, 'event');
const SITEMAP_FILE = path.join(ROOT_DIR, 'sitemap.xml');
const SITE_URL = (process.env.SITE_URL || 'https://aitimeline.live').replace(/\/+$/, '');

const CATEGORY_LABELS = {
  'model-release': 'Model Release',
  'architecture': 'Architecture',
  'product-launch': 'Product Launch',
  'research': 'Research',
  'open-source': 'Open Source',
  'regulation': 'Regulation',
  'milestone': 'Milestone',
  'tool': 'Tool',
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugFromFile(file) {
  return file.replace(/\.md$/i, '');
}

function toIsoDate(value) {
  return String(value || '').trim().slice(0, 10);
}

function formatHumanDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const kvMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!kvMatch) continue;

    const key = kvMatch[1];
    let value = kvMatch[2].trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      frontmatter[key] = value
        .slice(1, -1)
        .split(',')
        .map(part => part.trim().replace(/^"(.*)"$/, '$1'))
        .filter(Boolean);
      continue;
    }

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return frontmatter;
}

function parseFrontmatterLinks(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return [];

  const links = [];
  const pattern = /-\s*label:\s*"([^"]+)"\s*\n\s*url:\s*"([^"]+)"/g;
  let linkMatch;

  while ((linkMatch = pattern.exec(match[1])) !== null) {
    links.push({ label: linkMatch[1], url: linkMatch[2] });
  }

  return links;
}

function extractBodyMarkdown(content) {
  return content.replace(/^---[\s\S]*?---\n*/, '').trim();
}

function renderInlineMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return html;
}

function markdownToHtml(markdown) {
  const lines = markdown.split('\n');
  const chunks = [];
  let paragraph = [];
  let listItems = [];

  function flushParagraph() {
    if (paragraph.length === 0) return;
    chunks.push(`<p>${renderInlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (listItems.length === 0) return;
    chunks.push(`<ul>${listItems.map(item => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`);
    listItems = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const h3 = line.match(/^###\s+(.+)/);
    if (h3) {
      flushParagraph();
      flushList();
      chunks.push(`<h3>${renderInlineMarkdown(h3[1])}</h3>`);
      continue;
    }

    const h2 = line.match(/^##\s+(.+)/);
    if (h2) {
      flushParagraph();
      flushList();
      chunks.push(`<h2>${renderInlineMarkdown(h2[1])}</h2>`);
      continue;
    }

    const h1 = line.match(/^#\s+(.+)/);
    if (h1) {
      flushParagraph();
      flushList();
      chunks.push(`<h1>${renderInlineMarkdown(h1[1])}</h1>`);
      continue;
    }

    const listMatch = line.match(/^- (.+)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return chunks.join('\n');
}

function eventPageHtml(event) {
  const title = `${event.title} (${event.date.slice(0, 4)}) | AI Timeline`;
  const description = event.short;
  const absoluteUrl = new URL(event.permalink, `${SITE_URL}/`).href;
  const categoryLabel = CATEGORY_LABELS[event.category] || event.category;
  const tagsText = event.tags.length > 0 ? event.tags.join(', ') : '';
  const linksHtml = event.links.length > 0
    ? `
      <section class="event-source-links" aria-label="Source links">
        <h2>Sources</h2>
        <ul>
          ${event.links.map(link => `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a></li>`).join('')}
        </ul>
      </section>`
    : '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: event.title,
    description: description,
    datePublished: event.date,
    dateModified: event.date,
    mainEntityOfPage: absoluteUrl,
    author: {
      '@type': 'Organization',
      name: 'AI Timeline Contributors',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Timeline',
    },
    articleSection: categoryLabel,
    keywords: tagsText,
  };

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${escapeHtml(absoluteUrl)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(absoluteUrl)}">
  <meta property="og:site_name" content="AI Timeline">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <link rel="stylesheet" href="../../css/style.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="event-page">
  <header class="hero event-hero">
    <div class="hero-content">
      <a class="event-back-link" href="../../">Back to timeline</a>
      <h1>${escapeHtml(event.title)}</h1>
      <p>${escapeHtml(event.short)}</p>
      <p class="event-page-meta"><time datetime="${event.date}">${escapeHtml(formatHumanDate(event.date))}</time> <span>${escapeHtml(categoryLabel)}</span></p>
    </div>
  </header>
  <main class="event-main">
    <article class="event-article">
      ${event.bodyHtml}
      ${linksHtml}
    </article>
  </main>
  <footer class="site-footer" role="contentinfo">
    <p>AI Timeline is a public, continuously updated reference for key AI model launches, research milestones, and product breakthroughs.</p>
    <div class="footer-links">
      <a href="../../">Timeline</a>
      <a href="../../CONTRIBUTING.md">Contribute</a>
      <a href="../../sitemap.xml">Sitemap</a>
    </div>
  </footer>
</body>
</html>
`;
}

function writeEventPages(events) {
  fs.rmSync(EVENT_PAGES_DIR, { recursive: true, force: true });
  fs.mkdirSync(EVENT_PAGES_DIR, { recursive: true });

  for (const event of events) {
    const eventDir = path.join(EVENT_PAGES_DIR, event.slug);
    fs.mkdirSync(eventDir, { recursive: true });
    fs.writeFileSync(path.join(eventDir, 'index.html'), eventPageHtml(event));
  }
}

function buildSitemap(events) {
  const today = new Date().toISOString().slice(0, 10);
  const rootUrl = `${SITE_URL}/`;
  const urls = [
    `  <url>
    <loc>${rootUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
    ...events.map(event => {
      const loc = new URL(event.permalink, `${SITE_URL}/`).href;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${event.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  fs.writeFileSync(SITEMAP_FILE, xml);
}

function buildIndex() {
  if (!fs.existsSync(EVENTS_DIR)) {
    console.error(`Events directory not found: ${EVENTS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(EVENTS_DIR).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} event files`);

  const events = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(EVENTS_DIR, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter) {
      console.warn(`Warning: No frontmatter found in ${file}, skipping`);
      continue;
    }

    if (!frontmatter.title || !frontmatter.date || !frontmatter.category || !frontmatter.short) {
      console.warn(`Warning: Missing required fields in ${file}, skipping`);
      continue;
    }

    const slug = slugFromFile(file);
    const date = toIsoDate(frontmatter.date);

    events.push({
      file,
      slug,
      permalink: `event/${slug}/`,
      title: frontmatter.title,
      date,
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      short: frontmatter.short,
      links: parseFrontmatterLinks(content),
      bodyHtml: markdownToHtml(extractBodyMarkdown(content)),
    });
  }

  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const indexPayload = events.map(event => ({
    file: event.file,
    slug: event.slug,
    permalink: event.permalink,
    title: event.title,
    date: event.date,
    category: event.category,
    tags: event.tags,
    short: event.short,
  }));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(indexPayload, null, 2));
  writeEventPages(events);
  buildSitemap(events);

  console.log(`Generated ${OUTPUT_FILE} with ${events.length} events`);
  console.log(`Generated static event pages in ${path.relative(ROOT_DIR, EVENT_PAGES_DIR)}/`);
  console.log(`Generated ${path.relative(ROOT_DIR, SITEMAP_FILE)}`);
}

buildIndex();
