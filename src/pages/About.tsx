import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { getAboutContent, getStats } from '../lib/queries'
import type { AboutContent, Stat } from '../types'
import { BalanceIcon, StarIcon, HeartIcon } from '../components/Icons'

const SITE_URL = 'https://aabiskar-law-chamber.vercel.app'

export default function About() {
  const [about, setAbout] = useState<AboutContent | null>(null)
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutData, statsData] = await Promise.all([
          getAboutContent(),
          getStats(),
        ])
        setAbout(aboutData)
        setStats(statsData)
      } catch (error) {
        console.error('Error fetching data:', error)
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
        <title>About Us | Aabiskar Law Chamber</title>
        <meta name="description" content="Learn about Aabiskar Law Chamber - Pokhara's most trusted legal advisors with over 15 years of experience." />
        <link rel="canonical" href={SITE_URL + '/about'} />
        <meta property="og:title" content="About Us | Aabiskar Law Chamber" />
        <meta property="og:description" content="Learn about Aabiskar Law Chamber - Pokhara's most trusted legal advisors with over 15 years of experience." />
        <meta property="og:url" content={SITE_URL + '/about'} />
        <meta property="og:image" content={SITE_URL + '/og-image.png'} />
        <meta name="twitter:title" content="About Us | Aabiskar Law Chamber" />
        <meta name="twitter:description" content="Learn about Aabiskar Law Chamber - Pokhara's most trusted legal advisors with over 15 years of experience." />
        <meta name="twitter:image" content={SITE_URL + '/og-image.png'} />
      </Helmet>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Aabiskar Law Chamber",
        "url": SITE_URL + "/about",
        "mainEntity": {
          "@type": "LegalService",
          "@id": SITE_URL + "/#organization",
          "name": "Aabiskar Law Chamber",
          "url": SITE_URL
        }
      }) }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "About Us", "item": SITE_URL + "/about" }
        ]
      }) }} />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="section-label" style={{ color: '#c5a059' }}>About Us</div>
          <h1 className="page-title">Our Commitment to Justice</h1>
          <p className="page-subtitle">
            Providing exceptional legal services with integrity and excellence
            for over 15 years.
          </p>
        </div>
      </section>

      {/* About Content Section */}
      {about && (
        <section>
          <div className="container">
            <div className="about-grid">
              <div className="about-text">
                <div className="section-label">{about.label}</div>
                <h2 className="section-title">{about.title}</h2>
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80"
                  alt="Legal Consultation"
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.id} className="stat-item">
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Values</div>
            <h2 className="section-title">The Principles We Live By</h2>
          </div>
          <div className="features-grid">
            {[
              {
                title: 'Integrity',
                description:
                  'We uphold the highest ethical standards in all our dealings, ensuring transparency and honesty with every client.',
                icon: <BalanceIcon size={32} />,
              },
              {
                title: 'Excellence',
                description:
                  'We strive for excellence in every case we handle, leaving no stone unturned in our pursuit of justice.',
                icon: <StarIcon size={32} />,
              },
              {
                title: 'Compassion',
                description:
                  'We understand that legal matters can be stressful, and we treat every client with empathy and understanding.',
                icon: <HeartIcon size={32} />,
              },
            ].map((value, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{value.icon}</div>
                <h3 className="feature-title">{value.title}</h3>
                <p className="feature-desc">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}