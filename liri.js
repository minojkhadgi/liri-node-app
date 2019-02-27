//Require dotenv file.
require("dotenv").config();

//requuire file system
var fs = require("fs");

// Load the NPM Package inquirer
var request = require("request");

// link key page..
var key = require("./keys");

//require moment..
var moment = require("moment");

var spotify = require("node-spotify-api");
//var spotify = new spotify(keys.spotify);

//taking userinput and userquery..
var userInput = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");


//writing function for concert.this

var concertThis = function () {
    console.log("Searching for " + userSearch + " next show.");
    var queryUrl = ("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp");

    request(queryUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            //getting data and use on json format result
            var concertInfo = JSON.parse(body);
            //parsing data and using loop through it
            for (i = 0; i < concertInfo.length; i++) {
                //console.log data
                console.log("Artist: " + concertInfo[i].lineup[0]);
                console.log("Venue: " + concertInfo[i].venue.name);
                console.log("Venue Location: " + concertInfo[i].venue.latitude, concertInfo[i].venue.longitude);
                console.log("Venue City: " + concertInfo[i].venue.city);
                console.log("Venue Country: " + concertInfo[i].venue.country);
                //moment.js formatting for date
                var concertDate = moment(concertInfo[i].datetime).format("MM/DD/YYYY hh:00 A");
                console.log("Date & Time: " + concertDate);
            };
        }
        else {
            console.log("sorry concerts not found try again later.");
        };

    });
};
function userCommand(userInput, userSearch) {
    // make a decision based on the command

    console.log(userInput);
    console.log(userSearch);
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "do-this":
            doThis(userSearch);
            break;

        default:
            console.log("I don't understand");
            break;
    }
}

userCommand(userInput, userSearch);








