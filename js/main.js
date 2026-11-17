/* Forge Harness — site interactions. Lightweight, no dependencies. */
'use strict';

/* ---------- sticky nav: frosted on scroll ---------- */
const nav = document.getElementById('nav');
const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- mobile menu ---------- */
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('mobileMenu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.classList.toggle('open', !open);
    menu.hidden = open;
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('open');
    menu.hidden = true;
  }));
}

/* ---------- scroll reveal ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
/* Safety net: never leave content invisible (headless capture, odd embeds) */
window.addEventListener('load', () => {
  setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in')), 1000);
});
