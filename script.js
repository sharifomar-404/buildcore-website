
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

    // Hero slide translations
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

    slides.forEach((slide, index) => {

        const heading = slide.querySelector(".hero-content h1");
        const description = slide.querySelector(".hero-content p");
        const button = slide.querySelector(".hero-content .btn-primary");

        if (language === "ar") {
            heading.textContent = heroTranslations[index].heading;
            description.textContent = heroTranslations[index].description;
            button.textContent = heroTranslations[index].button;
        } else {
            heading.textContent = englishContent[index].heading;
            description.textContent = englishContent[index].description;
            button.textContent = englishContent[index].button;
        }
    });

    // Search translation
    const languageSearchInput = document.querySelector(".search-input");

    languageSearchInput.placeholder = language === "ar"
        ? "بحث..."
        : "Search...";

    languageSearchInput.setAttribute(
        "aria-label",
        language === "ar" ? "البحث في الموقع" : "Search website"
    );

    // Language button states
    languageButtons.forEach(button => {

        const isActive = button.dataset.lang === language;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive);

    });

    // Update selected flags
    languageDropdowns.forEach(dropdown => {

        const flag = dropdown.querySelector(".current-language-flag");

        flag.src = language === "ar"
            ? "https://flagcdn.com/sa.svg"
            : "https://flagcdn.com/gb.svg";

        flag.alt = language === "ar" ? "Arabic" : "English";

    });

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


// Close language dropdowns when clicking outside
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
const searchResults = document.getElementById("searchResults");


// ===================================
// BUILDCORE SEARCH DATA
// ===================================

const searchData = [
    {
        title: "Overview",
        keywords: ["overview", "about", "company", "من نحن"],
        link: "overview.html"
    },
    {
        title: "Why BuildCore?",
        keywords: ["why buildcore", "why us", "about buildcore"],
        link: "why-buildcore.html"
    },
    {
        title: "Our Partners",
        keywords: ["partners", "partner", "شركاء"],
        link: "partners.html"
    },
    {
        title: "Concrete Admixtures",
        keywords: ["concrete", "admixtures", "إضافات الخرسانة"],
        link: "concrete-admixtures.html"
    },
    {
        title: "Waterproofing Solutions",
        keywords: ["waterproofing", "water proofing", "العزل المائي"],
        link: "waterproofing.html"
    },
    {
        title: "Repair & Protection",
        keywords: ["repair", "protection", "إصلاح", "حماية"],
        link: "repair-protection.html"
    },
    {
        title: "Flooring & Coatings",
        keywords: ["flooring", "coatings", "الأرضيات"],
        link: "flooring-coatings.html"
    },
    {
        title: "Grouts & Anchoring",
        keywords: ["grouts", "anchoring", "تثبيت"],
        link: "grouts-anchoring.html"
    },
    {
        title: "Sealants & Adhesives",
        keywords: ["sealants", "adhesives", "مواد لاصقة"],
        link: "sealants-adhesives.html"
    },
    {
        title: "Industries We Serve",
        keywords: [
            "industries",
            "infrastructure",
            "commercial",
            "residential",
            "industrial",
            "medical",
            "transportation",
            "القطاعات",
            "البنية التحتية"
        ],
        link: "index.html#industries"
    },
    {
        title: "Our Projects",
        keywords: ["projects", "project", "مشاريع"],
        link: "projects.html"
    },
    {
        title: "Clients",
        keywords: ["clients", "customers", "عملاء"],
        link: "clients.html"
    },
    {
        title: "Sustainability",
        keywords: ["sustainability", "environment", "استدامة"],
        link: "sustainability.html"
    },
    {
        title: "Vision 2030",
        keywords: ["vision 2030", "saudi vision", "رؤية 2030"],
        link: "vision-2030.html"
    },
    {
        title: "Media",
        keywords: ["media", "news", "articles", "events", "الإعلام"],
        link: "media.html"
    }
];

const arabicSearchTitles = {
    "Overview": "نظرة عامة",
    "Why BuildCore?": "لماذا BuildCore؟",
    "Our Partners": "شركاؤنا",
    "Concrete Admixtures": "إضافات الخرسانة",
    "Waterproofing Solutions": "حلول العزل المائي",
    "Repair & Protection": "الإصلاح والحماية",
    "Flooring & Coatings": "الأرضيات والطلاءات",
    "Grouts & Anchoring": "مواد الحشو والتثبيت",
    "Sealants & Adhesives": "مواد السد والمواد اللاصقة",
    "Industries We Serve": "القطاعات التي نخدمها",
    "Our Projects": "مشاريعنا",
    "Clients": "عملاؤنا",
    "Sustainability": "الاستدامة",
    "Vision 2030": "رؤية 2030",
    "Media": "الإعلام"
};


// ===================================
// SEARCH MATCHING FUNCTION
// ===================================

function findSearchMatches(value) {

    const query = value
        .toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF\s]/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (!query || !/[a-z\u0600-\u06FF]/i.test(query)) {
        return [];
    }

    const words = query.split(" ");

    return searchData.filter(item => {

        const searchableText = [
            item.title,
            ...item.keywords
        ].join(" ").toLowerCase();

        return words.every(word =>
            searchableText.includes(word)
        );

    });
}


// ===================================
// OPEN AND CLOSE SEARCH
// ===================================

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
    searchResults.innerHTML = "";

}


// Search button
searchButton.addEventListener("click", () => {

    if (!searchForm.classList.contains("active")) {
        openSearch();
    } else if (searchInput.value.trim()) {
        searchForm.requestSubmit();
    } else {
        closeSearch();
    }

});


// ===================================
// LIVE SEARCH SUGGESTIONS
// ===================================

searchInput.addEventListener("input", () => {

    const query = searchInput.value.trim();

    searchResults.innerHTML = "";

    if (!query) return;

    const matches = findSearchMatches(query);

    matches.forEach(item => {

        const resultLink = document.createElement("a");

        resultLink.href = item.link;
        resultLink.textContent =
    document.documentElement.lang === "ar"
        ? arabicSearchTitles[item.title]
        : item.title;
        resultLink.classList.add("search-result-item");

        searchResults.appendChild(resultLink);

    });

});


// ===================================
// SEARCH SUBMISSION
// ===================================

searchForm.addEventListener("submit", event => {

    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) return;

    const matches = findSearchMatches(query);

    if (matches.length > 0) {

        window.location.href = matches[0].link;

    } else {

        window.location.href =
            "no-results.html?q=" + encodeURIComponent(query);

    }

});


// ===================================
// CLOSE SEARCH WITH ESCAPE
// ===================================

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        searchForm.classList.contains("active")
    ) {
        closeSearch();
    }

});


// ===================================
// CLOSE SEARCH WHEN CLICKING OUTSIDE
// ===================================

document.addEventListener("click", event => {

    if (!event.target.closest(".search-container")) {
        closeSearch();
    }

});


// ===================================
// BUILDCORE PROJECT SLIDESHOW
// ===================================

const projectSlides = document.querySelectorAll(".glance-project-slide");
const projectPrev = document.querySelector(".glance-project-prev");
const projectNext = document.querySelector(".glance-project-next");
const projectIndicators = document.querySelectorAll(".glance-project-indicator");

let currentProject = 0;
let projectAutoSlide;

function showProject(index) {

    projectSlides.forEach(slide => slide.classList.remove("active"));
    projectIndicators.forEach(indicator => indicator.classList.remove("active"));

    projectSlides[index].classList.add("active");
    projectIndicators[index].classList.add("active");

    currentProject = index;
}

// Next project
function nextProject() {

    const nextIndex = (currentProject + 1) % projectSlides.length;

    showProject(nextIndex);
}

// Previous project
function previousProject() {

    const previousIndex =
        (currentProject - 1 + projectSlides.length) % projectSlides.length;

    showProject(previousIndex);
}

// Automatic slideshow
function startProjectAutoSlide() {
    projectAutoSlide = setInterval(nextProject, 5000);
}

function resetProjectAutoSlide() {
    clearInterval(projectAutoSlide);
    startProjectAutoSlide();
}

// Arrow interactions
projectNext.addEventListener("click", () => {
    nextProject();
    resetProjectAutoSlide();
});

projectPrev.addEventListener("click", () => {
    previousProject();
    resetProjectAutoSlide();
});

// Indicator interactions
projectIndicators.forEach((indicator, index) => {

    indicator.addEventListener("click", () => {
        showProject(index);
        resetProjectAutoSlide();
    });

});

// Start automatic slideshow
startProjectAutoSlide();


// ===================================
// FOOTER YEAR
// ===================================

document.getElementById("footer-year").textContent =
    new Date().getFullYear();


// ===================================
// MOBILE NAVIGATION DROPDOWNS
// ===================================

const mobileDropdownToggles = document.querySelectorAll(
    ".mobile-dropdown-toggle"
);

mobileDropdownToggles.forEach(toggle => {

    toggle.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const parent = this.closest(".mobile-nav-dropdown");

        if (!parent) return;

        const isOpen = parent.classList.contains("active");

        // Close all dropdowns first
        document.querySelectorAll(".mobile-nav-dropdown").forEach(dropdown => {
            dropdown.classList.remove("active");

            const button = dropdown.querySelector(".mobile-dropdown-toggle");

            if (button) {
                button.setAttribute("aria-expanded", "false");
            }
        });

        // Open this dropdown only if it was previously closed
        if (!isOpen) {
            parent.classList.add("active");
            this.setAttribute("aria-expanded", "true");
        }

    });

});

// ===================================
// MOBILE SEARCH BUTTON
// ===================================

const mobileSearchTrigger = document.querySelector(
    ".mobile-search-trigger"
);

if (mobileSearchTrigger) {
    mobileSearchTrigger.addEventListener("click", function () {

        closeMenu();

        openSearch();

    });
}


/* ===================================
   COOKIE CONSENT SYSTEM
=================================== */

document.addEventListener("DOMContentLoaded", function () {

    const cookieBanner = document.querySelector("#cookie-banner");
    const cookieAccept = document.querySelector("#cookie-accept");
    const cookieReject = document.querySelector("#cookie-reject");
    const cookieSettingsBtn = document.querySelector("#cookie-settings-btn");
    const cookieSettingsPanel = document.querySelector("#cookie-settings-panel");
    const cookieSettingsClose = document.querySelector("#cookie-settings-close");

    if (!cookieBanner) return;

    const storageKey = "buildcore-cookie-choice";
    const expiryTime = 24 * 60 * 60 * 1000; // 24 hours

    // Check saved choice and expiry
    const savedChoice = localStorage.getItem(storageKey);

    if (savedChoice) {
        const choiceData = JSON.parse(savedChoice);

        if (Date.now() - choiceData.timestamp < expiryTime) {
            cookieBanner.classList.remove("active");
        } else {
            localStorage.removeItem(storageKey);
            cookieBanner.classList.add("active");
        }
    } else {
        cookieBanner.classList.add("active");
    }

    // Save visitor choice
    function saveChoice(choice) {
        localStorage.setItem(storageKey, JSON.stringify({
            choice: choice,
            timestamp: Date.now()
        }));

        cookieBanner.classList.remove("active");
    }

    // Accept
    if (cookieAccept) {
        cookieAccept.addEventListener("click", function () {
            saveChoice("accepted");
        });
    }

    // Reject optional
    if (cookieReject) {
        cookieReject.addEventListener("click", function () {
            saveChoice("rejected");
        });
    }

    // Open settings
    if (cookieSettingsBtn && cookieSettingsPanel) {
        cookieSettingsBtn.addEventListener("click", function () {
            cookieSettingsPanel.classList.toggle("active");
        });
    }

    // Close settings
    if (cookieSettingsClose && cookieSettingsPanel) {
        cookieSettingsClose.addEventListener("click", function () {
            cookieSettingsPanel.classList.remove("active");
        });
    }

});

// let choiceData;

// try {
//     choiceData = JSON.parse(savedChoice);
// } catch (error) {
//     localStorage.removeItem(storageKey);
//     cookieBanner.classList.add("active");
//     return;
// }



// add it here
// if (savedChoice) {
        // const choiceData = JSON.parse(savedChoice);
        // if shows error