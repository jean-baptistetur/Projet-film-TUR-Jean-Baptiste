class HomePage {
    constructor() {
        this.trendingGrid = document.getElementById("movies-grid");
        this.searchInput = document.getElementById("search-input");
        this.searchResults = document.getElementById("search-results");
        this.discoverSection = document.getElementById("discover-section");
        this.init();
    }

    async init() {
        await this.loadTrendingMovies();
        this.bindEvents();
    }

    buildMovieCard(movie) {
        const rating = movie.vote_average ? Math.round(movie.vote_average * 10) : 0;
        const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
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

    async loadTrendingMovies() {
        try {
            const response = await api.getTrendingMovies();
            this.trendingGrid.innerHTML = response.results.map(m => this.buildMovieCard(m)).join("");
        } catch (error) {
            this.trendingGrid.innerHTML = "<p>Erreur lors du chargement des tendances.</p>";
        }
    }

    async searchAndDisplay(query) {
        try {
            const response = await api.searchMovies(query);
            const results = response.results.slice(0, 10);
            this.searchResults.innerHTML = results.map(m => this.buildMovieCard(m)).join("");
        } catch (error) {
            this.searchResults.innerHTML = "<p>Erreur lors de la recherche.</p>";
        }
    }

    bindEvents() {
        let timer;

        this.searchInput.addEventListener("input", () => {
            clearTimeout(timer);

            const query = this.searchInput.value.trim();

            if (!query) {
                this.searchResults.innerHTML = "";
                this.discoverSection.style.display = "";
                return;
            }

            this.discoverSection.style.display = "none";

            timer = setTimeout(() => {
                this.searchAndDisplay(query);
            }, 400);
        });
    }
}

new HomePage();