"use strict";


let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user");

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
            templates.populatePage(movieData);

            movieData.results.forEach(function(movie) {
                db.addCast(movie.id)
                    .then(function(castData) {
                        // console.log('castData', castData);
                    });
            }, this);
        });

    // console.log("searched", $("#dbSearch").val());
    // var movieForm = templates.movieForm()
    //     .then((dataFromApi) => {
    // });
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
function buildMovieObj() {
    let movieObj = {
        //movie id #
        id: $("#id").val(),
        title: $("#title").val(),
        poster: $("#poster").val(),
        year: $("#year").val(),
        actors: $("#actors").val(),
        watch: $("#watch").val(),
        watched: $("#watched").val(),
        rating: $("#rating").val(),
        uid: user.getUser() // include uid to the object only if a user is logged in.
    };
    return movieObj;
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
