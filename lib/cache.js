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
        if (err) {
          console.log(err, numReplaced);
        } else {
          console.log("cached:", key);
        }
      }
    );
  },

  count: function(cb) {
    db.count({}, cb);
  },

  reset: function(cb) {
    db.remove({}, { multi: true }, cb);
  }
};

module.exports = cache;