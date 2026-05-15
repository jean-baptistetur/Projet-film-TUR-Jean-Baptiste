Résumé simple de l'utilité des fichiers :

- index.html ==> page d'accueil (tendances, films, séries, recherche)

- detail.html ==> page de détail d'un film

- style.css ==> mise en forme de toutes les pages

- js/api.js ==> communication avec l'API TMDB

- js/home.js ==> logique de la page d'accueil

- js/detail.js ==> logique de la page de détail




Répartition des fichiers en fonction des consignes :

- index.html ==> balises sémantiques (header, main, section), validation W3C HTML

- detail.html ==> balises sémantiques (header, main), validation W3C HTML

- style.css ==> animation CSS (@keyframes fadeInUp sur .card), validation W3C CSS

- js/api.js ==> texte en français (language: fr-FR), listing tendances (getTrendingMovies), listing films (getPopularMovies), listing séries (getPopularSeries), filtres dynamiques genres films (getMovieGenres), filtres dynamiques genres séries (getSeriesGenres), images par défaut (getPosterUrl)

- js/home.js ==> POO (class HomePage), listing tendances (loadTrendingMovies), listing films avec filtres (loadFilms), listing séries avec filtres (loadSeries), filtres dynamiques genres (populateFilmsGenres, populateSeriesGenres), filtres dynamiques années (populateYears), recherche fonctionnelle (searchAndDisplay), gestion des erreurs (try/catch dans chaque méthode async)

- js/detail.js ==> POO (class DetailPage), page de détail (render), 8 acteurs max (credits.cast.slice(0, 8)), images par défaut (api.getPosterUrl), gestion des erreurs (try/catch dans loadMovie)