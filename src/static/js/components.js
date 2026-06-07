const Components = {
    componentCache: {},
    siteData: null,

    async init() {
        if (this._initPromise) return this._initPromise;
        this._initPromise = this._doInit();
        return this._initPromise;
    },

    async _doInit() {
        await this.loadSiteData();
        await this.loadComponents();
        console.log('[Components] initialized');
    },

    async loadSiteData() {
        try {
            const res = await fetch('/info/site.json');
            this.siteData = await res.json();
        } catch (e) {
            console.warn('Components: failed to load site.json', e);
        }
    },

    async loadComponents() {
        try {
            await Promise.all([
                this.loadComponent('header-placeholder', '/components/navbar.html'),
                this.loadComponent('footer-placeholder', '/components/footer.html')
            ]);
            this.populateFooter();
            this.initAll();
        } catch (error) {
            console.error('Failed to load components:', error);
            this.initAll();
        }
    },

    populateFooter() {
        if (!this.siteData) return;

        const quickLinksContainer = document.getElementById('footer-quick-links');
        const contactContainer = document.getElementById('footer-contact-info');
        const copyrightEl = document.getElementById('footer-copyright');

        if (quickLinksContainer && this.siteData.footerQuickLinks) {
            quickLinksContainer.innerHTML = this.siteData.footerQuickLinks.map(item =>
                `<li><a href="${item.href}">${item.label}</a></li>`
            ).join('');
        }

        if (contactContainer) {
            const loc = this.siteData.location || {};
            contactContainer.innerHTML = `
                <li><a href="mailto:${this.siteData.email}">${this.siteData.email}</a></li>
                <li><a href="tel:${((this.siteData.phone) || '').replace(/\s/g, '')}">${this.siteData.phone || ''}</a></li>
                <li><span class="footer-address"><strong>${loc.office || ''}</strong><br>${loc.street || ''}<br>${loc.city || ''}, ${loc.district || ''}<br>${loc.province || ''}, ${loc.country || ''}</span></li>
            `;
        }

        if (copyrightEl) {
            copyrightEl.textContent = `\u00A9 ${this.siteData.copyright || '2026'} ${this.siteData.name || 'Aabiskar Law Chamber'}. Managed by ${this.siteData.managedBy || 'Aabiskar Law Chamber'}.`;
        }
    },

    async loadComponent(id, path) {
        const el = document.getElementById(id);
        if (!el) return;

        if (this.componentCache[path]) {
            el.innerHTML = this.componentCache[path];
            return;
        }

        try {
            const res = await fetch(path, { signal: AbortSignal.timeout(8000) });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const html = await res.text();
            this.componentCache[path] = html;
            el.innerHTML = html;
        } catch (err) {
            console.error(`Component load error (${path}):`, err);
            el.innerHTML = '';
        }
    },

    initAll() {
        if (typeof Theme !== 'undefined') Theme.init();
        if (typeof Navigation !== 'undefined') Navigation.init(this.siteData);
        if (typeof Animations !== 'undefined') Animations.init();
        if (typeof Mobile !== 'undefined') Mobile.init();
        if (typeof Forms !== 'undefined') Forms.init();
        this.initScrollTop();
    },

    initScrollTop() {
        const btn = document.getElementById('scroll-top');
        if (!btn) return;
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    btn.classList.toggle('visible', window.scrollY > 400);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Components.init());
