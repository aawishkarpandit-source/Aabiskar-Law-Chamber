import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { ChevronUpIcon } from "./Icons";

/**
 * Two responsibilities:
 * 1. Reset scroll to the top whenever the route changes (SPA navigation).
 * 2. Show an accessible "back to top" button after the user scrolls down.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const [showButton, setShowButton] = useState(false);

  // Reset scroll on route change (but not on anchor/hash navigation).
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showButton) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("a11y.backToTop")}
      title={t("a11y.backToTop")}
      className="fixed bottom-6 right-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "var(--c-ink)",
        color: "var(--c-canvas)",
        borderColor: "var(--c-ink)",
      }}
    >
      <ChevronUpIcon size={20} />
    </button>
  );
}
