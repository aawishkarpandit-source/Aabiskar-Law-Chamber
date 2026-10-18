/**
 * Lightweight i18n dictionary — no external dependency.
 *
 * Scope: this translates the *interface* (nav, buttons, headings, form labels,
 * footer, ARIA labels, etc.). Content that is managed in Supabase (hero copy,
 * practice areas, team, testimonials, stats) stays DB-sourced and is NOT
 * duplicated here — see README for how to add Nepali content at the data layer.
 */

export type Lang = "en" | "ne";

export const en = {
  // --- Navigation / header ---
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Practice Areas",
  "nav.team": "Team",
  "nav.contact": "Contact",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",
  "nav.langGroup": "Language",
  "theme.light": "Switch to light mode",
  "theme.dark": "Switch to dark mode",
  "cta.book": "Book a Consultation",
  "a11y.skip": "Skip to content",
  "a11y.backToTop": "Back to top",
  "loading": "Loading",

  // --- Footer ---
  "footer.navigate": "Navigate",
  "footer.practiceAreas": "Practice Areas",
  "footer.contact": "Contact",
  "footer.office": "Office",
  "footer.phone": "Phone",
  "footer.email": "Email",
  "footer.book": "Book a consultation",
  "footer.rights": "All rights reserved.",
  "footer.location": "Pokhara, Kaski · Gandaki Province, Nepal",
  "footer.brandTagline": "Legal Excellence · Pokhara",
  "footer.brandDesc":
    "A law firm in Pokhara, Nepal, providing legal services in criminal, property, family, corporate, banking, and cyber law. Led by Adv. Hari Prasad Pandit.",
  "footer.areaCriminal": "Criminal Litigation",
  "footer.areaProperty": "Property & Land Law",
  "footer.areaFamily": "Family & Divorce",
  "footer.areaCorporate": "Corporate Law",
  "footer.areaBanking": "Banking & Finance",
  "footer.areaCyber": "Cyber Law & IT",

  // --- Home ---
  "home.badge": "Trusted Legal Counsel",
  "home.title1": "Legal Counsel",
  "home.title2": "You Can Rely On",
  "home.subtitle":
    "Expert legal services for individuals and businesses across Pokhara and Nepal.",
  "home.tagline": "Trusted Legal Counsel in Pokhara",
  "home.practiceEyebrow": "Practice Areas",
  "home.practiceHeading": "Legal services tailored to your matter",
  "home.practiceAll": "All practice areas",
  "home.teamEyebrow": "Our Team",
  "home.teamHeading": "The advocates behind your case",
  "home.teamAll": "Meet the full team",
  "home.testiEyebrow": "Client Stories",
  "home.testiHeading": "What our clients say",
  "home.learnMore": "Learn more about us",

  // --- About ---
  "about.eyebrow": "About the Firm",
  "about.title": "A commitment to justice, grounded in Pokhara",
  "about.subtitle":
    "Providing legal services with integrity and care for individuals and businesses across Nepal.",
  "about.valuesEyebrow": "Our Values",
  "about.valuesHeading": "The principles we work by",
  "about.integrity": "Integrity",
  "about.integrityDesc":
    "We uphold the highest ethical standards in all our dealings, ensuring transparency and honesty with every client.",
  "about.excellence": "Excellence",
  "about.excellenceDesc":
    "We strive for excellence in every case we handle, leaving no stone unturned in our pursuit of justice.",
  "about.compassion": "Compassion",
  "about.compassionDesc":
    "We understand that legal matters can be stressful, and we treat every client with empathy and understanding.",
  "about.teamEyebrow": "Our Team",
  "about.teamHeading": "Meet the people",
  "about.teamAll": "Full team profiles",
  "about.ctaTitle": "Discuss your legal matter with us",
  "about.ctaButton": "Book a Consultation",

  // --- Services / Practice Areas ---
  "services.eyebrow": "Practice Areas",
  "services.title": "Legal services across the matters that matter most",
  "services.subtitle":
    "From criminal defense to corporate compliance, we provide clear, practical counsel for individuals and businesses across Nepal.",
  "services.processEyebrow": "Our Process",
  "services.processHeading": "How we work with you",
  "services.p1Title": "Consultation",
  "services.p1Desc":
    "We listen to your case and understand your legal needs thoroughly.",
  "services.p2Title": "Analysis",
  "services.p2Desc":
    "Our team analyzes your case and develops a strategic approach.",
  "services.p3Title": "Action",
  "services.p3Desc": "We execute the legal strategy with precision and dedication.",
  "services.p4Title": "Resolution",
  "services.p4Desc": "We work towards the best possible outcome for your case.",
  "services.discuss": "Discuss this service",
  "services.emptyTitle": "No practice areas to show",
  "services.emptyMsg":
    "Please check back soon, or contact us to discuss your matter.",
  "services.emptyBtn": "Contact Us",
  "services.ctaTitle": "Not sure where to start?",
  "services.ctaSub":
    "Tell us about your situation and we'll point you in the right direction.",
  "services.ctaBtn": "Request a Consultation",

  // --- Team ---
  "team.eyebrow": "Our Team",
  "team.title": "Advocates dedicated to your matter",
  "team.subtitle":
    "Experienced legal professionals committed to clear counsel and diligent representation.",
  "team.leadership": "Leadership",
  "team.seniorHeading": "Senior Advocates",
  "team.assocHeading": "Legal Associates",
  "team.focus": "Focus",
  "team.experience": "Experience",
  "team.phone": "Phone",
  "team.seniorEmpty": "No senior advocates to show right now.",
  "team.ctaTitle": "Work with our team",
  "team.ctaSub": "Schedule a consultation with our legal professionals today.",
  "team.ctaBtn": "Contact Us",

  // --- Contact ---
  "contact.eyebrow": "Contact",
  "contact.title": "Start the conversation",
  "contact.subtitle":
    "Ready to discuss your legal needs? Reach out and we'll respond as soon as we can.",
  "contact.getInTouch": "Get in touch",
  "contact.officeDetails": "Office & contact details",
  "contact.office": "Office",
  "contact.phone": "Phone",
  "contact.email": "Email",
  "contact.hours": "Office Hours",
  "contact.monFri": "Mon – Fri",
  "contact.saturday": "Saturday",
  "contact.formHeading": "Send us a message",
  "contact.requiredNote": "Fields marked * are required.",
  "contact.fullName": "Full Name",
  "contact.emailLabel": "Email",
  "contact.phoneOptional": "Phone (optional)",
  "contact.subjectLabel": "Subject",
  "contact.messageLabel": "Message",
  "contact.phName": "Your full name",
  "contact.phEmail": "you@example.com",
  "contact.phPhone": "+977 98XXXXXXXX",
  "contact.phMessage": "Briefly describe how we can help.",
  "contact.selectSubject": "Select a subject",
  "contact.subGeneral": "General Inquiry",
  "contact.subConsult": "Legal Consultation",
  "contact.subCase": "Case Discussion",
  "contact.subAppointment": "Appointment Request",
  "contact.subOther": "Other",
  "contact.errName": "Name is required",
  "contact.errEmail": "Email is required",
  "contact.errSubject": "Please select a subject",
  "contact.errMessage": "Message is required",
  "contact.errEmailInvalid": "Please enter a valid email address",
  "contact.sending": "Sending…",
  "contact.send": "Send Message",
  "contact.successTitle": "Thank you",
  "contact.successMsg":
    "Your message has been sent. We'll get back to you as soon as possible.",
  "contact.again": "Send another message",
  "contact.errSubmit":
    "Sorry, we couldn't send your message right now. Please try again, or call us directly.",
  "contact.errGeneric": "Something went wrong. Please try again.",
  "contact.disclaimer":
    "Sending a message does not create an attorney–client relationship. Please do not include confidential information until we have agreed to act for you.",
  "contact.mapTitle": "Map showing the Aabiskar Law Chamber office in Pokhara",

  // --- 404 ---
  "nf.title": "Page not found",
  "nf.message":
    "The page you're looking for doesn't exist or has been moved. Let us help you find your way.",
  "nf.home": "Back to home",
  "nf.contact": "Contact us",

  // --- Cookie consent ---
  "cookie.title": "We value your privacy",
  "cookie.text":
    "This site uses cookies from Google Analytics to analyze traffic. No personal data is sold or shared.",
  "cookie.decline": "Decline",
  "cookie.accept": "Accept",
};

export type TranslationKey = keyof typeof en;

export const ne: Record<TranslationKey, string> = {
  // --- Navigation / header ---
  "nav.home": "होम",
  "nav.about": "हाम्रोबारे",
  "nav.services": "अभ्यास क्षेत्रहरू",
  "nav.team": "टोली",
  "nav.contact": "सम्पर्क",
  "nav.openMenu": "मेनु खोल्नुहोस्",
  "nav.closeMenu": "मेनु बन्द गर्नुहोस्",
  "nav.langGroup": "भाषा",
  "theme.light": "हल्का मोडमा स्विच गर्नुहोस्",
  "theme.dark": "गाढा मोडमा स्विच गर्नुहोस्",
  "cta.book": "परामर्श बुक गर्नुहोस्",
  "a11y.skip": "सामग्रीमा जानुहोस्",
  "a11y.backToTop": "माथि फर्कनुहोस्",
  "loading": "लोड हुँदै",

  // --- Footer ---
  "footer.navigate": "पृष्ठहरू",
  "footer.practiceAreas": "अभ्यास क्षेत्रहरू",
  "footer.contact": "सम्पर्क",
  "footer.office": "कार्यालय",
  "footer.phone": "फोन",
  "footer.email": "इमेल",
  "footer.book": "परामर्श बुक गर्नुहोस्",
  "footer.rights": "सर्वाधिकार सुरक्षित।",
  "footer.location": "पोखरा, कास्की · गण्डकी प्रदेश, नेपाल",
  "footer.brandTagline": "कानुनी उत्कृष्टता · पोखरा",
  "footer.brandDesc":
    "नेपालको पोखरामा अवस्थित एक कानुन फर्म, जसले अपराध, सम्पत्ति, परिवार, कर्पोरेट, बैंकिङ र साइबर कानुनमा कानुनी सेवा प्रदान गर्दछ। वरिष्ठ अधिवक्ता हरि प्रसाण्ड पाण्डेद्वारा नेतृत्व।",
  "footer.areaCriminal": "आपराधिक मुद्दा",
  "footer.areaProperty": "सम्पत्ति र जग्गा कानुन",
  "footer.areaFamily": "परिवार र छुट्टिया",
  "footer.areaCorporate": "कर्पोरेट कानुन",
  "footer.areaBanking": "बैंकिङ र वित्त",
  "footer.areaCyber": "साइबर कानुन र सूचना प्रविधि",

  // --- Home ---
  "home.badge": "भरपर्दो कानुनी परामर्श",
  "home.title1": "कानुनी परामर्श",
  "home.title2": "जसमा तपाईं भर पर्न सक्नुहुन्छ",
  "home.subtitle":
    "पोखरा र नेपालभरका व्यक्ति र व्यवसायहरूका लागि विशेषज्ञ कानुनी सेवाहरू।",
  "home.tagline": "पोखरामा भरपर्दो कानुनी परामर्श",
  "home.practiceEyebrow": "अभ्यास क्षेत्रहरू",
  "home.practiceHeading": "तपाईंको मुद्दा अनुसार कानुनी सेवाहरू",
  "home.practiceAll": "सबै अभ्यास क्षेत्रहरू",
  "home.teamEyebrow": "हाम्रो टोली",
  "home.teamHeading": "तपाईंको मुद्दाका पछाडि रहेका वकिलहरू",
  "home.teamAll": "पूरू टोली भेट्नुहोस्",
  "home.testiEyebrow": "ग्राहकका कथाहरू",
  "home.testiHeading": "हाम्रा ग्राहकहरूले भन्छन्",
  "home.learnMore": "हाम्रोबारे थप जान्नुहोस्",

  // --- About ---
  "about.eyebrow": "कार्यालयबारे",
  "about.title": "पोखरामा आधारित न्यायप्रति प्रतिबद्धता",
  "about.subtitle":
    "नेपालभरका व्यक्ति र व्यवसायहरूलाई सत्यनिष्ठा र हेरचाहका साथ कानुनी सेवा प्रदान गर्दै।",
  "about.valuesEyebrow": "हाम्रा मूल्यहरू",
  "about.valuesHeading": "हामीले पालना गर्ने सिद्धान्तहरू",
  "about.integrity": "सत्यनिष्ठा",
  "about.integrityDesc":
    "हामी सबै व्यवहारमा उच्च नैतिक मापदण्ड कायम राख्छौं, हरेक ग्राहकसँग पारदर्शिता र इमानदारी सुनिश्चित गर्दै।",
  "about.excellence": "उत्कृष्टता",
  "about.excellenceDesc":
    "हामी ह्यान्डल गर्ने हरेक मुद्दामा उत्कृष्टताको लागि प्रयास गर्छौं, न्यायको खोजीमा कुनै पत्थर नछोड्दै।",
  "about.compassion": "सहानुभूति",
  "about.compassionDesc":
    "कानुनी मुद्दाहरू तनावपूर्ण हुन सक्छन् भन्ने हामी बुझ्छौं, र हरेक ग्राहकलाई समानुभूति र बुझाइका साथ व्यवहार गर्छौं।",
  "about.teamEyebrow": "हाम्रो टोली",
  "about.teamHeading": "टोली भेट्नुहोस्",
  "about.teamAll": "पूरू टोली प्रोफाइलहरू",
  "about.ctaTitle": "हामीसँग आफ्नो कानुनी मुद्दा छलफल गर्नुहोस्",
  "about.ctaButton": "परामर्श बुक गर्नुहोस्",

  // --- Services / Practice Areas ---
  "services.eyebrow": "अभ्यास क्षेत्रहरू",
  "services.title": "महत्त्वपूर्ण मुद्दाहरूमा व्यापक कानुनी सेवा",
  "services.subtitle":
    "अपराध बचावदेखि कर्पोरेट अनुपालनसम्म, हामी नेपालभरका व्यक्ति र व्यवसायहरूलाई स्पष्ट र व्यावहारिक कानुनी परामर्श दिन्छौं।",
  "services.processEyebrow": "हाम्रो प्रक्रिया",
  "services.processHeading": "हामी तपाईंसँग कसरी काम गर्छौं",
  "services.p1Title": "परामर्श",
  "services.p1Desc":
    "हामी तपाईंको मुद्दा सुन्छौं र तपाईंका कानुनी आवश्यकताहरू राम्ररी बुझ्छौं।",
  "services.p2Title": "विश्लेषण",
  "services.p2Desc":
    "हाम्रो टोलीले तपाईंको मुद्दा विश्लेषण गरी रणनीतिक दृष्टिकोण तयार गर्छ।",
  "services.p3Title": "कारबाही",
  "services.p3Desc":
    "हामी सटीकता र समर्पणका साथ कानुनी रणनीति कार्यान्वयन गर्छौं।",
  "services.p4Title": "समाधान",
  "services.p4Desc":
    "हामी तपाईंको मुद्दाको सम्भव उत्तम परिणामका लागि काम गर्छौं।",
  "services.discuss": "यो सेवाबारे छलफल गर्नुहोस्",
  "services.emptyTitle": "देखाउनका लागि कुनै अभ्यास क्षेत्र छैन",
  "services.emptyMsg":
    "कृपया छिटै फेरि हेर्नुहोस्, वा आफ्नो मुद्दा छलफल गर्न हामीलाई सम्पर्क गर्नुहोस्।",
  "services.emptyBtn": "हामीलाई सम्पर्क गर्नुहोस्",
  "services.ctaTitle": "कहाँबाट सुरु गर्ने निश्चित छैन?",
  "services.ctaSub":
    "आफ्नो अवस्थाबारे हामीलाई बताउनुहोस्, हामी सही दिशा दिनेछौं।",
  "services.ctaBtn": "परामर्शको अनुरोध गर्नुहोस्",

  // --- Team ---
  "team.eyebrow": "हाम्रो टोली",
  "team.title": "तपाईंको मुद्दा समर्पित अधिवक्ताहरू",
  "team.subtitle":
    "स्पष्ट परामर्श र परिश्रमी प्रतिनिधित्व प्रति प्रतिबद्ध अनुभवी कानुनी पेशेवरहरू।",
  "team.leadership": "नेतृत्व",
  "team.seniorHeading": "वरिष्ठ अधिवक्ताहरू",
  "team.assocHeading": "कानुनी सहयोगीहरू",
  "team.focus": "विशेषज्ञता",
  "team.experience": "अनुभव",
  "team.phone": "फोन",
  "team.seniorEmpty": "अहिले देखाउनका लागि कुनै वरिष्ठ अधिवक्ता छैन।",
  "team.ctaTitle": "हाम्रो टोलीसँग काम गर्नुहोस्",
  "team.ctaSub": "आज नै हाम्रा कानुनी पेशेवरहरूसँग परामर्श तोक्नुहोस्।",
  "team.ctaBtn": "हामीलाई सम्पर्क गर्नुहोस्",

  // --- Contact ---
  "contact.eyebrow": "सम्पर्क",
  "contact.title": "कुराकानी सुरु गर्नुहोस्",
  "contact.subtitle":
    "आफ्ना कानुनी आवश्यकताहरू छलफल गर्न तयार? सम्पर्क गर्नुहोस्, हामी सकेसम्म छिटो जवाफ दिनेछौं।",
  "contact.getInTouch": "सम्पर्कमा रहनुहोस्",
  "contact.officeDetails": "कार्यालय र सम्पर्क विवरणहरू",
  "contact.office": "कार्यालय",
  "contact.phone": "फोन",
  "contact.email": "इमेल",
  "contact.hours": "कार्यालय समय",
  "contact.monFri": "सोम – शुक्र",
  "contact.saturday": "शनिबार",
  "contact.formHeading": "हामीलाई सन्देश पठाउनुहोस्",
  "contact.requiredNote": "* चिह्नित क्षेत्रहरू आवश्यक छन्।",
  "contact.fullName": "पूरा नाम",
  "contact.emailLabel": "इमेल",
  "contact.phoneOptional": "फोन (ऐच्छिक)",
  "contact.subjectLabel": "विषय",
  "contact.messageLabel": "सन्देश",
  "contact.phName": "तपाईंको पूरा नाम",
  "contact.phEmail": "you@example.com",
  "contact.phPhone": "+977 98XXXXXXXX",
  "contact.phMessage": "संक्षेपमा बताउनुहोस् हामी कसरी सहयोग गर्न सक्छौं।",
  "contact.selectSubject": "विषय छान्नुहोस्",
  "contact.subGeneral": "सामान्य जानकारी",
  "contact.subConsult": "कानुनी परामर्श",
  "contact.subCase": "मुद्दा छलफल",
  "contact.subAppointment": "भेटघाटको अनुरोध",
  "contact.subOther": "अन्य",
  "contact.errName": "नाम आवश्यक छ",
  "contact.errEmail": "इमेल आवश्यक छ",
  "contact.errSubject": "कृपया विषय छान्नुहोस्",
  "contact.errMessage": "सन्देश आवश्यक छ",
  "contact.errEmailInvalid": "कृपया मान्य इमेल ठेगाना प्रविष्ट गर्नुहोस्",
  "contact.sending": "पठाउँदै…",
  "contact.send": "सन्देश पठाउनुहोस्",
  "contact.successTitle": "धन्यवाद",
  "contact.successMsg":
    "तपाईंको सन्देश पठाइयो। हामी सकेसम्म छिटो सम्पर्क गर्नेछौं।",
  "contact.again": "अर्को सन्देश पठाउनुहोस्",
  "contact.errSubmit":
    "माफ गर्नुहोस्, हाल हामी तपाईंको सन्देश पठाउन सकेनौं। कृपया फेरि प्रयास गर्नुहोस् वा सिधै फोन गर्नुहोस्।",
  "contact.errGeneric": "केही गलत भयो। कृपया फेरि प्रयास गर्नुहोस्।",
  "contact.disclaimer":
    "सन्देश पठाउनुले अधिवक्ता–ग्राहक सम्बन्ध सिर्जना गर्दैन। कृपया हामीले तपाईंको पक्ष लिने सहमति नदिएसम्म गोपनीय जानकारी समावेश नगर्नुहोस्।",
  "contact.mapTitle": "पोखरामा रहेको आबिस्कर ल चाम्बर कार्यालय देखाउने नक्सा",

  // --- 404 ---
  "nf.title": "पृष्ठ भेटिएन",
  "nf.message":
    "तपाईंले खोजिरहनुभएको पृष्ठ अवस्थित छैन वा सारिएको छ। सही बाटो भेट्न हामीलाई मद्दत गर्न दिनुहोस्।",
  "nf.home": "मुख्य पृष्ठमा फर्कनुहोस्",
  "nf.contact": "हामीलाई सम्पर्क गर्नुहोस्",

  // --- Cookie consent ---
  "cookie.title": "हामी तपाईंको गोपनीयतालाई महत्व दिन्छौं",
  "cookie.text":
    "यो साइटले ट्राफिक विश्लेषण गर्न Google Analytics कुकीहरू प्रयोग गर्छ। व्यक्तिगत डाटा बिक्री वा साझेदारी गरिँदैन।",
  "cookie.decline": "अस्वीकार गर्नुहोस्",
  "cookie.accept": "स्वीकार गर्नुहोस्",
};

export const dictionaries: Record<Lang, Record<TranslationKey, string>> = {
  en,
  ne,
};
