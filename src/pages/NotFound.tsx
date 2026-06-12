import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Aabiskar Law Chamber</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://aabiskar-law-chamber.vercel.app/404" />
      </Helmet>

      <section
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 1.5rem' }}>
          <h1
            style={{
              fontSize: '8rem',
              fontWeight: '700',
              color: '#c5a059',
              marginBottom: '1rem',
              lineHeight: '1',
            }}
          >
            404
          </h1>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
            }}
          >
            Page Not Found
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              maxWidth: '400px',
              margin: '0 auto 2rem',
            }}
          >
            The page you're looking for doesn't exist or has been moved. Let us
            help you find your way.
          </p>
          <Link to="/" className="btn-primary">
            Go Back Home
          </Link>
        </div>
      </section>
    </>
  )
}