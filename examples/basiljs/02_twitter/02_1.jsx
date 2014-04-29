#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  var rawData = b.loadString("http://localhost:3000/twittersearch?q=telaviv");
  var tweets = b.JSON.decode( rawData );
  b.println( "loaded tweets count: "+ tweets.statuses.length );

  // get textframe which should hold the tweets
  var tweetsCtn = b.labels('tweetsContainer')[0];
  // get the line template
  var lineTmplt = b.labels('lineTemplate')[0];
  // get story
  var story = tweetsCtn.parentStory;
  
  // add tweets to story
  for (var i = 0; i < tweets.statuses.length; i++) {
    var text = tweets.statuses[i].text;
    var name = tweets.statuses[i].user.name;
    var location = tweets.statuses[i].user.location;
    var time = tweets.statuses[i].created_at;

    // add things
    b.addToStory(story, text);
    b.addToStory(story, "\n");
    b.addToStory(story, name +" | "+time);
    b.addToStory(story, "\n");
    b.addToStory(story, location);
    b.addToStory(story, "\n");
    // add line
    b.addToStory(story, lineTmplt);
    b.addToStory(story, "\n");
  };
}

b.go(b.MODESILENT);
//b.go();