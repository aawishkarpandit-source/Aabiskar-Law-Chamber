# Aabiskar Law Chamber Website

A modern, full-stack website for Aabiskar Law Chamber, a law firm in Pokhara, Nepal. Built with React, TypeScript, Supabase, and Tailwind CSS.

## Live Site

**https://aabiskarlaw.com.np**

## Overview

A premium, editorial marketing site for a real legal practice. The visual direction — spacious
layouts, restrained navy/gold palette, refined serif display type (Newsreader) with a clean sans
body (Inter), and subtle motion — is inspired by high-end legal templates while remaining an
original, firm-specific design.

All business logic is preserved: every page reads from Supabase, the contact form writes to the
database, and all existing routes, anchors, and SEO URLs continue to work.

## Features

- **5 Pages**: Home, About, Practice Areas, Team, Contact (+ 404)
- **Database-Driven Content**: hero, intro, features, stats, practice areas, team, testimonials, and site config load from Supabase at runtime
- **Dark / Light Mode**: toggle with preference persisted in `localStorage`
- **Design System**: tokenized colors, typography, spacing, buttons, and form states in `src/index.css`
- **Subtle Motion**: `framer-motion` scroll reveals that respect `prefers-reduced-motion`
- **Contact Form**: validated, spam-protected (honeypot), writes to `contact_submissions`
- **SEO**: per-page titles, descriptions, canonical URLs, Open Graph, Twitter cards, and JSON-LD structured data
- **Accessible**: keyboard navigation, visible focus states, labelled inputs, `aria-*` attributes, reduced-motion support
- **Responsive**: mobile (320px+), tablet, laptop, and large desktop

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19 + TypeScript |
| **Build** | Vite + Tailwind CSS v4 |
| **Routing** | React Router DOM v7 |
| **Backend** | Supabase (Postgres) |
| **Animations** | Framer Motion |
| **SEO** | react-helmet-async |
| **Hosting** | Vercel (auto-deploy from `main`) |

## Project Structure

```
/
├── public/
│   ├── static/assets/        → brand, portraits, imagery
│   ├── robots.txt
│   ├── sitemap.xml
│   └── og-image.png
├── src/
│   ├── index.html            → Vite entry
│   ├── main.tsx              → providers (Helmet, Router)
│   ├── App.tsx               → routes (lazy-loaded)
│   ├── index.css             → Tailwind v4 + design tokens
│   ├── lib/                  → supabase client, queries, site constants, icon resolver
│   ├── hooks/                → useTheme, useData
│   ├── types/                → shared TypeScript interfaces
│   ├── components/           → Navbar, Footer, SEO, Reveal, PageHeader, Feedback, Icons
│   └── pages/                → Home, About, Services, Team, Contact, NotFound
├── supabase-migration.sql    → full schema + seed data (source of truth)
├── vercel.json               → SPA rewrites + security headers
└── README.md
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in Supabase credentials
cp .env.example .env
# Edit .env with your Supabase URL and anon key

# 3. Run the DB migration in the Supabase SQL Editor (supabase-migration.sql)

# 4. Start dev server
npm run dev

# 5. Production build (typecheck + bundle)
npm run build
```

## Pages & Routes

| Route | Page | Data Source |
|-------|------|-------------|
| `/` | Home | Supabase (hero, intro, why-choose-us, CTA, stats, practice areas, team, testimonials) |
| `/about` | About | Supabase (about, stats, team) |
| `/services` | Practice Areas | Supabase (`practice_areas`, anchored per id) |
| `/team` | Team | Supabase (`team_members`) |
| `/contact` | Contact | Supabase (`site_config`, `contact_submissions`) |

## Data Flow

Dynamic content is fetched from Supabase at runtime via `src/lib/queries.ts`:

- `getSiteConfig()` — global site configuration
- `getNavItems()` — navigation links
- `getHeroContent()` / `getIntroContent()` / `getFeaturesContent()`
- `getAboutContent()` / `getWhyChooseUsContent()` / `getCTAContent()`
- `getStats()` — homepage statistics
- `getPracticeAreas()` / `getPracticeAreaById()`
- `getTeamMembers()` / `getSeniorMembers()` / `getAssociates()`
- `getTestimonials()`
- `submitContactForm()` — contact form insert

Static firm facts (address, phone, email, office hours, social links) used for SEO, structured
data, and the footer are centralized in `src/lib/site.ts` and mirror the seeded `site_config`
record — they are not duplicated in components.

## Editing Content

All editable content lives in Supabase; no source-code edits are needed:

- **Practice areas** → `practice_areas` table
- **Team members** → `team_members` table
- **Testimonials** → `testimonials` table
- **Stats** → `stats` table
- **Site config / hero / intro / CTA** → `site_config` table

## Environment Variables

Required in `.env`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> `VITE_*` values are exposed to client-side code. Only publish values meant to be public
> (the Supabase URL and anon key). All privileged operations must stay server-side.

## Development

```bash
npm run dev     # Start Vite dev server
npm run build   # TypeScript check + production build
npm run preview # Preview production build locally
npm run lint    # Run ESLint
```

## Design Tokens

Colors, typography, and component states are defined as CSS custom properties in
`src/index.css`, exposed to Tailwind through `@theme inline`:

- **Canvas / surface**: warm paper (light) → deep navy (dark)
- **Ink**: `#12203a` (light) → `#e9e4d9` (dark)
- **Accent (gold)**: `#a67c2e` (light) → `#d8b36a` (dark)
- **Brand navy**: `#0a192f`
- **Display type**: Newsreader · **Body type**: Inter

## License

MIT
