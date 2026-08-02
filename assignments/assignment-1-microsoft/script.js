// Basic interactivity & loader behavior
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const prog = document.querySelector('.loader-progress');
  const themeBtn = document.getElementById('themeBtn');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const searchBtn = document.getElementById('searchBtn');
  const searchPanel = document.getElementById('searchPanel');
  const backTop = document.getElementById('backTop');

  // Animate loader progress for up to 4.5s, hide by 5s max
  (function animateLoader() {
    if (!prog || !loader) return;
    const duration = 4500;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      prog.style.width = (t * 100) + '%';
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // give a little delay for UX then hide
        setTimeout(() => hideLoader(), 250);
      }
    }
    requestAnimationFrame(tick);
    // Safety: ensure loader is removed after 5s even if animation interrupted
    setTimeout(() => hideLoader(), 5000);
  })();

  function hideLoader() {
    if (!loader) return;
    loader.style.transition = 'opacity 240ms ease, visibility 240ms';
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    }, 260);
  }

  // Theme toggle (updates data-theme on <html> and localStorage)
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      // switch icon if desired
      const i = themeBtn.querySelector('i');
      if (i) i.className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }

// Mobile menu toggle
if (menuBtn && mobileMenu) {

  menuBtn.addEventListener('click', (e) => {

    e.stopPropagation();

    const open = mobileMenu.classList.toggle('open');

    menuBtn.setAttribute(
      'aria-expanded',
      String(open)
    );

  });


  // Close when clicking outside
  document.addEventListener('click', (e) => {

    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {

      mobileMenu.classList.remove('open');

      menuBtn.setAttribute(
        'aria-expanded',
        'false'
      );

    }

  });


  // Close when clicking menu links
  mobileMenu.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      mobileMenu.classList.remove('open');

      menuBtn.setAttribute(
        'aria-expanded',
        'false'
      );

    });

  });

}


  // Search panel toggle
  if (searchBtn && searchPanel) {
    searchBtn.addEventListener('click', () => {
      const visible = searchPanel.style.display === 'block';
      searchPanel.style.display = visible ? 'none' : 'block';
      if (!visible) {
        const input = document.getElementById('searchInput');
        if (input) input.focus();
      }
    });
  }

  // Back to top
  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Simple reveal-on-scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(r => obs.observe(r));
  } else {
    // fallback: show them all
    reveals.forEach(r => r.classList.add('is-visible'));
  }

  // optional: simple cursor glow follow (only if #cursorGlow exists)
  const cg = document.getElementById('cursorGlow');
  if (cg) {
    cg.style.display = 'block';
    window.addEventListener('pointermove', (ev) => {
      cg.style.left = ev.clientX + 'px';
      cg.style.top = ev.clientY + 'px';
      cg.style.background = 'radial-gradient(circle at center, rgba(0,180,255,0.18) 0%, rgba(0,103,184,0.06) 40%, transparent 70%)';
    }, { passive: true });
  }

  // hide loader also on full window load (images/scripts)
  window.addEventListener('load', () => setTimeout(hideLoader, 200));
});
