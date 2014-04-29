#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  var flickrData = b.JSON.decode( b.loadString("flickrData.json") );
  var photos = flickrData.photos.photo;
  b.println("flickr photos count: "+ photos.length);

  // get textframe which should hold the photos
  var photosCtn = b.labels('photosContainer')[0];
  // get the story
  var story = photosCtn.parentStory;

  // add photos
  for (var i = 0; i < 15; i++) {
    var photo = photos[i];
    var filename = photo.id+".jpg";
    var title = photo.title;
    var img = b.image(filename, 0,0, 260,150);
    img.fit( FitOptions.CENTER_CONTENT );
    b.addToStory(story, "PHOTO TITLE: ");
    b.addToStory(story, title);
    b.addToStory(story, "\n");
    b.addToStory(story, img);
    b.addToStory(story, "\n");
    b.addToStory(story, "\n");
    b.remove(img);
  };
}

b.go(b.MODESILENT);
//b.go();