const Forms = {
    FORM_ENDPOINT: 'https://formspree.io/f/mqejodya',

    init() {
        this.setupSmoothScroll();
        this.setupSubmit();
        this.setupFormValidation();
        console.log('[Forms] initialized');
    },

    setupSmoothScroll() {
        document.addEventListener('click', function(e) {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (!href || href === '#' || href === '#!') return;
            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } catch (_) {}
        });
    },

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.type === 'email') {
            if (!value) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!this.isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.name === 'name') {
            isValid = value.length >= 2;
            errorMessage = 'Name must be at least 2 characters';
        } else if (field.name === 'message') {
            isValid = value.length >= 10;
            errorMessage = 'Message must be at least 10 characters';
        } else if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        if (!isValid) {
            field.classList.add('error');
            const existing = field.parentNode.querySelector('.error-message');
            if (!existing) {
                const errorEl = document.createElement('span');
                errorEl.className = 'error-message';
                errorEl.textContent = errorMessage;
                field.parentNode.insertBefore(errorEl, field.nextSibling);
            } else {
                existing.textContent = errorMessage;
            }
        } else {
            field.classList.remove('error');
            const errorEl = field.parentNode.querySelector('.error-message');
            if (errorEl) errorEl.remove();
        }

        return isValid;
    },

    isValidEmail(email) {
        if (email.length > 254) return false;
        const parts = email.split('@');
        if (parts.length !== 2) return false;
        const [local, domain] = parts;
        if (local.length < 2 || local.length > 64) return false;
        if (domain.length < 4 || domain.length > 255) return false;
        const domainParts = domain.split('.');
        if (domainParts.length < 2) return false;
        const tld = domainParts[domainParts.length - 1];
        if (tld.length < 2 || tld.length > 6) return false;
        if (!/^[a-z]{2,6}$/i.test(tld)) return false;
        return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(email);
    },

    setupSubmit() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const lastSubmit = localStorage.getItem('last_form_submit');
            if (lastSubmit) {
                const elapsed = Date.now() - parseInt(lastSubmit);
                if (elapsed < 60000) {
                    const remaining = Math.ceil((60000 - elapsed) / 1000);
                    const rateBtn = form.querySelector('.btn-submit');
                    if (rateBtn) {
                        rateBtn.textContent = `Wait ${remaining}s`;
                        rateBtn.disabled = true;
                        setTimeout(() => {
                            rateBtn.disabled = false;
                            rateBtn.textContent = 'Send Message';
                        }, remaining * 1000);
                    }
                    return;
                }
            }

            const btn = form.querySelector('.btn-submit');
            const inputs = form.querySelectorAll('input, textarea');

            let allValid = true;
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    allValid = false;
                }
            });

            if (!allValid) return;

            btn.disabled = true;
            btn.textContent = 'Sending...';

            const formData = new FormData(form);

            try {
                const response = await fetch(this.FORM_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                const result = await response.json();

                if (!result.ok) {
                    throw new Error(result.error || 'Formspree returned error');
                }

                localStorage.setItem('last_form_submit', Date.now().toString());

                setTimeout(() => {
                    window.location.href = '/success';
                }, 500);

            } catch (error) {
                console.error('Form submission error:', error);
                btn.disabled = false;
                btn.textContent = 'Send Message';

                setTimeout(() => {
                    window.location.href = '/failed';
                }, 500);
            }
        });
    }
};
