function buildCard(movie) {
    let note = 0;
    if (movie.vote_average) {
        note = Math.round(movie.vote_average * 10);
    }

    let date = "";
    if (movie.release_date) {
        date = movie.release_date.slice(0, 4);
    }

    return `
        <a href="detail.html?id=${movie.id}" class="card">
            <img src="${api.poster(movie.poster_path)}" alt="${movie.title}" loading="lazy">
            <div class="card-body">
                <h3>${movie.title}</h3>
                <p>${date}</p>
            </div>
            <div class="badge">${note}%</div>
        </a>
    `;
}

async function loadMovies() {
    const genreSelect = document.getElementById("movie-genre");
    const grid = document.getElementById("movies-grid");
    const data = await api.movies(genreSelect.value);
    grid.innerHTML = data.results.map(m => buildCard(m)).join("");
}

async function setupGenres() {
    const genreSelect = document.getElementById("movie-genre");
    const data = await api.movieGenres();
    for (const g of data.genres) {
        genreSelect.innerHTML += `<option value="${g.id}">${g.name}</option>`;
    }
}

function bindEvents() {
    const genreSelect = document.getElementById("movie-genre");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    genreSelect.addEventListener("change", () => loadMovies());

    let timer;
    searchInput.addEventListener("input", e => {
        clearTimeout(timer);
        const q = e.target.value.trim();

        if (!q) {
            searchResults.innerHTML = "";
            return;
        }

        timer = setTimeout(async () => {
            const data = await api.search(q);
            searchResults.innerHTML = data.results.slice(0, 10).map(m => buildCard(m)).join("");
        }, 400);
    });
}

async function initHomePage() {
    await loadMovies();
    await setupGenres();
    bindEvents();
}

initHomePage();