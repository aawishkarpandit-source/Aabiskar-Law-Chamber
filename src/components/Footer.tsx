import { Link } from "react-router-dom";
import { FIRM } from "../lib/site";
import { useLanguage } from "../hooks/useLanguage";
import { ArrowUpRightIcon } from "./Icons";

const quickLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.services", href: "/services" },
  { key: "nav.team", href: "/team" },
  { key: "nav.contact", href: "/contact" },
] as const;

const practiceAreas = [
  { key: "footer.areaCriminal", href: "/services#criminal-litigation" },
  { key: "footer.areaProperty", href: "/services#property-law" },
  { key: "footer.areaFamily", href: "/services#family-law" },
  { key: "footer.areaCorporate", href: "/services#corporate-law" },
  { key: "footer.areaBanking", href: "/services#banking-finance" },
  { key: "footer.areaCyber", href: "/services#cyber-law" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  const contactItems = [
    {
      label: t("footer.office"),
      value: `${FIRM.address.street}, ${FIRM.address.city}`,
      href: undefined as string | undefined,
    },
    {
      label: t("footer.phone"),
      value: FIRM.phoneDisplay,
      href: `tel:${FIRM.phone}`,
    },
    {
      label: t("footer.email"),
      value: FIRM.email,
      href: `mailto:${FIRM.email}`,
    },
  ];

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
              {t("footer.brandTagline")}
            </p>
            <p
              className="mt-6 max-w-sm text-[0.95rem] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              {t("footer.brandDesc")}
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
              {t("footer.navigate")}
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-[0.92rem] transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.68)" }}
                  >
                    {t(l.key)}
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
              {t("footer.practiceAreas")}
            </h3>
            <ul className="mt-5 space-y-3">
              {practiceAreas.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="inline-flex items-center gap-1 text-[0.92rem] transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.68)" }}
                  >
                    {t(l.key)}
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
              {t("footer.contact")}
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
              {t("footer.book")}
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
            © {year} {FIRM.name}. {t("footer.rights")}
          </p>
          <p>{t("footer.location")}</p>
        </div>
      </div>
    </footer>
  );
}
