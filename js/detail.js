function buildSingleGenreTag(genre) {
  const html = `<span class="genre-tag">${genre.name}</span>`;
  return html;
}

function buildGenreTagsHtml(genres) {
  const genresExist = genres !== null && genres !== undefined;
  const genresAreNotEmpty = genresExist && genres.length > 0;

  if (genresAreNotEmpty) {
    const genreTagsArray = genres.map(buildSingleGenreTag);
    const genreTagsHtml = genreTagsArray.join("");
    return genreTagsHtml;
  } else {
    return "";
  }
}

function buildSingleActorCard(actor) {
  const photoUrl = api.getPosterUrl(actor.profile_path);

  const html = `
    <div class="actor-card">
      <img src="${photoUrl}" alt="${actor.name}">
      <p>${actor.name}</p>
      <small>${actor.character}</small>
    </div>
  `;
  return html;
}

function buildCastGridHtml(credits) {
  const creditsExist = credits !== null && credits !== undefined;
  const castExists = creditsExist && credits.cast !== undefined;
  const castIsNotEmpty = castExists && credits.cast.length > 0;

  if (castIsNotEmpty) {
    const mainCastMembers = credits.cast.slice(0, 8);
    const actorCardsArray = mainCastMembers.map(buildSingleActorCard);
    const actorCardsHtml = actorCardsArray.join("");
    return actorCardsHtml;
  } else {
    return "";
  }
}

function buildCastSectionHtml(castGridHtml) {
  const castGridIsNotEmpty = castGridHtml.length > 0;

  if (castGridIsNotEmpty) {
    const html = `
      <section class="cast">
        <h2>Acteurs principaux</h2>
        <div class="cast-grid">${castGridHtml}</div>
      </section>
    `;
    return html;
  } else {
    return "";
  }
}

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

function getOverview(movie) {
  const overviewExists = movie.overview !== null && movie.overview !== undefined;
  const overviewIsNotEmpty = overviewExists && movie.overview.length > 0;

  if (overviewIsNotEmpty) {
    return movie.overview;
  } else {
    return "Aucune description disponible.";
  }
}

function buildHeroSectionHtml(
  movie,
  ratingPercent,
  releaseYear,
  overview,
  genreTagsHtml,
) {
  const posterUrl = api.getPosterUrl(movie.poster_path);

  const html = `
    <section class="detail-hero">
      <img class="detail-poster" src="${posterUrl}" alt="${movie.title}">
      <div class="detail-info">
        <h1>${movie.title}</h1>
        <p class="detail-date">${releaseYear}</p>
        <div class="genres">${genreTagsHtml}</div>
        <p class="detail-note">Note : ${ratingPercent}%</p>
        <p class="detail-overview">${overview}</p>
      </div>
    </section>
  `;
  return html;
}

function renderMovieDetail(appContainer, movie) {
  const ratingPercent = getRatingPercent(movie);
  const releaseYear = getReleaseYear(movie);
  const overview = getOverview(movie);
  const genreTagsHtml = buildGenreTagsHtml(movie.genres);
  const castGridHtml = buildCastGridHtml(movie.credits);
  const heroSectionHtml = buildHeroSectionHtml(
    movie,
    ratingPercent,
    releaseYear,
    overview,
    genreTagsHtml,
  );
  const castSectionHtml = buildCastSectionHtml(castGridHtml);

  appContainer.innerHTML = heroSectionHtml + castSectionHtml;
}

async function loadAndDisplayMovie(appContainer, movieId) {
  try {
    const movieData = await api.getMovieDetail(movieId);
    renderMovieDetail(appContainer, movieData);
  } catch (error) {
    appContainer.innerHTML = "<p>Impossible de charger les informations du film.</p>";
  }
}

function initDetailPage() {
  const appContainer = document.getElementById("app");
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  const movieIdIsMissing = movieId === null;
  if (movieIdIsMissing) {
    appContainer.innerHTML = "<p>Aucun film sélectionné.</p>";
    return;
  }

  loadAndDisplayMovie(appContainer, movieId);
}

initDetailPage();
