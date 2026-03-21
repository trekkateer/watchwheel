/**
 * Uses Fetch to get a list of movies based on the user's criteria
 */

// Shared list that all event listeners can read and update.
window.latestMovieResults = window.latestMovieResults || [];

/*** Creates event listhener for the input form ***/
document.getElementById("movie-filter").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get the data from the form
  var formData = new FormData(this);
  const formDataGrouped = {};
  for (const [key, val] of formData.entries()) {
    const [group] = key.split('=');
    if (!formDataGrouped[group]) {formDataGrouped[group] = [val];}
    else {formDataGrouped[group].push(val);}
  }
  // Normalizes the form data so it is ready for API use
  const formDataNormalized = {};
  for (const key in formDataGrouped) {
    // Gets the value
    var value = formDataGrouped[key];

    // Reconfigures the values
    switch(key) {
      case "primary_release_date.gte":
      case "primary_release_date.lte":
        value = [value[0] + "-00-00"];
    }

    // Flatten single-value arrays; keep multi-value arrays as pipe-separated values
    formDataNormalized[key] = value.length === 1 ? value[0] : value.join('|');
  }

  // Converts the form data to a URL string
  const queryString = new URLSearchParams(formDataNormalized);
  console.log(queryString);

  // Query TMDb for a response that matches the user's criteria
  fetch("https://api.themoviedb.org/3/discover/movie?" + queryString + "&sort_by=popularity.desc", requestOptions)
  .then(response => response.json())
  .then(result => {
    const movies = removeDuplicateMovies(result.results || []);

    // Make the latest API results accessible to other scripts.
    window.latestMovieResults = movies;
    document.dispatchEvent(new CustomEvent("movies:loaded", { detail: movies }));

    // Adds the movies to the list
    addMovies(movies, true);
  })
  .catch(error => console.log('error', error));
});

document.getElementById("adderbox").addEventListener("submit", function(e) {
  e.preventDefault();

  const movies = window.latestMovieResults;

  // Adds a new movie to the JS list
  const movieName = document.getElementById("adderbox-text").value.trim();
  if (!movieName) { return; }

  // Prevent duplicate manual additions by title.
  const alreadyExists = movies.some((movie) => {
    if (!movie || !movie.title) { return false; }
    return movie.title.trim().toLowerCase() === movieName.toLowerCase();
  });
  if (alreadyExists) {
    document.getElementById("adderbox-text").value = "";
    return;
  }

  movies.push({"title": movieName});
  window.latestMovieResults = removeDuplicateMovies(movies);
  console.log(movies);

  // Re-render from source of truth to avoid duplicate DOM entries.
  addMovies(window.latestMovieResults, true);

  document.dispatchEvent(new CustomEvent("movies:loaded", { detail: window.latestMovieResults }));

  document.getElementById("adderbox-text").value = "";
});

// Remove duplicate movies by id while preserving original order.
function removeDuplicateMovies(movies) {
  if (!Array.isArray(movies)) { return []; }

  const seenIds = new Set();
  const uniqueMovies = [];

  //Loops through each movie, adding it to unique movies if it's ID has not been seen before
  movies.forEach((movie) => {
    if (!movie || movie.id === undefined || movie.id === null) {
      uniqueMovies.push(movie);
      return;
    }

    if (!seenIds.has(movie.id)) {
      seenIds.add(movie.id);
      uniqueMovies.push(movie);
    }
  });

  return uniqueMovies;
}

function addMovies(movies, replaceExisting = false) {
  //Gets the list element
  const movieList = document.getElementById("movie-list");
  if (replaceExisting) {
    movieList.innerHTML = "";
  }

  movies.forEach(movie => {
    const newMovie = document.createElement("li");
    newMovie.innerText = movie.title;
    newMovie.className = "movie-item";
    movieList.append(newMovie);

    const trashButton = document.createElement("i");
    trashButton.className = "trash-movie fa-regular fa-trash-can";
    //newMovie.append(trashButton);
  });
}