function formatNumber(num, isFormated, surpass) {
    if (isFormated == null || !isFormated) { return num; }

    let formatScale = 1000;
    let finalNum = Math.floor(num/formatScale);

    return `${surpass ? '+' : ''}${finalNum}K`;
}

function animateNumbers(className, duration) {
    let elements = document.getElementsByClassName(className);
    
    for (let element of elements) {
        let finalNumber = parseInt(element.getAttribute('data-final-number'));
        let start = 0;
        let increment = Math.ceil(finalNumber / 100); // Adjust this divisor to control speed
        let stepTime = duration / (finalNumber / increment);
        
        let timer = setInterval(function() {
            start += increment;
            if (start > finalNumber) {
                start = finalNumber;
            }
            element.innerHTML = start;
            if (start == finalNumber) {
                clearInterval(timer);
                let isFormated = element.getAttribute('formated');
                let surpass = element.getAttribute('surpass');
                element.innerHTML = formatNumber(start, isFormated, surpass);
            }
        }, stepTime);
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers('number', 2000);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.cifras-container'));

const buttons = document.querySelectorAll('.descubre-image-button');

buttons.forEach(button => {
    const image = button.querySelector('img');
    const defaultSrc = image.src;
    const hoverSrc = defaultSrc.replace('.png', ' morado.png');

    button.addEventListener('mouseenter', () => {
        image.src = hoverSrc;
    });

    button.addEventListener('mouseleave', () => {
        image.src = defaultSrc;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById("vanishing-text");
    const textArray = [
        "Desafiate y crece",
        "Talento Belcorp"
    ];
    let currentIndex = 0;

    textElement.addEventListener('animationiteration', () => {
        currentIndex = (currentIndex + 1) % textArray.length;
        textElement.textContent = textArray[currentIndex];
    }); // 6s (animation duration) / 2 = 3s
    const sandwich = document.getElementsByClassName('sandwich')[0];
    const nav = document.getElementsByClassName('banner-menu')[0];
    sandwich.addEventListener('click', (e) => {
        nav.classList.toggle('active');
        sandwich.classList.toggle('active');
    });

});

