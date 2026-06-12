import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  getHeroContent,
  getIntroContent,
  getFeaturesContent,
  getWhyChooseUsContent,
  getCTAContent,
  getStats,
} from '../lib/queries'
import type {
  HeroContent,
  IntroContent,
  FeaturesContent,
  WhyChooseUsContent,
  CTAContent,
  Stat,
} from '../types'
import { ShieldIcon, HandshakeIcon, BalanceIcon, DocumentIcon, ChatIcon } from '../components/Icons'

const SITE_URL = 'https://aabiskar-law-chamber.vercel.app'

export default function Home() {
  const [hero, setHero] = useState<HeroContent | null>(null)
  const [intro, setIntro] = useState<IntroContent | null>(null)
  const [features, setFeatures] = useState<FeaturesContent | null>(null)
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUsContent | null>(
    null
  )
  const [cta, setCta] = useState<CTAContent | null>(null)
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroData, introData, featuresData, whyData, ctaData, statsData] =
          await Promise.all([
            getHeroContent(),
            getIntroContent(),
            getFeaturesContent(),
            getWhyChooseUsContent(),
            getCTAContent(),
            getStats(),
          ])

        setHero(heroData)
        setIntro(introData)
        setFeatures(featuresData)
        setWhyChooseUs(whyData)
        setCta(ctaData)
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
    <div>
      <Helmet>
        <title>Aabiskar Law Chamber | Best Law Firm in Pokhara, Nepal</title>
        <meta name="description" content="Aabiskar Law Chamber is the premier law firm in Pokhara, Nepal. Led by Adv. Hari Prasad Pandit, we provide expert legal services in criminal, property, and corporate law." />
        <link rel="canonical" href={SITE_URL + '/'} />
        <meta property="og:title" content="Aabiskar Law Chamber | Best Law Firm in Pokhara" />
        <meta property="og:description" content="Premier law firm in Pokhara, Nepal. Expert legal services in criminal, property, and corporate law. Trusted by 1000+ clients." />
        <meta property="og:url" content={SITE_URL + '/'} />
        <meta property="og:image" content={SITE_URL + '/og-image.png'} />
        <meta name="twitter:title" content="Aabiskar Law Chamber | Best Law Firm in Pokhara" />
        <meta name="twitter:description" content="Premier law firm in Pokhara, Nepal. Expert legal services in criminal, property, and corporate law." />
        <meta name="twitter:image" content={SITE_URL + '/og-image.png'} />
      </Helmet>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LegalService",
        "@id": SITE_URL + "/#organization",
        "name": "Aabiskar Law Chamber",
        "url": SITE_URL,
        "logo": SITE_URL + "/static/assets/brand/logo.svg",
        "description": "Premier law firm in Pokhara, Nepal. Expert legal services in criminal, property, and corporate law.",
        "telephone": "+9779856032810",
        "email": "pandithari912@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rastra Bank Chowk",
          "addressLocality": "Pokhara",
          "addressRegion": "Gandaki Province",
          "addressCountry": "NP"
        },
        "sameAs": [
          "https://facebook.com/advhari.pandit",
          "https://wa.me/9779856032810"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+9779856032810",
          "contactType": "customer service",
          "email": "pandithari912@gmail.com"
        }
      }) }} />

      {/* Hero Section */}
      {hero && (
        <section className="hero">
          <div className="hero-shapes">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
            <div className="hero-shape hero-shape-3"></div>
          </div>
          <div className="hero-content">
            <div className="hero-badge">
              <div className="hero-badge-dot"></div>
              <span className="hero-badge-text">{hero.badge}</span>
            </div>
            <h1 className="hero-title">
              <span className="line">{hero.titleLine1}</span>
              <span className="line accent">{hero.titleLine2}</span>
            </h1>
            <p className="hero-subtitle">{hero.subtitle}</p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn-primary">
                {hero.ctaPrimary}
              </Link>
              <Link to="/services" className="btn-secondary">
                <span>{hero.ctaSecondary}</span>
              </Link>
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

      {/* Intro Section */}
      {intro && (
        <section>
          <div className="container">
            <div className="about-grid">
              <div className="about-text">
                <div className="section-label">{intro.label}</div>
                <h2 className="section-title">{intro.title}</h2>
                {intro.paragraphs.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
                <Link to="/about" className="btn-primary" style={{ marginTop: '1rem' }}>
                  Learn More About Us
                </Link>
              </div>
              <div className="about-image">
                <img src={intro.image} alt={intro.imageAlt} loading="lazy" width="600" height="400" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {features && (
        <section style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-label">{features.label}</div>
              <h2 className="section-title">{features.title}</h2>
            </div>
            <div className="features-grid">
              {features.cards.map((card, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    {card.icon === 'shield' && <ShieldIcon size={32} />}
                    {card.icon === 'handshake' && <HandshakeIcon size={32} />}
                    {card.icon === 'balance' && <BalanceIcon size={32} />}
                  </div>
                  <h3 className="feature-title">{card.title}</h3>
                  <p className="feature-desc">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      {whyChooseUs && (
        <section>
          <div className="container">
            <div className="section-header">
              <div className="section-label">{whyChooseUs.label}</div>
              <h2 className="section-title">{whyChooseUs.title}</h2>
            </div>
            <div className="features-grid">
              {whyChooseUs.cards.map((card, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    {card.icon === 'balance' && <BalanceIcon size={32} />}
                    {card.icon === 'document' && <DocumentIcon size={32} />}
                    {card.icon === 'chat' && <ChatIcon size={32} />}
                  </div>
                  <h3 className="feature-title">{card.title}</h3>
                  <p className="feature-desc">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta && (
        <section className="cta-section">
          <div className="container">
            <h2 className="cta-title">{cta.title}</h2>
            <p className="cta-subtitle">{cta.subtitle}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">
                {cta.primaryBtn}
              </Link>
              <Link to="/services" className="btn-secondary">
                <span>{cta.secondaryBtn}</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}