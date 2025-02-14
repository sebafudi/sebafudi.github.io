import './style.css';

const texts = document.querySelectorAll('.fading-text');
let isMouseOverProject = false;

texts.forEach((text) => {
  text.addEventListener('mouseover', () => {
    const activeText = document.querySelector('.text-active');
    if (activeText) {
      activeText.classList.remove('text-active');
    }
    text.classList.add('text-active');
  });
});

document.addEventListener('mousemove', (e) => {
  const projectEl = document.querySelectorAll<HTMLElement>(
    '.project > span > .project'
  );
  let mouseOverAnyProject = false;

  for (const project of projectEl) {
    if (!project) continue;

    const rect = project.getBoundingClientRect();

    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      project.style.setProperty('--x', `${x}px`);
      project.style.setProperty('--y', `${y}px`);
      mouseOverAnyProject = true;
    }
  }

  if (!mouseOverAnyProject && isMouseOverProject) {
    projectEl.forEach((project) => {
      project.style.setProperty('--x', '50%');
      project.style.setProperty('--y', '50%');
    });
    isMouseOverProject = false;
  } else if (mouseOverAnyProject) {
    isMouseOverProject = true;
  }
});
