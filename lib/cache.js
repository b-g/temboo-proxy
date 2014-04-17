var config = require('../config')
  , Datastore = require('nedb')
  , db = new Datastore({filename: config.db.filename, autoload: config.db.autoload});

var cache = {
  get: function(key, cb) {
    db.findOne({ key: key }, cb);
  },

  set: function(key, value) {
    db.update(
      { key: key },
      { key: key, value: value, created: new Date() },
      { upsert: true },
      function (err, numReplaced) {
        console.log(err, numReplaced)
      }
    );
  }
};

module.exports = cache;