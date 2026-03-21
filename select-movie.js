/**
 * Selects a movie from the list generated in get-movies.js
 */

document.getElementById("movie-selector").addEventListener("click", function(e) {
    //Sets the image display to block
    document.getElementById("results-image").style.display = "block";

    //Pulls the list of movies
    const movies = window.latestMovieResults;

    //Picks a random one
    const movieNum = Math.floor(Math.random() * (movies.length-1));

    //Displays the results
    document.getElementById("results-header").innerText = movies[movieNum].title
    if (movies[movieNum].poster_path) {
        document.getElementById("results-image").src = "https://image.tmdb.org/t/p/w500" + movies[movieNum].poster_path;
    } else {document.getElementById("results-image").style.display = "none";}
});