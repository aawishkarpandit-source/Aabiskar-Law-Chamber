-- ============================================================================
-- Aabiskar Law Chamber — Nepali (ne) content migration
-- ============================================================================
-- Purpose: add optional Nepali ("_np") content alongside the existing English
--          content so the site can render fully bilingual once the query layer
--          selects by the active language.
--
-- SAFETY / DESIGN NOTES
--   * ADDITIVE + NON-DESTRUCTIVE. This only ADDS nullable columns and INSERTS
--     new `site_config` rows. It never DROPs, UPDATEs, or redefines existing
--     English columns, rows, or data. Re-running is safe:
--       - DDL uses `ADD COLUMN IF NOT EXISTS`
--       - site_config inserts use `ON CONFLICT (key) DO NOTHING`
--   * RLS IS UNCHANGED. The existing "Public read" SELECT policies are
--     table-level, so the new columns are already readable. No policy changes,
--     no new grants, no service-role exposure.
--   * GRACEFUL FALLBACK. English columns remain the source of truth. The query
--     layer should render `COALESCE(<col>_np, <col>)` when lang = 'ne', so any
--     row with a NULL `_np` value simply shows the English text. Nepali content
--     can therefore be filled in incrementally, record by record.
--   * DRAFT TRANSLATIONS. The seeded Nepali below is a starting draft to make
--     the feature demonstrable. Have a native speaker / the firm review the
--     legal wording before relying on it publicly.
--
-- HOW THE QUERY LAYER CONSUMES THIS (follow-up, not part of this file):
--   * Relational tables (stats, practice_areas, team_members, testimonials):
--     the existing `select('*')` already returns the new `_np` columns. In the
--     component/query, prefer the `_np` field when lang === 'ne':
--         const label = lang === 'ne' ? (row.label_np ?? row.label) : row.label
--     (Extend the TS interfaces in src/types/index.ts with optional `*_np`.)
--   * site_config (jsonb keyed by `key`): the Nepali variants are stored under
--     parallel keys (`hero_np`, `intro_np`, ...). Fetch the `_np` key when
--     lang === 'ne' and fall back to the English key if that row is absent:
--         const key = lang === 'ne' ? 'hero_np' : 'hero'
--         ... .eq('key', key).maybeSingle()
--         if (!data && lang === 'ne') fetch 'hero' instead
--
-- Apply via the Supabase SQL Editor. This file is NOT applied automatically.
-- ============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. STATS — add Nepali label
-- ---------------------------------------------------------------------------
ALTER TABLE stats ADD COLUMN IF NOT EXISTS label_np text;

-- ---------------------------------------------------------------------------
-- 2. PRACTICE AREAS — add Nepali title / description / detail
-- ---------------------------------------------------------------------------
ALTER TABLE practice_areas ADD COLUMN IF NOT EXISTS title_np text;
ALTER TABLE practice_areas ADD COLUMN IF NOT EXISTS description_np text;
ALTER TABLE practice_areas ADD COLUMN IF NOT EXISTS detail_np text;

-- ---------------------------------------------------------------------------
-- 3. TEAM MEMBERS — add Nepali role / specialization / experience
--     (name is a proper noun and stays as-is)
-- ---------------------------------------------------------------------------
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS role_np text;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS specialization_np text;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS experience_np text;

-- ---------------------------------------------------------------------------
-- 4. TESTIMONIALS — add Nepali role / text
--     (client `name` stays as-is; consider leaving text_np NULL to preserve
--      the client's original words)
-- ---------------------------------------------------------------------------
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS role_np text;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS text_np text;


-- ===========================================================================
-- SEED DRAFT NEPALI CONTENT (optional — safe to skip; NULL = show English)
-- ===========================================================================

-- --- stats -----------------------------------------------------------------
UPDATE stats SET label_np = CASE sort_order
  WHEN 1 THEN 'वर्षको अनुभव'
  WHEN 2 THEN 'सफलता'
  WHEN 3 THEN 'परामर्शहरू'
  WHEN 4 THEN 'ग्राहक सन्तुष्टि'
END
WHERE label_np IS NULL;

-- --- practice areas --------------------------------------------------------
UPDATE practice_areas SET
  title_np = CASE id
    WHEN 'criminal-litigation' THEN 'आपराधिक मुद्दा'
    WHEN 'property-law'        THEN 'सम्पत्ति र जग्गा कानुन'
    WHEN 'family-law'          THEN 'परिवार र छुट्टिया'
    WHEN 'corporate-law'       THEN 'कर्पोरेट कानुन'
    WHEN 'banking-finance'     THEN 'बैंकिङ र वित्त'
    WHEN 'cyber-law'           THEN 'साइबर कानुन र सूचना प्रविधि'
  END,
  description_np = CASE id
    WHEN 'criminal-litigation' THEN 'नेपालको जिल्ला र उच्च अदालतमा आपराधिक कारबाहीहरूमा विशेषज्ञ बचाव र कानुनी प्रतिनिधित्व।'
    WHEN 'property-law'        THEN 'कास्की क्षेत्रमा जग्गा विवाद, दर्ता र लालपुर्जा सम्बन्धी मामिलाहरूमा व्यापक सहयोग।'
    WHEN 'family-law'          THEN 'अन्सबन्ध (उत्तराधिकार), छुट्टिया र घरेलु सम्बन्धका मुद्दाहरूको संवेदनशील कानुनी ह्यान्डलिङ।'
    WHEN 'corporate-law'       THEN 'पोखरामा स्थानीय व्यवसायहरूलाई दर्ता, अनुपालन र सम्झौता व्यवस्थापनमा सहयोग।'
    WHEN 'banking-finance'     THEN 'ऋण वसूली, गिरवी जाँच र नेपाल राष्ट्र बैंकका निर्देशिकाहरूको अनुपालनका लागि पोखराका प्रमुख वित्तीय संस्थाहरूको प्रतिनिधित्व।'
    WHEN 'cyber-law'           THEN 'इलेक्ट्रोनिक लेनदेन ऐनबारे मार्गदर्शन, तपाईंको व्यवसाय डिजिटल जालसाजी र मानहानिबाट सुरक्षित सुनिश्चित गर्दै।'
  END,
  detail_np = CASE id
    WHEN 'criminal-litigation' THEN 'जमानत आवेदन, सफेदपोश अपराध बचाव र अपील अभ्यासमा विशेषज्ञता।'
    WHEN 'property-law'        THEN 'गुठी जग्गा मुद्दा, मोही अधिकार र स्थानीय निकायसँगका सीमा विवादहरूको व्यवस्थापन।'
    WHEN 'family-law'          THEN '२०७४ को संहिता अनुसार बाल हिरासत, भरणपोषण सम्झौता र वैवाहिक सम्पत्ति विभाजन।'
    WHEN 'corporate-law'       THEN 'कम्पनी गठन, वैदेशिक लगानी नियमन र बौद्धिक सम्पत्ति संरक्षण।'
    ELSE detail_np  -- banking-finance & cyber-law have empty detail in English
  END
WHERE title_np IS NULL;

-- --- team members ----------------------------------------------------------
UPDATE team_members SET
  role_np = CASE name
    WHEN 'Adv. Hari Prasad Pandit'   THEN 'अधिवक्ता'
    WHEN 'Adv. Hari Prasad Bhattarai' THEN 'अधिवक्ता'
    WHEN 'Sonali Thakur'             THEN 'कानुनी सहयोगी'
  END,
  specialization_np = CASE name
    WHEN 'Adv. Hari Prasad Pandit'   THEN 'आपराधिक, सम्पत्ति र कर्पोरेट कानुन'
    WHEN 'Adv. Hari Prasad Bhattarai' THEN 'कानुनी विशेषज्ञ'
    WHEN 'Sonali Thakur'             THEN 'कानुनी अनुसन्धान र ग्राहक सम्बन्ध'
  END,
  experience_np = CASE name
    WHEN 'Adv. Hari Prasad Pandit'   THEN '२०+ वर्ष'
    WHEN 'Adv. Hari Prasad Bhattarai' THEN '१५+ वर्ष'
    ELSE experience_np  -- Sonali Thakur has NULL experience
  END
WHERE role_np IS NULL;

-- --- testimonials ----------------------------------------------------------
UPDATE testimonials SET
  role_np = 'ग्राहक',
  text_np = CASE sort_order
    WHEN 1 THEN 'आबिस्कर ल चाम्बरले मेरो सम्पत्ति विवादको क्रममा उत्कृष्ट मार्गदर्शन प्रदान गर्‍यो। पोखराको जग्गा कानुनमा उनीहरूको विशेषज्ञता अतुलनीय छ।'
    WHEN 2 THEN 'व्यावसायिक, समानुभूतिपूर्ण र अत्यन्त प्रभावकारी। उनीहरूले हाम्रो कर्पोरेट दर्ता यति सहजतासँग सम्पन्न गरे। अत्यन्त सिफारिस!'
    WHEN 3 THEN 'मैले भेटेको सबैभन्दा राम्रो कानुनी परामर्श। न्यायप्रतिको उनीहरूको प्रतिबद्धता हरेक भेटघाटमा स्पष्ट देखिन्छ। साँच्चै विशेषज्ञहरू।'
  END
WHERE text_np IS NULL;


-- ===========================================================================
-- SITE_CONFIG — Nepali jsonb variants under parallel `*_np` keys
--   The English rows are untouched. The query layer fetches the `_np` key when
--   lang = 'ne' and falls back to the English key if the row is missing, so it
--   is safe to omit any row here you don't want to translate yet.
-- ===========================================================================
INSERT INTO site_config (key, value) VALUES

('hero_np', '{
  "badge": "उत्कृष्टता र सत्यनिष्ठाका लागि मान्यताप्राप्त",
  "titleLine1": "पोखराको सर्वोत्तम",
  "titleLine2": "कानुन चाम्बर",
  "subtitle": "उत्कृष्टता र सत्यनिष्ठाका लागि मान्यताप्राप्त, नेपालभरका व्यक्ति र व्यवसायहरूका लागि उच्चस्तरीय कानुनी समाधान प्रदान गर्दै। तपाईंको न्याय, हाम्रो प्रतिबद्धता।",
  "ctaPrimary": "परामर्श बुक गर्नुहोस्",
  "ctaSecondary": "हाम्रा सेवाहरू"
}')

,('intro_np', '{
  "label": "हामी को हौं",
  "title": "पोखराका सबैभन्दा भरपर्दो कानुनी सल्लाहकार",
  "paragraphs": [
    "आबिस्कर ल चाम्बरमा हामी बुझ्छौं कि कानुनी चुनौतीहरूले प्राविधिक ज्ञानभन्दा बढी चाहिन्छ; तिनीहरूलाई कास्की र नेपालभरको स्थानीय न्यायिक परिदृश्यको गहिरो बुझाइ चाहिन्छ। हाम्रो फर्म जग्गा विवाद, कर्पोरेट अनुपालन र आपराधिक बचावसम्बन्धी ऐतिहासिक मुद्दाहरूमा अग्रणी रहेको छ।",
    "कास्कीको जिल्ला अदालतदेखि उच्च र सर्वोच्च अदालतसम्म, हाम्रा अधिवक्ताहरूसँग ठूलो अनुभव छ। हामी नागरिक मुद्दाहरूमा कडा प्रतिनिधित्व प्रदान गर्छौं, मुलुकी नागरिक संहिता सटीक रूपमा लागू गरेर तपाईंको सम्पत्ति र परिवारको हित सुरक्षित गर्दै।"
  ],
  "image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
  "imageAlt": "कानुनी परामर्श"
}')

,('about_np', '{
  "label": "हाम्रोबारे",
  "title": "न्यायप्रति प्रतिबद्धता",
  "paragraphs": [
    "नेपालमा कानुनी प्रक्रियाहरू डरलाग्ने हुन सक्छन्। जग्गा दर्ताका लागि तपाईं मालपोत कार्यालयसँग काम गर्दै हुनुहुन्छ वा पोखराको उच्च अदालतमा नेभिगेट गर्दै हुनुहुन्छ, हामी तपाईंसँगै छौं। हाम्रो दर्शन ''ऑडी अल्टेरम पार्टेम'' — सुनिएको अधिकार — मा आधारित छ। हामी सुनिश्चित गर्छौं कि न्यायको नौटंकी गलियाराहरूमा तपाईंको आवाज हराउँदैन।",
    "हामी २०७४ को नयाँ श्रम कानुनमा पनि विशेषज्ञ छौं, द्रुत रूपमा विकसित हुँदै गरेको पोखराको औद्योगिक क्षेत्रमा रोजगारदाता र कर्मचारी दुवैलाई साझा भूमि भेट्न मद्दत गर्दै।"
  ]
}')

,('features_np', '{
  "label": "हाम्रा सेवाहरू",
  "title": "हाम्रा अग्रणी सेवाहरू",
  "cards": [
    {
      "title": "सम्पत्ति संरक्षण",
      "description": "नेपाली कानुन अन्तर्गत तपाईंको पारिवारिक सम्पदा सुरक्षित रहोस् भनेर सम्पत्ति कानुन र उत्तराधिकारका जटिलताहरूमा मार्गदर्शन।",
      "icon": "shield"
    },
    {
      "title": "मध्यस्थता सेवाहरू",
      "description": "महँगो अदालती लडाइँतर्फ नबढी संरचित समझदारीबाट विवाद समाधान।",
      "icon": "handshake"
    },
    {
      "title": "नागरिक अधिवक्ता",
      "description": "अपराध कानुन, सम्झौता भङ्ग र व्यक्तिगत क्षति दाबीहरूमा तपाईंको अधिकारका लागि अतुलनीय समर्पणसथ लडाइँ।",
      "icon": "balance"
    }
  ]
}')

,('whyChooseUs_np', '{
  "label": "किन हामीलाई छान्ने",
  "title": "किन हामीलाई छान्ने?",
  "cards": [
    {
      "title": "विशेषज्ञ अधिवक्ता",
      "description": "हाम्रा वकिलहरू नेपालको मुलुकी नागरिक संहिता र आपराधिक संहितामा विशेषज्ञ हुन्, स्थानीय कानुनहरूमा अतुलनीय दृष्टिकोण प्रदान गर्दै।",
      "icon": "balance"
    },
    {
      "title": "सूक्ष्म योजना",
      "description": "कागजात तयारी र मुद्दा रणनीतिमा हामी कुनै पत्थर नछोड्दै ग्राहकहरूका लागि सम्भव उत्तम परिणाम सुनिश्चित गर्छौं।",
      "icon": "document"
    },
    {
      "title": "पारदर्शी सञ्चार",
      "description": "कानुनी प्रक्रियाको हरेक चरणमा ग्राहकहरूलाई सूचित राख्ने, स्पष्टता र मन की शान्ति सुनिश्चित गर्ने हाम्रो विश्वास छ।",
      "icon": "chat"
    }
  ]
}')

,('cta_np', '{
  "title": "आज नै आफ्नो कानुनी यात्रा सुरु गर्नुहोस्",
  "subtitle": "आफ्नो भविष्य संयोगमा नछोड्नुहोस्। पोखराका उत्तम कानुनी मस्तिष्कहरूसँग परामर्श गर्नुहोस्।",
  "primaryBtn": "भेटघाट तोक्नुहोस्",
  "secondaryBtn": "अभ्यास क्षेत्रहरू हेर्नुहोस्"
}')

ON CONFLICT (key) DO NOTHING;

COMMIT;

-- ============================================================================
-- ROLLBACK (if needed): remove only what this migration added.
-- The English data is untouched, so rolling back loses only the Nepali content.
-- ============================================================================
-- BEGIN;
-- ALTER TABLE stats         DROP COLUMN IF EXISTS label_np;
-- ALTER TABLE practice_areas DROP COLUMN IF EXISTS title_np, DROP COLUMN IF EXISTS description_np, DROP COLUMN IF EXISTS detail_np;
-- ALTER TABLE team_members  DROP COLUMN IF EXISTS role_np, DROP COLUMN IF EXISTS specialization_np, DROP COLUMN IF EXISTS experience_np;
-- ALTER TABLE testimonials  DROP COLUMN IF EXISTS role_np, DROP COLUMN IF EXISTS text_np;
-- DELETE FROM site_config WHERE key IN ('hero_np','intro_np','about_np','features_np','whyChooseUs_np','cta_np');
-- COMMIT;
