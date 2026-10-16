import { useState, useEffect } from "react";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import PageHeader from "../components/PageHeader";
import {
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
  CheckIcon,
} from "../components/Icons";
import { getSiteConfig, submitContactForm } from "../lib/queries";
import type { SiteConfig, ContactSubmission, ContactFormErrors } from "../types";
import { SITE_URL, FIRM } from "../lib/site";

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Legal Consultation",
  "Case Discussion",
  "Appointment Request",
  "Other",
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: `${SITE_URL}/contact`,
    },
  ],
};

const contactPageLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Aabiskar Law Chamber",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "LegalService",
    "@id": `${SITE_URL}/#organization`,
    name: FIRM.name,
    telephone: FIRM.phone,
    email: FIRM.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: FIRM.address.street,
      addressLocality: FIRM.address.city,
      addressRegion: FIRM.address.province,
      addressCountry: "NP",
    },
  },
};

export default function Contact() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ContactSubmission>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  // Honeypot field — hidden from humans, catches naive bots.
  const [company, setCompany] = useState("");

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const config = await getSiteConfig();
        if (!cancelled) setSiteConfig(config);
      } catch (err) {
        console.error("Error fetching site config:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Silent success for honeypot submissions (bot).
    if (company.trim() !== "") {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const success = await submitContactForm(formData);
      if (success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSubmitError(
          "Sorry, we couldn't send your message right now. Please try again, or call us directly."
        );
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const infoRows = [
    {
      icon: <LocationIcon size={20} />,
      label: "Office",
      lines: siteConfig
        ? [
            siteConfig.location.office,
            siteConfig.location.street,
            `${siteConfig.location.city}, ${siteConfig.location.district}`,
            `${siteConfig.location.province}, ${siteConfig.location.country}`,
          ]
        : [
            FIRM.address.street,
            FIRM.address.city,
            `${FIRM.address.district}, ${FIRM.address.province}`,
            FIRM.address.country,
          ],
    },
    {
      icon: <PhoneIcon size={20} />,
      label: "Phone",
      lines: [siteConfig?.phone ?? FIRM.phoneDisplay],
      href: `tel:${FIRM.phone}`,
    },
    {
      icon: <EmailIcon size={20} />,
      label: "Email",
      lines: [siteConfig?.email ?? FIRM.email],
      href: `mailto:${FIRM.email}`,
    },
    {
      icon: <ClockIcon size={20} />,
      label: "Office Hours",
      lines: [
        `Mon – Fri: ${siteConfig?.officeHours.weekdays ?? FIRM.officeHours.weekdays}`,
        `Saturday: ${siteConfig?.officeHours.saturday ?? FIRM.officeHours.saturday}`,
        siteConfig?.officeHours.note ?? FIRM.officeHours.note,
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Aabiskar Law Chamber in Pokhara, Nepal. Request a consultation with our legal team."
        path="/contact"
        jsonLd={[contactPageLd, breadcrumbLd]}
      />

      <PageHeader
        eyebrow="Contact"
        title="Start the conversation"
        subtitle="Ready to discuss your legal needs? Reach out and we'll respond as soon as we can."
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Info column */}
          <Reveal className="lg:col-span-2">
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-5 text-2xl sm:text-3xl">
              Office & contact details
            </h2>
            <dl className="mt-8 divide-y border-y">
              {infoRows.map((row) => (
                <div key={row.label} className="flex gap-4 py-5">
                  <span
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm"
                    style={{
                      background:
                        "color-mix(in srgb, var(--c-gold) 14%, transparent)",
                      color: "var(--c-accent)",
                    }}
                    aria-hidden="true"
                  >
                    {row.icon}
                  </span>
                  <div>
                    <dt
                      className="text-[0.72rem] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: "var(--c-ink-faint)" }}
                    >
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-[0.98rem] leading-relaxed">
                      {row.href ? (
                        <a
                          href={row.href}
                          className="transition-colors"
                          style={{ color: "var(--c-ink)" }}
                        >
                          {row.lines[0]}
                        </a>
                      ) : (
                        row.lines.map((line, i) => (
                          <span
                            key={i}
                            className="block"
                            style={{
                              color: "var(--c-ink)",
                              fontStyle:
                                i === row.lines.length - 1 && row.lines.length > 1
                                  ? "italic"
                                  : undefined,
                              fontSize:
                                i === row.lines.length - 1 && row.lines.length > 1
                                  ? "0.88rem"
                                  : undefined,
                            }}
                          >
                            {line}
                          </span>
                        ))
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Form column */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div
              className="rounded-sm border p-7 sm:p-9"
              style={{
                background: "var(--c-surface)",
                borderColor: "var(--c-line)",
              }}
            >
              {submitted ? (
                <div className="py-10 text-center">
                  <span
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                    style={{
                      background: "color-mix(in srgb, var(--c-success) 15%, transparent)",
                      color: "var(--c-success)",
                    }}
                    aria-hidden="true"
                  >
                    <CheckIcon size={30} />
                  </span>
                  <h2 className="mt-6 font-display text-2xl">Thank you</h2>
                  <p
                    className="mx-auto mt-3 max-w-sm"
                    style={{ color: "var(--c-ink-soft)" }}
                  >
                    Your message has been sent. We'll get back to you as soon as
                    possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-outline mt-8"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="font-display text-2xl">Send us a message</h2>
                  <p
                    className="mt-2 text-[0.92rem]"
                    style={{ color: "var(--c-ink-soft)" }}
                  >
                    Fields marked <span aria-hidden="true">*</span>
                    <span className="sr-only">with an asterisk</span> are
                    required.
                  </p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="field-label">
                        Full Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className="field-input"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <span id="name-error" className="field-error" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="field-label">
                        Email <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className="field-input"
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <span id="email-error" className="field-error" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="field-label">
                        Phone (optional)
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="field-input"
                        placeholder="+977 98XXXXXXXX"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="field-label">
                        Subject <span aria-hidden="true">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-invalid={errors.subject ? "true" : "false"}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        className="field-input"
                      >
                        <option value="">Select a subject</option>
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <span id="subject-error" className="field-error" role="alert">
                          {errors.subject}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-5">
                    <label htmlFor="message" className="field-label">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className="field-input resize-y"
                      placeholder="Briefly describe how we can help."
                    />
                    {errors.message && (
                      <span id="message-error" className="field-error" role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Honeypot (hidden from humans) */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="mt-5 rounded-sm border px-4 py-3 text-[0.9rem]"
                      style={{
                        borderColor: "color-mix(in srgb, var(--c-danger) 40%, transparent)",
                        background: "color-mix(in srgb, var(--c-danger) 8%, transparent)",
                        color: "var(--c-danger)",
                      }}
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary mt-7 w-full"
                  >
                    {submitting ? "Sending…" : "Send Message"}
                  </button>

                  <p
                    className="mt-5 text-[0.82rem] leading-relaxed"
                    style={{ color: "var(--c-ink-faint)" }}
                  >
                    Sending a message does not create an attorney–client
                    relationship. Please do not include confidential information
                    until we have agreed to act for you.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Loading state for the info column only (form is always usable) */}
        {loading && (
          <p className="sr-only" aria-live="polite">
            Loading office details
          </p>
        )}
      </section>

      {/* Map */}
      <section aria-label="Office location map" className="map-section">
        <iframe
          title="Map showing the Aabiskar Law Chamber office in Pokhara"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            FIRM.mapQuery
          )}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
