/* =============================================
   SCALEFORGE — STORE PAGE SCRIPTS
   ============================================= */

'use strict';

/* ──────────────────────────────────────────────
   1. NAVBAR — sticky shadow + mobile toggle
   ────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ──────────────────────────────────────────────
   2. SCROLL REVEAL
   ────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ──────────────────────────────────────────────
   3. PRODUCT FILTER — category tabs
   ────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.fbtn');
const productCards = document.querySelectorAll('.product-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    /* Update active button */
    filterBtns.forEach(b => b.classList.remove('fbtn--active'));
    btn.classList.add('fbtn--active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      const cats = card.dataset.category?.split(' ') || [];
      const show = filter === 'all' || cats.includes(filter);

      if (show) {
        card.classList.remove('hidden');
        /* Re-trigger reveal animation */
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 60);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ──────────────────────────────────────────────
   4. FAQ ACCORDION
   ────────────────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen  = btn.getAttribute('aria-expanded') === 'true';
    const answer  = btn.nextElementSibling;
    const allBtns = document.querySelectorAll('.faq-q');

    /* Close all others first */
    allBtns.forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling?.classList.remove('open');
    });

    /* Toggle clicked one */
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

/* ──────────────────────────────────────────────
   5. FOOTER YEAR
   ────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ──────────────────────────────────────────────
   6. PRODUCT CARD TILT (non-touch only)
   ────────────────────────────────────────────── */
if (!('ontouchstart' in window)) {
  document.querySelectorAll('.product-card:not(.product-card--custom)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      const tiltX =  (y / rect.height) * 3;
      const tiltY = -(x / rect.width)  * 3;
      card.style.transform = `translateY(-5px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}