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
        let currentSlide = 0;
        const totalSlides = document.querySelectorAll('.slide').length;

        const updateSliderPosition = () => {
            // Transformamos el eje X un 100% por slider
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Evaluamos estado de botones
            if (currentSlide === 0) {
                btnPrev.disabled = true;
            } else {
                btnPrev.disabled = false;
            }

            if (currentSlide === totalSlides - 1) {
                btnNext.disabled = true;
            } else {
                btnNext.disabled = false;
            }
        };

        // Inicializamos
        updateSliderPosition();

        btnNext.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSliderPosition();
            }
        });

        btnPrev.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSliderPosition();
            }
        });
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
