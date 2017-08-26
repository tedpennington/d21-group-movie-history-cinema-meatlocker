"use strict";


let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user"),
    arrayOfMoviesFromSearch = [];

let userInput = "";
let apiLink = "https://api.themoviedb.org/3/search/movie?api_key=dbe82c339d871418f3be9db2647bb249&language=en-US&query=";




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
                    console.log("movie", movie);

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
    templates.populatePage(arrayOfMoviesFromSearch);
    // console.log ("arrayOfMoviesFromSearch", arrayOfMoviesFromSearch);
    });
    // return movieObj;
}


//////////////////////////////////////////////////////////////////////////
// Click function that trigger FB interactions & Reload DOM
//////////////////////////////////////////////////////////////////////////

//when the use clicks the '+ My Movies' button, the array of returned API results are looped through to find a the object with matching movie ID from user click. That single movie object is then sent to Firebase.
$(document).on("click", ".addToUserMovies", function(event) {
    console.log("click save new movie", event.currentTarget.id);
    
    for (let i=0; i < arrayOfMoviesFromSearch.length; i++) {   
        if (event.currentTarget.id == arrayOfMoviesFromSearch[i].id ) {
            console.log ("FOUND A MATCH!");
            console.log ("your chosen movie:", arrayOfMoviesFromSearch[i]);
        }
    }
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
$(document).on("click", ".delete-btn", function() {
    console.log("clicked delete movie", $(this).data("delete-id"));
    let movieID = $(this).data("delete-id");
    db.deletemovie(movieID)
        .then(() => {
            // loadMoviesToDOM();
        });
});