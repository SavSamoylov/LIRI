//==============================================//
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
var stockFetcher = require("stock-fetcher");
var fs = require('fs');
var k = require("./keys.js");

var tKeys = new Twitter ({
  consumer_key: k.twitterKeys.consumer_key,
  consumer_secret: k.twitterKeys.consumer_secret,
  access_token_key: k.twitterKeys.access_token_key,
  access_token_secret: k.twitterKeys.access_token_secret,
});

var sKeys = new Spotify ({
	id: k.spotifyKeys.client_id,
	secret: k.spotifyKeys.client_secret,
});

//==============================================//

var command = process.argv[2];
var qTitle = getQueryTitle();

//==============================================//

if (command === "my-tweets"){
	
	if (qTitle){

		grabTweets(qTitle);

	}
	else{

		grabTweets("SavTemp");

	}

	logger(`
======================================================================

COMMAND: node liri ${[command]} ${[qTitle]}

======================================================================
		`);

}
else if (command === "spotify-this-song"){

	if(qTitle){

		grabSongs(qTitle);
		logger(`
======================================================================

COMMAND: node liri ${[command]} ${[qTitle]}

======================================================================
			`);

	} else {

		grabSongs("The Sign Ace of Base");
		logger(`
======================================================================

COMMAND: node liri ${[command]}

======================================================================
			`);

	}

}
else if (command === "movie-this"){

	if(qTitle){

		grabMovie(qTitle);
		logger(`
======================================================================

COMMAND: node liri ${[command]} ${[qTitle]}

======================================================================
			`);

} 
else {

		grabMovie("Mr. Nobody");
		logger(`
======================================================================

COMMAND: node liri ${[command]}

======================================================================
			`);

	}

}
else if (command === "this-stock"){

	  grabStock(qTitle);
	  logger(`
======================================================================

COMMAND: node liri ${[command]} ${[qTitle]}

======================================================================
			`);


}
else if (command === "do-what-it-says"){

	fs.readFile("random.txt", "utf8", function(error, data){

		if(error){
			console.log(error);
		}

		var dataArr = data.split(",");

		var liriCMD = "node liri";

		for (var i = 0; i < dataArr.length; i++) {
			liriCMD += " " + dataArr[i];
		}

		console.log("THE COMMAND ON FILE IS: " + liriCMD);

		if (dataArr[0] === "spotify-this-song"){
			grabSongs(dataArr[1]);
		logger(`
======================================================================

COMMAND: node liri ${[command]}

======================================================================
			`);
		} else if (dataArr[0] === "movie-this"){
			grabMovie(dataArr[1]);
		logger(`
======================================================================

COMMAND: node liri ${[command]}

======================================================================
			`);
		} else if (dataArr[0] === "my-tweets"){
			grabTweets(dataArr[1]);
		logger(`
======================================================================

COMMAND: node liri ${[command]}

======================================================================
			`);
		} else {
			console.log("Something went wrong. Check random.txt file.")
		}



	});

} else {
	console.log(`

		This is not a recognized command. Please use one of the following:

		- my-tweets
		- spotify-this-song <SONG TITLE>
		- movie-this <MOVIE TITLE>
		- this-stock <STOCK SYMBOL AAPL>
		- do-what-it-says

		`)
}

//==============================================//

function grabTweets(username){

	var params = {screen_name: username};
	tKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(" Here are the latest tweets from " + params.screen_name);
	    for (var i = 0; i < 20; i++) {
	    	var tweet = `
 ======================================================================

  DATE: ${[tweets[i].created_at]}

  TWEET: ${[tweets[i].text]}

 ======================================================================
	    		`;
	    		console.log(tweet);
	    		logger(tweet);
	    }
	  } else{
	  	console.log(error);
	  }
	});

}

function grabSongs(song){

	sKeys.search({ type: 'track', query: song, limit: 10 }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 var trackListing = data.tracks.items;

	 	for (var i = 0; i < trackListing.length; i++) {
			var trackInfo = `
 ======================================================================

 Artist: ${[trackListing[i].artists[0].name]}

 Song Title: ${[trackListing[i].name]}

 Preview: ${[trackListing[i].preview_url]}

 Album: ${[trackListing[i].album.name]}

 ======================================================================
				`;
			console.log(trackInfo);
			logger(trackInfo);
	 	}

	});

}

function grabMovie(movie){
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=40e9cece";

	request(queryUrl, function(error,response,body){

		if(!error && response.statusCode === 200){
			var mProps = JSON.parse(body);
			//console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
			var movieInfo = `
 ======================================================================

 TITLE: ${[mProps.Title]}

 RELEASE YEAR: ${[mProps.Released]}

 IMDB RATING: ${[mProps.imdbRating]}

 ROTTEN TOMATOES RATING: ${[mProps.Ratings[1].Value]}

 COUNTRY: ${[mProps.Country]}

 LANGUAGE: ${[mProps.Language]}

 PLOT: ${[mProps.Plot]}

 ACTORS: ${[mProps.Actors]}

 ======================================================================
				`;
				console.log(movieInfo);
				logger(movieInfo);
		}

	}

	);
}

function grabStock(stock){

	stockFetcher.getPrice(stock, function(err, price){
	  
	  if(err){
	  	console.log(err);
	  }

	  var stockInfo = `
 ======================================================================

 STOCK: ${[stock]}

 PRICE: ${[price]}

 ======================================================================
	  `;
	  console.log(stockInfo);
	  logger(stockInfo);

    });
 
}

// getQueryTitle() allows the user to search for multi-word titles.

function getQueryTitle(){

	var queryTitle = [];

	for (var i = 3; i < process.argv.length; i++) {
		queryTitle.push(process.argv[i]);
	}

	return queryTitle.join("+");
}

// Log to log.txt file

function logger(logdata){

	fs.appendFile("log.txt", logdata, function(error){

		if(error){
			console.log(error);
		}

	})
}
