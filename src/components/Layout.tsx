import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import ScrollToTop from './ScrollToTop'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
      <ScrollToTop />
    </>
  )
}