#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  var rawData = b.loadString("http://localhost:3000/flickrsearchphotos?q=tel+aviv");
  var flickrData = b.JSON.decode( rawData );

  var txt = "found flickr photos count: "+ flickrData.photos.photo.length;
  b.println(txt);

  b.textSize(20);
  b.text(txt, 0,0, b.width, 30);
}

b.go(b.MODESILENT);
//b.go();