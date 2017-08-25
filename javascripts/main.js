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
                console.log ("movie", movie);

           
        });

    });
});

// on click of show more button
// toggle visible class to show cast list


// User login section.
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

$("#logout").click(() => {
    console.log("logout clicked");
    user.logOut();
});

//Build Object to push and access FB
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
    console.log ("movieOBJ", arrayOfMoviesFromSearch);
    templates.populatePage(arrayOfMoviesFromSearch);
    // console.log ("arrayOfMoviesFromSearch", arrayOfMoviesFromSearch);
});
    // return movieObj;
}

// Send newMovie data to db then reload DOM with updated song data
$(document).on("click", ".save_new_btn", function() {
    console.log("click save new movie");
    let movieObj = buildMovieObj();
    //call to database
    db.addMovie(movieObj)
        .then((movieID) => {
            // loadMoviesToDOM();
        });
});
