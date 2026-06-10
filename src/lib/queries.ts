import { supabase } from './supabase'
import type {
  SiteConfig,
  NavItem,
  HeroContent,
  IntroContent,
  FeaturesContent,
  AboutContent,
  WhyChooseUsContent,
  CTAContent,
  Stat,
  PracticeArea,
  TeamMember,
  Testimonial,
  ContactSubmission,
} from '../types'

// Site config queries
export async function getSiteConfig(): Promise<SiteConfig | null> {
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'site_info')
    .single()

  if (error || !data) {
    console.error('Error fetching site config:', error)
    return null
  }

  return data.value as SiteConfig
}

export async function getNavItems(): Promise<NavItem[]> {
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'nav')
    .single()

  if (error || !data) {
    console.error('Error fetching nav items:', error)
    return []
  }

  return data.value as NavItem[]
}

export async function getHeroContent(): Promise<HeroContent | null> {
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'hero')
    .single()

  if (error || !data) {
    console.error('Error fetching hero content:', error)
    return null
  }

  return data.value as HeroContent
}

export async function getIntroContent(): Promise<IntroContent | null> {
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'intro')
    .single()

  if (error || !data) {
    console.error('Error fetching intro content:', error)
    return null
  }

  return data.value as IntroContent
}

export async function getFeaturesContent(): Promise<FeaturesContent | null> {
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'features')
    .single()

  if (error || !data) {
    console.error('Error fetching features content:', error)
    return null
  }

  return data.value as FeaturesContent
}

export async function getAboutContent(): Promise<AboutContent | null> {
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'about')
    .single()

  if (error || !data) {
    console.error('Error fetching about content:', error)
    return null
  }

  return data.value as AboutContent
}

export async function getWhyChooseUsContent(): Promise<WhyChooseUsContent | null> {
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'whyChooseUs')
    .single()

  if (error || !data) {
    console.error('Error fetching why choose us content:', error)
    return null
  }

  return data.value as WhyChooseUsContent
}

export async function getCTAContent(): Promise<CTAContent | null> {
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', 'cta')
    .single()

  if (error || !data) {
    console.error('Error fetching CTA content:', error)
    return null
  }

  return data.value as CTAContent
}

// Stats queries
export async function getStats(): Promise<Stat[]> {
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching stats:', error)
    return []
  }

  return data as Stat[]
}

// Practice areas queries
export async function getPracticeAreas(): Promise<PracticeArea[]> {
  const { data, error } = await supabase
    .from('practice_areas')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching practice areas:', error)
    return []
  }

  return data as PracticeArea[]
}

export async function getPracticeAreaById(id: string): Promise<PracticeArea | null> {
  const { data, error } = await supabase
    .from('practice_areas')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    console.error('Error fetching practice area:', error)
    return null
  }

  return data as PracticeArea
}

// Team members queries
export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching team members:', error)
    return []
  }

  return data as TeamMember[]
}

export async function getSeniorMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('member_type', 'senior')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching senior members:', error)
    return []
  }

  return data as TeamMember[]
}

export async function getAssociates(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('member_type', 'associate')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching associates:', error)
    return []
  }

  return data as TeamMember[]
}

// Testimonials queries
export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching testimonials:', error)
    return []
  }

  return data as Testimonial[]
}

// Contact form submission
export async function submitContactForm(submission: ContactSubmission): Promise<boolean> {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([submission])

  if (error) {
    console.error('Error submitting contact form:', error)
    return false
  }

  return true
}