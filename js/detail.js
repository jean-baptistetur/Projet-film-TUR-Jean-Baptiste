const app = document.getElementById("app")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

if(!id){
  app.innerHTML = "<p>Erreur : pas d'id</p>"
}else{
  app.innerHTML = `
    <div class="card">
      <h2>Film ${id}</h2>
      <p>Une description rapide du film.</p>
    </div>
  `
}