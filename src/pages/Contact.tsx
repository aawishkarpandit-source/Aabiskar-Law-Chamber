import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { getSiteConfig, submitContactForm } from '../lib/queries'
import type { SiteConfig, ContactSubmission, ContactFormErrors } from '../types'
import { LocationIcon, PhoneIcon, EmailIcon, ClockIcon, CheckIcon } from '../components/Icons'

export default function Contact() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await getSiteConfig()
        setSiteConfig(config)
      } catch (error) {
        console.error('Error fetching site config:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    try {
      const success = await submitContactForm(formData)
      if (success) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitError('Failed to submit form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

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
        <title>Contact Us | Aabiskar Law Chamber</title>
        <meta
          name="description"
          content="Get in touch with Aabiskar Law Chamber. Schedule a consultation with our expert legal team in Pokhara, Nepal."
        />
      </Helmet>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="section-label" style={{ color: '#c5a059' }}>Contact Us</div>
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            Ready to discuss your legal needs? Contact us today for a
            consultation.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Contact Information</h2>

              <div className="contact-item">
                <div className="contact-icon"><LocationIcon size={22} /></div>
                <div>
                  <div className="contact-label">Office Address</div>
                  <div className="contact-value">
                    {siteConfig?.location.office}
                    <br />
                    {siteConfig?.location.street}
                    <br />
                    {siteConfig?.location.city}, {siteConfig?.location.district}
                    <br />
                    {siteConfig?.location.province}, {siteConfig?.location.country}
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><PhoneIcon size={22} /></div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">{siteConfig?.phone}</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><EmailIcon size={22} /></div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">{siteConfig?.email}</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><ClockIcon size={22} /></div>
                <div>
                  <div className="contact-label">Office Hours</div>
                  <div className="contact-value">
                    Monday - Friday: {siteConfig?.officeHours.weekdays}
                    <br />
                    Saturday: {siteConfig?.officeHours.saturday}
                    <br />
                    <em style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                      {siteConfig?.officeHours.note}
                    </em>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{ marginBottom: '1rem', color: '#059669' }}><CheckIcon size={64} /></div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    Thank You!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Your message has been sent successfully. We'll get back to
                    you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2>Send Us a Message</h2>

                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <span className="error-message">{errors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`form-select ${errors.subject ? 'error' : ''}`}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Legal Consultation">
                        Legal Consultation
                      </option>
                      <option value="Case Discussion">Case Discussion</option>
                      <option value="Appointment Request">
                        Appointment Request
                      </option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <span className="error-message">{errors.subject}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <span className="error-message">{errors.message}</span>
                    )}
                  </div>

                  {submitError && (
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        background: '#FEE2E2',
                        color: '#DC2626',
                        borderRadius: '0.5rem',
                        fontSize: '0.9rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-submit"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <iframe
          title="Aabiskar Law Chamber Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.847452106653!2d83.9855!3d28.2096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39959415e5a5a5a5%3A0x1234567890abcdef!2sPokhara%2C%20Nepal!5e0!3m2!1sen!2snp!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  )
}