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
// LANGUAGE DROPDOWN
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


// Open and close dropdown
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

    // Translate elements with language attributes
    const translatableElements = document.querySelectorAll("[data-en][data-ar]");

    translatableElements.forEach(element => {
        element.textContent = language === "ar"
            ? element.dataset.ar
            : element.dataset.en;
    });

    // Update all contact form placeholders
document.querySelectorAll("[data-en-placeholder][data-ar-placeholder]")
    .forEach(input => {
        input.placeholder = language === "ar"
            ? input.dataset.arPlaceholder
            : input.dataset.enPlaceholder;
    });

    // Update search placeholder
    const languageSearchInput = document.querySelector(".search-input");

    languageSearchInput.placeholder = language === "ar"
        ? "بحث..."
        : "Search...";

    languageSearchInput.setAttribute(
        "aria-label",
        language === "ar" ? "البحث في الموقع" : "Search website"
    );

    // Update language button states
    languageButtons.forEach(button => {

        const isActive = button.dataset.lang === language;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive);

    });

    // Update selected flag
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

}


// Language selection events
languageButtons.forEach(button => {
    button.addEventListener("click", () => {
        changeLanguage(button.dataset.lang);
    });
});


// Close dropdown when clicking outside
document.addEventListener("click", event => {
    if (!event.target.closest(".language-dropdown")) {
        closeLanguageDropdowns();
    }
});


// Restore previously selected language
const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
changeLanguage(savedLanguage);


// ===================================
// MOBILE NAVIGATION
// ===================================

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuClose = document.querySelector(".menu-close");
const menuOverlay = document.querySelector(".menu-overlay");

function openMenu() {

    if (!menuToggle || !mobileMenu || !menuOverlay) return;

    mobileMenu.classList.add("active");
    menuOverlay.style.display = "block";

    requestAnimationFrame(() => {
        menuOverlay.classList.add("active");
    });

    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {

    if (!menuToggle || !mobileMenu || !menuOverlay) return;

    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

    setTimeout(() => {
        menuOverlay.style.display = "none";
    }, 300);
}

// Open hamburger menu
if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
}

// Close button
if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
}

// Close when clicking overlay
if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
}

// Close when clicking a navigation link
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Close with Escape key
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


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

// Update copyright year
const footerYear = document.getElementById("footer-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

