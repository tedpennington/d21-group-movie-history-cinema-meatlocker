"use strict";
// console.log("db-interaction.js");


let $ = require('jquery'),
    firebase = require("./fb-Config");

//NOTESl
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
            // console.log('cast response: ', response);
            let castOutput = "";

            // loop through response and get first 5 items
            // loop over them again create <li></li>
            // assign those items to getElementById
            for (let i = 0; i < 5 ; i++) {
                castOutput += `${response.cast[i].name}` + " ";
            }
            resolve(castOutput);
        });
    });
}

//add user selected movies to Firebase:
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


//Delete movie from user list (and from database if no others users have added):
function deleteMovie(movieId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/movies/${movieId}.json`,
            method: "DELETE"
        }).done(() => {
            resolve();
        });
    });
}

//Retrieve Movie:
function getMovie(movieId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/movies/${movieId}.json`
        }).done((movieData) => {
            resolve(movieData);
        }).fail((error) => {
            reject(error);
        });
    });
}


//Edit Movie (pass watched and rating once coded, below:
function editMovies(movieId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/movies/${movieId}.json`,
            type: 'PUT',
            //obj after watched or rating edited where obj is below
            // data: JSON.stringify(obj)
            //when done pass new object back
        }).done((data) => {
            resolve(data);
        });
    });
}



module.exports = {
    getApiMovies,
    addMovie,
    deleteMovie,
    getMovie,
    editMovies,
    addCast,
};
