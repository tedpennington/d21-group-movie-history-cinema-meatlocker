"use strict";


let firebase = require("./fb-Config"),
    //add all providers used
    provider = new firebase.auth.GoogleAuthProvider(),
    currentUser = null;


//listen for change state:
firebase.auth().onAuthStateChanged((user) => {
    // console.log("onAuthStateChanged", user);
    if (user) {
        currentUser = user.uid;
        // console.log("current user Logged in?", currentUser);
    } else {
        currentUser = null;
        // console.log("current user NOT logged in:", currentUser);
    }
});

//login
function logInGoogle() {
    //Add a .then when called
    return firebase.auth().signInWithPopup(provider);
}

//logout
function logOut() {
    return firebase.auth().signOut();
}

//get
function getUser() {
    return currentUser;
}
//set
function setUser(val) {
    currentUser = val;
}

module.exports = { logInGoogle, logOut, getUser, setUser };