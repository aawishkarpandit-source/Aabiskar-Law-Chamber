import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import PageHeader from "../components/PageHeader";
import { Skeleton } from "../components/Feedback";
import { renderIcon } from "../lib/icons";
import { SITE_URL } from "../lib/site";
import { ArrowRightIcon } from "../components/Icons";
import { getPracticeAreas } from "../lib/queries";
import type { PracticeArea } from "../types";

const process = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We listen to your case and understand your legal needs thoroughly.",
  },
  {
    step: "02",
    title: "Analysis",
    description:
      "Our team analyzes your case and develops a strategic approach.",
  },
  {
    step: "03",
    title: "Action",
    description:
      "We execute the legal strategy with precision and dedication.",
  },
  {
    step: "04",
    title: "Resolution",
    description:
      "We work towards the best possible outcome for your case.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Practice Areas",
      item: `${SITE_URL}/services`,
    },
  ],
};

export default function Services() {
  const [services, setServices] = useState<PracticeArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const data = await getPracticeAreas();
        if (!cancelled) setServices(data);
      } catch (err) {
        console.error("Error fetching practice areas:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // Item-level structured data (only for records that actually exist).
  const jsonLd: Record<string, unknown>[] = [breadcrumbLd];
  if (services.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Legal Practice Areas",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        description: s.description,
      })),
    });
  }

  return (
    <>
      <SEO
        title="Practice Areas"
        description="Legal services in Pokhara, Nepal — criminal litigation, property and land law, family and divorce, corporate law, banking and finance, and cyber law."
        path="/services"
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow="Practice Areas"
        title="Legal services across the matters that matter most"
        subtitle="From criminal defense to corporate compliance, we provide clear, practical counsel for individuals and businesses across Nepal."
      />

      {/* Practice areas list */}
      <section className="container-page py-16 sm:py-20">
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="font-display text-2xl">No practice areas to show</h2>
            <p
              className="mt-3"
              style={{ color: "var(--c-ink-soft)" }}
            >
              Please check back soon, or contact us to discuss your matter.
            </p>
            <Link to="/contact" className="btn btn-primary mt-6">
              Contact Us
            </Link>
          </div>
        ) : (
          <div className="divide-y border-y">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.04}>
                <article
                  id={service.id}
                  className="grid scroll-mt-28 grid-cols-1 gap-4 py-10 sm:grid-cols-12 sm:gap-8"
                  style={{ borderColor: "var(--c-line)" }}
                >
                  <div className="sm:col-span-4">
                    <div className="flex items-start gap-4">
                      <span
                        className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm"
                        style={{
                          background: "color-mix(in srgb, var(--c-gold) 14%, transparent)",
                          color: "var(--c-accent)",
                        }}
                      >
                        {renderIcon(service.icon, 22)}
                      </span>
                      <div>
                        <span
                          className="text-xs font-semibold tracking-[0.16em]"
                          style={{ color: "var(--c-ink-faint)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="mt-1 text-2xl">{service.title}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-8">
                    <p
                      className="text-[1.02rem] leading-relaxed"
                      style={{ color: "var(--c-ink-soft)" }}
                    >
                      {service.description}
                    </p>
                    {service.detail && (
                      <p
                        className="mt-4 border-l pl-4 text-[0.94rem] italic leading-relaxed"
                        style={{
                          borderColor: "var(--c-line-strong)",
                          color: "var(--c-ink-faint)",
                        }}
                      >
                        {service.detail}
                      </p>
                    )}
                    <Link
                      to="/contact"
                      className="link-underline mt-5 inline-flex text-[0.9rem]"
                    >
                      Discuss this service
                      <ArrowRightIcon size={15} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Process */}
      <section
        className="border-t"
        style={{
          borderColor: "var(--c-line)",
          background: "var(--c-raised)",
        }}
      >
        <div className="container-page py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our Process</p>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.9rem]">
              How we work with you
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4"
            style={{ background: "var(--c-line)", borderColor: "var(--c-line)" }}>
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.06}>
                <div
                  className="h-full p-8"
                  style={{ background: "var(--c-canvas)" }}
                >
                  <span
                    className="font-display text-3xl"
                    style={{ color: "var(--c-accent)" }}
                  >
                    {item.step}
                  </span>
                  <h3 className="mt-5 text-xl">{item.title}</h3>
                  <p
                    className="mt-3 text-[0.95rem] leading-relaxed"
                    style={{ color: "var(--c-ink-soft)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="navy-band">
        <div className="container-page relative z-10 py-20 text-center sm:py-24">
          <Reveal>
            <h2
              className="mx-auto max-w-2xl text-3xl sm:text-4xl"
              style={{ color: "#fff" }}
            >
              Not sure where to start?
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-lg"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Tell us about your situation and we'll point you in the right
              direction.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <Link to="/contact" className="btn btn-gold">
                Request a Consultation
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
