document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        item.addEventListener('click', () => {
            // Verificar si el item ya está activo para no volver a animar
            if (!item.classList.contains('active')) {
                // Remover clase 'active' de todos los items
                accordionItems.forEach(i => i.classList.remove('active'));

                // Agregar clase 'active' al item cliqueado
                item.classList.add('active');
            }
        });

        // Soporte para navegación por teclado (Enter / Espacio)
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!item.classList.contains('active')) {
                    accordionItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                }
            }
        });
    });

    // Configuración del Slide Cifras
    const track = document.getElementById('sliderTrack');
    const btnPrev = document.getElementById('prevSlide');
    const btnNext = document.getElementById('nextSlide');

    // Si la slider existe en el DOM
    if (track && btnPrev && btnNext) {
        const slides = track.querySelectorAll('.slide');
        const numOriginalSlides = slides.length;

        if (numOriginalSlides > 0) {
            // Técnina de clonación para slider infinito
            const firstClone = slides[0].cloneNode(true);
            const lastClone = slides[numOriginalSlides - 1].cloneNode(true);

            firstClone.classList.add('clone');
            lastClone.classList.add('clone');

            // Insertamos los clones en el DOM
            track.appendChild(firstClone);
            track.insertBefore(lastClone, slides[0]);

            // El slide actual inicial será el 1, porque el 0 es el clon del último
            let currentSlide = 1;
            let isTransitioning = false;

            // Comenzamos en la posición del primer slide original sin animación
            track.style.transition = 'none';
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            const updateSliderPosition = () => {
                // Restaurar la transición por defecto (tomada del CSS)
                track.style.transition = '';
                track.style.transform = `translateX(-${currentSlide * 100}%)`;
            };

            btnNext.addEventListener('click', () => {
                if (isTransitioning) return;
                isTransitioning = true;
                currentSlide++;
                updateSliderPosition();
            });

            btnPrev.addEventListener('click', () => {
                if (isTransitioning) return;
                isTransitioning = true;
                currentSlide--;
                updateSliderPosition();
            });

            track.addEventListener('transitionend', (e) => {
                // Asegurarnos de que el evento viene del track y de su transform
                if (e.target !== track || e.propertyName !== 'transform') return;

                isTransitioning = false;

                // Si llegamos al clon del primer slide (al final del track)
                if (currentSlide === numOriginalSlides + 1) {
                    track.style.transition = 'none';
                    currentSlide = 1; // Volvemos al primer slide original
                    track.style.transform = `translateX(-${currentSlide * 100}%)`;
                }

                // Si llegamos al clon del último slide (al inicio del track)
                if (currentSlide === 0) {
                    track.style.transition = 'none';
                    currentSlide = numOriginalSlides; // Volvemos al último slide original
                    track.style.transform = `translateX(-${currentSlide * 100}%)`;
                }
            });
        }
    }

    // Configuración de la sección Testimonios (Slider Interactivo)
    const testimoniosWrapper = document.querySelector('.testimonios-slider-wrapper');
    const testimoniosTrack = document.getElementById('testimoniosTrack');
    const testimoniosCards = document.querySelectorAll('.testimonio-card');

    if (testimoniosWrapper && testimoniosTrack && testimoniosCards.length > 0) {

        // Función para actualizar el ancho del wrapper en la variable CSS
        // Esto garantiza que el JS tenga la medida exacta para calcular el Grid de 12 columnas.
        const updateTestimoniosWidth = () => {
            const wrapWidth = testimoniosWrapper.clientWidth;
            testimoniosTrack.style.setProperty('--wrapper-w', `${wrapWidth}px`);
        };

        window.addEventListener('resize', updateTestimoniosWidth);
        updateTestimoniosWidth(); // set initial

        // Lógica de click en las tarjetas
        testimoniosCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (!card.classList.contains('active')) {
                    testimoniosCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    testimoniosTrack.style.setProperty('--active-i', index);
                }
            });

            // Teclado (Accesibilidad)
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!card.classList.contains('active')) {
                        testimoniosCards.forEach(c => c.classList.remove('active'));
                        card.classList.add('active');
                        testimoniosTrack.style.setProperty('--active-i', index);
                    }
                }
            });
        });
    }

});
