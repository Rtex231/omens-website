/* ØMENS — main.js (V1.2)
   Scroll reveals + sequential detail reveals + fixed parallax + topbar contrast.
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

/* ---------- restrained parallax (V1.2 fix) ---------- */
/* V1.1 bug: offset was derived from getBoundingClientRect() of the element
   we were transforming, so the transform fed back into the next measurement
   → runaway to the cap and a stuck composition. V1.2 derives the offset from
   window.scrollY relative to the hero's LAYOUT position (offsetTop), which is
   unaffected by the transform. At scrollY 0 the offset is exactly 0, so the
   hero rests in its original composition. */
if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const hero = document.querySelector('.hero');
  const CAP = 60;
  let ticking = false;

  const update = () => {
    const heroTop = hero ? hero.offsetTop : 0;      // layout, not transform
    const scrolled = window.scrollY - heroTop;       // 0 while hero is at top
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const py = Math.max(0, Math.min(CAP, scrolled * speed));
      el.style.setProperty('--py', py + 'px');
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/* ---------- media: reduced-motion video guard (V1.2) ---------- */
/* Future campaign videos autoplay muted+loop. Under reduced motion,
   pause them and remove autoplay so no motion is forced on the user. */
if (reduceMotion) {
  document.querySelectorAll('video[autoplay]').forEach((v) => {
    v.removeAttribute('autoplay'); v.pause();
  });
}

/* ---------- hero video TEST slot (internal evaluation) ---------- */
/* The <video> ships with preload="none" and no src, so under
   prefers-reduced-motion and in ?static mode NOTHING is fetched beyond the
   tiny poster — the static hero stays the resting visual. Otherwise the
   slot is claimed and a device-appropriate clip is chosen:
     • desktop (fine pointer)  -> data-src        (full 960 clip, ~3.7 MB)
     • mobile / touch          -> data-src-mobile (540 clip, ~126 KB)
   JS sets src, plays, and fades the layer in once frames are rolling
   ('playing'). The layer pauses when the hero scrolls out of view so the
   clip never decodes off-screen. Remove the .hero__media block in
   index.html to remove the test entirely. */
(() => {
  const media = document.querySelector('.hero__media');
  const video = document.querySelector('.hero__video');
  const hero = document.querySelector('.hero');
  if (!media || !video || !hero) return;

  const allowed =
    !reduceMotion &&
    !document.body.classList.contains('is-static');

  if (!allowed) return; // static hero remains; zero bytes of video fetched

  /* pick the clip by input type: fine pointer = desktop, else mobile */
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const src = isDesktop ? video.dataset.src : (video.dataset.srcMobile || video.dataset.src);
  if (!src) return;

  video.src = src;
  video.load();

  const start = () => video.play().catch(() => {});
  video.addEventListener('playing', () => media.classList.add('is-live'));

  /* only run while the hero is meaningfully in view */
  const vis = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) start();
      else video.pause();
    });
  }, { threshold: 0.08 });
  vis.observe(hero);
})();

/* ---------- topbar contrast across FRAME/SHEET (V1.2) ---------- */
/* When the fixed bar overlaps the light paper SHEET section, switch it to a
   solid dark chip so the steel logo/text keep contrast. Runs regardless of
   reduced-motion — this is a legibility fix, not decoration. */
(() => {
  const bar = document.querySelector('.topbar');
  const light = document.querySelector('.drop');
  if (!bar || !light) return;

  const sync = () => {
    const rect = light.getBoundingClientRect();
    const barH = bar.offsetHeight || 60;
    bar.classList.toggle('is-over-light', rect.top < barH && rect.bottom > 0);
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { sync(); ticking = false; }); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', sync, { passive: true });
  sync();
})();
