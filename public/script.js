// URL of the server to fetch movie data
const URL = 'http://localhost:3000/films';

// Get the movie listing container
const filmsContainer = document.getElementById('Movielisting');

// Wait for the DOM content to load before running JavaScript
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayMovies(); // Fetch and display movies
});

/**
 * Fetches the list of movies from the server and displays them.
 */
async function fetchAndDisplayMovies() {
    try {
        const response = await fetch(URL); // Fetch movies from the server
        const movies = await response.json(); // Parse the JSON response

        // Loop through each movie and display it
        movies.forEach(displayMovie);
    } catch (error) {
        console.error('Error fetching movies:', error); // Log any errors
    }
}

/**
 * Creates and displays a list item for each movie.
 * @param {Object} movie - Movie object containing details like title, capacity, and tickets sold.
 */
function displayMovie(movie) {
    // Create a list item for the movie
    const movieItem = document.createElement('li');
    movieItem.textContent = movie.title;

    // Add a click event listener to update movie details
    movieItem.addEventListener('click', () => updateMovieDetails(movie));

    // Create a "Buy Ticket" button
    const buyTicketButton = document.createElement('button');
    buyTicketButton.textContent = 'Buy Ticket';

    // Add a click event listener for ticket purchasing
    buyTicketButton.addEventListener('click', () => handleTicketPurchase(movie));

    // Append the button to the list item and add it to the movie list
    movieItem.appendChild(buyTicketButton);
    filmsContainer.appendChild(movieItem);
}

/**
 * Updates the movie details section with information from the selected movie.
 * @param {Object} movie - Movie object to display in detail.
 */
function updateMovieDetails(movie) {
    // Update movie poster
    document.getElementById('posterimage').src = movie.poster;

    // Update movie title
    document.getElementById('movietitle').textContent = movie.title;

    // Update runtime
    document.getElementById('runtime').textContent = `${movie.runtime} mins`;

    // Update showtime
    document.getElementById('showtime').textContent = `Showtime: ${movie.showtime}`;

    // Update available tickets
    const availableTickets = movie.capacity - movie.tickets_sold;
    document.getElementById('ticket').textContent = `Available Tickets: ${availableTickets}`;
}

/**
 * Handles ticket purchase logic and updates the available tickets.
 * @param {Object} movie - Movie object containing details like capacity and tickets sold.
 */
function handleTicketPurchase(movie) {
    const availableTickets = movie.capacity - movie.tickets_sold;

    if (availableTickets > 0) {
        movie.tickets_sold++; // Increment tickets sold

        // Update the available tickets display
        const ticketElement = document.getElementById('ticket');
        ticketElement.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
    } else {
        alert('Sorry, SOLD OUT!'); // Notify the user if tickets are sold out
    }
}