import './style.css';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const wideScreen = matchMedia('(min-width: 901px)');
const coarsePointer = matchMedia('(pointer: coarse)');
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const bar = document.querySelector<HTMLElement>('.bar')!;
const toneSections = [...document.querySelectorAll<HTMLElement>('[data-tone]:not(.bar)')];
const hero = document.querySelector<HTMLElement>('.hero')!;
const heroCat = hero.querySelector<HTMLElement>('.hero-cat')!;
const lines = [...document.querySelectorAll<HTMLElement>('.intro .line')];
const work = document.querySelector<HTMLElement>('.work')!;
const jobs = [...work.querySelectorAll<HTMLElement>('.job')];
const jobImages = [...work.querySelectorAll<HTMLElement>('.work-img')];
const projects = document.querySelector<HTMLElement>('.projects')!;
const track = projects.querySelector<HTMLElement>('.track')!;
const flow = document.querySelector<HTMLElement>('.flow')!;
const parallaxItems = [...document.querySelectorAll<HTMLElement>('[data-speed]')];

const viewportProbe = document.createElement('div');
viewportProbe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100vh;height:100svh;visibility:hidden;pointer-events:none';
document.body.append(viewportProbe);
let viewHeight = viewportProbe.offsetHeight || innerHeight;

function pinnedProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const travel = rect.height - viewHeight;
  return travel > 0 ? clamp(-rect.top / travel, 0, 1) : 0;
}

function showPinProgress(section: HTMLElement, progress: number) {
  const rect = section.getBoundingClientRect();
  section.classList.toggle('is-pinned-now', rect.top <= 1 && rect.bottom >= viewHeight - 1);
  section.style.setProperty('--progress', progress.toFixed(3));
}

function updateBar() {
  const probe = bar.offsetHeight / 2;
  const under = toneSections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= probe && rect.bottom > probe;
  });
  if (under && bar.dataset.tone !== under.dataset.tone) bar.dataset.tone = under.dataset.tone;
  bar.classList.toggle('is-solid', scrollY > viewHeight * 0.6);
}

type Follower = { property: string; unit: string; value: number; target: number };
const followed = new Map<HTMLElement, Follower>();
const followRate = 0.16;
let following = false;

function follow(element: HTMLElement, property: string, target: number, unit = '') {
  const entry = followed.get(element) ?? { property, unit, value: target, target };
  entry.target = target;
  followed.set(element, entry);
}

function stepFollowers() {
  let moving = false;
  for (const [element, entry] of followed) {
    const gap = entry.target - entry.value;
    entry.value = Math.abs(gap) < 0.0005 ? entry.target : entry.value + gap * followRate;
    if (entry.value !== entry.target) moving = true;
    element.style.setProperty(entry.property, `${entry.value.toFixed(4)}${entry.unit}`);
  }
  following = moving;
  if (moving) requestAnimationFrame(stepFollowers);
}

function startFollowing() {
  if (following) return;
  following = true;
  requestAnimationFrame(stepFollowers);
}

function updateHero() {
  follow(hero, '--p', clamp(scrollY / hero.offsetHeight, 0, 1));
}

function updateLines() {
  for (const line of lines) {
    line.classList.toggle('is-lit', line.getBoundingClientRect().top < viewHeight * 0.72);
  }
}

function showJob(index: number) {
  jobs.forEach((job, jobIndex) => job.classList.toggle('is-active', jobIndex === index));
  jobImages.forEach((image) => image.classList.toggle('is-shown', Number(image.dataset.job) === index));
}

function updateWork() {
  const progress = pinnedProgress(work);
  showPinProgress(work, progress);
  showJob(Math.min(jobs.length - 1, Math.floor(progress * jobs.length)));
}

function sizeProjects() {
  const pin = wideScreen.matches && !reduceMotion.matches;
  projects.classList.toggle('is-pinned', pin);
  if (!pin) {
    projects.style.removeProperty('--pin-height');
    projects.style.setProperty('--x', '0px');
    return;
  }
  const last = track.lastElementChild as HTMLElement;
  const contentWidth = last.offsetLeft - track.offsetLeft + last.offsetWidth + parseFloat(getComputedStyle(track).paddingRight);
  const overflow = Math.max(0, Math.ceil(contentWidth - track.clientWidth));
  projects.dataset.overflow = String(overflow);
  projects.style.setProperty('--pin-height', `${viewHeight + overflow * 1.2}px`);
}

function updateProjects() {
  if (!projects.classList.contains('is-pinned')) return;
  const progress = pinnedProgress(projects);
  showPinProgress(projects, progress);
  const overflow = Number(projects.dataset.overflow || 0);
  const first = track.querySelector<HTMLElement>('.project')!;
  const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
  const stops = Math.max(1, Math.ceil(overflow / step));
  const stop = Math.round(progress * stops);
  projects.style.setProperty('--x', `${-Math.min(overflow, stop * step)}px`);
}

function updateParallax() {
  for (const item of parallaxItems) {
    const rect = item.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > viewHeight + 200) continue;
    const shift = parseFloat(item.style.getPropertyValue('--shift') || '0');
    const fromCenter = rect.top - shift + rect.height / 2 - viewHeight / 2;
    follow(item, '--shift', -fromCenter * Number(item.dataset.speed), 'px');
  }
}

let frameRequested = false;
function render() {
  frameRequested = false;
  updateBar();
  if (reduceMotion.matches) {
    jobs.forEach((job) => job.classList.add('is-active'));
    jobImages.forEach((image, index) => image.classList.toggle('is-shown', index === jobImages.length - 1));
    return;
  }
  updateHero();
  updateLines();
  updateWork();
  updateProjects();
  updateParallax();
  startFollowing();
}
const requestRender = () => {
  if (frameRequested) return;
  frameRequested = true;
  requestAnimationFrame(render);
};

const flowObserver = new IntersectionObserver((entries) => {
  if (!entries.some((entry) => entry.isIntersecting)) return;
  flow.classList.add('is-in');
  flowObserver.disconnect();
}, { rootMargin: '0px 0px -25% 0px' });
flowObserver.observe(flow);

const relayout = () => {
  viewHeight = viewportProbe.offsetHeight || innerHeight;
  sizeProjects();
  requestRender();
};
let layoutWidth = innerWidth;
const relayoutOnWidthChange = () => {
  if (coarsePointer.matches && innerWidth === layoutWidth) return;
  layoutWidth = innerWidth;
  relayout();
};
addEventListener('scroll', requestRender, { passive: true });
addEventListener('resize', relayoutOnWidthChange);
addEventListener('load', relayout);
reduceMotion.addEventListener('change', relayout);
wideScreen.addEventListener('change', relayout);
relayout();

const introWaitLimit = 1200;
const introSettleLimit = 2400;

function finishIntro() {
  if (document.body.classList.contains('is-intro-done')) return;
  heroCat.classList.add('is-settled');
  document.body.classList.add('is-intro-done');
}

heroCat.addEventListener('transitionend', (event) => {
  if (event.target === heroCat && event.propertyName === 'transform') finishIntro();
});

const introAssets = Promise.all([
  document.fonts?.load('400 1em "Bricolage Grotesque"'),
  document.fonts?.load('700 1em "Bricolage Grotesque"'),
  heroCat.querySelector('img')!.decode(),
]).catch(() => {});
const introWaitOver = new Promise((resolve) => setTimeout(resolve, introWaitLimit));

Promise.race([introAssets, introWaitOver]).then(() => {
  requestAnimationFrame(() => {
    document.body.classList.add('is-loaded');
    setTimeout(finishIntro, reduceMotion.matches ? 0 : introSettleLimit);
  });
});
