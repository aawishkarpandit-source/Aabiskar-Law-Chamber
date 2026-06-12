import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getSeniorMembers, getAssociates } from '../lib/queries'
import type { TeamMember } from '../types'
import { BalanceIcon, PhoneIcon, UserIcon } from '../components/Icons'

export default function Team() {
  const [seniors, setSeniors] = useState<TeamMember[]>([])
  const [associates, setAssociates] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [seniorsData, associatesData] = await Promise.all([
          getSeniorMembers(),
          getAssociates(),
        ])
        setSeniors(seniorsData)
        setAssociates(associatesData)
      } catch (error) {
        console.error('Error fetching team:', error)
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
        <title>Our Team | Aabiskar Law Chamber</title>
        <meta
          name="description"
          content="Meet our experienced legal team led by Adv. Hari Prasad Pandit with over 20 years of expertise in criminal, property, and corporate law."
        />
      </Helmet>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="section-label" style={{ color: '#c5a059' }}>Our Team</div>
          <h1 className="page-title">Meet Our Experts</h1>
          <p className="page-subtitle">
            Our team of experienced legal professionals is dedicated to
            providing exceptional representation and counsel.
          </p>
        </div>
      </section>

      {/* Senior Team Section */}
      <section>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Leadership</div>
            <h2 className="section-title">Senior Advocates</h2>
          </div>
          <div className="team-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {seniors.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-photo">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BalanceIcon size={32} />
                    </div>
                  )}
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <div className="team-role">{member.role}</div>
                  {member.specialization && (
                    <div className="team-specialization">{member.specialization}</div>
                  )}
                  {member.experience && (
                    <div className="team-experience">{member.experience}</div>
                  )}
                  {member.phone && member.phone !== 'Coming Soon' && (
                    <div className="team-phone">
                      <PhoneIcon size={14} className="inline-block" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> <a href={`tel:${member.phone}`}>{member.phone}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Associates Section */}
      {associates.length > 0 && (
        <section style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-label">Our Team</div>
              <h2 className="section-title">Legal Associates</h2>
            </div>
            <div className="team-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
              {associates.map((member) => (
                <div key={member.id} className="team-card">
                  <div className="team-photo">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <UserIcon size={32} />
                      </div>
                    )}
                  </div>
                  <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <div className="team-role">{member.role}</div>
                    {member.specialization && (
                      <div className="team-specialization">{member.specialization}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Work With Us?</h2>
          <p className="cta-subtitle">
            Schedule a consultation with our experienced legal team today.
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}