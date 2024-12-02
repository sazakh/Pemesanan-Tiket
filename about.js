let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function moveSlide(direction) {
    currentSlide += direction;

    // Pastikan currentSlide berada dalam rentang yang valid
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Ke slide terakhir jika sebelumnya slide pertama
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; // Ke slide pertama jika sebelumnya slide terakhir
    }

    // Geser slider
    const slider = document.querySelector('.video-slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Inisialisasi: perlihatkan slide pertama
moveSlide(0);
