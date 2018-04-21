require("dotenv").config();

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var keys = require("./keys");

var request = require("request");

var fs = require(fs);

var spotify = new Spotify(keys.spotify);


var getArtist = function(artist) {
    return artist.name;
};

var getMeSpotify = function (songName) {
    if (songName === undefined) {
        songName = "what's my age again";
    }

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function(err, data) {
            if (err) {
                console.log("Error occured: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i <songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artist.map(getArtist));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + song[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("----------------")
            }
        }
    );
    
};

var getTweets = function() {
    var client = new Twitter(keys.twitter);

    var params = {
        screen_name: "@books_everyone"
    };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i< tweets.length; i++) {
                console.log(tweets[i].created_art);
                console.log("");
                console.log(tweets[i].text);
            }
        }
    });
    
};

var getMovieinfo = Function(movietitle) {
    if (movietitle === undefined) {
        movietitle = "Mr.Nobody";
    }
    var urlHit = "http://www.omdbapi.com/?=" + movietitle + "&y=&plot=full&tomatoes=true&apikey=18a6f9fb";

    request(urlHit, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);

            console.log("title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Rotten Tomatoes Rating: " + jsonData.Rating[1].Value);           
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            
        }
    });
};

var pick = function(caseData, functionData) {
    switch (caseData) {
        case "my-tweets":
        getTweets();
        break;
        case "spotify-this-song":
        getMeSpotify(functionData);
        break;
        case "movie-this":
        getMovieinfo(functionData);
        break;
        case "do-what-it-says":
        doWhatitSays();
        break;
        default:
        console.log("LIRI doesn't know that");

    }
};

var RunJawn = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

RunJawn(process.argv[2], process.argv[3]);