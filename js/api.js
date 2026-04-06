const API_KEY = "6cf360749e015306dfd4bcf5ccefccee";
const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";
const FALLBACK = "https://via.placeholder.com/500x750?text=No+Image";

async function apiFetch(endpoint, params = {}) {
    const url = new URL(`${BASE}${endpoint}`);
    url.searchParams.set("api_key", API_KEY);
    url.searchParams.set("language", "fr-FR");

    for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(k, v);
    }

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Erreur API");
    }
    return res.json();
}

const api = {
    movies(genreId = "") {
        const params = { sort_by: "popularity.desc" };
        if (genreId) {
            params.with_genres = genreId;
        }
        return apiFetch("/discover/movie", params);
    },

    movieGenres() {
        return apiFetch("/genre/movie/list");
    },

    movieDetail(id) {
        return apiFetch(`/movie/${id}`, { append_to_response: "credits" });
    },
    
    poster(path) {
        if (path) {
            return `${IMG}${path}`;
        }
        return FALLBACK;
    }
};