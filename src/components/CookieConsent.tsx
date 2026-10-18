import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function CookieConsent() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem("cookie-consent");
    }
    return false;
  });

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", value);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-5 left-1/2 z-[9998] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-sm border p-6 shadow-2xl"
      style={{
        background: "var(--c-surface)",
        borderColor: "var(--c-line)",
      }}
    >
      <h2 className="font-display text-lg" style={{ color: "var(--c-ink)" }}>
        {t("cookie.title")}
      </h2>
      <p
        className="mt-2 text-[0.9rem] leading-relaxed"
        style={{ color: "var(--c-ink-soft)" }}
      >
        {t("cookie.text")}
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => decide("declined")}
          className="btn btn-outline flex-1"
        >
          {t("cookie.decline")}
        </button>
        <button
          onClick={() => decide("accepted")}
          className="btn btn-primary flex-1"
        >
          {t("cookie.accept")}
        </button>
      </div>
    </div>
  );
}
