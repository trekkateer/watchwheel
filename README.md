# WatchWheel

WatchWheel is a browser-based movie picker that uses [TMDb](https://www.themoviedb.org/documentation/api) to help you discover movies based on custom filters, then randomly selects one from your results.

## Features

- Dynamic filter options loaded from TMDb (genres, languages, people, streaming regions)
- Filtered movie discovery using TMDb's `discover/movie` endpoint
- Manual movie title additions to the candidate list
- Random movie picker with poster preview
- Three-column UI for filtering, candidate list, and final selection

## Tech Stack

- HTML (single-page layout in `default.html`)
- Vanilla JavaScript (`get-criteria.js`, `get-movies.js`, `select-movie.js`)
- CSS (currently mostly inline styles in `default.html`; `style.css` exists and is empty)
- TMDb REST API

## Project Structure

- `default.html`: Main app layout and script includes
- `get-criteria.js`: Loads filter criteria from TMDb and wires UI interactions
- `get-movies.js`: Handles filter form submission, movie fetches, and movie list rendering
- `select-movie.js`: Randomly picks a movie from the current list and displays poster/title
- `style.css`: Reserved stylesheet file (currently empty)
- `assets/`: Static images (includes placeholder question-mark image)

## Requirements

* TMDb API Read Access Token

## Setup

1. Get your TMDb API Read Access Token from your TMDb account settings.
2. Create a file called "API-read-access-token.txt" containing the TMDb API key and place it in your home directory:
3. Run the app through a local static server and `default.html`.

## How To Use

1. In the left column, configure your movie criteria and click **Submit**.
2. In the middle column, review generated movie candidates.
3. Optionally add manual titles using the add box.
4. Click **Random Movie** in the right column.
5. WatchWheel shows the selected title and poster (when available).

## Known Notes

- Runtime and rating filter input names may not align with TMDb discover parameter names yet.
- Studio filtering is present as commented TODO code.

## TODO:

- Make Spinning Wheel in the center to make the application more interactive
- Add client-side validation for filter ranges
- Fix the studio API call
- Add loading states and empty-state messaging
- Add pagination or "load more" for discover results, create counter to show how many results there are
- Add persistent saved filter presets
- Have confetti appear when the user finds a movie to watch
- Replace client-side token usage with backend-proxied API calls
