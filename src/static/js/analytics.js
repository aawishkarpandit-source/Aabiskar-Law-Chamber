const Analytics = (() => {
  const GA_ID = '';

  function init() {
    if (!GA_ID) {
      console.log('[Analytics] GA4 placeholder — no tracking ID configured');
      return;
    }
    console.log('[Analytics] GA4 initialized:', GA_ID);
  }

  function trackPageView(path) {
    console.log('[Analytics] Page view:', path);
  }

  function trackEvent(name, params) {
    console.log('[Analytics] Event:', name, params);
  }

  return { init, trackPageView, trackEvent };
})();
