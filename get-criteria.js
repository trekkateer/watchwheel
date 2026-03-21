/**
 * Will query TMDb for their criteria and add those criteria to the user input panel
 */


/** Creates the toggle preferences functionality **/
const preferenceHeadings = document.getElementsByClassName("showmore-button");
Array.from(preferenceHeadings).forEach(element => {
  element.addEventListener("click", function() {
    // Shows or hides the preference block as a single layout change.
    const preference = this.id.split('-showmore')[0];
    const button = document.getElementById(preference + "-showmore");
    const fieldset = document.getElementById(preference);
    const fieldline = document.getElementById(preference + '-line');
    const shouldOpen = fieldset.style.display === "none";

    // Update UI to reflect the user's click
    fieldset.style.display = shouldOpen ? "block" : "none";
    if (fieldline) {fieldline.style.display = !shouldOpen ? "block" : "none";}
    button.innerHTML = shouldOpen ? '<i class="fas fa-caret-up"></i>' : '<i class="fas fa-caret-down"></i>';
  })
});


/*** Creates request options that we will use for queries ***/
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


/*** Queries TMDb API for data and adds to the user input panel ***/
//Queries for genres
fetch("https://api.themoviedb.org/3/genre/movie/list", requestOptions)
  .then(response => response.json())
  .then(result => result.genres.forEach(element => {
      //Identifies the genre div
      const container = document.getElementById("genres");
      const elName = "with_genres=" + element.name.toLowerCase();
      const inputId = "genre-" + element.id;

      const row = document.createElement("div");
      row.className = "genre-item";

      //Creates the checkbox for the genre
      const box = document.createElement("input");
      box.type = "checkbox";
      box.name = elName;
      box.value = element.id;
      box.id = inputId;
      row.append(box);

      //Creates the label for the checkbox
      const label = document.createElement("label");
      label.htmlFor = inputId;
      label.innerText = element.name;
      row.append(label);

      container.append(row);
  }))
  .catch(error => console.log('error', error));

//Queries for languages
fetch("https://api.themoviedb.org/3/configuration/languages", requestOptions)
  .then(response => response.json())
  .then(result => result.forEach(element => {
      //Identifies the language div
      const container = document.getElementById("languages");
      const elName = "with_original_language";
      const inputId = "language-" + element.iso_639_1;

      const row = document.createElement("div");
      row.className = "language-item";

      //Creates the radio for the language
      const button = document.createElement("input");
      button.type = "radio";
      button.name = elName;
      button.value = element.iso_639_1;
      button.id = inputId;
      if (button.value === "en") { button.checked = "checked"; }
      row.append(button);

      //Creates the label for the radio
      const label = document.createElement("label");
      label.htmlFor = inputId;
      label.innerText = element.english_name;
      row.append(label);

      container.append(row);
  }))
  .catch(error => console.log('error', error));


// Adds event listeners to the Release Date
document.getElementById("min-release-slider").addEventListener("change", function() {
  document.getElementById("min-release-scrubber").value = this.value;
});
document.getElementById("min-release-scrubber").addEventListener("change", function() {
  document.getElementById("min-release-slider").value = this.value;
});
document.getElementById("max-release-slider").addEventListener("change", function() {
  document.getElementById("max-release-scrubber").value = this.value;
});
document.getElementById("max-release-scrubber").addEventListener("change", function() {
  document.getElementById("max-release-slider").value = this.value;
});


// Adds event listeners to the Runtime Range input fields
document.getElementById("min-runtime-slider").addEventListener("change", function() {
  document.getElementById("min-runtime-scrubber").value = this.value;
});
document.getElementById("min-runtime-scrubber").addEventListener("change", function() {
  document.getElementById("min-runtime-slider").value = this.value;
});
document.getElementById("max-runtime-slider").addEventListener("change", function() {
  document.getElementById("max-runtime-scrubber").value = this.value;
});
document.getElementById("max-runtime-scrubber").addEventListener("change", function() {
  document.getElementById("max-runtime-slider").value = this.value;
});


// Adds event listeners to the Rating Range input fields
document.getElementById("min-rating-slider").addEventListener("change", function() {
  document.getElementById("min-rating-scrubber").value = this.value;
});
document.getElementById("min-rating-scrubber").addEventListener("change", function() {
  document.getElementById("min-rating-slider").value = this.value;
});


// Queries for the first 400 people
for (var i = 1; i <= 20; i++) {// Loops through the pages
  fetch("https://api.themoviedb.org/3/person/popular?page="+i, requestOptions)
    .then(response => response.json())
    .then(result => result.results.forEach(element => {
        //Identifies the region div
        const container = document.getElementById("involved-persons");
        const inputId = "person=" + element.id;

        const row = document.createElement("div");
        row.className = "person-item";

        //Creates the box for the region
        const box = document.createElement("input");
        box.type = "checkbox";
        box.name = element.name;
        box.value = element.id;
        box.id = inputId;
        row.append(box);

        //Creates the label for the box
        const label = document.createElement("label");
        label.htmlFor = inputId;
        label.innerText = element.name;
        row.append(label);

        container.append(row);
    }))
    .catch(error => console.log('error', error));
}


// Queries for the first 4000 studios
/*for (var i = 1; i <= 4000; i++) {
  fetch("https://api.themoviedb.org/3/company/"+i, requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result);
      //Skips if the name and ID are not there
      if (result.name && result.id) {
        //Identifies the region div
        const container = document.getElementById("involved-studios");

        //Creates the box for the region
        const box = document.createElement("input");
        box.type = "checkbox";
        box.name = result.name;
        box.value = result.id;
        container.append(box);

        //Creates the label for the box
        const label = document.createElement("label");
        label.for = result.name;
        label.innerText = result.name;
        container.append(label)
      }
    })
    .catch(error => console.log('error', error));
}*/


// Queries for streaming regions
fetch("https://api.themoviedb.org/3/watch/providers/regions", requestOptions)
  .then(response => response.json())
  .then(result => result.results.forEach(element => {
      //Identifies the region div
      const container = document.getElementById("streaming-regions");
      const inputId = "region-" + element.iso_3166_1;

      const row = document.createElement("div");
      row.className = "streaming-region-item";

      //Creates the radio button for the region
      const button = document.createElement("input");
      button.type = "radio";
      button.name = element.english_name;
      button.value = element.iso_3166_1;
      button.id = inputId;
      row.append(button);

      //Creates the label for the button
      const label = document.createElement("label");
      label.htmlFor = inputId;
      label.innerText = element.english_name;
      row.append(label);

      container.append(row);
  }))
  .catch(error => console.log('error', error));