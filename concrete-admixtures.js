
/* =========================================
   BUILDCORE - CONCRETE ADMIXTURES
   JavaScript
========================================= */


/* 1. SMOOTH SCROLLING */

document.querySelectorAll(
    '.category-page a[href^="#"]'
).forEach(link => {

    link.addEventListener('click', function (event) {

        const targetId = this.getAttribute('href');

        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

    });

});


/* 2. ENQUIRY FORM */

const enquiryForm = document.getElementById(
    'enquiryForm'
);

const formMessage = document.getElementById(
    'formMessage'
);


if (enquiryForm) {

    enquiryForm.addEventListener('submit', function (event) {

        event.preventDefault();

        // Check browser validation
        if (!enquiryForm.checkValidity()) {

            enquiryForm.reportValidity();

            return;
        }

        // Collect form information
        const formData = new FormData(enquiryForm);

        const enquiry = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            product: formData.get('product'),
            message: formData.get('message')
        };

        // Check required information
        if (
            !enquiry.name ||
            !enquiry.email ||
            !enquiry.phone ||
            !enquiry.message
        ) {

            formMessage.textContent =
                'Please complete all required fields.';

            formMessage.className = 'form-message error';

            return;
        }

        // Front-end demonstration only.
        // Connect a backend or form service to actually send enquiries.

        console.log('New BuildCore enquiry:', enquiry);

        formMessage.textContent =
            'Form validated successfully. Please connect the enquiry form to a backend before accepting live submissions.';

        formMessage.className = 'form-message success';

    });

}


/* 3. PRODUCT ENQUIRY SHORTCUT */

document.querySelectorAll(
    '.product-link'
).forEach(link => {

    link.addEventListener('click', function () {

        const productCard = this.closest('.category-product');

        if (!productCard) return;

        const productName = productCard.querySelector('h3');

        const productSelect = document.getElementById('product');

        if (productName && productSelect) {

            const matchingOption = Array.from(
                productSelect.options
            ).find(option =>
                option.text.trim() === productName.textContent.trim()
            );

            if (matchingOption) {
                productSelect.value = matchingOption.value;
            }

        }

    });

});



function changeLanguage(language) {

    const page = document.querySelector(".category-page");

    // Update page direction and language
    page.setAttribute("lang", language);
    page.setAttribute("dir", language === "ar" ? "rtl" : "ltr");

    document.documentElement.lang = language;
    document.documentElement.dir =
        language === "ar" ? "rtl" : "ltr";

        function updatePlaceholders(language) {

    document.querySelectorAll(
        "[data-placeholder-en][data-placeholder-ar]"
    ).forEach(option => {
        option.textContent = option.getAttribute(`data-${language}`);

        element.placeholder =
            element.getAttribute(`data-placeholder-${language}`);

    });

    // Change individual text elements
    document.querySelectorAll("[data-en][data-ar]").forEach(element => {
        element.textContent = element.getAttribute(`data-${language}`);
    });

    // Change input placeholders
    document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]")
        .forEach(element => {
            element.placeholder =
                element.getAttribute(`data-placeholder-${language}`);
        });

    // Update active language button
    document.querySelectorAll(".language-btn").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.lang === language
        );
    });

    // Save selected language
    localStorage.setItem("buildcore-language", language);
}


// Language buttons
document.querySelectorAll(".lang-btn").forEach(button => {
    button.addEventListener("click", () => {
        changeLanguage(button.dataset.lang);
    });
});


// Load saved language
const savedLanguage =
    localStorage.getItem("buildcore-language") || "en";

changeLanguage(savedLanguage);


