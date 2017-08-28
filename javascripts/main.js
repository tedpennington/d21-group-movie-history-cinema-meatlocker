"use strict";


// let $ = require('jquery'),
    let db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user"),
    arrayOfMoviesFromSearch = [],
    Handlebars = require('hbsfy/runtime');

let userInput = "";
let apiLink = "https://api.themoviedb.org/3/search/movie?api_key=dbe82c339d871418f3be9db2647bb249&language=en-US&query=";


////////////////////////////////////////////////////////
// Slider things
////////////////////////////////////////////////////////

    /***Slider***/
        var slider = document.getElementById("mySlider");
        var output = document.getElementById("sliderPut");
        output.innerHTML = ("Stars: " + slider.value); // Display the default slider value

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function() {
            output.innerHTML = ("Stars: " + this.value);
        };


    /******/


//after user hits enter, load
document.getElementById("dbSearch").addEventListener("keyup", function(event) {
    // console.log ("EvEnTTTT", event);
    if (event.keyCode == 13) {
       event.preventDefault();
//The below two lines clear the HTML and movie array so that each new search will present only movies that match the latest search
        $("#forHandlebarsInsert").html();


        db.getApiMovies()
            .then(function(movieData) {
                movieData.results.forEach(function(movie) {
                    arrayOfMoviesFromSearch = [];
                    buildMovieObj(movie);
                    // console.log("movie", movie);

                });
            });
    }
});



////////////////////////////////////////////////////////
// User login section and Display uid movies
////////////////////////////////////////////////////////
$("#auth-btn").click(function() {
    console.log("clicked auth");
    user.logInGoogle()
        .then((result) => {
            console.log("result from login", result.user.uid);
            user.setUser(result.user.uid);
            let currentUser = result.user.uid;
            $("#auth-btn").addClass("is-hidden");
            $("#logout").removeClass("is-hidden");
            // loadMoviesToDOM();
        });
});

// user logout
$("#logout").click(() => {
    console.log("logout clicked");
    user.logOut();
    $("#logout").addClass("is-hidden");
    $("#auth-btn").removeClass("is-hidden");
});


////////////////////////////////////////////////////////
// Build Object
////////////////////////////////////////////////////////
function buildMovieObj(movie) {
    db.addCast(movie.id)
        .then((result) => {

    let movieObj = {
        //movie id #
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        year: movie.release_date,
        actors: result,
        watch: false,
        watched: false,
        rating: 0,
        uid: user.getUser() // include uid to the object only if a user is logged in.
    };
    arrayOfMoviesFromSearch.push(movieObj);
    // console.log ("movieOBJ", arrayOfMoviesFromSearch);
    templates.populatePageBeforeTracked(arrayOfMoviesFromSearch);
    // console.log ("arrayOfMoviesFromSearch", arrayOfMoviesFromSearch);
    // This is handling the RateYo rating functionality
    });
    // return movieObj;
    // console.log($(".rateStars"));
    // // debugger;
    // Handlebars.registerHelper("ratingHelper", (value) => {
    //  $(".rateStars").rateYo({
    //     numStars: 10,
    //     maxValue: 10,
    //     rating: 0,
    //     // starWidth: ,
    //     fullStar: true
    //     });
    // });
}


//////////////////////////////////////////////////////////////////////////
// Click function that trigger FB interactions & Reload DOM
//////////////////////////////////////////////////////////////////////////

//when the use clicks the '+ My Movies' button, the array of returned API results are looped through to find a the object with matching movie ID from user click. That single movie object is then sent to Firebase.
$(document).on("click", ".addToUserMovies", function(event) {
    console.log("click save new movie", event.currentTarget.id);

    for (let i=0; i < arrayOfMoviesFromSearch.length; i++) {
        if (event.currentTarget.id == arrayOfMoviesFromSearch[i].id ) {
            // console.log ("FOUND A MATCH!");
            db.addMovie(arrayOfMoviesFromSearch[i]);
        }
    }
});


//button to show only movies added to 'tracked' by the user
$(document).on("click", "#watched-btn", function(event) {
    console.log ("clicked watched");
    loadMoviesToDOM();
    // console.log("click save new movie", event.currentTarget.id);
});


    //call to database
    // db.addMovie(movieObj)
    //     .then((movieID) => {
            // loadMoviesToDOM();
        // });

// Edit & Add to uid => FB & Reload DOM
// $(document).on("click", ".save_edit_btn", function() {
//     let movieObj = buildSongObj(),
//         movieID = $(this).attr("id");
//     console.log("songID", movieID);
//     db.editSong(movieObj, movieID)
//         .then((data) => {
//             // loadMoviesToDOM();
//         });
// });




// Delete from DOM & uid in FB & Reload DOM
// $(document).on("click", ".delete-btn", function() {
//     console.log("clicked delete movie", $(this).data("delete-id"));
//     let movieID = $(this).data("delete-id");
//     db.deletemovie(movieID)
//         .then(() => {
//             // loadMoviesToDOM();
//         });
// });
$(document).on("click", ".deleteFromMovies", function(event) {
    console.log("click delete new movie", event.currentTarget.id);
    let movieID = event.currentTarget.id;
            db.deleteMovie(movieID)
                .then(() => {
                loadMoviesToDOM();
                // debugger;
                console.log("you deleted movie", db.deleteMovie);
                });
});

// Using the REST API
function loadMoviesToDOM() {
  console.log("starting loadMoviesToDom function");
  let currentUser = user.getUser();
  console.log("currentUser in loadMovies", currentUser);
  db.getMovies(currentUser)
  // db.getSongs()
  .then((movieData) => {
    //with users, this is already happening...
    //add the id to each song and then build the song list
    // var idArray = Object.keys(songData);
    // idArray.forEach((key) => {
    //   songData[key].id = key;
    // });
    // console.log("song object with id", songData);
    //now make the list with songData
    templates.populatePageAfterTracked(movieData);
    
    console.log("loadMoviesToDOM", movieData);
  });
}



