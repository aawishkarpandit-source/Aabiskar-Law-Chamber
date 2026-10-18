import { supabase } from './supabase'
import type { Lang } from './i18n'
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

/**
 * Resolve a localized field. When the active language is Nepali (`ne`) and a
 * non-empty Nepali value exists, return it; otherwise fall back to English.
 * This makes the app backward-compatible: if the `_np` columns haven't been
 * added (migration not run) or are NULL, the English text is shown.
 */
function localize<T extends string>(
  lang: Lang,
  np: T | null | undefined,
  en: T,
): T {
  if (lang === 'ne' && np != null && np.trim() !== '') return np
  return en
}

/**
 * Fetch a `site_config` jsonb value by key, with locale fallback.
 *
 * Nepali variants are stored under parallel `<key>_np` rows (see
 * supabase-migration-np.sql). When lang = 'ne' we try the `_np` key first and
 * fall back to the English key if that row is absent. When lang = 'en' we read
 * only the English key.
 */
async function getSiteConfigValue<T>(
  key: string,
  lang: Lang,
): Promise<T | null> {
  if (lang === 'ne') {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', `${key}_np`)
      .maybeSingle()
    if (!error && data) return data.value as T
    // else fall through to the English key
  }

  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', key)
    .maybeSingle()

  if (error || !data) {
    console.error(`Error fetching site config "${key}":`, error)
    return null
  }

  return data.value as T
}

// Site config queries
export async function getSiteConfig(
  lang: Lang = 'en',
): Promise<SiteConfig | null> {
  return getSiteConfigValue<SiteConfig>('site_info', lang)
}

export async function getNavItems(lang: Lang = 'en'): Promise<NavItem[]> {
  return (await getSiteConfigValue<NavItem[]>('nav', lang)) ?? []
}

export async function getHeroContent(
  lang: Lang = 'en',
): Promise<HeroContent | null> {
  return getSiteConfigValue<HeroContent>('hero', lang)
}

export async function getIntroContent(
  lang: Lang = 'en',
): Promise<IntroContent | null> {
  return getSiteConfigValue<IntroContent>('intro', lang)
}

export async function getFeaturesContent(
  lang: Lang = 'en',
): Promise<FeaturesContent | null> {
  return getSiteConfigValue<FeaturesContent>('features', lang)
}

export async function getAboutContent(
  lang: Lang = 'en',
): Promise<AboutContent | null> {
  return getSiteConfigValue<AboutContent>('about', lang)
}

export async function getWhyChooseUsContent(
  lang: Lang = 'en',
): Promise<WhyChooseUsContent | null> {
  return getSiteConfigValue<WhyChooseUsContent>('whyChooseUs', lang)
}

export async function getCTAContent(
  lang: Lang = 'en',
): Promise<CTAContent | null> {
  return getSiteConfigValue<CTAContent>('cta', lang)
}

// Stats queries
export async function getStats(lang: Lang = 'en'): Promise<Stat[]> {
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching stats:', error)
    return []
  }

  return (data as Stat[]).map((s) => ({
    ...s,
    label: localize(lang, s.label_np, s.label),
  }))
}

// Practice areas queries
export async function getPracticeAreas(
  lang: Lang = 'en',
): Promise<PracticeArea[]> {
  const { data, error } = await supabase
    .from('practice_areas')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching practice areas:', error)
    return []
  }

  return (data as PracticeArea[]).map((s) => ({
    ...s,
    title: localize(lang, s.title_np, s.title),
    description: localize(lang, s.description_np, s.description),
    detail:
      s.detail == null
        ? s.detail
        : localize(lang, s.detail_np, s.detail),
  }))
}

export async function getPracticeAreaById(
  id: string,
  lang: Lang = 'en',
): Promise<PracticeArea | null> {
  const { data, error } = await supabase
    .from('practice_areas')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !data) {
    console.error('Error fetching practice area:', error)
    return null
  }

  const s = data as PracticeArea
  return {
    ...s,
    title: localize(lang, s.title_np, s.title),
    description: localize(lang, s.description_np, s.description),
    detail: s.detail == null ? s.detail : localize(lang, s.detail_np, s.detail),
  }
}

// Team members queries
async function mapTeamMembers(
  lang: Lang,
  data: TeamMember[],
): Promise<TeamMember[]> {
  return data.map((m) => ({
    ...m,
    role: localize(lang, m.role_np, m.role),
    specialization:
      m.specialization == null
        ? m.specialization
        : localize(lang, m.specialization_np, m.specialization),
    experience:
      m.experience == null
        ? m.experience
        : localize(lang, m.experience_np, m.experience),
  }))
}

export async function getTeamMembers(
  lang: Lang = 'en',
): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching team members:', error)
    return []
  }

  return mapTeamMembers(lang, data as TeamMember[])
}

export async function getSeniorMembers(
  lang: Lang = 'en',
): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('member_type', 'senior')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching senior members:', error)
    return []
  }

  return mapTeamMembers(lang, data as TeamMember[])
}

export async function getAssociates(
  lang: Lang = 'en',
): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('member_type', 'associate')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching associates:', error)
    return []
  }

  return mapTeamMembers(lang, data as TeamMember[])
}

// Testimonials queries
export async function getTestimonials(
  lang: Lang = 'en',
): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Error fetching testimonials:', error)
    return []
  }

  return (data as Testimonial[]).map((t) => ({
    ...t,
    role: localize(lang, t.role_np, t.role),
    text: localize(lang, t.text_np, t.text),
  }))
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
