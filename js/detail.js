const app = document.getElementById("app")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const movie = getMovie(id)

if(!movie){
  app.innerHTML = "<p>Film introuvable</p>"
}else{
  app.innerHTML = `
    <div class="card" style="max-width:400px;margin:auto;">
      <img src="${movie.poster}">
      <div class="card-body">
        <h2>${movie.title}</h2>
        <p>${movie.date}</p>
        <p>Note : ${movie.rating}%</p>
      </div>
    </div>
  `
}