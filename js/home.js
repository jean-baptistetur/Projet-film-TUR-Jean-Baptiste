const container = document.getElementById("movies")

getMovies().forEach(movie => {
  container.innerHTML += `
    <a href="detail.html?id=${movie.id}" class="card">
      <img src="${movie.poster}">
      <div class="card-body">
        <h3>${movie.title}</h3>
        <p>${movie.date}</p>
      </div>
      <div class="badge">${movie.rating}%</div>
    </a>
  `
})