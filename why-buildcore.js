
/* =========================================
   WHY BUILDCORE PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 01. SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(
        ".why-intro-heading, " +
        ".why-intro-description, " +
        ".why-section-heading, " +
        ".why-strength-card, " +
        ".why-technical-image, " +
        ".why-technical-content, " +
        ".why-industry-card, " +
        ".commitment-content, " +
        ".commitment-image, " +
        ".why-cta-content"
    );

    revealElements.forEach((element) => {
        element.setAttribute("data-reveal", "");
    });


    // Check browser support
    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    // =====================================
    // 02. ACCESSIBILITY - REDUCED MOTION
    // =====================================

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }

});
