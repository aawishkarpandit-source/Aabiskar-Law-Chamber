import Reveal from "./Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/** Editorial page header used by inner pages (About, Services, Team, Contact). */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <section className="navy-band">
      <div className="container-page relative z-10 py-24 sm:py-28 lg:py-32">
        <Reveal>
          <p className="eyebrow" style={{ color: "var(--c-gold)" }}>
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1
            className="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl"
            style={{ color: "#fff" }}
          >
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p
              className="mt-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
