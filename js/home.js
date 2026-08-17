/* ============================================
   SINERG.ia — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav: highlight link activo al hacer scroll ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => sectionObserver.observe(sec));

  const activeStyle = document.createElement('style');
  activeStyle.textContent = '.nav-links a.active { color: var(--p); font-weight: 500; }';
  document.head.appendChild(activeStyle);

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll(
    '.acard, .ocard, .ep-row, .insight, .tension-bar, .hero-photo-wrap'
  );

  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .acard, .ocard, .ep-row, .insight, .tension-bar, .hero-photo-wrap {
      opacity: 0; transform: translateY(18px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .revealed { opacity: 1 !important; transform: translateY(0) !important; }
    .ocard.disabled.revealed { opacity: 0.5 !important; }
    .ep-row.dimmed.revealed { opacity: 0.35 !important; }
  `;
  document.head.appendChild(revealStyle);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    revealObserver.observe(el);
  });

  /* ── Dot live: pulso animado ── */
  const dotStyle = document.createElement('style');
  dotStyle.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.35); }
    }
    .dot-live { animation: pulse 2s ease-in-out infinite; }
  `;
  document.head.appendChild(dotStyle);

});

/* Deshabilitar Click Derecho en Imagenes */
document.addEventListener('DOMContentLoaded', () => {
  const imagenes = document.querySelectorAll('img');
  imagenes.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  });
});