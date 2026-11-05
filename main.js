/* Motion is enhancement only: all content and links work without JavaScript. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
const scene = document.getElementById('hero-scene');
const art = document.querySelector('.hero-art');

if (scene && art && hoverCapable.matches && !reduceMotion.matches) {
  let rafId = 0;
  let pointerX = 0;
  let pointerY = 0;
  art.addEventListener('pointermove', event => {
    const box = art.getBoundingClientRect();
    pointerX = (event.clientX - box.left) / box.width - 0.5;
    pointerY = (event.clientY - box.top) / box.height - 0.5;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      scene.style.setProperty('--tilt-x', `${(-pointerY * 10).toFixed(2)}deg`);
      scene.style.setProperty('--tilt-y', `${(pointerX * 13).toFixed(2)}deg`);
      rafId = 0;
    });
  }, { passive: true });
  art.addEventListener('pointerleave', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    scene.style.setProperty('--tilt-x', '0deg');
    scene.style.setProperty('--tilt-y', '0deg');
  });
}

// Reveals are opt-in only: never hide content if observers are unavailable.
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const blocks = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.07, rootMargin: '0px 0px 40px 0px' });
  blocks.forEach(block => {
    block.classList.add('can-reveal');
    observer.observe(block);
  });
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
