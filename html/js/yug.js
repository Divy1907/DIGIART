document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const images = document.querySelectorAll(".slider img");
    let currentIndex = 0;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }

    function updateSlider() {
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }

    setInterval(nextSlide, 3000); // Change slide every 3 seconds
});
