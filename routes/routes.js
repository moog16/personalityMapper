var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var https = require('https');
// var getIndex = require('../routes/getIndex.js');

module.exports = function(app) {

  app.options('*', function(req, res){
    res.send(200); 
  });

  // Setup API blockade
  // app.all('/', function(req, res, next) {
  //   // passport gives us a 'isAuthenticated' method
  //   // we'll check this method
  //   if (req.isAuthenticated()) return next();

  //   return res.redirect('/login');
  // });

  app.get('/', function(req, res){
    var options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: '/1043010258?fields=id,name,friends.fields(name)',
      method: 'GET'
    };

    var req = https.request(options, function(res) {
      console.log("statusCode: ", res.statusCode);
      console.log("headers: ", res.headers);

      res.on('data', function(d) {
        process.stdout.write(d);
        console.log(d);
      });
    });
    req.end();

    req.on('error', function(e) {
      console.error(e);
    });

    res.render('index', { user: req.user, title: 'Express'});
  });

  app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
  });

  app.get('/login', function(req, res){
    res.render('login', { user: req.user });
  });

  // GET /auth/facebook
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Facebook authentication will involve
  //   redirecting the user to facebook.com.  After authorization, Facebook will
  //   redirect the user back to this application at /auth/facebook/callback
  app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res){
      // The request will be redirected to Facebook for authentication, so this
      // function will not be called.
    });

  // GET /auth/facebook/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed.  Otherwise, the user will be redirected to the
  //   login page.
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
};