export interface SiteConfig {
  name: string
  shortName: string
  tagline: string
  description: string
  url: string
  logo: string
  logoIcon: string
  email: string
  phone: string
  whatsapp: string
  location: {
    office: string
    street: string
    city: string
    district: string
    province: string
    country: string
  }
  social: {
    facebook: string
    whatsapp: string
  }
  copyright: string
  managedBy: string
  madeBy: string
  officeHours: {
    weekdays: string
    saturday: string
    note: string
  }
  cookie: {
    title: string
    text: string
  }
}

export interface NavItem {
  label: string
  href: string
}

export interface HeroContent {
  badge: string
  titleLine1: string
  titleLine2: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
}

export interface IntroContent {
  label: string
  title: string
  paragraphs: string[]
  image: string
  imageAlt: string
}

export interface FeatureCard {
  title: string
  description: string
  icon: string
}

export interface FeaturesContent {
  label: string
  title: string
  cards: FeatureCard[]
}

export interface AboutContent {
  label: string
  title: string
  paragraphs: string[]
}

export interface WhyChooseUsCard {
  title: string
  description: string
  icon: string
}

export interface WhyChooseUsContent {
  label: string
  title: string
  cards: WhyChooseUsCard[]
}

export interface CTAContent {
  title: string
  subtitle: string
  primaryBtn: string
  secondaryBtn: string
}

export interface Stat {
  id: number
  value: string
  label: string
  sort_order: number
}

export interface PracticeArea {
  id: string
  title: string
  description: string
  detail: string | null
  icon: string
  sort_order: number
}

export interface TeamMember {
  id: number
  name: string
  role: string
  specialization: string | null
  experience: string | null
  phone: string | null
  image: string | null
  member_type: 'senior' | 'associate'
  sort_order: number
}

export interface Testimonial {
  id: number
  name: string
  role: string
  text: string
  rating: number
  sort_order: number
}

export interface ContactSubmission {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}