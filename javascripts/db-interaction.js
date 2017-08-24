"use strict";
console.log("db-interaction.js");


let $ = require('jquery'),
    firebase = require("./fb-Config");


//For title search:
//working: https://api.themoviedb.org/3/search/movie?api_key=dbe82c339d871418f3be9db2647bb249&language=en-US&query=big&page=1
//For images:
//https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg



let userInput = "";
let apiLink = "https://api.themoviedb.org/3/search/movie?api_key=dbe82c339d871418f3be9db2647bb249&language=en-US&query=";

function getApiMovies() {
    return new Promise((resolve, reject) => {


        userInput = $("#dbSearch").val();
        console.log("user input", userInput);
        $.ajax({
            url: apiLink + "fire" + "&page=1",
            type: "GET",
            dataType: "json"
        }).done((response) => {
            console.log("response", response);
            resolve();
        });

    });
}
getApiMovies();


function addMovie(movieFormObj) {
    console.log("addMovie", movieFormObj);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/movies.json`,
            type: 'POST',
            data: JSON.stringify(movieFormObj),
            dataType: 'json'
        }).done((movieID) => {
            resolve(movieID);
        });
    });
}






module.exports = {
    getApiMovies,
    addMovie
};