/* ══════════════════════════════════════════════════════
   RUMUNI — Shared JavaScript
   ══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── NAV SCROLL STATE ──
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── BURGER MENU ──
  const burger = document.getElementById('navBurger');
  const navMenu = document.getElementById('navMenu');
  const overlay = document.getElementById('navOverlay');

  function openMenu() {
    navMenu.classList.add('open');
    overlay.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close navigation menu');
    overlay.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    // Focus first link
    const firstLink = navMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    overlay.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open navigation menu');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    burger.focus();
  }

  if (burger && navMenu && overlay) {
    burger.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
    });

    // Close on nav link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) closeMenu();
      });
    });

    // Trap focus inside open menu
    navMenu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = navMenu.querySelectorAll('a, button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.reveal-section');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ── ACTIVE NAV LINK ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentPage);
  });

  // ── CONTACT FORM HANDLER ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      // Simulate async send
      setTimeout(() => {
        btn.textContent = 'Message sent!';
        btn.style.background = 'rgba(34,197,94,0.2)';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }, 3500);
      }, 1200);
    });
  }

})();
