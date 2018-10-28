var allMoviesList = [];
var watchList = [];
var movieContainer = document.querySelector(".movie-container ul")
var url = "https://yts.am/api/v2/list_movies.json";
var watchListData = document.querySelector(".hilight");

	
var  moviesContainer = document.querySelector(".movies__container ul");
var searchMovies = document.querySelector("[name=site-search]")

var url = "https://yts.am/api/v2/list_movies.json";

function fetchData() {
  fetch(url)
    .then(res => res.json())
    .then(data => allMoviesList.push(...data.data.movies))
    .then(data => showData(allMoviesList));
}
fetchData();

function showData(movies) {
  moviesContainer.innerHTML = movies.map((v,i) => {
    return `<li class="movie-wrapper" data-id=${i}>
      <img class="movie_cover" src = "${v.medium_cover_image}">
      <h3 class="movie-name">${v.title_english}</h3>
      <span class="movie-rating">${v.rating}</span>
      <span class="release-year">${v.year}</span>
      <i class="fas fa-plus-circle" data-id=${i}></i>
    </li>`
  }).join('');      
}


 function addWatchList(e) {
 	if(!e.target.classList.contains('fa-plus-circle')) return;
 	var id = e.target.dataset.id;
 	watchList.push(allMoviesList[id]);
 }


function search(e) {
  let searchText = e.target.value.toLowerCase();
  var newArray = allMoviesList.filter(v => v.title_english.toLowerCase().includes(searchText));
  showData(newArray);
}
function showWatchList(e) {
	showData(watchList);
}

searchMovies.addEventListener("keyup", search);
moviesContainer.addEventListener("click", addWatchList);
watchListData.addEventListener("click", showWatchList);