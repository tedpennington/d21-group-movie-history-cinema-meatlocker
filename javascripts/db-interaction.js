
"use strict";
// console.log("db-interaction.js");


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
            // console.log("getApiMovies response: ", response);
            resolve(response);
        });

    });
}

//second call with cast2

let castLink = "https://api.themoviedb.org/3/movie/";
// let movieId = "";
let apiKeyEnd = "/credits?api_key=dbe82c339d871418f3be9db2647bb249";
// https://api.themoviedb.org/3/movie/674/credits?api_key=dbe82c339d871418f3be9db2647bb249

function addCast(movieId) {
    return new Promise((resolve, reject) => {

        userInput = $("#dbSearch").val();
        $.ajax({
            url: castLink + movieId + apiKeyEnd,
            type: "GET",
            dataType: "json"
        }).done((response) => {
            // debugger;
            // console.log('cast response: ', response);
            let castOutput = document.getElementById('castOutput');

            // loop through response and get first 5 items
            // loop over them again create <li></li>
            // assign those items to getElementById
            for (let i = 0; i < 5 ; i++) {
                castOutput.innerHTML += `<li>${response.cast[i].name}</li>`;
                // castOutput.firstElementChild.append(`${response.cast[i].name}`);
                console.log('response.cast[i].name: ', response.cast[i].name);
            }

            resolve(response);
        });
    });
}
module.exports = { getApiMovies, addCast };


