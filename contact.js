
// =========================
// MESSAGE CHARACTER COUNTER
// =========================

const messageInput = document.getElementById("message");
const messageCount = document.getElementById("message-count");

if (messageInput && messageCount) {

    messageInput.addEventListener("input", function () {

        messageCount.textContent = messageInput.value.length;

    });

}

// INTERNATIONAL PHONE INPUT

const phoneInput = document.querySelector("#phone");

if (phoneInput && window.intlTelInput) {

    window.intlTelInput(phoneInput, {
        initialCountry: "sa",
        countrySelectorMode: "DROPDOWN",
        separateDialCode: true,
        showFlags: true,
        countrySearch: true,

        loadUtils: () =>
            import("https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.0/dist/js/utils.js")
    });

}

function updatePhonePlaceholder() {
    const phoneInput = document.querySelector("#phone");
    const isArabic = document.documentElement.lang === "ar";

    if (phoneInput) {
        phoneInput.placeholder = isArabic
            ? "أدخل رقم الهاتف"
            : "Enter phone number";
    }
}

updatePhonePlaceholder();

