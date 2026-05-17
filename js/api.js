// clé + URLs de base
const API_KEY = CONFIG.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/500x750?text=No+Image";

// requête générique
async function apiFetch(endpoint, params = {}) {
  const url = new URL(BASE_URL + endpoint);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "fr-FR");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erreur API : " + response.status);
  }

  return response.json();
}

const api = {
  // tendances de la semaine
  getTrendingMovies() {
    return apiFetch("/trending/movie/week");
  },

  // films par popularité + filtres
  getPopularMovies(genreId = "", year = "") {
    const params = { sort_by: "popularity.desc" };

    if (genreId) {
      params.with_genres = genreId;
    }

    if (year) {
      params.primary_release_year = year;
    }

    return apiFetch("/discover/movie", params);
  },

  // genres films
  getMovieGenres() {
    return apiFetch("/genre/movie/list");
  },

  // séries par popularité + filtres
  getPopularSeries(genreId = "", year = "") {
    const params = { sort_by: "popularity.desc" };

    if (genreId) {
      params.with_genres = genreId;
    }

    if (year) {
      params.first_air_date_year = year;
    }

    return apiFetch("/discover/tv", params);
  },

  // genres séries
  getSeriesGenres() {
    return apiFetch("/genre/tv/list");
  },

  // détail film + casting
  getMovieDetail(movieId) {
    return apiFetch("/movie/" + movieId, { append_to_response: "credits" });
  },

  // recherche
  searchMovies(query) {
    return apiFetch("/search/movie", { query });
  },

  // image ou placeholder
  getPosterUrl(path) {
    if (!path) {
      return PLACEHOLDER_IMAGE;
    }
    return IMAGE_BASE_URL + path;
  },
};