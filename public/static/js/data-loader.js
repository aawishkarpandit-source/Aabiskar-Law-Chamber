const DataLoader = {
    cache: {},

    async get(path) {
        if (this.cache[path]) return this.cache[path];
        try {
            const res = await fetch(path);
            this.cache[path] = await res.json();
            return this.cache[path];
        } catch (e) {
            console.error('DataLoader error:', path, e);
            return null;
        }
    },

    async getSite() { return this.get('/info/site.json'); },
    async getStats() { return this.get('/info/stats.json'); },
    async getContent() { return this.get('/info/content.json'); },
    async getTeam() { return this.get('/info/team.json'); },
    async getServices() { return this.get('/info/services.json'); },
    async getTestimonials() { return this.get('/info/testimonials.json'); },
    async getFaq() { return this.get('/info/faq.json'); },

    async renderStats(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const stats = await this.getStats();
        if (!stats) return;
        container.innerHTML = stats.map((s, i) => `
            <div class="stat-item" data-aos="fade-up" ${i > 0 ? `data-aos-delay="${i * 100}"` : ''}>
                <div class="stat-number">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>
        `).join('');
    },

    async renderContent() {
        const content = await this.getContent();
        if (!content) return;

        // Hero
        this.setText('hero-badge', content.hero?.badge || '');
        this.setHTML('hero-title-line1', content.hero?.titleLine1 || '');
        this.setHTML('hero-title-line2', content.hero?.titleLine2 || '');
        this.setText('hero-subtitle', content.hero?.subtitle || '');

        // About section on home page
        this.setText('about-label', content.intro?.label || '');
        this.setHTML('about-title', content.intro?.title || '');
        const aboutParagraphs = document.getElementById('about-paragraphs');
        if (aboutParagraphs && Array.isArray(content.intro?.paragraphs)) {
            aboutParagraphs.innerHTML = content.intro.paragraphs.map(p => `<p>${p}</p>`).join('');
        }

        // Features
        this.setText('features-label', content.features?.label || '');
        this.setHTML('features-title', content.features?.title || '');
        const featuresContainer = document.getElementById('features-cards');
        if (featuresContainer && content.features?.cards) {
            featuresContainer.innerHTML = content.features.cards.map((c, i) => `
                <div class="feature-card" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
                    <div class="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${this.getIconPath(c.icon)}</svg>
                    </div>
                    <h3 class="feature-title">${c.title}</h3>
                    <p class="feature-desc">${c.description}</p>
                </div>
            `).join('');
        }

        // Why Choose Us
        this.setText('why-label', content.whyChooseUs?.label || '');
        this.setHTML('why-title', content.whyChooseUs?.title || '');
        const whyContainer = document.getElementById('why-cards');
        if (whyContainer && content.whyChooseUs?.cards) {
            whyContainer.innerHTML = content.whyChooseUs.cards.map((c, i) => `
                <div class="feature-card" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
                    <div class="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${this.getIconPath(c.icon)}</svg>
                    </div>
                    <h3 class="feature-title">${c.title}</h3>
                    <p class="feature-desc">${c.description}</p>
                </div>
            `).join('');
        }

        // CTA
        this.setHTML('cta-title', content.cta?.title || '');
        this.setHTML('cta-subtitle', content.cta?.subtitle || '');
    },

    async renderTestimonials() {
        const container = document.getElementById('testimonials-cards');
        if (!container) return;
        const testimonials = await this.getTestimonials();
        if (!testimonials) return;
        container.innerHTML = testimonials.map((t, i) => `
            <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
                <div class="testimonial-stars">${'&#9733;'.repeat(t.rating)}</div>
                <p class="testimonial-text">"${t.text}"</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">${t.name.charAt(0)}</div>
                    <div>
                        <p class="testimonial-name">${t.name}</p>
                        <p class="testimonial-role">${t.role}</p>
                    </div>
                </div>
            </div>
        `).join('');
    },

    async renderTeam(containerId, group) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const data = await this.getTeam();
        if (!data || !data[group]) return;
        container.innerHTML = data[group].map((m, i) => `
            <div class="team-card" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
                ${m.image ? `<img src="${m.image}" alt="${m.name}" class="team-photo" loading="lazy">` : `<div class="team-avatar">${m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>`}
                <h3 class="team-name">${m.name}</h3>
                <p class="team-role">${m.role}</p>
                <p class="team-specialization">${m.specialization}</p>
                ${m.experience ? `<p class="team-experience">${m.experience} Experience</p>` : ''}
                ${m.phone && m.phone !== 'Coming Soon' && m.phone !== 'TBA' ? `<a href="tel:${m.phone.replace(/\s/g, '')}" class="team-contact">${m.phone}</a>` : ''}
            </div>
        `).join('');
    },

    async renderServices() {
        const container = document.getElementById('services-grid');
        if (!container) return;
        const services = await this.getServices();
        if (!services) return;
        container.innerHTML = services.map((s, i) => `
            <div class="service-card" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
                <div class="service-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${this.getIconPath(s.icon)}</svg>
                </div>
                <h3 class="service-title">${s.title}</h3>
                <p class="service-desc">${s.description}</p>
                ${s.detail ? `<p class="service-detail">${s.detail}</p>` : ''}
            </div>
        `).join('');
    },

    async renderFaq() {
        const container = document.getElementById('faq-container');
        if (!container) return;
        const faq = await this.getFaq();
        if (!faq) return;
        container.innerHTML = faq.map((item, i) => `
            <div class="faq-item" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
                <button class="faq-question" aria-expanded="false">
                    <span>${item.question}</span>
                    <svg class="faq-chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', !expanded);
                btn.closest('.faq-item').classList.toggle('active');
            });
        });
    },

    getIconPath(icon) {
        const icons = {
            shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
            handshake: '<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/><path d="M12 22V12"/><path d="m8 12 4-4 4 4"/>',
            balance: '<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
            document: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
            chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
            gavel: '<circle cx="12" cy="12" r="2"/><path d="M12 2v4"/><path d="m15.5 7.5 2-2"/><path d="m8.5 7.5-2-2"/><path d="M12 18v4"/><path d="m8.5 16.5-2 2"/><path d="m15.5 16.5 2 2"/>',
            home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
            people: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
            briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
            building: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="2"/><line x1="15" y1="22" x2="15" y2="2"/><line x1="4" y1="12" x2="20" y2="12"/>',
            'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
            'chevron-up': '<polyline points="18 15 12 9 6 15"/>'
        };
        return icons[icon] || icons.shield;
    },

    setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    },

    setHTML(id, html) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }
};
