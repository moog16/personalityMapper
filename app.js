
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var app = express();

require('./config/passport.js')(app);
require('./config/config.js')(app);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/routes.js')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
