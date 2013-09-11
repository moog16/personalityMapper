var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var passport = require('passport');
var http = require('http');
var path = require('path');
var app = express();

require('./config')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
