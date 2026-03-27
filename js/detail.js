function buildGenres(genres) {
    let html = "";
    if (!genres) {
        return html;
    }
    for (const g of genres) {
        html += `<span class="genre-tag">${g.name}</span>`;
    }
    return html;
}

function buildCast(credits) {
    let castItems = [];
    if (credits && credits.cast) {
        castItems = credits.cast.slice(0, 8);
    }

    let html = "";
    for (const a of castItems) {
        html += `
            <div class="actor-card">
                <img src="${api.poster(a.profile_path)}" alt="${a.name}">
                <p>${a.name}</p>
                <small>${a.character}</small>
            </div>
        `;
    }
    return html;
}

function renderDetail(app, data) {
    let note = 0;
    if (data.vote_average) {
        note = Math.round(data.vote_average * 10);
    }

    let date = "";
    if (data.release_date) {
        date = data.release_date.slice(0, 4);
    }

    let overview = data.overview;
    if (!overview) {
        overview = "Aucune description disponible.";
    }

    const genres = buildGenres(data.genres);
    const cast = buildCast(data.credits);

    let castSection = "";
    if (cast) {
        castSection = `
            <section class="cast">
                <h2>Acteurs principaux</h2>
                <div class="cast-grid">${cast}</div>
            </section>
        `;
    }

    app.innerHTML = `
        <section class="detail-hero">
            <img class="detail-poster" src="${api.poster(data.poster_path)}" alt="${data.title}">
            <div class="detail-info">
                <h1>${data.title}</h1>
                <p class="detail-date">${date}</p>
                <div class="genres">${genres}</div>
                <p class="detail-note">Note : ${note}%</p>
                <p class="detail-overview">${overview}</p>
            </div>
        </section>
        ${castSection}
    `;
}

async function loadDetail(app, id) {
    try {
        const data = await api.movieDetail(id);
        renderDetail(app, data);
    } catch {
        app.innerHTML = "<p>Erreur lors du chargement.</p>";
    }
}

function initDetailPage() {
    const app = document.getElementById("app");
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
        app.innerHTML = "<p>Introuvable.</p>";
        return;
    }

    loadDetail(app, id);
}

initDetailPage();