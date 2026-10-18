import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import { SunIcon, MoonIcon, CloseIcon } from "./Icons";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.services", href: "/services" },
  { key: "nav.team", href: "/team" },
  { key: "nav.contact", href: "/contact" },
] as const;

/** Theme-aware wordmark used in the header (scales + adapts to light/dark). */
function Wordmark() {
  return (
    <span className="flex items-baseline gap-2">
      <span
        className="font-display text-[1.35rem] leading-none tracking-tight"
        style={{ color: "var(--c-ink)" }}
      >
        Aabiskar
      </span>
      <span
        className="hidden text-[0.62rem] font-semibold uppercase tracking-[0.28em] sm:inline"
        style={{ color: "var(--c-accent)" }}
      >
        Law Chamber
      </span>
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--c-canvas) 88%, transparent)"
          : "var(--c-canvas)",
        backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        borderBottom: `1px solid ${
          scrolled ? "var(--c-line)" : "transparent"
        }`,
        transition: "background-color .3s ease, border-color .3s ease",
      }}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label="Aabiskar Law Chamber — home" className="shrink-0">
          <Wordmark />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="relative py-1 text-[0.9rem] font-medium transition-colors duration-200"
              style={{
                color: isActive(link.href)
                  ? "var(--c-ink)"
                  : "var(--c-ink-soft)",
              }}
            >
              {t(link.key)}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left transition-transform duration-300"
                style={{
                  background: "var(--c-accent)",
                  transform: isActive(link.href) ? "scaleX(1)" : "scaleX(0)",
                }}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language toggle */}
          <div
            role="group"
            aria-label={t("nav.langGroup")}
            className="hidden items-center rounded-full border sm:flex"
            style={{ borderColor: "var(--c-line)" }}
          >
            {(["en", "ne"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className="px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200"
                style={{
                  color:
                    lang === code
                      ? "var(--c-canvas)"
                      : "var(--c-ink-soft)",
                  background:
                    lang === code ? "var(--c-accent)" : "transparent",
                  borderRadius: "9999px",
                }}
              >
                {code === "en" ? "EN" : "नेपाली"}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? t("theme.light") : t("theme.dark")}
            aria-pressed={isDark}
            className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200"
            style={{ borderColor: "var(--c-line)", color: "var(--c-ink-soft)" }}
          >
            {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          <Link to="/contact" className="btn btn-primary hidden sm:inline-flex">
            {t("cta.book")}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border lg:hidden"
            style={{ borderColor: "var(--c-line)", color: "var(--c-ink)" }}
          >
            {isOpen ? (
              <CloseIcon size={20} />
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!isOpen}
        className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t lg:hidden"
        style={{
          background: "var(--c-canvas)",
          borderColor: "var(--c-line)",
        }}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col py-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="flex items-center justify-between border-b py-4 font-display text-2xl"
              style={{
                borderColor: "var(--c-line)",
                color: isActive(link.href)
                  ? "var(--c-accent)"
                  : "var(--c-ink)",
              }}
            >
              <span>{t(link.key)}</span>
              <span
                className="text-xs font-sans"
                style={{ color: "var(--c-ink-faint)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="btn btn-primary mt-8 w-full"
          >
            {t("cta.book")}
          </Link>

          {/* Language toggle (mobile) */}
          <div
            role="group"
            aria-label={t("nav.langGroup")}
            className="mt-6 flex items-center gap-2"
          >
            {(["en", "ne"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className="flex-1 rounded-full border px-4 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200"
                style={{
                  borderColor:
                    lang === code ? "var(--c-accent)" : "var(--c-line)",
                  color:
                    lang === code ? "var(--c-canvas)" : "var(--c-ink-soft)",
                  background:
                    lang === code ? "var(--c-accent)" : "transparent",
                }}
              >
                {code === "en" ? "English" : "नेपाली"}
              </button>
            ))}
          </div>
          <p
            className="mt-8 text-sm"
            style={{ color: "var(--c-ink-faint)" }}
          >
            Rastra Bank Chowk, Pokhara
            <br />
            <a href="tel:+9779856032810" style={{ color: "var(--c-accent)" }}>
              +977 9856032810
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
