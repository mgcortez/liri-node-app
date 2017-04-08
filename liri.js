//global variable//
var liri = (function () {
    //calling keys//
    var client = require("./keys.js");
    var song = require("spotify");
    var request = require("request");



    ////showing tweets////
    var twitter = function () {
        var params = {
            screen_name: 'jetcyclopspaces',
            count: 5 //I don't have 20 tweets//
        }
        client.key.get('statuses/user_timeline', params, function (error, tweets, response) {


            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log("----------------------------------");
                console.log("----------------------------------");
            }

        });

    }


    ///spotify///
    var spotify = function () {
        var params = {
            type: "track",
            limit: 2,
            query: process.argv[3],
        }

        if (params.query) {
            params.query = "The Sign"
        }

        song.search(params, function (error, data) {
            for (var i = 0; i < data.tracks.items.length; i++) {

                var result = data.tracks.items[i];

                console.log("Album: " + result.album.name);
                console.log("Preview: " + result.preview_url);
                console.log("Artist Name: " + result.album.artists.name);
                console.log("----------------------------------");
                console.log("----------------------------------");
            }


        });
    }


    ///movie search///
    var movie = function () {
        var params = {
            type: "movie",
            query: process.argv[3]
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + params.query + "&y=&plot=short&tomatoes=true&r=json";

        console.log(queryUrl);
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
                console.log("LINK")
            } 
            
            else {
                params.query = "Mr. Nobody"

            }
        });

    }







    return {
        twitter: twitter,
        spotify: spotify,
        movie: movie
    }






})();

switch (process.argv[2]) {
    case "my-tweets":
        liri.twitter();
        break;

    case "spotify-this-song":
        liri.spotify();
        break;

    case "movie-this":
        liri.movie();
        break;

    default:
        console.log("No tweets!");
}