
/* =========================================
   BUILDCORE SUSTAINABILITY PAGE
   JAVASCRIPT
========================================= */


/* =========================================
   01. SMOOTH SECTION SCROLLING
========================================= */

document.querySelectorAll(".sustain-page [data-scroll]")
    .forEach(button => {

        button.addEventListener("click", function (event) {

            const targetId = this.getAttribute("data-scroll");

            const targetSection = document.getElementById(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


/* =========================================
   02. SCROLL REVEAL ANIMATION
========================================= */

const sustainRevealElements = document.querySelectorAll(
    ".sustain-page [data-reveal]"
);

if ("IntersectionObserver" in window) {

    const sustainObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    sustainRevealElements.forEach(element => {
        sustainObserver.observe(element);
    });

} else {

    sustainRevealElements.forEach(element => {
        element.classList.add("is-visible");
    });

}
