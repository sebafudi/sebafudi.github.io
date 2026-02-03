import './style.css';

// ==========================================================================
// Hero Animation System
// ==========================================================================

const heroLines = document.querySelectorAll<HTMLElement>('.hero-line');
const heroContent = document.querySelector<HTMLElement>('.hero-content');
const redAccents = document.querySelectorAll<HTMLElement>('.accent-red');

let cycleInterval: number | null = null;
let currentIndex = 0;
let isUserInteracting = false;

const lineCount = heroLines.length;

// Mouse hover interaction
heroLines.forEach((line, index) => {
  line.addEventListener('mouseenter', () => {
    isUserInteracting = true;
    stopCycling();
    heroLines.forEach((l) => l.classList.remove('active'));
    line.classList.add('active');
    currentIndex = index;
  });
});

if (heroContent) {
  heroContent.addEventListener('mouseleave', () => {
    isUserInteracting = false;
    startCycling();
  });
}

// Cycling through lines
function startCycling() {
  if (cycleInterval) return;

  cycleInterval = window.setInterval(() => {
    if (isUserInteracting) return;

    currentIndex = (currentIndex + 1) % lineCount;
    heroLines.forEach((l) => l.classList.remove('active'));
    heroLines[currentIndex].classList.add('active');
  }, 2000);
}

function stopCycling() {
  if (cycleInterval) {
    clearInterval(cycleInterval);
    cycleInterval = null;
  }
}

// ==========================================================================
// Initial Animation Sequence
// ==========================================================================

function runIntroAnimation() {
  // First line activates immediately
  heroLines[0].classList.add('active');

  // Fade red brightness after short delay, then start cycling
  setTimeout(() => {
    redAccents.forEach((accent) => {
      accent.classList.remove('bright');
    });
    // Start cycling after glow fades
    startCycling();
  }, 1500);
}

// Start intro immediately
runIntroAnimation();

// ==========================================================================
// Intersection Observer for fade-in sections
// ==========================================================================

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -50px 0px',
  threshold: 0.1,
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const sections = document.querySelectorAll<HTMLElement>(
  '.about, .skills, .projects-featured, .projects-other, .footer'
);

sections.forEach((section) => {
  section.classList.add('fade-in-section');
  fadeInObserver.observe(section);
});

// ==========================================================================
// Smooth scroll for anchor links
// ==========================================================================

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    if (targetId && targetId !== '#') {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});

// ==========================================================================
// Mouse tracking for featured project glow effect
// ==========================================================================

const featuredProject = document.querySelector<HTMLElement>('.featured-project');
if (featuredProject) {
  featuredProject.addEventListener('mousemove', (e) => {
    const rect = featuredProject.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    featuredProject.style.setProperty('--mouse-x', `${x}%`);
    featuredProject.style.setProperty('--mouse-y', `${y}%`);
  });
}

// Mouse tracking for mosaic cards and skill categories
const glowCards = document.querySelectorAll<HTMLElement>('.mosaic-card, .skill-category');
glowCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ==========================================================================
// Subtle parallax on hero (respects reduced motion)
// ==========================================================================

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  let ticking = false;

  const updateParallax = () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector<HTMLElement>('.hero');

    if (hero && scrolled < window.innerHeight) {
      const opacity = Math.max(0, 1 - scrolled / (window.innerHeight * 0.8));
      hero.style.opacity = opacity.toString();
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

// ==========================================================================
// Keyboard navigation for hero lines
// ==========================================================================

heroLines.forEach((line, index) => {
  line.setAttribute('tabindex', '0');
  line.setAttribute('role', 'button');

  line.addEventListener('focus', () => {
    isUserInteracting = true;
    stopCycling();
    heroLines.forEach((l) => l.classList.remove('active'));
    line.classList.add('active');
    currentIndex = index;
  });

  line.addEventListener('blur', () => {
    isUserInteracting = false;
    startCycling();
  });

  line.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % heroLines.length;
      heroLines[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + heroLines.length) % heroLines.length;
      heroLines[prevIndex]?.focus();
    }
  });
});
