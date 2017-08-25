
"use strict";
console.log("db-interaction.js");


let $ = require('jquery'),
    firebase = require("./fb-Config");


// API key: https://api.themoviedb.org/3/movie/550?api_key=dbe82c339d871418f3be9db2647bb249
//working: https://api.themoviedb.org/3/search/movie?api_key=dbe82c339d871418f3be9db2647bb249&language=en-US&query=big&page=1



let userInput = "";
let apiLink = "https://api.themoviedb.org/3/search/movie?api_key=dbe82c339d871418f3be9db2647bb249&language=en-US&query=";

function getApiMovies() { //param with cast
    return new Promise((resolve, reject) => {

        userInput = $("#dbSearch").val();
        console.log("user input", userInput);
        $.ajax({
            url: apiLink + userInput + "&page=1", //add cast here
            type: "GET",
            dataType: "json"
        }).done((response) => {
            console.log("response", response);
            resolve(response);
        });

    });
}

//second call with cast2

let castLink = "https://api.themoviedb.org/3/movie/";
let movieId = "";
let apiKeyEnd = "/credits?api_key=dbe82c339d871418f3be9db2647bb249";

// https://api.themoviedb.org/3/movie/674/credits?api_key=dbe82c339d871418f3be9db2647bb249

function addCast() {
    return new Promise((resolve, reject) => {

        $.ajax({
            url: castLink + movieId + apiKeyEnd,
            type: "GET",
            dataType: "json"
        }).done((response1) => {
            console.log("response1: ", response1);
            resolve(response1);
        });
    });
}

module.exports = { getApiMovies, addCast };


