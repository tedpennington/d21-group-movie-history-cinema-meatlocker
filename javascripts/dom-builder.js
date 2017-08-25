"use strict";
let $ = require('jquery'),
    db = require("./db-interaction");

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



// MAKE MASTER OBJECT WIITH ALL NEEDED KEYS // FROM BROOKE

// let arrayOfMovieObjects = [];

// // Area Promise
// db.loadAreaArray()

// .then(
//     (loadAreaResolve) => {
//         console.log("Area Promise", loadAreaResolve);
//         //iterate over area data
//         $.each(loadAreaResolve, function(index, value) {
//             let areasObject = {};
//             //get object names
//             areasObject.name = $(this).attr('name');
//             // console.log(areaName);
//             //get object description
//             areasObject.description = $(this).attr('description');
//             //get object is
//             areasObject.id = $(this).attr('id');
//             //push area data to array
//             parkDataArray.push(areasObject);
//         });

//     },
//     (reject) => {
//         console.log("Something went wrong");
//     });