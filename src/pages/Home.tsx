import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import { Skeleton } from "../components/Feedback";
import { renderIcon } from "../lib/icons";
import { SITE_URL, FIRM, FIRM_ADDRESS_LINE } from "../lib/site";
import { useLanguage } from "../hooks/useLanguage";
import { ArrowRightIcon, ArrowUpRightIcon, QuoteIcon } from "../components/Icons";
import {
  getHeroContent,
  getIntroContent,
  getWhyChooseUsContent,
  getCTAContent,
  getStats,
  getPracticeAreas,
  getTeamMembers,
  getTestimonials,
} from "../lib/queries";
import type {
  HeroContent,
  IntroContent,
  WhyChooseUsContent,
  CTAContent,
  Stat,
  PracticeArea,
  TeamMember,
  Testimonial,
} from "../types";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${SITE_URL}/#organization`,
  name: FIRM.name,
  alternateName: "Aabiskar Law Chamber Pokhara",
  url: SITE_URL,
  logo: `${SITE_URL}/static/assets/brand/logo.svg`,
  description: FIRM.description,
  telephone: FIRM.phone,
  email: FIRM.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: FIRM.address.street,
    addressLocality: FIRM.address.city,
    addressRegion: FIRM.address.province,
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: FIRM.geo.latitude,
    longitude: FIRM.geo.longitude,
  },
  areaServed: { "@type": "Country", name: "Nepal" },
  sameAs: [FIRM.facebook, FIRM.whatsapp],
};

export default function Home() {
  const { lang, t } = useLanguage();
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [intro, setIntro] = useState<IntroContent | null>(null);
  const [why, setWhy] = useState<WhyChooseUsContent | null>(null);
  const [cta, setCta] = useState<CTAContent | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [areas, setAreas] = useState<PracticeArea[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const [
          heroData,
          introData,
          whyData,
          ctaData,
          statsData,
          areasData,
          teamData,
          testiData,
        ] = await Promise.all([
          getHeroContent(lang),
          getIntroContent(lang),
          getWhyChooseUsContent(lang),
          getCTAContent(lang),
          getStats(lang),
          getPracticeAreas(lang),
          getTeamMembers(lang),
          getTestimonials(lang),
        ]);
        if (cancelled) return;
        setHero(heroData);
        setIntro(introData);
        setWhy(whyData);
        setCta(ctaData);
        setStats(statsData);
        setAreas(areasData);
        setTeam(teamData.filter((m) => m.member_type === "senior"));
        setTestimonials(testiData);
      } catch (err) {
        console.error("Error fetching home data:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const selectedAreas = areas.slice(0, 4);

  return (
    <>
      <SEO
        title="Best Law Firm in Pokhara, Nepal"
        description={FIRM.description}
        path="/"
        jsonLd={organizationLd}
      />

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <div className="container-page relative z-10 grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">{hero?.badge ?? t("home.badge")}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem]">
                {hero?.titleLine1 ?? t("home.title1")}
                <br />
                <span style={{ color: "var(--c-accent)" }}>
                  {hero?.titleLine2 ?? t("home.title2")}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p
                className="mt-7 max-w-xl text-lg leading-relaxed"
                style={{ color: "var(--c-ink-soft)" }}
              >
                {hero?.subtitle ?? t("home.subtitle")}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/contact" className="btn btn-primary">
                  {hero?.ctaPrimary ?? t("cta.book")}
                  <ArrowRightIcon size={16} />
                </Link>
                <Link to="/services" className="btn btn-outline">
                  {hero?.ctaSecondary ?? t("nav.services")}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Editorial side panel */}
          <Reveal delay={0.2} className="lg:col-span-5">
            <div
              className="relative rounded-sm border p-8"
              style={{
                background: "var(--c-surface)",
                borderColor: "var(--c-line)",
              }}
            >
              <p
                className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--c-accent)" }}
              >
                Aabiskar Law Chamber
              </p>
              <p
                className="mt-5 font-display text-[1.6rem] leading-snug"
                style={{ color: "var(--c-ink)" }}
              >
                {t("home.tagline")}
              </p>
              <div
                className="my-7 h-px w-full"
                style={{ background: "var(--c-line)" }}
              />
              <dl className="space-y-4 text-[0.92rem]">
                <div className="flex justify-between gap-4">
                  <dt style={{ color: "var(--c-ink-faint)" }}>
                    {t("footer.office")}
                  </dt>
                  <dd
                    className="text-right"
                    style={{ color: "var(--c-ink)" }}
                  >
                    {FIRM.address.street}, {FIRM.address.city}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt style={{ color: "var(--c-ink-faint)" }}>
                    {t("footer.phone")}
                  </dt>
                  <dd style={{ color: "var(--c-ink)" }}>
                    <a
                      href={`tel:${FIRM.phone}`}
                      className="transition-colors hover:text-[color:var(--c-accent)]"
                    >
                      {FIRM.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt style={{ color: "var(--c-ink-faint)" }}>
                    {t("footer.email")}
                  </dt>
                  <dd style={{ color: "var(--c-ink)" }}>
                    <a
                      href={`mailto:${FIRM.email}`}
                      className="break-all transition-colors hover:text-[color:var(--c-accent)]"
                    >
                      {FIRM.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      {loading ? (
        <div className="container-page py-10">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </div>
      ) : stats.length > 0 ? (
        <section
          className="border-y"
          style={{
            borderColor: "var(--c-line)",
            background: "var(--c-surface)",
          }}
        >
          <div className="container-page grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.id}
                delay={i * 0.06}
                className="border-l px-6 first:border-l-0 lg:px-8"
              >
                <div
                  className="text-4xl font-medium sm:text-5xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--c-ink)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "var(--c-ink-soft)" }}
                >
                  {stat.label}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* ---------------- Intro ---------------- */}
      {intro && (
        <section className="container-page py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-2 lg:order-1">
              <p className="eyebrow">{intro.label}</p>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.9rem]">
                {intro.title}
              </h2>
              <div className="mt-6 space-y-5">
                {intro.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[1.02rem] leading-relaxed"
                    style={{ color: "var(--c-ink-soft)" }}
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}
              </div>
              <Link to="/about" className="link-underline mt-8 inline-flex">
                {t("home.learnMore")}
                <ArrowUpRightIcon size={16} />
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-sm border"
                style={{ borderColor: "var(--c-line)" }}
              >
                <img
                  src={intro.image}
                  alt={intro.imageAlt || "Legal consultation"}
                  width={600}
                  height={400}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(10,25,47,0.06)",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- Practice areas (selected) ---------------- */}
      {!loading && selectedAreas.length > 0 && (
        <section
          className="border-t"
          style={{ borderColor: "var(--c-line)", background: "var(--c-raised)" }}
        >
          <div className="container-page py-20 sm:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <p className="eyebrow">{t("home.practiceEyebrow")}</p>
                <h2 className="mt-5 max-w-xl text-3xl sm:text-4xl lg:text-[2.9rem]">
                  {t("home.practiceHeading")}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link to="/services" className="link-underline">
                  {t("home.practiceAll")}
                  <ArrowUpRightIcon size={16} />
                </Link>
              </Reveal>
            </div>

            <div className="mt-14 divide-y border-t">
              {selectedAreas.map((area, i) => (
                <Reveal key={area.id} delay={i * 0.05}>
                  <Link
                    to={`/services#${area.id}`}
                    className="group grid grid-cols-1 items-start gap-4 py-8 transition-colors sm:grid-cols-12 sm:gap-6"
                    style={{ borderColor: "var(--c-line)" }}
                  >
                    <span
                      className="text-sm sm:col-span-1"
                      style={{ color: "var(--c-ink-faint)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="sm:col-span-4">
                      <div className="flex items-center gap-3">
                        <span style={{ color: "var(--c-accent)" }}>
                          {renderIcon(area.icon, 22)}
                        </span>
                        <h3 className="text-xl transition-colors duration-200 group-hover:text-[color:var(--c-accent)]">
                          {area.title}
                        </h3>
                      </div>
                    </div>
                    <p
                      className="text-[0.98rem] leading-relaxed sm:col-span-6"
                      style={{ color: "var(--c-ink-soft)" }}
                    >
                      {area.description}
                    </p>
                    <span
                      className="hidden justify-end sm:col-span-1 sm:flex"
                      style={{ color: "var(--c-ink-faint)" }}
                    >
                      <ArrowUpRightIcon
                        size={20}
                        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Why choose us ---------------- */}
      {why && (
        <section className="container-page py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{why.label}</p>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.9rem]">
              {why.title}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border sm:grid-cols-3"
            style={{ background: "var(--c-line)", borderColor: "var(--c-line)" }}>
            {why.cards.map((card, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className="h-full p-8"
                  style={{ background: "var(--c-canvas)" }}
                >
                  <span style={{ color: "var(--c-accent)" }}>
                    {renderIcon(card.icon, 26)}
                  </span>
                  <h3 className="mt-6 text-xl">{card.title}</h3>
                  <p
                    className="mt-3 text-[0.96rem] leading-relaxed"
                    style={{ color: "var(--c-ink-soft)" }}
                  >
                    {card.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- Team preview ---------------- */}
      {!loading && team.length > 0 && (
        <section
          className="border-t"
          style={{ borderColor: "var(--c-line)", background: "var(--c-surface)" }}
        >
          <div className="container-page py-20 sm:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <p className="eyebrow">{t("home.teamEyebrow")}</p>
                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.9rem]">
                  {t("home.teamHeading")}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link to="/team" className="link-underline">
                  {t("home.teamAll")}
                  <ArrowUpRightIcon size={16} />
                </Link>
              </Reveal>
            </div>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:max-w-3xl">
              {team.slice(0, 2).map((member, i) => (
                <Reveal key={member.id} delay={i * 0.1}>
                  <div className="flex items-start gap-5">
                    <div
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-full border"
                      style={{ borderColor: "var(--c-line)" }}
                    >
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          width={80}
                          height={80}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center"
                          style={{ color: "var(--c-ink-faint)" }}
                        >
                          {renderIcon("balance", 28)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg">{member.name}</h3>
                      <p
                        className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: "var(--c-accent)" }}
                      >
                        {member.role}
                      </p>
                      {member.specialization && (
                        <p
                          className="mt-2 text-[0.92rem]"
                          style={{ color: "var(--c-ink-soft)" }}
                        >
                          {member.specialization}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Testimonials ---------------- */}
      {!loading && testimonials.length > 0 && (
        <section className="container-page py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{t("home.testiEyebrow")}</p>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.9rem]">
              {t("home.testiHeading")}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <figure
                  className="flex h-full flex-col rounded-sm border p-8"
                  style={{
                    background: "var(--c-surface)",
                    borderColor: "var(--c-line)",
                  }}
                >
                  <span style={{ color: "var(--c-accent)" }}>
                    <QuoteIcon size={28} />
                  </span>
                  <blockquote
                    className="mt-5 flex-1 text-[1rem] leading-relaxed"
                    style={{ color: "var(--c-ink-soft)" }}
                  >
                    {t.text}
                  </blockquote>
                  <figcaption className="mt-6 border-t pt-5" style={{ borderColor: "var(--c-line)" }}>
                    <div
                      className="font-display text-[1.05rem]"
                      style={{ color: "var(--c-ink)" }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="text-[0.78rem] uppercase tracking-[0.12em]"
                      style={{ color: "var(--c-ink-faint)" }}
                    >
                      {t.role}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- CTA ---------------- */}
      {cta && (
        <section className="navy-band">
          <div className="container-page relative z-10 py-20 text-center sm:py-24">
            <Reveal>
              <h2
                className="mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-[3rem]"
                style={{ color: "#fff" }}
              >
                {cta.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p
                className="mx-auto mt-5 max-w-xl text-lg"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {cta.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn btn-gold">
                  {cta.primaryBtn}
                  <ArrowRightIcon size={16} />
                </Link>
                <Link to="/services" className="btn btn-ghost-light">
                  {cta.secondaryBtn}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <p
                className="mt-10 text-[0.82rem] uppercase tracking-[0.14em]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {FIRM_ADDRESS_LINE}
              </p>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
