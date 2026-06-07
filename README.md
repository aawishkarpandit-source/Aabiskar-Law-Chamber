# Aabiskar Law Chamber Website

A modern, static website for Aabiskar Law Chamber, a premier law firm in Pokhara, Nepal. Built with vanilla HTML, CSS, and JavaScript. Deployed on Vercel.

## Live Site

**https://aabiskar-law-chamber.vercel.app**

## Features

- **5 Pages**: Home, About, Practice Areas, Team, Contact
- **Admin Panel**: Edit site content via GitHub API without touching code
- **Dark/Light Mode**: Toggle with preference saved in localStorage
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **SEO Optimized**: Meta tags, Open Graph, JSON-LD structured data
- **Performance**: Lazy CSS loading, content-visibility, skeleton loading states
- **Contact Form**: Formspree integration with validation and rate limiting
- **Cookie Consent**: GDPR-compliant cookie banner
- **Scroll Animations**: IntersectionObserver-based reveal animations

## Tech Stack

- Vanilla HTML, CSS, JS (no frameworks)
- Font Awesome 6 for icons
- Formspree for contact form
- Google Fonts (Playfair Display + Lato)
- GitHub API for admin content editing

## Architecture

```
src/
├── *.html              → All HTML pages (clean URLs)
├── info/               → JSON data files (all content)
│   ├── site.json       → Global config, nav, contact
│   ├── content.json    → Homepage sections
│   ├── stats.json      → Statistics
│   ├── team.json       → Team members
│   ├── services.json   → Practice areas
│   ├── testimonials.json → Client testimonials
│   └── faq.json        → FAQ items
├── components/         → navbar.html + footer.html
├── static/
│   ├── css/            → style.css, navbar.css, responsive.css
│   ├── js/             → 9 JS modules
│   └── assets/         → brand/, icons/, images/
├── admin.html          → Content admin panel
├── robots.txt
└── sitemap.xml
```

## Data Flow

1. `components.js` loads `site.json`, then injects navbar/footer HTML
2. `navigation.js` renders nav links from `site.json`
3. `main.js` detects which page and calls `data-loader.js` to render content
4. All content comes from JSON files in `/info/`

## Adding/Editing Content

### Option 1: Admin Panel
1. Go to `/admin`
2. Enter your GitHub Personal Access Token
3. Edit content in the web interface
4. Click Save to commit changes to GitHub

### Option 2: Edit JSON Files
1. Edit files in `src/info/`
2. Push to GitHub
3. Vercel auto-deploys

## Admin Panel Setup

1. Create a GitHub Personal Access Token (Settings → Developer settings → Personal access tokens)
2. Grant `repo` scope
3. Go to `/admin` on your site
4. Enter the token and repository name (e.g., `username/repo-name`)
5. Edit any JSON file through the admin interface

## Deployment

### Vercel
1. Connect your GitHub repo to Vercel
2. Vercel auto-deploys on every push to `main`
3. Build command: `cp -r src/* .` (configured in vercel.json)

### Manual
```bash
# Build
cp -r src/* .

# The root directory is now the site
```

## Color Scheme

- **Primary (Navy)**: `#0a192f`
- **Accent (Gold)**: `#c5a059`
- **Light Gray**: `#f4f4f4`
- **White**: `#ffffff`

## License

MIT
