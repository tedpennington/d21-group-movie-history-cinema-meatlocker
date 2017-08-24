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