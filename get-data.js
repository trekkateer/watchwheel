/**
 * Uses Fetch to get a list of movies based on the user's criteria
 * //API key: 7409aca554b13976635924e1a9b1b559
 * //API read access token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDA5YWNhNTU0YjEzOTc2NjM1OTI0ZTFhOWIxYjU1OSIsIm5iZiI6MTc3NDA2Mjk2Ni4xMDQsInN1YiI6IjY5YmUwZDc2ZjBkMzg5ZWE3YmEzZGI0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CxuIrI90cyCSzSv8fxZbpaIS4H0N984CD1D67txlo-c
 */





var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDA5YWNhNTU0YjEzOTc2NjM1OTI0ZTFhOWIxYjU1OSIsIm5iZiI6MTc3NDA2Mjk2Ni4xMDQsInN1YiI6IjY5YmUwZDc2ZjBkMzg5ZWE3YmEzZGI0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CxuIrI90cyCSzSv8fxZbpaIS4H0N984CD1D67txlo-c");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.themoviedb.org/3/search/movie?query=Jack+Reacher", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));