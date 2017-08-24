
"use strict";
console.log("db-interaction.js");


let $ = require('jquery'),
    firebase = require("./fb-Config");


// API key: https://api.themoviedb.org/3/movie/550?api_key=dbe82c339d871418f3be9db2647bb249
//working: https://api.themoviedb.org/3/search/movie?api_key=dbe82c339d871418f3be9db2647bb249&language=en-US&query=big&page=1



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

module.exports = getApiMovies;

