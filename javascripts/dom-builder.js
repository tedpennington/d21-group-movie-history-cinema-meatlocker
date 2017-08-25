"use strict";
console.log ("dom-builder");

let movieTemplate = require("../templates/movie-template.hbs");

function populatePage(arrayofMovies) {
	console.log ("arRaY", arrayofMovies.results);
    let ourDiv = document.getElementById("forHandlebarsInsert");
    ourDiv.innerHTML = movieTemplate(arrayofMovies.results);
    // $("#attraction-column").append(newDiv);
}

module.exports = {populatePage};


//SEND OBJECTS TO HANDLEBARS AND PRINT TO PAGE