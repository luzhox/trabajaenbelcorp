function formatNumber(num, isFormated, surpass, formatScale) {
    if (isFormated == null || !isFormated) { return num; }
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
        const isFormated = element.getAttribute('formated');
        const surpass = element.getAttribute('surpass');
        
        let timer = setInterval(function() {
            start += increment;
            element.innerHTML = formatNumber(start >= finalNumber ? finalNumber: start, isFormated, surpass, 1);

            if (start >= finalNumber) { clearInterval(timer); }
        }, stepTime);
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers('growing-number', 2000);
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
        "Desafíate y crece",
        "Logra tu mejor versión"
    ];
    let currentIndex = 0;

    textElement.addEventListener('animationiteration', () => {
        currentIndex = (currentIndex + 1) % textArray.length;
        textElement.textContent = textArray[currentIndex];
    }); // 6s (animation duration) / 2 = 3s
});


function btnRedirect(event, text = '') {
    let search = text;
    if (!text && event?.target) {
        const btn = event.target;
        search = btn.innerText
            .replace(/(\r\n|\n|\r)/gm, " ") // Reemplaza saltos de línea con espacio
            .replace(" & ", " AND ")        // Reemplaza " & " con " AND "
            .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, " ") // Reemplaza caracteres no alfabéticos con espacio
            .replace(/\s\s+/g, " ");        // Reemplaza múltiples espacios con uno solo
    }
    window.open("https://ats.rankmi.com/tenants/771/organizations/belcorp-connect?tags=" + search);
}

document.querySelectorAll('#vacantes-equipo button , #vacantes-pais button span').forEach((button) => {
    button.addEventListener('click', btnRedirect);
});

document.querySelector('#practicas .button-apply').addEventListener('click', () => btnRedirect(undefined, "Practicas"));

const sandwich = document.getElementsByClassName('sandwich')[0];
const nav = document.getElementsByClassName('banner-menu')[0];
sandwich.addEventListener('click', (e) => {
    nav.classList.toggle('active');
    sandwich.classList.toggle('active');
});