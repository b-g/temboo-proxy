var config = require('./config')
  , cache = require('./lib/cache')
  , tsession = require("temboo/core/temboosession")
  , session = new tsession.TembooSession(config.temboo.user_name, config.temboo.app_name, config.temboo.app_key);


var tembooChoreos = {
  // GET /twittersearch?q=Israel
  // GET /twittersearch?q=@bndktgrs+#stuttgart
  twittersearch: function(query, cacheKey, cb) {
    var Twitter = require("temboo/Library/Twitter/Search");
    var tweetsChoreo = new Twitter.Tweets(session);
    var tweetsInputs = tweetsChoreo.newInputSet();
    tweetsInputs.setCredential("TwitterTembooChoreo");
    tweetsInputs.set_Query(query);
    tweetsChoreo.execute(
        tweetsInputs,
        function(results){
          cache.set(cacheKey, results.get_Response());
          cb(null, results.get_Response());
        },
        function(error){ cb(error.message); }
    );
  },

  // GET /twittertimeline?q=bndktgrs
  twittertimeline: function(query, cacheKey, cb) {
    var Twitter = require("temboo/Library/Twitter/Timelines");
    var userTimelineChoreo = new Twitter.UserTimeline(session);
    var userTimelineInputs = userTimelineChoreo.newInputSet();
    userTimelineInputs.setCredential("TwitterTembooChoreo");
    userTimelineInputs.set_ScreenName(query);
    userTimelineChoreo.execute(
        userTimelineInputs,
        function(results){
          cache.set(cacheKey, results.get_Response());
          cb(null, results.get_Response());
        },
        function(error){ cb(error.message); }
    );
  },

  // GET /nytimesarticlesearch?q=Design
  nytimesarticlesearch: function(query, cacheKey, cb) {
    var NYTimes = require("temboo/Library/NYTimes/ArticleSearch");
    var queryArticlesChoreo = new NYTimes.QueryArticles(session);
    var queryArticlesInputs = queryArticlesChoreo.newInputSet();
    queryArticlesInputs.setCredential("NYTimesArticleSearch");
    queryArticlesInputs.set_Query(query);

    queryArticlesChoreo.execute(
        queryArticlesInputs,
        function(results){
          cache.set(cacheKey, results.get_Response());
          cb(null, results.get_Response());
        },
        function(error){ cb(error.message); }
    );
  }
};

module.exports = tembooChoreos;