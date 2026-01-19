# CLAUDE.md

This document provides guidance for AI assistants working with the kzuraw.com codebase.

## Project Overview

This is a personal blog/portfolio website for Krzysztof Żuraw built with **Astro**. The site features blog posts about TypeScript, React, Python, and fullstack development, spanning from 2016 to present.

- **Site URL**: https://kzuraw.com
- **Deployment**: Vercel (serverless)
- **Content**: 97+ blog posts in Markdown format

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Astro 5 |
| Language | TypeScript 5.9 (strict mode) |
| Styling | Vanilla CSS with CSS variables |
| Package Manager | pnpm 10 |
| Node Version | 22 (see `.nvmrc`) |
| Deployment | Vercel |

## Directory Structure

```
src/
├── pages/              # Astro page routes
│   ├── index.astro     # Homepage
│   ├── writing/        # Blog routes
│   │   ├── index.astro       # Blog archive
│   │   └── [...slug].astro   # Dynamic post pages
│   ├── 404.astro       # Error page
│   ├── rss.xml.ts      # RSS feed
│   └── robots.txt.ts   # Robots.txt
├── content/
│   ├── config.ts       # Content schema (uses rssSchema)
│   └── writing/        # Markdown blog posts
├── layouts/
│   └── layout.astro    # Base HTML layout with slots
├── components/
│   ├── nav.astro       # Navigation menu
│   ├── meta.astro      # SEO meta tags
│   └── link.astro      # Link wrapper
├── helpers/            # Utility functions
│   ├── get-writings-by-year.ts
│   ├── get-latest-writing.ts
│   └── sort-writings-by-date.ts
├── styles/
│   └── global.css      # Minimal CSS framework
└── assets/             # Blog post images
```

## Common Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build (includes type checking)
pnpm lint         # Run Astro type checking
pnpm preview      # Preview production build
pnpm post-create  # Scaffold a new blog post
```

## Blog Post Format

Posts are Markdown files in `src/content/writing/` with YAML frontmatter:

```yaml
---
title: "Post Title"
description: Optional description for SEO
pubDate: 2025-01-15T12:00:00Z
slug: 2025/url-slug-here
source:                          # Optional, for cross-posted content
  url: https://original-source.com/post
  title: "Original Title"
---

Content in Markdown...
```

**Naming convention**: `YYYY-MM-DD-slug.md`

**URL structure**: `/writing/{slug}` (e.g., `/writing/2025/branded-types`)

## Code Conventions

### TypeScript

- Strict mode enabled via `astro/tsconfigs/strict`
- Path alias: `@/*` maps to `src/*`
- Use explicit types for function parameters and return values

### Astro Components

- Layout uses named slots: `meta`, `header`, `content`, `footer`
- Components use TypeScript interfaces for props
- Import components using the `@/` path alias

### CSS

- Minimal design philosophy
- Single global stylesheet (`src/styles/global.css`)
- CSS variables for colors and theming
- Max content width: 65ch for readability

## Pre-commit Hooks

The project uses Husky + lint-staged. On commit:

1. **Prettier**: Formats all files
2. **cSpell**: Spell-checks JS, TS, JSX, TSX, MD files (English + Polish)
3. **sort-package-json**: Keeps package.json sorted
4. **dictionary.txt**: Auto-sorted custom words

If spell-check fails, add words to `dictionary.txt` (will be auto-sorted on commit).

## Key Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.ts` | Astro + Vercel adapter config |
| `tsconfig.json` | TypeScript with path aliases |
| `cspell.config.js` | Spell-checking (EN + PL) |
| `lint-staged.config.js` | Pre-commit hook tasks |
| `prettier.config.js` | Code formatting rules |

## Important Patterns

### Content Collection API

```typescript
import { getCollection } from "astro:content";

const posts = await getCollection("writing");
```

### Static Path Generation

```typescript
export async function getStaticPaths() {
  const posts = await getCollection("writing");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}
```

### Layout Slots

```astro
<Layout>
  <Meta slot="meta" title="..." />
  <Fragment slot="header">...</Fragment>
  <Fragment slot="content">...</Fragment>
  <Fragment slot="footer">...</Fragment>
</Layout>
```

## Dependencies to Note

- `@astrojs/rss` - RSS feed generation
- `@astrojs/sitemap` - Automatic sitemap
- `@vercel/speed-insights` - Performance monitoring
- `@lucide/astro` - Icon components
- `sharp` - Image optimization

## Development Guidelines

1. **Run type checking** before committing: `pnpm lint`
2. **Images** go in `src/assets/` and are referenced in Markdown
3. **New blog posts**: Use `pnpm post-create` to scaffold
4. **Spell-check errors**: Add technical terms to `dictionary.txt`
5. **Keep changes minimal**: Avoid over-engineering, focus on the task
