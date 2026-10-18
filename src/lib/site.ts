/**
 * Verified firm details, centralized.
 *
 * These values are the single source of truth for static (non-CMS) facts used
 * in SEO, structured data, and the footer. They mirror the records seeded into
 * Supabase (`supabase-migration.sql`) and the existing JSON-LD, so nothing here
 * is invented — it is de-duplicated from what the app already declares.
 *
 * Dynamic content (hero, practice areas, team, stats, testimonials) still comes
 * from Supabase at runtime and is NOT duplicated here.
 */

export const SITE_URL = "https://aabiskarlaw.com.np";
export const SITE_NAME = "Aabiskar Law Chamber";

export const FIRM = {
  name: SITE_NAME,
  tagline: "Trusted Legal Counsel in Pokhara",
  description:
    "Aabiskar Law Chamber is a law firm in Pokhara, Nepal. Led by Adv. Hari Prasad Pandit, we provide legal services in criminal, property, family, corporate, banking, and cyber law.",
  phone: "+9779856032810",
  phoneDisplay: "+977 9856032810",
  email: "pandithari912@gmail.com",
  whatsapp: "https://wa.me/9779856032810",
  facebook: "https://facebook.com/advhari.pandit",
  address: {
    street: "Rastra Bank Chowk",
    city: "Pokhara",
    district: "Kaski",
    province: "Gandaki Province",
    country: "Nepal",
  },
  geo: { latitude: "28.2096", longitude: "83.9855" },
  /** Office hours — kept in sync with the `site_config` record in Supabase. */
  officeHours: {
    weekdays: "10:00 AM – 5:00 PM",
    saturday: "Closed",
    note: "Consultations outside these hours are available by appointment only.",
  },
  /** Representative office location shown on the embedded map. */
  mapQuery: "Rastra Bank Chowk, Pokhara, Kaski, Nepal",
} as const;

/** Full postal address as a single line (for structured data). */
export const FIRM_ADDRESS_LINE = `${FIRM.address.street}, ${FIRM.address.city}, ${FIRM.address.district}, ${FIRM.address.province}, ${FIRM.address.country}`;
