import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Practice Areas', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()

  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo">
          <img
            src="/static/assets/brand/logo.svg"
            alt="Aabiskar Law Chamber"
            className="logo-img"
          />
          <div className="logo-text">
            <span className="logo-name">Aabiskar Law</span>
            <span className="logo-tag">Chamber</span>
          </div>
        </Link>

        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            <span className="theme-icon">{isDark ? '☀️' : '🌙'}</span>
          </button>

          <Link to="/contact" className="btn-header-cta btn-header-cta-desktop">
            Book Consultation
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`menu-toggle ${isOpen ? 'active' : ''}`}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <button
            onClick={() => setIsOpen(false)}
            className="menu-close"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <div className="mobile-menu-body">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mobile-menu-footer">
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="btn-header-cta"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </header>
  )
}