/* Shared header behavior from the supplied shell, isolated from unrelated site scripts. */
function IsMo() { return /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent); }
function handleScrollBehavior({ headerSelector, hideClass, whiteClass, hideThreshold }) {
  const header = document.querySelector(headerSelector);
  let lastScrollTop = window.scrollY;
  window.addEventListener('scroll', () => {
    const top = window.scrollY;
    if (top > hideThreshold) {
      header.classList.add(whiteClass);
      header.classList.toggle(hideClass, top > lastScrollTop);
    } else header.classList.remove(hideClass, whiteClass);
    lastScrollTop = top;
  }, { passive: true });
}
document.addEventListener('DOMContentLoaded', () => {
  const animation = gsap.to('.frame-animation', { backgroundPositionX: '-16000px', ease: 'steps(32)', duration: 1.5, repeatDelay: 2, repeat: -1 });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) animation.pause(0);
  const language = document.querySelector('.header .change');
  language.tabIndex = 0;
  language.setAttribute('role', 'button');
  language.setAttribute('aria-label', 'Choose language');
  language.setAttribute('aria-expanded', 'false');
  const toggle = () => {
    const open = !language.classList.contains('language-open');
    language.classList.toggle('language-open', open);
    language.setAttribute('aria-expanded', String(open));
  };
  language.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } if (e.key === 'Escape') { language.classList.remove('language-open'); language.setAttribute('aria-expanded', 'false'); } });
  language.addEventListener('click', e => { if (!e.target.closest('a')) toggle(); });
  document.querySelectorAll('.footer_mind .right a').forEach((link, i) => link.setAttribute('aria-label', i ? 'Streamax on YouTube' : 'Streamax on LinkedIn'));
  document.querySelectorAll('a[target="_blank"]').forEach(link => link.rel = 'noopener noreferrer');
});
