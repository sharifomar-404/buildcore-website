
const mediaSearch = document.getElementById("media-search");
const mediaYear = document.getElementById("media-year");
const mediaArticles = document.querySelectorAll(
    ".media-articles article"
);
const noResults = document.getElementById("media-no-results");

function filterMedia() {

    const searchTerm = mediaSearch.value.trim().toLowerCase();
    const selectedYear = mediaYear.value;

    let visibleArticles = 0;

    mediaArticles.forEach(article => {

        const articleText = article.textContent.toLowerCase();
        const articleYear = article.dataset.year;

        const matchesSearch = articleText.includes(searchTerm);

        const matchesYear =
            selectedYear === "all" ||
            articleYear === selectedYear;

        if (matchesSearch && matchesYear) {
            article.style.display = "";
            visibleArticles++;
        } else {
            article.style.display = "none";
        }

    });

    noResults.hidden = visibleArticles !== 0;
}

// Search as the visitor types
mediaSearch.addEventListener("input", filterMedia);

// Filter when the selected year changes
mediaYear.addEventListener("change", filterMedia);
