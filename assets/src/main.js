var allMoviesList = [];
var  moviesContainer = document.querySelector(".movies__container ul");
var url = "https://yts.am/api/v2/list_movies.json";

function fetchData() {
  fetch(url)
    .then(res => res.json())
    .then(data => allMoviesList.push(...data.data.movies))

}
fetchData();

function showData() {
  moviesContainer.innerHTML = allMoviesList.map(v => {
    return `<li>
      <img src = "${v.medium_cover_image}">
      <h3>${v.title_english}</h3>
      <span>${v.rating}</span>
      <span>${v.year}</span>
    </li>`
  }).join('');      
}


