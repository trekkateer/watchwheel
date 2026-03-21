/**
 * Uses Fetch to get a list of movies based on the user's criteria
 */


/*** Creates event listhener for the input form ***/
document.getElementById("movie-filter").addEventListener("submit", function() {
  
});


/*** Queries TMDb for movies ***/
// Creates headers
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDA5YWNhNTU0YjEzOTc2NjM1OTI0ZTFhOWIxYjU1OSIsIm5iZiI6MTc3NDA2Mjk2Ni4xMDQsInN1YiI6IjY5YmUwZDc2ZjBkMzg5ZWE3YmEzZGI0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CxuIrI90cyCSzSv8fxZbpaIS4H0N984CD1D67txlo-c");
myHeaders.append("accept", "application/json");

// Creates request options and adds headers to them
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// Queries TMDb API
/*fetch("https://api.themoviedb.org/3/search/movie?query=Jack+Reacher", requestOptions)
  .then(response => response.json())
  //.then(result => console.log(result))
  .catch(error => console.log('error', error));*/