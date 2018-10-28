var allMoviesList = [];
var watchList = [];
var movieContainer = document.querySelector(".movie-container ul")
var url = "https://yts.am/api/v2/list_movies.json";
var watchListData = document.querySelector(".hilight");

	
var  moviesContainer = document.querySelector(".movies__container ul");
var searchMovies = document.querySelector("[name=site-search]")

var url = "https://yts.am/api/v2/list_movies.json";

function fetchData(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => allMoviesList.push(...data.data.movies))
    .then(data => showData(allMoviesList));
}
fetchData(url);

function showData(movies) {
  moviesContainer.innerHTML = movies.map((v,i) => {
    return `<li class="movie-wrapper" data-id=${i}>
      <img class="movie_cover" src = "${v.medium_cover_image}">
      <h3 class="movie-name">${v.title_english}</h3>
      <span class="movie-rating">${v.rating}</span>
      <span class="release-year">${v.year}</span>
      <i class="fas fa-plus-circle" data-id=${i}></i>
      <a href="https://www.youtube.com/watch?v=${v.yt_trailer_code}">Watch trailer</a>
    </li>`
  }).join('');      
}


 function addWatchList(e) {
 	if(!e.target.classList.contains('fa-plus-circle')) return;
 	var id = e.target.dataset.id;
 	var movieId = allMoviesList[id].id;
	watchList.push(movieId);
 }


function search(e) {
	console.log('called')
  let searchText = e.target.value.toLowerCase();
  fetch(url + '?query_term=' + searchText)
  .then(res => res.json())
  .then(d => showData(d.data.movies))
  // var newArray = allMoviesList.filter(v => v.title_english.toLowerCase().includes(searchText));
  // showData(newArray);
}
function showWatchList(e) {
	var favMovieArray = [];

	watchList.forEach(d =>
		fetch(`https://yts.am/api/v2/movie_details.json?movie_id=${d}`)
			.then(res => res.json())
			.then(movie => {
				favMovieArray.push(movie.data.movie);
				showData(favMovieArray)
			}))
}

searchMovies.addEventListener("keyup", search);
moviesContainer.addEventListener("click", addWatchList);
watchListData.addEventListener("click", showWatchList);
