class HomePage {
    constructor() {
        this.trendingGrid = document.getElementById("movies-grid");
        this.filmsGrid = document.getElementById("films-grid");
        this.genreSelect = document.getElementById("films-genre");
        this.yearSelect = document.getElementById("films-year");
        this.searchInput = document.getElementById("search-input");
        this.searchResults = document.getElementById("search-results");
        this.discoverSection = document.getElementById("discover-section");
        this.filmsSection = document.getElementById("films-section");
        this.init();
    }

    async init() {
        await this.loadTrendingMovies();
        await this.populateGenres();
        this.populateYears();
        await this.loadFilms();
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

    async loadFilms() {
        try {
            const response = await api.getPopularMovies(this.genreSelect.value, this.yearSelect.value);
            this.filmsGrid.innerHTML = response.results.map(m => this.buildMovieCard(m)).join("");
        } catch (error) {
            this.filmsGrid.innerHTML = "<p>Erreur lors du chargement des films.</p>";
        }
    }

    async populateGenres() {
        try {
            const response = await api.getMovieGenres();
            for (const genre of response.genres) {
                const option = document.createElement("option");
                option.value = genre.id;
                option.textContent = genre.name;
                this.genreSelect.appendChild(option);
            }
        } catch (error) {
            // le select reste avec l'option par défaut
        }
    }

    populateYears() {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1990; year--) {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            this.yearSelect.appendChild(option);
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
        this.genreSelect.addEventListener("change", () => this.loadFilms());
        this.yearSelect.addEventListener("change", () => this.loadFilms());

        let timer;

        this.searchInput.addEventListener("input", () => {
            clearTimeout(timer);

            const query = this.searchInput.value.trim();

            if (!query) {
                this.searchResults.innerHTML = "";
                this.discoverSection.style.display = "";
                this.filmsSection.style.display = "";
                return;
            }

            this.discoverSection.style.display = "none";
            this.filmsSection.style.display = "none";

            timer = setTimeout(() => {
                this.searchAndDisplay(query);
            }, 400);
        });
    }
}

new HomePage();