//Require dotenv file.
require("dotenv").config();

//requuire file system
var fs = require("fs");

// Load the NPM Package inquirer
var request = require("request");

// link key page..
var keys = require("./keys");

//require moment..
var moment = require("moment");

var Spotify = require("node-spotify-api");
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
                console.log("-------------------------------------");
                console.log("Artist: " + concertInfo[i].lineup[0]);
                console.log("Venue: " + concertInfo[i].venue.name);
                console.log("Venue Location: " + concertInfo[i].venue.latitude, concertInfo[i].venue.longitude);
                console.log("Venue City: " + concertInfo[i].venue.city);
                console.log("Venue Country: " + concertInfo[i].venue.country);
                //moment.js formatting for date
                var concertDate = moment(concertInfo[i].datetime).format("MM/DD/YYYY hh:00 A");
                console.log("Date & Time: " + concertDate);
                console.log("-------------------------------------");
            };
        }
        else {
            console.log("sorry concerts not found try again later.");
        };

    });
};

function spotifyThisSong() {
    console.log("Searching for " + userSearch + ".");
    //if user doesnot pass any search than make default song "let her go"
    if (!userSearch) {
        userSearch = "I Want it That Way"
    }
    var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: userSearch,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        var spotifyResult = data.tracks.items;
        for (i = 0; i < spotifyResult.length; i++) {
            //returns the results from spotify api
            console.log("-------------------------------------");
            console.log("Artist: " + spotifyResult[i].album.artists[0].name);
            console.log("Song: " + spotifyResult[i].name);
            console.log("Album: " + spotifyResult[i].album.name);
            console.log("Spotify Link: " + spotifyResult[i].external_urls.spotify);
            console.log("-------------------------------------");

        };
    });
}

var movieThis = function () {
    console.log("Searching for " + userSearch + " movie.");
    if (!userSearch) {
        userSearch = "mr nobody";
    };
    var queryUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";
    //console.log(queryUrl);
    //requesting data using omdb api
    request(queryUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            //getting data and use on json format result
            var movieInfo = JSON.parse(body);

            //consoling all the info
            console.log("-------------------------------------");
            console.log("Title: " + movieInfo.Title);
            console.log("Release Year: " + movieInfo.Year);
            console.log("IMDB Rating: " + movieInfo.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
            console.log("Country: " + movieInfo.Country);
            console.log("Language: " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Actors: " + movieInfo.Actors);
            console.log("-------------------------------------");
        }
    })
}
//using fs package so liri takes text inside the ran txt file
var doThis=function(){
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(error)
        }
        var dataArr = data.split(",");
        // console.log(dataArr);
        
        var userInput = dataArr[0];
        var userSearch = dataArr[1];
        //console.log(userSearch);
        spotifyThisSong(userInput, userSearch)
        
    });
};
// var OutputResult = function(data){
//     console.log(data)
//     fs.appendFile("log.txt","\r\n" + daa,function(err){
//         if(err){
//             return console.log(err)
//         }
//     })
// }

function userCommand(userInput, userSearch) {
    // make a decision based on the command

    //console.log(userInput);
    //console.log(userSearch);
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userSearch);
            break;
        default:
            console.log("Try Again");

    }
}

userCommand(userInput, userSearch);








