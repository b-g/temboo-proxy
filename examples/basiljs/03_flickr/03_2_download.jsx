#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  var urlData = "http://localhost:3000/flickrsearchphotos?q=tel+aviv";
  b.download(urlData, "flickrData.json");
  
  var rawData = b.loadString(urlData);
  var flickrData = b.JSON.decode( rawData );
  var photos = flickrData.photos.photo;

  b.println("flickr photos count: "+ photos.length);

  for (var i = 0; i < photos.length; i++) {
    var photo = photos[i];
    var urlPhoto = photos[i].url_m;
    var filename = photo.id+".jpg";
    b.download(urlPhoto, filename);
    b.println("downloading "+i+" --> "+urlPhoto);
  };
}

b.go(b.MODESILENT);
//b.go();