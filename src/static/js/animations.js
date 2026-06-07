const Animations = (() => {
  const SELECTORS = [
    '.animate-up',
    '.animate-left',
    '.animate-scale',
    '.animate-fade'
  ];
  const PARALLAX_ATTR = 'data-parallax';
  const REVEALED = 'revealed';

  let observer = null;
  let parallaxObserver = null;
  let parallaxElements = [];

  function initObserver() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(SELECTORS.join(',')).forEach(el => {
        el.classList.add(REVEALED);
      });
      return;
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(REVEALED);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(SELECTORS.join(',')).forEach(el => {
      observer.observe(el);
    });
  }

  function initParallax() {
    parallaxElements = document.querySelectorAll(`[${PARALLAX_ATTR}]`);
    if (!parallaxElements.length) return;

    if (window.innerWidth < 768) {
      parallaxElements.forEach(el => el.classList.add(REVEALED));
      return;
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute(PARALLAX_ATTR)) || 0.3;
            const rect = el.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            if (visible) {
              const offset = (window.innerHeight - rect.top) * speed;
              el.style.transform = `translateY(${offset * 0.1}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
      });
    }
  }

  function init() {
    initObserver();
    initParallax();
    initAOS();
  }

  return { init };
})();
