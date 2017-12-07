// // create a variable that links to giphy api
// var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC&limit=10";

// Initial array of movies
var movies = [];
// Function for dumping the JSON content for each button into the div
function displayMovieInfo() {
    // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
}
// Function for displaying movie data
function renderButtons() {
    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("movie");
        // Adding a data-attribute
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}
// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();
    // The movie from the textbox is then added to our array
    movies.push(movie);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});
// Generic function for displaying the movieInfo
$(document).on("click", ".movie", displayMovieInfo);
// Calling the renderButtons function to display the initial buttons
renderButtons();

///////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Event listener for all button elements
$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var data = $(this).attr("data-name");
    // Constructing a URL to search Giphy for the name Movie
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        data + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");
                    // Storing the result item's rating
                    var rating = results[i].rating;
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);
                    // Creating an image tag
                    var dataImage = $("<img>");
                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    dataImage.attr("src", results[i].images.fixed_height.url);
                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(dataImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
});
























//"q" - string - search query term or phrase
//"limit" - integer - number of results to return, maximum 100. Default 25.
//"rating" - string - limit results to those rated (y,g, pg, pg-13 or r).