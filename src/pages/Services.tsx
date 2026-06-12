import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { getPracticeAreas } from '../lib/queries'
import type { PracticeArea } from '../types'
import { BalanceIcon, HomeIcon, PeopleIcon, BriefcaseIcon, ShieldIcon } from '../components/Icons'
import type { ReactNode } from 'react'

const SITE_URL = 'https://aabiskar-law-chamber.vercel.app'

const iconMap: Record<string, ReactNode> = {
  gavel: <BalanceIcon size={28} />,
  home: <HomeIcon size={28} />,
  people: <PeopleIcon size={28} />,
  briefcase: <BriefcaseIcon size={28} />,
  shield: <ShieldIcon size={28} />,
}

export default function Services() {
  const [services, setServices] = useState<PracticeArea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPracticeAreas()
        setServices(data)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '50vh' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#c5a059' }}></div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Practice Areas | Aabiskar Law Chamber</title>
        <meta name="description" content="Explore our comprehensive legal services including criminal litigation, property law, family law, corporate law, banking &amp; finance, and cyber law in Pokhara, Nepal." />
        <link rel="canonical" href={SITE_URL + '/services'} />
        <meta property="og:title" content="Practice Areas | Aabiskar Law Chamber" />
        <meta property="og:description" content="Explore our comprehensive legal services including criminal litigation, property law, family law, corporate law, and more." />
        <meta property="og:url" content={SITE_URL + '/services'} />
        <meta property="og:image" content={SITE_URL + '/og-image.png'} />
        <meta name="twitter:title" content="Practice Areas | Aabiskar Law Chamber" />
        <meta name="twitter:description" content="Explore our comprehensive legal services including criminal litigation, property law, family law, corporate law, and more." />
        <meta name="twitter:image" content={SITE_URL + '/og-image.png'} />
      </Helmet>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Practice Areas", "item": SITE_URL + "/services" }
        ]
      }) }} />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="section-label" style={{ color: '#c5a059' }}>Practice Areas</div>
          <h1 className="page-title">Our Legal Services</h1>
          <p className="page-subtitle">
            Comprehensive legal solutions tailored to your needs. From criminal
            defense to corporate law, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} id={service.id} className="service-card">
                <div className="service-icon">
                  {iconMap[service.icon] || <BalanceIcon size={28} />}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {service.detail && (
                  <p className="service-detail">{service.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Process</div>
            <h2 className="section-title">How We Work</h2>
          </div>
          <div className="features-grid">
            {[
              {
                step: '01',
                title: 'Consultation',
                description:
                  'We listen to your case and understand your legal needs thoroughly.',
              },
              {
                step: '02',
                title: 'Analysis',
                description:
                  'Our team analyzes your case and develops a strategic approach.',
              },
              {
                step: '03',
                title: 'Action',
                description:
                  'We execute the legal strategy with precision and dedication.',
              },
              {
                step: '04',
                title: 'Resolution',
                description:
                  'We work towards the best possible outcome for your case.',
              },
            ].map((item, index) => (
              <div key={index} className="feature-card">
                <div
                  className="feature-icon"
                  style={{
                    background: '#c5a059',
                    color: '#0a192f',
                    borderRadius: '9999px',
                    fontWeight: '700',
                    fontSize: '1.25rem',
                  }}
                >
                  {item.step}
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}