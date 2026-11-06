/* ØMENS — main.js (V1.1)
   Scroll reveals + sequential detail reveals + restrained parallax.
   No libraries. All motion respects prefers-reduced-motion. */

/* Static render for screenshots/SEO previews: append ?static to the URL */
if (location.search.includes('static')) document.body.classList.add('is-static');

document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- scroll reveals ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* Stagger children within grids slightly for a composed load */
document.querySelectorAll('.tenets .tenet, .contact__grid > div').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 90 + 'ms';
});

/* Selected Details: sequential reveal, one after another */
document.querySelectorAll('.details .detail').forEach((el, i) => {
  el.style.transitionDelay = i * 160 + 'ms';
});

/* Spec table rows: restrained line-by-line appearance */
document.querySelectorAll('.specs tr').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = 120 + i * 80 + 'ms';
  io.observe(el);
});

/* ---------- restrained parallax ---------- */
/* Desktop pointer devices only; transform-only; capped; skipped
   when reduced motion is requested. */
if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  let ticking = false;

  const update = () => {
    const vh = window.innerHeight;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const rect = el.getBoundingClientRect();
      /* offset relative to viewport centre, capped to +/-60px */
      const rel = (rect.top + rect.height / 2 - vh / 2) * -speed;
      el.style.setProperty('--py', Math.max(-60, Math.min(60, rel)) + 'px');
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}
