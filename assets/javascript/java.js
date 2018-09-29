$(document).ready(function() {

// An array of buttons, new buttons will be pushed into this array;
var buttons = ["Dog", "Cat", "Quokka", "Axolotl", "Zebra"];

// Function that displays all the gif buttons

function displayButtons(){

    // Clear out everything in the gifButtons so the buttons can be recreated

    $("#gifButtons").empty();

    for (var i = 0; i < buttons.length; i++){

        var gifButton = $("<button>");

        gifButton.addClass("action");

        gifButton.addClass("btn btn-info gif");

        // Adding in the names for the buttons from the array

        gifButton.attr("data-name", buttons[i]);

        gifButton.text(buttons[i]);

        $("#gifButtons").append(gifButton);

    }
};

// Adding new buttons to the div with a click event

$("#submitButton").on("click", function(){

    // Prevent it from the typical action of submitting

    event.preventDefault();

    // Take the input of the user

    var pushButtons = $("#gif-input").val().trim();

    // If the form is blank, don't create a button

    if (pushButtons == ""){

        return false;

    };

    // Push the new input into the array and call the function to display all buttons

    buttons.push(pushButtons);

    displayButtons();

});

// Add a clear button event to reset the array and gifDiv

$("#clearButton").on("click", function(){

    // Prevent it from the typical action of submitting

    event.preventDefault();

    buttons = ["Dog", "Cat", "Quokka", "Axototl", "Zebra"];

    displayButtons();

    $("#gifsView").empty();

});


// Function that displays all of the gifs in the other div

function displayGifs(){

    var action = $(this).attr("data-name");

    // Grab the giphyAPI and add in the search input from the buttons

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Mx5dTRGmouzC9f4ZmETUVpvlITAnRqpO&q=" + action + "&limit=10";

    // Ajax call for the giphy API

    $.ajax({

        url: queryURL,
        method: 'GET'
    })

    .done(function(response) {

        // Log the response for troubleshooting

        console.log(response); 

        // Empty out the div so it doesn't keep appending gifs and just displays the desired 10

        $("#gifsView").empty();

        var results = response.data;

        // Give an alert if there's no gifs matching the criteria

        if (results == ""){

            alert("There's no gifs availabe for this entry");

        }

        for (var i=0; i<results.length; i++){

            // Create a div to hold all the gif data

            var gifDiv = $("<div>");

            // Add a class for styling in CSS

            gifDiv.addClass("gifDiv");

            // Construction of the img
    
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 

            // Grab the still images and animated results

            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 

            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 

            // Set the initial result to still

            gifImage.attr("data-state", "still"); 

            // Add class for styling and click event

            gifImage.addClass("gifImage");

            // Grab the rating and append it to div

            var gifRating = $("<p class='gifRating'>").text("Rating: " + results[i].rating);
            
            gifDiv.append(gifImage, gifRating);

            // Append the fully constructed div to the row

            $("#gifsView").append(gifDiv);
        }
    });
}

// Call out the displayButtons function to create initial buttons in the array

displayButtons(); 

// Must use document.on because this will allow for newly created items to be clicked/have events occur

$(document).on("click", ".gif", displayGifs);

// Allows for the user to click on the gifs to animate/unanimate them

$(document).on("click", ".gifImage", function(){

    var state = $(this).attr('data-state');

    if ( state == 'still'){

        $(this).attr('src', $(this).data('animate'));

        $(this).attr('data-state', 'animate');

    }  else {

        $(this).attr('src', $(this).data('still'));

        $(this).attr('data-state', 'still');
    }
});

});
    