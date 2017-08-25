"use strict";
let $ = require('jquery'),
    db = require("./db-interaction");

console.log ("dom-builder");

let movieTemplate = require("../templates/movie-template.hbs");

//SEND OBJECTS TO HANDLEBARS AND PRINT TO PAGE
function populatePage(arrayOfMovies) {
	console.log ("arRaY", arrayOfMovies);
    let ourDiv = document.getElementById("forHandlebarsInsert");
    ourDiv.innerHTML = movieTemplate(arrayOfMovies);
    // $("#attraction-column").append(newDiv);
}

module.exports = {populatePage};

