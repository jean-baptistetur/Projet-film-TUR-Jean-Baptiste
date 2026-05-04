const API_KEY = "6cf360749e015306dfd4bcf5ccefccee";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/500x750?text=No+Image";

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
    getTrendingMovies() {
        return apiFetch("/trending/movie/week");
    },

    getPopularMovies(genreId = "") {
        const params = { sort_by: "popularity.desc" };

        if (genreId) {
            params.with_genres = genreId;
        }

        return apiFetch("/discover/movie", params);
    },

    getMovieGenres() {
        return apiFetch("/genre/movie/list");
    },

    getMovieDetail(movieId) {
        return apiFetch("/movie/" + movieId, { append_to_response: "credits" });
    },

    searchMovies(query) {
        return apiFetch("/search/movie", { query });
    },

    getPosterUrl(path) {
        if (!path) {
            return PLACEHOLDER_IMAGE;
        }
        return IMAGE_BASE_URL + path;
    }
};