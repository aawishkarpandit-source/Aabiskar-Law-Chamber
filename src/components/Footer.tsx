import { Link } from "react-router-dom";
import { FIRM } from "../lib/site";
import { ArrowUpRightIcon } from "./Icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

const practiceAreas = [
  { label: "Criminal Litigation", href: "/services#criminal-litigation" },
  { label: "Property & Land Law", href: "/services#property-law" },
  { label: "Family & Divorce", href: "/services#family-law" },
  { label: "Corporate Law", href: "/services#corporate-law" },
  { label: "Banking & Finance", href: "/services#banking-finance" },
  { label: "Cyber Law & IT", href: "/services#cyber-law" },
];

const contactItems = [
  {
    label: "Office",
    value: `${FIRM.address.street}, ${FIRM.address.city}`,
    href: undefined as string | undefined,
  },
  {
    label: "Phone",
    value: FIRM.phoneDisplay,
    href: `tel:${FIRM.phone}`,
  },
  {
    label: "Email",
    value: FIRM.email,
    href: `mailto:${FIRM.email}`,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="navy-band">
      <div className="container-page relative z-10 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="font-display text-2xl" style={{ color: "#fff" }}>
              Aabiskar Law Chamber
            </p>
            <p
              className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em]"
              style={{ color: "var(--c-gold)" }}
            >
              Legal Excellence · Pokhara
            </p>
            <p
              className="mt-6 max-w-sm text-[0.95rem] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              A law firm in Pokhara, Nepal, providing legal services in
              criminal, property, family, corporate, banking, and cyber law.
              Led by Adv. Hari Prasad Pandit.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={FIRM.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aabiskar Law Chamber on Facebook"
                className="btn btn-ghost-light !min-h-0 !px-4 !py-2 text-xs"
              >
                Facebook
              </a>
              <a
                href={FIRM.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="btn btn-ghost-light !min-h-0 !px-4 !py-2 text-xs"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h3
              className="text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--c-gold)" }}
            >
              Navigate
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-[0.92rem] transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.68)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Practice areas */}
          <nav aria-label="Practice areas" className="lg:col-span-3">
            <h3
              className="text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--c-gold)" }}
            >
              Practice Areas
            </h3>
            <ul className="mt-5 space-y-3">
              {practiceAreas.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="inline-flex items-center gap-1 text-[0.92rem] transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.68)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3
              className="text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--c-gold)" }}
            >
              Contact
            </h3>
            <ul className="mt-5 space-y-4">
              {contactItems.map((c) => (
                <li key={c.label}>
                  <span
                    className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {c.label}
                  </span>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="mt-1 inline-flex items-center gap-1 text-[0.95rem] transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.82)" }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span
                      className="mt-1 block text-[0.95rem]"
                      style={{ color: "rgba(255,255,255,0.82)" }}
                    >
                      {c.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="link-underline mt-6 inline-flex text-sm"
              style={{ color: "var(--c-gold)" }}
            >
              Book a consultation
              <ArrowUpRightIcon size={15} />
            </Link>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col gap-3 border-t pt-8 text-[0.82rem] sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <p>
            © {year} {FIRM.name}. All rights reserved.
          </p>
          <p>
            Pokhara, Kaski · Gandaki Province, Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
