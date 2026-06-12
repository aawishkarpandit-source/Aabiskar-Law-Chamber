const Theme = (() => {
  const STORAGE_KEY = 'aal-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function get() {
    return localStorage.getItem(STORAGE_KEY) || LIGHT;
  }

  function set(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    updateIcon(theme);
  }

  function updateIcon(theme) {
    const toggle = document.querySelector('#theme-toggle');
    if (!toggle) return;
    const sun = toggle.querySelector('.icon-sun');
    const moon = toggle.querySelector('.icon-moon');
    if (sun && moon) {
      sun.style.display = theme === DARK ? 'block' : 'none';
      moon.style.display = theme === DARK ? 'none' : 'block';
    }
  }

  function toggle() {
    set(get() === DARK ? LIGHT : DARK);
  }

  function init() {
    const current = get();
    document.documentElement.setAttribute('data-theme', current);
    updateIcon(current);
    const toggleBtn = document.querySelector('#theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggle);
    }
  }

  return { init, toggle, get, set };
})();
