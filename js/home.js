class HomePage {
  constructor() {
    this.trendingGrid = document.getElementById("movies-grid");
    this.filmsGrid = document.getElementById("films-grid");
    this.filmsGenreSelect = document.getElementById("films-genre");
    this.filmsYearSelect = document.getElementById("films-year");
    this.seriesGrid = document.getElementById("series-grid");
    this.seriesGenreSelect = document.getElementById("series-genre");
    this.seriesYearSelect = document.getElementById("series-year");
    this.searchInput = document.getElementById("search-input");
    this.searchResults = document.getElementById("search-results");
    this.discoverSection = document.getElementById("discover-section");
    this.filmsSection = document.getElementById("films-section");
    this.seriesSection = document.getElementById("series-section");
    this.init();
  }

  async init() {
    await this.loadTrendingMovies();
    await this.populateFilmsGenres();
    await this.populateSeriesGenres();
    this.populateYears(this.filmsYearSelect);
    this.populateYears(this.seriesYearSelect);
    await this.loadFilms();
    await this.loadSeries();
    this.bindEvents();
  }

  buildCard(item) {
    const rating = item.vote_average ? Math.round(item.vote_average * 10) : 0;
    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date;
    const year = date ? date.slice(0, 4) : "";
    const poster = api.getPosterUrl(item.poster_path);

    return `
            <a href="detail.html?id=${item.id}" class="card">
                <img src="${poster}" alt="${title}" loading="lazy">
                <div class="card-body">
                    <h3>${title}</h3>
                    <p>${year}</p>
                </div>
                <div class="badge">${rating}%</div>
            </a>
        `;
  }

  async loadTrendingMovies() {
    try {
      const response = await api.getTrendingMovies();
      this.trendingGrid.innerHTML = response.results
        .map((m) => this.buildCard(m))
        .join("");
    } catch (error) {
      this.trendingGrid.innerHTML = "<p>Erreur lors du chargement des tendances.</p>";
    }
  }

  async loadFilms() {
    try {
      const response = await api.getPopularMovies(
        this.filmsGenreSelect.value,
        this.filmsYearSelect.value,
      );
      this.filmsGrid.innerHTML = response.results.map((m) => this.buildCard(m)).join("");
    } catch (error) {
      this.filmsGrid.innerHTML = "<p>Erreur lors du chargement des films.</p>";
    }
  }

  async loadSeries() {
    try {
      const response = await api.getPopularSeries(
        this.seriesGenreSelect.value,
        this.seriesYearSelect.value,
      );
      this.seriesGrid.innerHTML = response.results.map((s) => this.buildCard(s)).join("");
    } catch (error) {
      this.seriesGrid.innerHTML = "<p>Erreur lors du chargement des séries.</p>";
    }
  }

  async populateFilmsGenres() {
    try {
      const response = await api.getMovieGenres();
      for (const genre of response.genres) {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.name;
        this.filmsGenreSelect.appendChild(option);
      }
    } catch (error) {
      // le select reste avec l'option par défaut
    }
  }

  async populateSeriesGenres() {
    try {
      const response = await api.getSeriesGenres();
      for (const genre of response.genres) {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.name;
        this.seriesGenreSelect.appendChild(option);
      }
    } catch (error) {
      // le select reste avec l'option par défaut
    }
  }

  populateYears(select) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1990; year--) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select.appendChild(option);
    }
  }

  async searchAndDisplay(query) {
    try {
      const response = await api.searchMovies(query);
      const results = response.results.slice(0, 10);
      this.searchResults.innerHTML = results.map((m) => this.buildCard(m)).join("");
    } catch (error) {
      this.searchResults.innerHTML = "<p>Erreur lors de la recherche.</p>";
    }
  }

  bindEvents() {
    this.filmsGenreSelect.addEventListener("change", () => this.loadFilms());
    this.filmsYearSelect.addEventListener("change", () => this.loadFilms());
    this.seriesGenreSelect.addEventListener("change", () => this.loadSeries());
    this.seriesYearSelect.addEventListener("change", () => this.loadSeries());

    let timer;

    this.searchInput.addEventListener("input", () => {
      clearTimeout(timer);

      const query = this.searchInput.value.trim();

      if (!query) {
        this.searchResults.innerHTML = "";
        this.discoverSection.style.display = "";
        this.filmsSection.style.display = "";
        this.seriesSection.style.display = "";
        return;
      }

      this.discoverSection.style.display = "none";
      this.filmsSection.style.display = "none";
      this.seriesSection.style.display = "none";

      timer = setTimeout(() => {
        this.searchAndDisplay(query);
      }, 400);
    });
  }
}

new HomePage();
