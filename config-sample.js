// rename the file to config.js

var config = {};

config.temboo = {};
config.db = {};

config.temboo.user_name = 'USER_NAME';
config.temboo.app_name = 'APP_NAME';
config.temboo.app_key =  'APP_KEY';

config.db.filename = './db/cache';
config.port = process.env.PORT || 3000;

module.exports = config;