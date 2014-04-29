var config = require('./config')
  , cache = require('./lib/cache')
  , tsession = require("temboo/core/temboosession")
  , session = new tsession.TembooSession(config.temboo.user_name, config.temboo.app_name, config.temboo.app_key);

var tembooChoreos = {

  // GET /twittersearch?q=Israel
  // GET /twittersearch?q=@bndktgrs+%23stuttgart
  twittersearch: function(query, cacheKey, cb) {
    var Twitter = require("temboo/Library/Twitter/Search");
    var tweetsChoreo = new Twitter.Tweets(session);
    var tweetsInputs = tweetsChoreo.newInputSet();
    tweetsInputs.setCredential("TwitterTembooChoreo");
    tweetsInputs.set_Query(query.q);
    tweetsChoreo.execute(
        tweetsInputs,
        function(results){
          cache.set(cacheKey, results.get_Response());
          cb(null, results.get_Response());
        },
        function(error){ cb("Error twittersearch(): "+error.message); }
    );
  },

  // GET /twittertimeline?q=bndktgrs
  twittertimeline: function(query, cacheKey, cb) {
    var Twitter = require("temboo/Library/Twitter/Timelines");
    var userTimelineChoreo = new Twitter.UserTimeline(session);
    var userTimelineInputs = userTimelineChoreo.newInputSet();
    userTimelineInputs.setCredential("TwitterTembooChoreo");
    userTimelineInputs.set_ScreenName(query.q);
    userTimelineChoreo.execute(
        userTimelineInputs,
        function(results){
          cache.set(cacheKey, results.get_Response());
          cb(null, results.get_Response());
        },
        function(error){ cb("Error twittertimeline(): "+error.message); }
    );
  },

  // GET /flickrsearchphotos?q=ruin
  // GET /flickrsearchphotos?lat=31.5&lon=34.75
  // GET /flickrsearchphotos?lat=31.5&lon=34.75&q=field
  flickrsearchphotos: function(query, cacheKey, cb) {
    var Flickr = require("temboo/Library/Flickr/Photos");
    var searchPhotosChoreo = new Flickr.SearchPhotos(session);
    var searchPhotosInputs = searchPhotosChoreo.newInputSet();
    searchPhotosInputs.set_APIKey("ba8de4b58189d806bfd3179f57cda906");
    if (query.q) searchPhotosInputs.set_Text(query.q);
    if (query.lat) searchPhotosInputs.set_Latitude(query.lat);
    if (query.lon) searchPhotosInputs.set_Longitude(query.lon);
    searchPhotosChoreo.execute(
        searchPhotosInputs,
        function(results){
          cache.set(cacheKey, results.get_Response());
          cb(null, results.get_Response());
        },
        function(error){ cb("Error flickrsearchphotos(): "+error.message); }
    );
  },

  // GET /nytimesarticlesearch?q=Design
  nytimesarticlesearch: function(query, cacheKey, cb) {
    var NYTimes = require("temboo/Library/NYTimes/ArticleSearch");
    var queryArticlesChoreo = new NYTimes.QueryArticles(session);
    var queryArticlesInputs = queryArticlesChoreo.newInputSet();
    queryArticlesInputs.setCredential("NYTimesArticleSearch");
    queryArticlesInputs.set_Query(query.q);

    queryArticlesChoreo.execute(
        queryArticlesInputs,
        function(results){
          cache.set(cacheKey, results.get_Response());
          cb(null, results.get_Response());
        },
        function(error){ cb("Error nytimesarticlesearch(): "+error.message); }
    );
  }
  
};

module.exports = tembooChoreos;