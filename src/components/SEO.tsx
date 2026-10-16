import { Helmet } from "react-helmet-async";
import { SITE_URL, SITE_NAME } from "../lib/site";

interface SEOProps {
  /** Page title (without the site-name suffix; it is appended automatically). */
  title: string;
  description: string;
  /** Path for the canonical + og:url, e.g. "/about". Use "/" for home. */
  path: string;
  /** Optional JSON-LD object(s) to inject as structured data. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Defaults to true. Set false for noindex pages (e.g. 404). */
  index?: boolean;
}

const ogImage = `${SITE_URL}/og-image.png`;

/**
 * Centralized per-page <head> management: title, description, canonical,
 * Open Graph, Twitter cards, robots, and JSON-LD structured data.
 *
 * Consolidates what was previously copy-pasted across every page component.
 */
export default function SEO({
  title,
  description,
  path,
  jsonLd,
  index = true,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const canonical = path === "/" ? `${SITE_URL}/` : url;

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={
          index
            ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
            : "noindex, nofollow"
        }
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdArray.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </Helmet>
  );
}
