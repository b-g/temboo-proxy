#includepath "~/Documents/;%USERPROFILE%Documents";#include "basiljs/bundle/basil.js";function draw() {  var rawData = b.loadString("http://localhost:3000/twittersearch?q=telaviv");  var tweets = b.JSON.decode( rawData );  b.println( "loaded tweets count: "+ tweets.statuses.length );  b.textSize(60);  b.text(tweets.statuses[0].text, 0,0, b.width, b.height);}b.go();