import { useState } from 'react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('cookie-consent')
    }
    return false
  })

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="cookie-consent">
      <h3 className="cookie-title">We value your privacy</h3>
      <p className="cookie-text">
        This site uses cookies from Google Analytics to analyze traffic. No
        personal data is sold or shared.
      </p>
      <div className="cookie-actions">
        <button onClick={handleDecline} className="cookie-btn cookie-btn-decline">
          Decline
        </button>
        <button onClick={handleAccept} className="cookie-btn cookie-btn-accept">
          Accept
        </button>
      </div>
    </div>
  )
}