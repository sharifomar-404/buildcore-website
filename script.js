
// ===================================
// HERO CAROUSEL
// ===================================

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


// ===================================
// MOBILE NAVIGATION
// ===================================

// Select mobile navigation elements
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuClose = document.querySelector(".menu-close");
const menuOverlay = document.querySelector(".menu-overlay");


// Function to open the mobile menu
function openMenu() {

    mobileMenu.classList.add("active");

    menuOverlay.style.display = "block";

    // Allow the browser to apply display before fading in
    requestAnimationFrame(() => {
        menuOverlay.classList.add("active");
    });

    // Prevent background scrolling
    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");

}


// Function to close the mobile menu
function closeMenu() {

    mobileMenu.classList.remove("active");

    menuOverlay.classList.remove("active");

    // Restore background scrolling
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

    // Hide overlay after fade-out animation
    setTimeout(() => {
        menuOverlay.style.display = "none";
    }, 300);

}


// Open menu when hamburger is clicked
menuToggle.addEventListener("click", openMenu);


// Close menu when X button is clicked
menuClose.addEventListener("click", closeMenu);


// Close menu when the dark overlay is clicked
menuOverlay.addEventListener("click", closeMenu);


// Close menu when a navigation link is clicked
const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {

    link.addEventListener("click", closeMenu);

});
