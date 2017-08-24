"use strict";


let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user");

let userInput = "";
let apiLink = "https://api.themoviedb.org/3/search/movie?api_key=dbe82c339d871418f3be9db2647bb249&language=en-US&query=";


//after user clicks button, load 
$("#searchButton1").click(function() {
    console.log ("db", db);
    db.getApiMovies()
    .then(function(movieData) {
        console.log("data", movieData);
    });

    // console.log("searched", $("#dbSearch").val());
    
    // var movieForm = templates.movieForm()
    //     .then((dataFromApi) => {

    // });
});



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