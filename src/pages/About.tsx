import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import PageHeader from "../components/PageHeader";
import { Skeleton } from "../components/Feedback";
import { SITE_URL } from "../lib/site";
import { useLanguage } from "../hooks/useLanguage";
import { ArrowRightIcon } from "../components/Icons";
import { getAboutContent, getStats, getTeamMembers } from "../lib/queries";
import type { AboutContent, Stat, TeamMember } from "../types";

const values = [
  { key: "about.integrity", descKey: "about.integrityDesc" },
  { key: "about.excellence", descKey: "about.excellenceDesc" },
  { key: "about.compassion", descKey: "about.compassionDesc" },
] as const;

const aboutLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Aabiskar Law Chamber",
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "LegalService",
    "@id": `${SITE_URL}/#organization`,
    name: "Aabiskar Law Chamber",
    url: SITE_URL,
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${SITE_URL}/about`,
    },
  ],
};

export default function About() {
  const { t } = useLanguage();
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const [aboutData, statsData, teamData] = await Promise.all([
          getAboutContent(),
          getStats(),
          getTeamMembers(),
        ]);
        if (cancelled) return;
        setAbout(aboutData);
        setStats(statsData);
        setTeam(teamData);
      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <SEO
        title="About"
        description="Learn about Aabiskar Law Chamber — legal counsel in Pokhara, Nepal, led by Adv. Hari Prasad Pandit, serving clients across Kaski and beyond."
        path="/about"
        jsonLd={[aboutLd, breadcrumbLd]}
      />

      <PageHeader
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        subtitle={t("about.subtitle")}
      />

      {/* About content */}
      {loading ? (
        <section className="container-page py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="aspect-[4/3] w-full" />
          </div>
        </section>
      ) : (
        about && (
          <section className="container-page py-20 sm:py-24">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <p className="eyebrow">{about.label}</p>
                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.9rem]">
                  {about.title}
                </h2>
                <div className="mt-6 space-y-5">
                  {about.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-[1.02rem] leading-relaxed"
                      style={{ color: "var(--c-ink-soft)" }}
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div
                  className="aspect-[4/3] overflow-hidden rounded-sm border"
                  style={{ borderColor: "var(--c-line)" }}
                >
                  <img
                    src="/static/assets/images/about.jpg"
                    alt="Legal documents and consultation"
                    width={800}
                    height={534}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </section>
        )
      )}

      {/* Stats */}
      {!loading && stats.length > 0 && (
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
      )}

      {/* Values */}
      <section className="container-page py-20 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t("about.valuesEyebrow")}</p>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.9rem]">
            {t("about.valuesHeading")}
          </h2>
        </Reveal>
        <div
          className="mt-14 grid gap-px overflow-hidden border sm:grid-cols-3"
          style={{ background: "var(--c-line)", borderColor: "var(--c-line)" }}
        >
          {values.map((v, i) => (
            <Reveal key={v.key} delay={i * 0.08}>
              <div className="h-full p-8" style={{ background: "var(--c-canvas)" }}>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--c-accent)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl">{t(v.key)}</h3>
                <p
                  className="mt-3 text-[0.96rem] leading-relaxed"
                  style={{ color: "var(--c-ink-soft)" }}
                >
                  {t(v.descKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      {!loading && team.length > 0 && (
        <section
          className="border-t"
          style={{
            borderColor: "var(--c-line)",
            background: "var(--c-raised)",
          }}
        >
          <div className="container-page py-20 sm:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <p className="eyebrow">{t("about.teamEyebrow")}</p>
                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.9rem]">
                  {t("about.teamHeading")}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link to="/team" className="link-underline">
                  {t("about.teamAll")}
                  <ArrowRightIcon size={16} />
                </Link>
              </Reveal>
            </div>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {team.slice(0, 3).map((member, i) => (
                <Reveal key={member.id} delay={i * 0.08}>
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
                          className="flex h-full w-full items-center justify-center text-xs"
                          style={{ color: "var(--c-ink-faint)" }}
                        >
                          AL
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

      {/* CTA */}
      <section className="navy-band">
        <div className="container-page relative z-10 py-20 text-center sm:py-24">
          <Reveal>
            <h2
              className="mx-auto max-w-2xl text-3xl sm:text-4xl"
              style={{ color: "#fff" }}
            >
              {t("about.ctaTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <Link to="/contact" className="btn btn-gold">
                {t("about.ctaButton")}
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
