"use strict";


let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user");


// $("#searchButton1").click(function() {

//             console.log("data", dataFromApi);
//             var movieForm = templates.movieForm()
//                 .then((dataFromApi) => {

//                 });



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
    let MovieObj = {
        id: $("#id").val(),
        title: $("#title").val(),
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