/* =============================================
   SCALEFORGE — AGENCY WEBSITE SCRIPTS
   Features: Navbar, scroll reveal, form validation,
             active link tracking, year update
   ============================================= */

'use strict';

/* ──────────────────────────────────────────────
   1. NAVBAR — sticky shadow + mobile toggle
   ────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navItems  = document.querySelectorAll('.nav-link');

/* Sticky shadow on scroll */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  setActiveNavLink();
}, { passive: true });

/* Mobile hamburger toggle */
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

/* Close nav on link click (mobile) */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* Close nav when clicking outside */
document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ──────────────────────────────────────────────
   2. ACTIVE NAV LINK — highlight on scroll
   ────────────────────────────────────────────── */
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 110) {
      current = sec.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
}

/* ──────────────────────────────────────────────
   3. SMOOTH SCROLL — offset for fixed navbar
   ────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ──────────────────────────────────────────────
   4. SCROLL REVEAL — fade-in on intersection
   ────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target); // fire once
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px',
});

revealEls.forEach(el => revealObs.observe(el));

/* ──────────────────────────────────────────────
   5. CONTACT FORM — validation + mock submit
   ────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');
const btnLabel    = document.getElementById('btnLabel');
const btnIco      = document.getElementById('btnIco');

/* Helper: toggle error state */
function setError(fieldId, errId, show) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errId);
  if (!field || !err) return;
  field.classList.toggle('err', show);
  err.classList.toggle('show', show);
}

/* Email validation regex */
function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

/* Validate all required fields; returns true if form is valid */
function validateForm() {
  const name    = document.getElementById('fname')?.value.trim()    || '';
  const email   = document.getElementById('femail')?.value.trim()   || '';
  const message = document.getElementById('fmessage')?.value.trim() || '';

  let valid = true;

  if (!name)                    { setError('fname',    'fnameErr',    true);  valid = false; }
  else                          { setError('fname',    'fnameErr',    false); }

  if (!isValidEmail(email))     { setError('femail',   'femailErr',   true);  valid = false; }
  else                          { setError('femail',   'femailErr',   false); }

  if (message.length < 10)      { setError('fmessage', 'fmessageErr', true);  valid = false; }
  else                          { setError('fmessage', 'fmessageErr', false); }

  return valid;
}

/* Clear individual errors on input */
[
  ['fname',    'fnameErr'],
  ['femail',   'femailErr'],
  ['fmessage', 'fmessageErr'],
].forEach(([id, errId]) => {
  document.getElementById(id)?.addEventListener('input', () => setError(id, errId, false));
});

/* Form submit handler */
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateForm()) return;

  /* ── Loading state ── */
  submitBtn.disabled = true;
  btnLabel.textContent = 'Sending…';
  btnIco.className = 'fa-solid fa-spinner fa-spin';

  /*
   * ── Replace the setTimeout below with your real submission logic ──
   *
   * Option A — Formspree (free, no backend needed):
   *   fetch('https://formspree.io/f/YOUR_FORM_ID', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({ name, email, message })
   *   })
   *
   * Option B — EmailJS:
   *   emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', contactForm)
   *
   * Option C — Your own Spring Boot /api/contact endpoint
   */
  setTimeout(() => {
    /* Reset button */
    submitBtn.disabled   = false;
    btnLabel.textContent = 'Send Message';
    btnIco.className     = 'fa-solid fa-paper-plane';

    /* Show success banner */
    formSuccess.classList.add('show');

    /* Reset fields */
    contactForm.reset();

    /* Hide success after 7 seconds */
    setTimeout(() => formSuccess.classList.remove('show'), 7000);
  }, 1600);
});

/* ──────────────────────────────────────────────
   6. FOOTER YEAR — auto-update copyright
   ────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ──────────────────────────────────────────────
   7. SERVICE CARDS — click to jump to contact
   ────────────────────────────────────────────── */
document.querySelectorAll('.svc-card:not(.svc-card--cta)').forEach(card => {
  /* We use the internal .svc-link for navigation, so just add pointer */
  card.style.cursor = 'default';
});

/* ──────────────────────────────────────────────
   8. TYPING ANIMATION — mock terminal on hero
      (runs once on page load, typewriter effect)
   ────────────────────────────────────────────── */
(function initHeroCardAnimations() {
  /* Stagger the hero cards into view */
  const cards = document.querySelectorAll('.hcard');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 700 + i * 180);
  });
})();

/* ──────────────────────────────────────────────
   9. SOLUTIONS + DEMO CARDS — hover tilt effect
      (subtle 3D tilt on mouse move)
   ────────────────────────────────────────────── */
function addTiltEffect(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      const tiltX =  (y / rect.height) * 4;   // max ±4deg
      const tiltY = -(x / rect.width)  * 4;
      card.style.transform = `translateY(-5px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* Only enable tilt on non-touch devices */
if (!('ontouchstart' in window)) {
  addTiltEffect('.sol-card');
  addTiltEffect('.demo-card');
}

/* ──────────────────────────────────────────────
   10. STATS BAR — count-up animation
   ────────────────────────────────────────────── */
function countUp(el, target, suffix, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

/* Trigger count-up when stats bar is visible */
const statsBar = document.querySelector('.hero-statsbar');
if (statsBar) {
  const statsObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      /* Data: [elementIndex, targetValue, suffix] */
      const statEls = statsBar.querySelectorAll('.sbi strong');
      const data = [[0,10,'+'],[1,3,'+'],[2,100,'%'],[3,24,'h']];
      data.forEach(([idx, val, suffix]) => {
        if (statEls[idx]) countUp(statEls[idx], val, suffix, 1000);
      });
      statsObs.disconnect();
    }
  }, { threshold: 0.5 });
  statsObs.observe(statsBar);
}