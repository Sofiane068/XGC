document.addEventListener("DOMContentLoaded", function() {
    const blocks = document.querySelectorAll('.box-line');
    const lineContainer = document.getElementById('line-container');

    function createLine(x1, y1, x2, y2) {
        const line = document.createElement('div');
        line.className = 'line';
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.top = `${y1}px`;
        line.style.left = `${x1}px`;

        lineContainer.appendChild(line);
    }

    function updateLines() {
        lineContainer.innerHTML = ''; // Supprime les lignes existantes
        for (let i = 0; i < blocks.length - 1; i++) {
            const rect1 = blocks[i].getBoundingClientRect();
            const rect2 = blocks[i + 1].getBoundingClientRect();

            const x1 = rect1.left + rect1.width / 2 + window.scrollX;
            const y1 = rect1.bottom + window.scrollY;
            const x2 = rect2.left + rect2.width / 2 + window.scrollX;
            const y2 = rect2.top + window.scrollY;

            createLine(x1, y1, x2, y2);
        }
    }

    window.addEventListener('scroll', updateLines);
    window.addEventListener('resize', updateLines);

    updateLines(); // Initial call to set up lines
});















const elements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 });


elements.forEach(element => observer.observe(element));

// script.js

// Fonction pour faire augmenter le compteur
function incrementCounter(element) {
    const target = +element.getAttribute('data-target');
    let count = 0;
    const increment = Math.ceil(target / 100); // Incrément adapté à la cible

    const updateCount = () => {
        count += increment;
        if (count > target) {
            count = target;
        }
        element.textContent = count;
        if (count < target) {
            requestAnimationFrame(updateCount);
        }
    };
    updateCount();
}

const celements = document.querySelectorAll('.chidden');
// Crée un observateur pour détecter l'entrée dans la vue
const CounterObserver = new IntersectionObserver((entries, CounterObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in'); // Effet d'apparition
            if (entry.target.classList.contains('counter')) {
                incrementCounter(entry.target); // Lance le compteur
            }
            CounterObserver.unobserve(entry.target); // Stoppe l'observation
        }
    });
}, { threshold: 0.5 });

// Observe chaque élément caché
celements.forEach(element => CounterObserver.observe(element));
