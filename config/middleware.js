var express = require('express');
var path = require('path');

module.exports = function(app) {
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(path.join(path.dirname(__dirname), 'public')));
  app.use(express.static(path.join(path.dirname(__dirname), 'public')));
};