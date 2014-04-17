var config = require('./config')
  , express = require('express')
  , app = express()
  , cache = require('./lib/cache')
  , tembooChoreos = require('./tembooChoreos')
  ;

app.use(express.json());
app.use(app.router);
app.use(function(err, req, res, next) {
  if (err) return internalError(res, err);
});

app.get(/^\/(\w+)/, function(req, res){
  // GET /choreoName?q=query
  var choreoName = req.params[0];
  if (!tembooChoreos[choreoName] || typeof req.query.q === 'undefined' || req.query.q === '') {
    res.send(400, 'bad request');
    return;
  }
  find(req.originalUrl, req.query.q, res, tembooChoreos[choreoName]);
});

var find = function(cacheKey, query, res, choreo) {
  cache.get(
    cacheKey,
    function(err, doc){
      if (err) return internalError(res, err);
      if (doc) {
        res.send(doc.value);
      } else {
        choreo(query, cacheKey, function(err, results){
          if (err) return internalError(res, err);
          res.send(results);
        });
      }
    }
  );
};

var server = app.listen(config.port, function() {
  console.log('Serving HTTP on http://localhost:%d/', server.address().port);
});

function internalError(res, err) {
  if (err) console.error(err);
  res.send(500, 'internal server error');
}
