"use strict";


let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user"),
    arrayOfMoviesFromSearch = [];

let userInput = "";
let apiLink = "https://api.themoviedb.org/3/search/movie?api_key=dbe82c339d871418f3be9db2647bb249&language=en-US&query=";


//after user clicks button, load
$("#searchButton1").click(function() {
    //     console.log("db", db);
    //     db.getApiMovies()
    //         .then(function(movieData) {
    //             console.log("data", movieData);
    //         });
    $("#forHandlebarsInsert").html();
    db.getApiMovies()
        .then(function(movieData) {
            movieData.results.forEach(function(movie) {
                buildMovieObj(movie);




                /* templates.populatePage(movieData);*/
                // debugger;

                // db.addCast(movie.id)
                //         .then(function(castData) {
                //             // console.log('castData', castData);
                //         });
                // }, this);
            });

            // console.log("searched", $("#dbSearch").val());
            // var movieForm = templates.movieForm()
            //     .then((dataFromApi) => {
            // });
        });
});

// on click of show more button
// toggle visible class to show cast list


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
            console.log("arrayOfMoviesFromSearch", arrayOfMoviesFromSearch);
        });
    // return movieObj;
}


//////////////////////////////////////////////////////////////////////////
// Click function that trigger FB interactions & Reload DOM
//////////////////////////////////////////////////////////////////////////

// Send/Add to uid => FB & Reload
$(document).on("click", ".save_new_btn", function() {
    console.log("click save new movie");
    let movieObj = buildMovieObj();
    //call to database
    db.addMovie(movieObj)
        .then((movieID) => {
            // loadMoviesToDOM();
        });
});

// Edit & Add to uid => FB & Reload DOM
$(document).on("click", ".save_edit_btn", function() {
    let movieObj = buildSongObj(),
        movieID = $(this).attr("id");
    console.log("songID", movieID);
    db.editSong(movieObj, movieID)
        .then((data) => {
            // loadMoviesToDOM();
        });
});


// Delete from DOM & uid in FB & Reload DOM
$(document).on("click", ".delete-btn", function() {
    console.log("clicked delete movie", $(this).data("delete-id"));
    let movieID = $(this).data("delete-id");
    db.deletemovie(movieID)
        .then(() => {
            // loadMoviesToDOM();
        });
});