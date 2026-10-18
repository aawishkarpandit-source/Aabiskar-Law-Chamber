import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import PageHeader from "../components/PageHeader";
import { Skeleton } from "../components/Feedback";
import { renderIcon } from "../lib/icons";
import { SITE_URL } from "../lib/site";
import { useLanguage } from "../hooks/useLanguage";
import { ArrowRightIcon, PhoneIcon } from "../components/Icons";
import { getSeniorMembers, getAssociates } from "../lib/queries";
import type { TeamMember } from "../types";

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Team",
      item: `${SITE_URL}/team`,
    },
  ],
};

const isPhone = (v?: string | null) =>
  !!v && v.trim() !== "" && v !== "Coming Soon" && v !== "TBA";

function MemberCard({ member }: { member: TeamMember }) {
  const { t } = useLanguage();
  return (
    <div
      className="flex h-full flex-col rounded-sm border p-7"
      style={{ background: "var(--c-surface)", borderColor: "var(--c-line)" }}
    >
      <div className="flex items-center gap-4">
        <div
          className="h-24 w-24 shrink-0 overflow-hidden rounded-full border"
          style={{ borderColor: "var(--c-line)" }}
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ color: "var(--c-ink-faint)" }}
            >
              {renderIcon(member.member_type === "senior" ? "balance" : "people", 32)}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl">{member.name}</h3>
          <p
            className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--c-accent)" }}
          >
            {member.role}
          </p>
        </div>
      </div>

      <dl className="mt-6 space-y-3 border-t pt-5 text-[0.92rem]" style={{ borderColor: "var(--c-line)" }}>
        {member.specialization && (
          <div className="flex gap-3">
            <dt className="w-28 shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--c-ink-faint)" }}>
              {t("team.focus")}
            </dt>
            <dd style={{ color: "var(--c-ink-soft)" }}>{member.specialization}</dd>
          </div>
        )}
        {member.experience && (
          <div className="flex gap-3">
            <dt className="w-28 shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--c-ink-faint)" }}>
              {t("team.experience")}
            </dt>
            <dd style={{ color: "var(--c-ink-soft)" }}>{member.experience}</dd>
          </div>
        )}
        {isPhone(member.phone) && (
          <div className="flex gap-3">
            <dt className="w-28 shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--c-ink-faint)" }}>
              {t("team.phone")}
            </dt>
            <dd>
              <a
                href={`tel:${member.phone}`}
                className="inline-flex items-center gap-2 transition-colors"
                style={{ color: "var(--c-accent)" }}
              >
                <PhoneIcon size={14} />
                {member.phone}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

export default function Team() {
  const { lang, t } = useLanguage();
  const [seniors, setSeniors] = useState<TeamMember[]>([]);
  const [associates, setAssociates] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const [seniorsData, associatesData] = await Promise.all([
          getSeniorMembers(lang),
          getAssociates(lang),
        ]);
        if (cancelled) return;
        setSeniors(seniorsData);
        setAssociates(associatesData);
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const teamLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aabiskar Law Chamber Team",
    itemListElement: [...seniors, ...associates].map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        worksFor: { "@type": "Organization", name: "Aabiskar Law Chamber" },
      },
    })),
  };

  const jsonLd: Record<string, unknown>[] = [breadcrumbLd];
  if (seniors.length + associates.length > 0) jsonLd.push(teamLd);

  return (
    <>
      <SEO
        title="Our Team"
        description="Meet the advocates and legal associates of Aabiskar Law Chamber in Pokhara, led by Adv. Hari Prasad Pandit."
        path="/team"
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow={t("team.eyebrow")}
        title={t("team.title")}
        subtitle={t("team.subtitle")}
      />

      {/* Seniors */}
      <section className="container-page py-16 sm:py-20">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t("team.leadership")}</p>
          <h2 className="mt-5 text-3xl sm:text-4xl">{t("team.seniorHeading")}</h2>
        </Reveal>
        {loading ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-52 w-full" />
            ))}
          </div>
        ) : seniors.length === 0 ? (
          <p className="mt-8" style={{ color: "var(--c-ink-soft)" }}>
            {t("team.seniorEmpty")}
          </p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {seniors.map((member, i) => (
              <Reveal key={member.id} delay={i * 0.08}>
                <MemberCard member={member} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Associates */}
      {!loading && associates.length > 0 && (
        <section
          className="border-t"
          style={{
            borderColor: "var(--c-line)",
            background: "var(--c-raised)",
          }}
        >
          <div className="container-page py-16 sm:py-20">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">{t("team.eyebrow")}</p>
              <h2 className="mt-5 text-3xl sm:text-4xl">{t("team.assocHeading")}</h2>
            </Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {associates.map((member, i) => (
                <Reveal key={member.id} delay={i * 0.06}>
                  <MemberCard member={member} />
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
              {t("team.ctaTitle")}
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-lg"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              {t("team.ctaSub")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <Link to="/contact" className="btn btn-gold">
                {t("team.ctaBtn")}
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
