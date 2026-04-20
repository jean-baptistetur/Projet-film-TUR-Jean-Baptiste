const API_KEY = "6cf360749e015306dfd4bcf5ccefccee";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/500x750?text=No+Image";

async function apiFetch(endpoint, extraParams) {
  if (extraParams === undefined) {
    extraParams = {};
  }

  const fullUrl = new URL(BASE_URL + endpoint);
  fullUrl.searchParams.set("api_key", API_KEY);
  fullUrl.searchParams.set("language", "fr-FR");

  const paramEntries = Object.entries(extraParams);
  for (const [paramName, paramValue] of paramEntries) {
    fullUrl.searchParams.set(paramName, paramValue);
  }

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error("La requête vers l'API a échoué (statut " + response.status + ")");
  }

  const jsonData = await response.json();
  return jsonData;
}

const api = {
  getPopularMovies(genreId) {
    if (genreId === undefined) {
      genreId = "";
    }

    const queryParams = { sort_by: "popularity.desc" };

    const genreIdIsSpecified = genreId !== "";
    if (genreIdIsSpecified) {
      queryParams.with_genres = genreId;
    }

    return apiFetch("/discover/movie", queryParams);
  },

  getMovieGenres() {
    return apiFetch("/genre/movie/list");
  },

  getMovieDetail(movieId) {
    const queryParams = { append_to_response: "credits" };
    return apiFetch("/movie/" + movieId, queryParams);
  },

  searchMovies(searchQuery) {
    const queryParams = { query: searchQuery };
    return apiFetch("/search/movie", queryParams);
  },

  getPosterUrl(posterPath) {
    const posterPathExists =
      posterPath !== null && posterPath !== undefined && posterPath.length > 0;

    if (posterPathExists) {
      return IMAGE_BASE_URL + posterPath;
    } else {
      return PLACEHOLDER_IMAGE;
    }
  },
};
