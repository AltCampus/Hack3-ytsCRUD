var allMoviesList = [];
var  moviesContainer = document.querySelector(".movies__container ul");
var searchMovies = document.querySelector("")
var url = "https://yts.am/api/v2/list_movies.json";

function fetchData() {
  fetch(url)
    .then(res => res.json())
    .then(data => allMoviesList.push(...data.data.movies))
    .then(showData());

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

function search(e) {
  let searchText = e.target.value.toLowerCase();
  var newArray = books.filter(v => v.toLowerCase().includes(searchText));
  displayBook(newArray);
}



searchMovies.addEventListener("keyup", search);

