import './style.css';

const fadeFromBottom =
  document.querySelector<HTMLDivElement>('.fade-from-bottom');
if (fadeFromBottom) {
  fadeFromBottom.classList.add('settling');
  setTimeout(() => {
    fadeFromBottom.classList.remove('settling');
  }, 800);
}

const welcomeTexts = ['Hello!', 'Hej!', '¡Hola!'];
let welcomeTextIdx = 1;

const welcomeText = document.querySelector<HTMLDivElement>('.welcome-text');
setInterval(() => {
  if (welcomeText) {
    welcomeText.classList.add('settling');
    setTimeout(() => {
      welcomeText.innerHTML = welcomeTexts[welcomeTextIdx];
      welcomeTextIdx = (welcomeTextIdx + 1) % welcomeTexts.length;
      welcomeText.classList.remove('settling');
    }, 800);
  }
}, 5000);
