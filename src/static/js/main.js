document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('[Main] DOM ready — initializing');
        await Components.init();

        // Home page
        if (document.getElementById('home-stats')) {
            await Promise.all([
                DataLoader.renderStats('home-stats'),
                DataLoader.renderContent(),
                DataLoader.renderTestimonials()
            ]);
        }

        // About page
        if (document.getElementById('about-team-cards')) {
            await Promise.all([
                DataLoader.renderTeam('about-team-cards', 'senior'),
                DataLoader.renderStats('about-stats')
            ]);
            // Also render about paragraphs from content.json
            const aboutContent = await DataLoader.getContent();
            if (aboutContent?.intro?.paragraphs) {
                const el = document.getElementById('about-paragraphs');
                if (el) {
                    el.innerHTML = aboutContent.intro.paragraphs.map(p => `<p>${p}</p>`).join('');
                }
            }
        }

        // Services page
        if (document.getElementById('services-grid')) {
            await DataLoader.renderServices();
        }

        // Team page
        if (document.getElementById('team-senior')) {
            await Promise.all([
                DataLoader.renderTeam('team-senior', 'senior'),
                DataLoader.renderTeam('team-associates', 'associates'),
                DataLoader.renderStats('team-stats')
            ]);
        }

        // Contact page
        if (document.getElementById('faq-container')) {
            await DataLoader.renderFaq();
        }

    } catch (error) {
        console.error('Main initialization error:', error);
    }
});
