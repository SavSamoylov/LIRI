# LIRI 
## (Language Interpretation and Recognition Interface)

**LIRI** is a simple command line tool that takes the users input and returns relevant information.

### Commands

This version of **LIRI** answers to five unique commands and returns relevant data.

The commands are:
```
node liri my-tweets 

node liri spotify-this-song <SONG TITLE>

node liri movie-this <MOVIE TITLE>

node liri this-stock <STOCK SYMBOL: AAPL, GOOG>

node liri do-what-it-says

```

## Examples

### Example 1 (my-tweets)

Will fetch my last 20 tweets. I might expand this to fetch the last 20 tweets of any twitter user.

Input:

```
node liri my-tweets

```

Output

```
======================================================================

 DATE: Thu Jul 13 16:12:39 +0000 2017

 TWEET: Tweet 20: Boy, Twitter sure got ugly over the years.

======================================================================

```

### Example 2 (spotify-this-song)

Will fetch up to 10 songs from Spotify matching the title given.

Input:

```
node liri spotify-this-song Modern Love

```

Output:

```
 ======================================================================

 Artist: David Bowie

 Song Title: Modern Love - 1999 Remastered Version

 Preview: https://p.scdn.co/mp3-preview/bd65477ab11676a9bda1499c9330945223f00be7?cid=f180ed87ce664683b325f1f75dd4b467

 Album: Let's Dance

 ======================================================================
```

### Example 3 (movie-this)

Will fetch relevant film data from the OMDB database.

Input:

```
node liri movie-this What Dreams May Come

```

Output:

```
======================================================================

TITLE: What Dreams May Come

RELEASE YEAR: 02 Oct 1998

IMDB RATING: 7.0

ROTTEN TOMATOES RATING: 54%

COUNTRY: USA, New Zealand

LANGUAGE: English

PLOT: After he dies in a car crash, a man searches heaven and hell for his beloved wife.

ACTORS: Robin Williams, Cuba Gooding Jr., Annabella Sciorra, Max von Sydow

======================================================================
```

### Example 4 (this-stock)

Will fetch the Stock Market price for the stock provided by the user.

Input:

```
node liri this-stock GOOG

```

Output:

```
======================================================================

STOCK: GOOG

PRICE: 968.85

======================================================================
```