const movies = [
  {
    id:1,
    title:"Dune",
    date:"2021",
    rating:83,
    poster:"https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
  },
  {
    id:2,
    title:"The Batman",
    date:"2022",
    rating:75,
    poster:"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
  },
  {
    id:3,
    title:"Inception",
    date:"2010",
    rating:87,
    poster:"https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg"
  },
  {
    id:4,
    title:"Interstellar",
    date:"2014",
    rating:91,
    poster:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    id:5,
    title:"Joker",
    date:"2019",
    rating:85,
    poster:"https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  },
  {
    id:6,
    title:"Avengers Endgame",
    date:"2019",
    rating:84,
    poster:"https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
  },
  {
    id:7,
    title:"Spider-Man No Way Home",
    date:"2021",
    rating:83,
    poster:"https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
  },
  {
    id:8,
    title:"Titanic",
    date:"1997",
    rating:89,
    poster:"https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
  },
  {
    id:9,
    title:"Avatar",
    date:"2009",
    rating:78,
    poster:"https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
  },
  {
    id:10,
    title:"Gladiator",
    date:"2000",
    rating:88,
    poster:"https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
  },
  {
    id:11,
    title:"The Dark Knight",
    date:"2008",
    rating:94,
    poster:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    id:12,
    title:"Fight Club",
    date:"1999",
    rating:89,
    poster:"https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg"
  },
  {
    id:13,
    title:"Forrest Gump",
    date:"1994",
    rating:88,
    poster:"https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"
  },
  {
    id:14,
    title:"The Matrix",
    date:"1999",
    rating:87,
    poster:"https://image.tmdb.org/t/p/w500/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg"
  },
  {
    id:15,
    title:"Star Wars",
    date:"1977",
    rating:86,
    poster:"https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg"
  },
  {
    id:16,
    title:"Harry Potter",
    date:"2001",
    rating:82,
    poster:"https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg"
  },
  {
    id:17,
    title:"Oppenheimer",
    date:"2023",
    rating:88,
    poster:"https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg"
  },
  {
    id:18,
    title:"Barbie",
    date:"2023",
    rating:70,
    poster:"https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
  },
  {
    id:19,
    title:"John Wick",
    date:"2014",
    rating:86,
    poster:"https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"
  },
  {
    id:20,
    title:"Top Gun Maverick",
    date:"2022",
    rating:88,
    poster:"https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg"
  }
]

function getMovies(){
  return movies
}

function getMovie(id){
  return movies.find(m => m.id == id)
}