var allMoviesList = [];
var url = "https://yts.am/api/v2/list_movies.json";

fetch(url)
        .then(res => res.json())
        .then(data => allMoviesList.push(data));

 console.log(allMoviesList)