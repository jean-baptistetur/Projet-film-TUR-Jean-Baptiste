function getRatingPercent(movie) {
    if (!movie.vote_average) {
        return 0;
    }
    return Math.round(movie.vote_average * 10);
}

function getReleaseYear(movie) {
    if (!movie.release_date) {
        return "";
    }
    return movie.release_date.slice(0, 4);
}

function buildMovieCard(movie) {
    const rating = getRatingPercent(movie);
    const year = getReleaseYear(movie);
    const poster = api.getPosterUrl(movie.poster_path);

    return `
        <a href="detail.html?id=${movie.id}" class="card">
            <img src="${poster}" alt="${movie.title}" loading="lazy">
            <div class="card-body">
                <h3>${movie.title}</h3>
                <p>${year}</p>
            </div>
            <div class="badge">${rating}%</div>
        </a>
    `;
}

async function loadTrendingMovies() {
    const grid = document.getElementById("movies-grid");
    const response = await api.getTrendingMovies();
    grid.innerHTML = response.results.map(m => buildMovieCard(m)).join("");
}

async function searchAndDisplay(query, container) {
    const response = await api.searchMovies(query);
    const results = response.results.slice(0, 10);
    container.innerHTML = results.map(m => buildMovieCard(m)).join("");
}

function bindSearchEvent() {
    const input = document.getElementById("search-input");
    const resultsContainer = document.getElementById("search-results");
    const discoverSection = document.getElementById("discover-section");
    let timer;

    input.addEventListener("input", function () {
        clearTimeout(timer);

        const query = this.value.trim();

        if (!query) {
            resultsContainer.innerHTML = "";
            discoverSection.style.display = "";
            return;
        }

        discoverSection.style.display = "none";

        timer = setTimeout(function () {
            searchAndDisplay(query, resultsContainer);
        }, 400);
    });
}

async function initHomePage() {
    await loadTrendingMovies();
    bindSearchEvent();
}

initHomePage();