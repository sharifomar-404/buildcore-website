
// ===================================
// HERO CAROUSEL
// ===================================

const slides = document.querySelectorAll(".hero-slide");
const nextButton = document.querySelector(".hero-arrow.next");
const prevButton = document.querySelector(".hero-arrow.prev");
const indicators = document.querySelectorAll(".hero-indicators button");

let currentSlide = 0;
let autoPlayTimer;
const slideDelay = 7000;

function showSlide(slideIndex) {
    slides.forEach(slide => slide.classList.remove("active"));
    indicators.forEach(indicator => indicator.classList.remove("active"));

    slides[slideIndex].classList.add("active");
    indicators[slideIndex].classList.add("active");
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, slideDelay);
}

nextButton.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
});

prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    resetAutoPlay();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoPlay();
    });
});

resetAutoPlay();


// ===================================
// MOBILE NAVIGATION
// ===================================

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuClose = document.querySelector(".menu-close");
const menuOverlay = document.querySelector(".menu-overlay");

function openMenu() {
    mobileMenu.classList.add("active");
    menuOverlay.style.display = "block";

    requestAnimationFrame(() => {
        menuOverlay.classList.add("active");
    });

    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

    setTimeout(() => {
        menuOverlay.style.display = "none";
    }, 300);
}

menuToggle.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});


// ===================================
// LANGUAGE DROPDOWNS
// ===================================

const languageDropdowns = document.querySelectorAll(".language-dropdown");
const languageButtons = document.querySelectorAll(".language-btn");

function closeLanguageDropdowns() {
    languageDropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector(".language-dropdown-menu");
        const toggle = dropdown.querySelector(".language-dropdown-toggle");

        menu.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
    });
}

languageDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".language-dropdown-toggle");
    const menu = dropdown.querySelector(".language-dropdown-menu");

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.contains("active");

        closeLanguageDropdowns();

        if (!isOpen) {
            menu.classList.add("active");
            toggle.setAttribute("aria-expanded", "true");
        }
    });
});


// ===================================
// CHANGE WEBSITE LANGUAGE
// ===================================

function changeLanguage(language) {

    // Update HTML language and direction
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";


    // Translate navigation and other elements
    const translatableElements = document.querySelectorAll(
        "[data-en][data-ar]"
    );

    translatableElements.forEach(element => {
        element.textContent = language === "ar"
            ? element.dataset.ar
            : element.dataset.en;
    });


    // ===================================
    // HERO SLIDE TRANSLATIONS
    // ===================================

    const heroTranslations = [
        {
            heading: "بناء القوة. وهندسة الثقة.",
            description: "حلول متطورة للكيماويات الإنشائية من أجل منشآت أقوى وأكثر متانة وموثوقية.",
            button: "استكشف حلولنا"
        },
        {
            heading: "حلول هندسية تعزز الثقة.",
            description: "اكتشف BuildCore ونهجنا في تقديم حلول مبتكرة لقطاع الإنشاءات.",
            button: "لماذا BuildCore؟"
        },
        {
            heading: "حلول على أرض الواقع.",
            description: "استكشف تطبيقات البناء ومفاهيم المشاريع التي تعرض مجموعتنا من الحلول.",
            button: "استكشف مشاريعنا"
        }
    ];

    slides.forEach((slide, index) => {

        const heading = slide.querySelector(".hero-content h1");
        const description = slide.querySelector(".hero-content p");
        const button = slide.querySelector(".hero-content .btn-primary");

        if (language === "ar") {

            heading.textContent = heroTranslations[index].heading;
            description.textContent = heroTranslations[index].description;
            button.textContent = heroTranslations[index].button;

        } else {

            // Restore the original English content
            const englishContent = [
                {
                    heading: "Building Strength. Engineering Trust.",
                    description: "Advanced construction chemical solutions for stronger, more durable and reliable structures.",
                    button: "Explore Our Solutions"
                },
                {
                    heading: "Engineering Solutions That Build Confidence.",
                    description: "Discover BuildCore and our approach to delivering innovative solutions for the construction industry.",
                    button: "Why BuildCore?"
                },
                {
                    heading: "Solutions in Action.",
                    description: "Explore construction applications and project concepts showcasing our range of solutions.",
                    button: "Explore Projects"
                }
            ];

            heading.textContent = englishContent[index].heading;
            description.textContent = englishContent[index].description;
            button.textContent = englishContent[index].button;
        }

    });


    // ===================================
    // SEARCH TRANSLATION
    // ===================================

    const searchInput = document.querySelector(".search-input");

    searchInput.placeholder = language === "ar"
        ? "بحث..."
        : "Search...";

    searchInput.setAttribute(
        "aria-label",
        language === "ar" ? "البحث في الموقع" : "Search website"
    );


    // ===================================
    // LANGUAGE BUTTON STATES
    // ===================================

    languageButtons.forEach(button => {

        const isActive = button.dataset.lang === language;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive);

    });


    // ===================================
    // UPDATE SELECTED FLAGS
    // ===================================

    languageDropdowns.forEach(dropdown => {

        const flag = dropdown.querySelector(".current-language-flag");

        flag.src = language === "ar"
            ? "https://flagcdn.com/sa.svg"
            : "https://flagcdn.com/gb.svg";

        flag.alt = language === "ar" ? "Arabic" : "English";

    });


    // Save selected language
    localStorage.setItem("selectedLanguage", language);

    closeLanguageDropdowns();

    document.documentElement.classList.remove("language-loading");
}


// Language selection events
languageButtons.forEach(button => {
    button.addEventListener("click", () => {
        changeLanguage(button.dataset.lang);
    });
});


// Close dropdowns when clicking outside
document.addEventListener("click", event => {
    if (!event.target.closest(".language-dropdown")) {
        closeLanguageDropdowns();
    }
});


// ===================================
// KEYBOARD ESCAPE FUNCTIONALITY
// ===================================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (mobileMenu.classList.contains("active")) {
            closeMenu();
        }

        closeLanguageDropdowns();

    }

});


// ===================================
// LOAD SAVED LANGUAGE
// ===================================

const savedLanguage = localStorage.getItem("selectedLanguage") || "en";

changeLanguage(savedLanguage);


// ===================================
// HEADER SCROLL EFFECT
// ===================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// ===================================
// EXPANDABLE HEADER SEARCH
// ===================================

const searchForm = document.querySelector(".search-form");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");

function openSearch() {

    searchForm.classList.add("active");

    searchButton.setAttribute("aria-expanded", "true");
    searchButton.setAttribute("aria-label", "Close search");

    searchInput.focus();

}

function closeSearch() {

    searchForm.classList.remove("active");

    searchButton.setAttribute("aria-expanded", "false");
    searchButton.setAttribute("aria-label", "Open search");

    searchInput.value = "";

}


// Search button
searchButton.addEventListener("click", () => {

    if (searchForm.classList.contains("active")) {
        closeSearch();
    } else {
        openSearch();
    }

});


// Close search with Escape
document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        searchForm.classList.contains("active")
    ) {
        closeSearch();
    }

});


// Close search when clicking outside
document.addEventListener("click", event => {

    if (!searchForm.contains(event.target)) {
        closeSearch();
    }

});
