import './style.css';
const texts = document.querySelectorAll('.fading-text');

texts.forEach((text) => {
    text.addEventListener('mouseover', () => {
        const activeText = document.querySelector('.text-active');
        if (activeText) {
            activeText.classList.remove('text-active');
        }
        text.classList.add('text-active');
    });
});
