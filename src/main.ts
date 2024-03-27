import './style.css';
document.addEventListener("wheel", (e) => {
    const delta = e.deltaY;
    if (delta > 0) {
        const text = document.querySelector('.text-active');
        if (!text) return;
        text.classList.remove('text-active');
        setTimeout(() => {

            const nextText = text.nextElementSibling;
            if (nextText) {
                nextText.classList.add('text-active');
            } else {
                text.classList.remove('text-active');
                document.querySelector('.text').classList.add('text-active');
            }
        }, 300);
    } else {
        const text = document.querySelector('.text-active');
        if (!text) return;
        text.classList.remove('text-active');
        setTimeout(() => {
            const prevText = text.previousElementSibling;
            if (prevText) {
                prevText.classList.add('text-active');
            } else {
                text.classList.remove('text-active');
                document.querySelector('.text:last-child').classList.add('text-active');
            }
        }, 300);
    }
});

