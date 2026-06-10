# Aabiskar Law Chamber Website

A modern, full-stack website for Aabiskar Law Chamber, a premier law firm in Pokhara, Nepal. Built with React, TypeScript, Supabase, and Tailwind CSS.

## Live Site

**https://aabiskar-law-chamber.vercel.app**

## Features

- **5 Pages**: Home, About, Practice Areas, Team, Contact
- **Database Backend**: Supabase for dynamic content management
- **Dark/Light Mode**: Toggle with preference saved in localStorage
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **SEO Optimized**: Meta tags, Open Graph, JSON-LD structured data
- **Performance**: Lazy loading, code splitting, optimized builds
- **Contact Form**: Supabase integration with validation
- **Cookie Consent**: GDPR-compliant cookie banner
- **Scroll Animations**: Framer Motion-based reveal animations

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19 + TypeScript 6 |
| **Build** | Vite 8 + Tailwind CSS v4 |
| **Routing** | React Router DOM v7 |
| **Backend** | Supabase (Postgres + Storage) |
| **Animations** | Framer Motion |
| **SEO** | react-helmet-async |
| **Hosting** | Vercel (auto-deploy from `main`) |

## Project Structure

```
/
├── public/                → Static assets (brand, icons, images)
├── src/
│   ├── App.tsx            → All routes, lazy-loaded
│   ├── main.tsx           → Entry point
│   ├── index.css          → Tailwind v4 + theme tokens
│   ├── data/              → Hardcoded static site text
│   ├── lib/               → Supabase queries, utils
│   ├── hooks/             → Theme, data fetching
│   ├── components/        → Layout, Navbar, Footer, etc.
│   ├── pages/             → 6 page components (lazy-loaded)
│   └── types/             → TypeScript interfaces
├── supabase-migration.sql → Full schema + seed data
├── .env.example
├── vercel.json
├── README.md
└── LICENSE
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in Supabase credentials
cp .env.example .env
# Edit .env with your Supabase URL and anon key

# 3. Run DB migration in Supabase SQL Editor (supabase-migration.sql)

# 4. Start dev server
npm run dev

# 5. Build for production
npm run build
```

## Pages & Routes

| Route | Page | Data Source |
|-------|------|-------------|
| `/` | Home | Supabase (stats, hero, features) + static text |
| `/about` | About | Supabase (about, stats) |
| `/services` | Practice Areas | Supabase (practice_areas) |
| `/team` | Team | Supabase (team_members) |
| `/contact` | Contact | Supabase (site_config, contact_submissions) |

## Data Flow

All dynamic content is fetched from Supabase at runtime. Static site text is hardcoded in components or fetched from the `site_config` table.

### Dynamic queries in `src/lib/queries.ts`:

- `getSiteConfig()` — global site configuration
- `getNavItems()` — navigation links
- `getHeroContent()` — homepage hero section
- `getIntroContent()` — homepage intro section
- `getFeaturesContent()` — homepage features
- `getAboutContent()` — about section content
- `getWhyChooseUsContent()` — why choose us section
- `getCTAContent()` — call to action section
- `getStats()` — homepage statistics
- `getPracticeAreas()` — all practice areas
- `getTeamMembers()` — all team members
- `getTestimonials()` — client testimonials
- `submitContactForm()` — contact form submission

## Adding Content

### New Practice Area

1. Insert into Supabase `practice_areas` table

### New Team Member

1. Insert into Supabase `team_members` table

### New Testimonial

1. Insert into Supabase `testimonials` table

### Update Site Config

1. Update the `site_config` table in Supabase

## Environment Variables

Required in `.env`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Optional:

```
VITE_GA4_ID=G-XXXXXXXXXX
```

## Development

```bash
npm run dev     # Start Vite dev server
npm run build   # TypeScript check + production build
npm run preview # Preview production build locally
npm run lint    # Run ESLint
```

## Color Scheme

- **Primary (Navy)**: `#0a192f`
- **Accent (Gold)**: `#c5a059`
- **Light Gray**: `#f4f4f4`
- **White**: `#ffffff`

## License

MIT