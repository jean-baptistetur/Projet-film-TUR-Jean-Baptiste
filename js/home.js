function getRatingPercent(movie) {
  const ratingExists = movie.vote_average !== null && movie.vote_average !== undefined;
  const ratingIsPositive = ratingExists && movie.vote_average > 0;

  if (ratingIsPositive) {
    return Math.round(movie.vote_average * 10);
  } else {
    return 0;
  }
}

function getReleaseYear(movie) {
  const releaseDateExists =
    movie.release_date !== null && movie.release_date !== undefined;
  const releaseDateIsLongEnough = releaseDateExists && movie.release_date.length >= 4;

  if (releaseDateIsLongEnough) {
    return movie.release_date.slice(0, 4);
  } else {
    return "";
  }
}

function buildMovieCard(movie) {
  const ratingPercent = getRatingPercent(movie);
  const releaseYear = getReleaseYear(movie);
  const posterUrl = api.getPosterUrl(movie.poster_path);
  const detailPageUrl = "detail.html?id=" + movie.id;

  const cardHtml = `
    <a href="${detailPageUrl}" class="card">
      <img src="${posterUrl}" alt="${movie.title}" loading="lazy">
      <div class="card-body">
        <h3>${movie.title}</h3>
        <p>${releaseYear}</p>
      </div>
      <div class="badge">${ratingPercent}%</div>
    </a>
  `;
  return cardHtml;
}

async function loadMoviesByGenre() {
  const movieGrid = document.getElementById("movies-grid");
  const genreSelect = document.getElementById("movie-genre");
  const selectedGenreId = genreSelect.value;

  const response = await api.getPopularMovies(selectedGenreId);
  const movies = response.results;
  const movieCardsArray = movies.map(buildMovieCard);
  const movieCardsHtml = movieCardsArray.join("");
  movieGrid.innerHTML = movieCardsHtml;
}

function buildGenreOption(genre) {
  const option = document.createElement("option");
  option.value = genre.id;
  option.textContent = genre.name;
  return option;
}

async function populateGenreSelect() {
  const genreSelect = document.getElementById("movie-genre");
  const response = await api.getMovieGenres();
  const genres = response.genres;

  for (const genre of genres) {
    const option = buildGenreOption(genre);
    genreSelect.appendChild(option);
  }
}

async function searchAndDisplayMovies(userInput, searchResultsContainer) {
  const response = await api.searchMovies(userInput);
  const allResults = response.results;
  const topResults = allResults.slice(0, 10);
  const resultCardsArray = topResults.map(buildMovieCard);
  const resultCardsHtml = resultCardsArray.join("");
  searchResultsContainer.innerHTML = resultCardsHtml;
}

function bindSearchEvent() {
  const searchInput = document.getElementById("search-input");
  const searchResultsContainer = document.getElementById("search-results");
  const discoverSection = document.getElementById("discover-section");
  let typingTimer;

  searchInput.addEventListener("input", function () {
    clearTimeout(typingTimer);

    const userInput = this.value.trim();
    const inputIsEmpty = userInput.length === 0;

    if (inputIsEmpty) {
      searchResultsContainer.innerHTML = "";
      discoverSection.style.display = "";
      return;
    }

    discoverSection.style.display = "none";

    typingTimer = setTimeout(function () {
      searchAndDisplayMovies(userInput, searchResultsContainer);
    }, 400);
  });
}

function bindGenreEvent() {
  const genreSelect = document.getElementById("movie-genre");
  genreSelect.addEventListener("change", loadMoviesByGenre);
}

async function initHomePage() {
  await loadMoviesByGenre();
  await populateGenreSelect();
  bindGenreEvent();
  bindSearchEvent();
}

initHomePage();
