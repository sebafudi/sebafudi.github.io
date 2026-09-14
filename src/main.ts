import './style.css';

document.body.classList.add('loaded');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroLines = document.querySelectorAll<HTMLElement>('.hero-line');
const heroContent = document.querySelector<HTMLElement>('.hero-content');
const redAccents = document.querySelectorAll<HTMLElement>('.accent-red');
let cycleInterval: number | undefined;
let currentIndex = 0;

function activateLine(index: number) {
  heroLines.forEach((line, lineIndex) => line.classList.toggle('active', lineIndex === index));
  currentIndex = index;
}

function stopCycling() {
  if (cycleInterval !== undefined) window.clearInterval(cycleInterval);
  cycleInterval = undefined;
}

function startCycling() {
  if (prefersReducedMotion || cycleInterval !== undefined || heroLines.length === 0) return;
  cycleInterval = window.setInterval(() => activateLine((currentIndex + 1) % heroLines.length), 2400);
}

if (heroLines.length) {
  activateLine(0);
  if (!prefersReducedMotion) {
    window.setTimeout(() => {
      redAccents.forEach((accent) => accent.classList.remove('bright'));
      startCycling();
    }, 1500);
  }

  heroLines.forEach((line, index) => {
    line.addEventListener('mouseenter', () => {
      stopCycling();
      activateLine(index);
    });
    line.setAttribute('tabindex', '0');
    line.setAttribute('role', 'button');
    line.addEventListener('focus', () => {
      stopCycling();
      activateLine(index);
    });
    line.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowRight' && event.key !== 'ArrowUp' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
      heroLines[(index + direction + heroLines.length) % heroLines.length]?.focus();
    });
  });
  heroContent?.addEventListener('mouseleave', startCycling);
  heroContent?.addEventListener('focusout', (event) => {
    if (!heroContent.contains(event.relatedTarget as Node | null)) startCycling();
  });
}

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }),
  { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
);

document.querySelectorAll<HTMLElement>(
  '.about, .experience, .ai-work, .hackathons, .skills, .projects-featured, .projects-other, .education, .contact, .footer'
).forEach((section) => {
  if (prefersReducedMotion) {
    section.classList.add('visible');
  } else {
    section.classList.add('fade-in-section');
    observer.observe(section);
  }
});

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    const target = href ? document.querySelector(href) : null;
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

document.querySelectorAll<HTMLElement>('.featured-project, .mosaic-card, .skill-category, .ai-work-item').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  });
});

if (!prefersReducedMotion) {
  let parallaxQueued = false;
  const hero = document.querySelector<HTMLElement>('.hero');

  window.addEventListener('scroll', () => {
    if (parallaxQueued || !hero || window.scrollY >= window.innerHeight) return;
    parallaxQueued = true;
    window.requestAnimationFrame(() => {
      hero.style.opacity = String(Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.8)));
      parallaxQueued = false;
    });
  }, { passive: true });
}
