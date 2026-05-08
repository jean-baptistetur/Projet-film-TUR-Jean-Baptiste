class DetailPage {
  constructor() {
    this.container = document.getElementById("app");
    const movieId = new URLSearchParams(window.location.search).get("id");

    if (!movieId) {
      this.container.innerHTML = "<p>Aucun film sélectionné.</p>";
      return;
    }

    this.loadMovie(movieId);
  }

  async loadMovie(movieId) {
    try {
      const movie = await api.getMovieDetail(movieId);
      this.render(movie);
    } catch (error) {
      this.container.innerHTML = "<p>Impossible de charger les informations du film.</p>";
    }
  }

  buildGenresHtml(genres) {
    if (!genres || genres.length === 0) {
      return "";
    }

    let html = "";
    for (const genre of genres) {
      html += `<span class="genre-tag">${genre.name}</span>`;
    }
    return html;
  }

  buildCastHtml(credits) {
    if (!credits || !credits.cast) {
      return "";
    }

    let html = "";
    for (const actor of credits.cast.slice(0, 8)) {
      html += `
                <div class="actor-card">
                    <img src="${api.getPosterUrl(actor.profile_path)}" alt="${actor.name}">
                    <p>${actor.name}</p>
                    <small>${actor.character}</small>
                </div>
            `;
    }
    return html;
  }

  render(movie) {
    const rating = movie.vote_average ? Math.round(movie.vote_average * 10) : 0;
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
    const overview = movie.overview || "Aucune description disponible.";
    const poster = api.getPosterUrl(movie.poster_path);
    const genresHtml = this.buildGenresHtml(movie.genres);
    const castHtml = this.buildCastHtml(movie.credits);

    let castSection = "";
    if (castHtml) {
      castSection = `
                <section class="cast">
                    <h2>Acteurs principaux</h2>
                    <div class="cast-grid">${castHtml}</div>
                </section>
            `;
    }

    this.container.innerHTML = `
            <section class="detail-hero">
                <img class="detail-poster" src="${poster}" alt="${movie.title}">
                <div class="detail-info">
                    <h1>${movie.title}</h1>
                    <p class="detail-date">${year}</p>
                    <div class="genres">${genresHtml}</div>
                    <p class="detail-note">Note : ${rating}%</p>
                    <p class="detail-overview">${overview}</p>
                </div>
            </section>
            ${castSection}
        `;
  }
}

new DetailPage();
