-- Aabiskar Law Chamber — Database Migration
-- Run via Supabase SQL Editor

BEGIN;

-- Drop all existing tables
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS practice_areas CASCADE;
DROP TABLE IF EXISTS stats CASCADE;
DROP TABLE IF EXISTS site_config CASCADE;

-- 1. SITE CONFIGURATION
CREATE TABLE site_config (
  id bigint primary key generated always as identity,
  key text not null unique,
  value jsonb not null,
  created_at timestamptz default now()
);

INSERT INTO site_config (key, value) VALUES
('site_info', '{
  "name": "Aabiskar Law Chamber",
  "shortName": "Aabiskar Law",
  "tagline": "Trusted Legal Counsel in Pokhara",
  "description": "Aabiskar Law Chamber is the premier law firm in Pokhara, Nepal. Led by Adv. Hari Prasad Pandit, we provide expert legal services in criminal, property, and corporate law.",
  "url": "https://aabiskar-law-chamber.vercel.app",
  "logo": "/static/assets/brand/logo.png",
  "logoIcon": "/static/assets/brand/logo_icon.png",
  "email": "pandithari912@gmail.com",
  "phone": "+9779856032810",
  "whatsapp": "+9779856032810",
  "location": {
    "office": "Aabiskar Law Chamber",
    "street": "Rastra Bank Chowk",
    "city": "Pokhara",
    "district": "Kaski",
    "province": "Gandaki Province",
    "country": "Nepal"
  },
  "social": {
    "facebook": "https://facebook.com/advhari.pandit",
    "whatsapp": "https://wa.me/9779856032810"
  },
  "copyright": "2026",
  "managedBy": "Aabiskar Law Chamber",
  "madeBy": "Awishkar Pandit",
  "officeHours": {
    "weekdays": "10:00 AM - 5:00 PM",
    "saturday": "Closed",
    "note": "Consultations outside these hours are available by appointment only."
  },
  "cookie": {
    "title": "We value your privacy",
    "text": "This site uses cookies from Google Analytics to analyze traffic. No personal data is sold or shared."
  }
}'),
('nav', '[
  {"label": "Home", "href": "/"},
  {"label": "About", "href": "/about"},
  {"label": "Practice Areas", "href": "/services"},
  {"label": "Team", "href": "/team"},
  {"label": "Contact", "href": "/contact"}
]'),
('hero', '{
  "badge": "Recognized for Excellence & Integrity",
  "titleLine1": "The Best Law",
  "titleLine2": "Chamber in Pokhara",
  "subtitle": "Recognized for excellence and integrity, providing the highest standard of legal solutions for individuals and businesses across Nepal. Your justice, our commitment.",
  "ctaPrimary": "Book a Consultation",
  "ctaSecondary": "Our Services"
}'),
('intro', '{
  "label": "Who We Are",
  "title": "Pokhara''s Most Trusted Legal Advisors",
  "paragraphs": [
    "At Aabiskar Law Chamber, we understand that legal challenges require more than just technical knowledge; they require a deep understanding of the local judicial landscape in Kaski and across Nepal. Our firm has been at the forefront of landmark cases involving land disputes, corporate compliance, and criminal defense.",
    "From the District Court of Kaski to the High Court and Supreme Court, our advocates bring a wealth of experience. We provide rigorous representation in matters of civil litigation, ensuring that the Muluki Civil Code is applied with precision to protect your assets and family interests."
  ],
  "image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
  "imageAlt": "Legal Consultation"
}'),
('features', '{
  "label": "Our Services",
  "title": "Our Premier Services",
  "cards": [
    {
      "title": "Asset Protection",
      "description": "Navigating the complexities of property law and inheritance to ensure your family legacy remains secure under Nepalese law.",
      "icon": "shield"
    },
    {
      "title": "Mediation Services",
      "description": "Resolving disputes through structured negotiation before they escalate to costly courtroom battles.",
      "icon": "handshake"
    },
    {
      "title": "Civil Advocacy",
      "description": "Fighting for your rights in tort law, contract breaches, and personal injury claims with unmatched dedication.",
      "icon": "balance"
    }
  ]
}'),
('about', '{
  "label": "About Us",
  "title": "Commitment to Justice",
  "paragraphs": [
    "Legal procedures in Nepal can be daunting. Whether you are dealing with the ''Malpot'' office for land registry or navigating the High Court in Pokhara, we stand by you. Our philosophy is rooted in the principle of Audi alteram partem — the right to be heard. We ensure your voice is not lost in the bureaucratic corridors of justice.",
    "We also specialize in the new labor laws of 2074, helping both employers and employees find common ground in the rapidly evolving industrial sector of Pokhara."
  ]
}'),
('whyChooseUs', '{
  "label": "Why Choose Us",
  "title": "Why Choose Us?",
  "cards": [
    {
      "title": "Expert Advocacy",
      "description": "Our lawyers are experts in the Muluki Civil Code and Criminal Code of Nepal, offering unparalleled insight into local laws.",
      "icon": "balance"
    },
    {
      "title": "Meticulous Planning",
      "description": "We leave no stone unturned in document preparation and case strategy, ensuring the best possible outcome for our clients.",
      "icon": "document"
    },
    {
      "title": "Transparent Communication",
      "description": "We believe in keeping our clients informed at every stage of the legal process, ensuring clarity and peace of mind.",
      "icon": "chat"
    }
  ]
}'),
('cta', '{
  "title": "Start Your Legal Journey Today",
  "subtitle": "Don''t leave your future to chance. Consult with the best legal minds in Pokhara.",
  "primaryBtn": "Schedule Appointment",
  "secondaryBtn": "View Practice Areas"
}');

-- 2. STATS
CREATE TABLE stats (
  id bigint primary key generated always as identity,
  value text not null,
  label text not null,
  sort_order int not null default 0
);

INSERT INTO stats (value, label, sort_order) VALUES
('15+', 'Years Experience', 1),
('50+', 'Success', 2),
('100+', 'Consultations', 3),
('98%', 'Client Satisfaction', 4);

-- 3. PRACTICE AREAS
CREATE TABLE practice_areas (
  id text primary key,
  title text not null,
  description text not null,
  detail text,
  icon text not null,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

INSERT INTO practice_areas (id, title, description, detail, icon, sort_order) VALUES
('criminal-litigation', 'Criminal Litigation', 'Expert defense and legal representation in criminal proceedings within the District and High Courts of Nepal.', 'Specializing in bail applications, white-collar crime defense, and appellate practice.', 'gavel', 1),
('property-law', 'Property & Land Law', 'Comprehensive assistance with land disputes, registration, and Lalpurja-related matters in the Kaski region.', 'Handling Guthi land issues, Mohi rights, and border wall disputes with local authorities.', 'home', 2),
('family-law', 'Family & Divorce', 'Sensitive legal handling of Ansa-Banda (inheritance), divorce, and domestic relations cases.', 'Child custody, alimony settlements, and marital property division according to the 2074 Code.', 'people', 3),
('corporate-law', 'Corporate Law', 'Helping local businesses with registration, compliance, and contract management in Pokhara.', 'Company formation, foreign investment regulation, and intellectual property protection.', 'briefcase', 4),
('banking-finance', 'Banking and Finance', 'Representing major financial institutions in Pokhara for loan recovery, mortgage vetting, and compliance with Nepal Rastra Bank directives.', '', 'shield', 5),
('cyber-law', 'Cyber Law and IT', 'Providing guidance on the Electronic Transactions Act, ensuring your business is protected against digital fraud and defamation.', '', 'shield', 6);

-- 4. TEAM MEMBERS
CREATE TABLE team_members (
  id bigint primary key generated always as identity,
  name text not null,
  role text not null,
  specialization text,
  experience text,
  phone text,
  image text,
  member_type text not null default 'associate' CHECK (member_type IN ('senior','associate')),
  sort_order int not null default 0,
  created_at timestamptz default now()
);

INSERT INTO team_members (name, role, specialization, experience, phone, image, member_type, sort_order) VALUES
('Adv. Hari Prasad Pandit', 'Advocate', 'Criminal, Property & Corporate Law', '20+ years', '+977 9856032810', '/static/assets/brand/hpp.jpg', 'senior', 1),
('Adv. Hari Prasad Bhattarai', 'Advocate', 'Legal Specialist', '15+ years', 'Coming Soon', '/static/assets/brand/hpb.jpg', 'senior', 2),
('Sonali Thakur', 'Legal Associate', 'Legal Research & Client Relations', NULL, 'TBA', '', 'associate', 1);

-- 5. TESTIMONIALS
CREATE TABLE testimonials (
  id bigint primary key generated always as identity,
  name text not null,
  role text not null,
  text text not null,
  rating int not null default 5,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

INSERT INTO testimonials (name, role, text, rating, sort_order) VALUES
('B. Gurung', 'Client', 'Aabiskar Law Chamber provided exceptional guidance during my property dispute. Their expertise in Pokhara''s land laws is unmatched.', 5, 1),
('S. Thapa', 'Client', 'Professional, compassionate, and highly effective. They handled our corporate registration with such ease. Highly recommended!', 5, 2),
('P. Sharma', 'Client', 'The best legal counsel I''ve encountered. Their commitment to justice is evident in every interaction. True experts.', 5, 3);

-- 6. CONTACT FORM SUBMISSIONS
CREATE TABLE contact_submissions (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Enable RLS
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read" ON practice_areas FOR SELECT USING (true);
CREATE POLICY "Public read" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read" ON testimonials FOR SELECT USING (true);

-- Allow public insert for contact form
CREATE POLICY "Public insert" ON contact_submissions FOR INSERT WITH CHECK (true);

COMMIT;