// Select all hero slides
const slides = document.querySelectorAll(".hero-slide");

// Select carousel buttons
const nextButton = document.querySelector(".hero-arrow.next");
const prevButton = document.querySelector(".hero-arrow.prev");

// Select slide indicators
const indicators = document.querySelectorAll(".hero-indicators button");

// Track the currently visible slide
let currentSlide = 0;


// Function to display a slide
function showSlide(slideIndex) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    indicators.forEach(indicator => {
        indicator.classList.remove("active");
    });

    slides[slideIndex].classList.add("active");
    indicators[slideIndex].classList.add("active");
}


// Next button
nextButton.addEventListener("click", () => {

    currentSlide = (currentSlide + 1) % slides.length;

    showSlide(currentSlide);

});


// Previous button
prevButton.addEventListener("click", () => {

    currentSlide = (currentSlide - 1 + slides.length) % slides.length;

    showSlide(currentSlide);

});

// Indicator buttons
indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Automatically change slides every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Mobile navigation elements
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuClose = document.querySelector(".menu-close");

// Open mobile menu
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
});

// Close mobile menu
menuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
});

// Close menu when a navigation link is clicked
const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});