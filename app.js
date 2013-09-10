
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var passport = require('passport');
var http = require('http');
var path = require('path');
var app = express();

require('./config/passport.js')(app);
// require('./config/config.js')(app);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/routes.js')(app);

// app.get('/', function(req, res){
//   res.render('index', { user: req.user, title: 'Express'});
// });

// app.get('/account', ensureAuthenticated, function(req, res){
//   res.render('account', { user: req.user });
// });

// app.get('/login', function(req, res){
//   res.render('login', { user: req.user });
// });

// // GET /auth/facebook
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  The first step in Facebook authentication will involve
// //   redirecting the user to facebook.com.  After authorization, Facebook will
// //   redirect the user back to this application at /auth/facebook/callback
// app.get('/auth/facebook',
//   passport.authenticate('facebook'),
//   function(req, res){
//     // The request will be redirected to Facebook for authentication, so this
//     // function will not be called.
//   });

// // GET /auth/facebook/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.
// app.get('/auth/facebook/callback', 
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

// // Simple route middleware to ensure user is authenticated.
// //   Use this route middleware on any resource that needs to be protected.  If
// //   the request is authenticated (typically via a persistent login session),
// //   the request will proceed.  Otherwise, the user will be redirected to the
// //   login page.
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/login')
// }

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
