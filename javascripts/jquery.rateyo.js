"use strict";


$(function () {
 
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
});
