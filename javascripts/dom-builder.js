"use strict";
// let $ = require('jquery'),
    let db = require("./db-interaction"),
	initialMovieTemplate = require("../templates/movie-template-before-tracked.hbs"),
	templateAfterTracked = require("../templates/movie-template-after-tracked.hbs");

console.log ("dom-builder");


//SEND OBJECTS TO HANDLEBARS AND PRINT TO PAGE
//There are two templates here that do basically the same thing except sending the object to a different template to print to page. This could be done ideally in one function... possibly by using a parameter to pass in the name of the template.

function populatePageBeforeTracked(arrayOfMovies) {
	// console.log ("arRaY", arrayOfMovies);
    let ourDiv = document.getElementById("forHandlebarsInsert");
    ourDiv.innerHTML = initialMovieTemplate(arrayOfMovies);
    // $("#attraction-column").append(newDiv);
}

function populatePageAfterTracked(arrayOfMovies) {
	// console.log ("arRaY", arrayOfMovies);
    let ourDiv = document.getElementById("forHandlebarsInsert");
    ourDiv.innerHTML = templateAfterTracked(arrayOfMovies);
    $(".rateYo").rateYo({
    numStars: 10,
    maxValue: 10,
    rating: "0",
    starWidth: "25px",
    fullStar: true
  })
    .on("rateyo.set", function (e, data) {
        console.log("The rating is set to " + data.rating + "!");
    });

    // $("#attraction-column").append(newDiv);
}


module.exports = {populatePageBeforeTracked, populatePageAfterTracked};

