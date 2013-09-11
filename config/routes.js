var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var https = require('https');

module.exports = function(app) {
  var routes = require('../routes/index.js');
  var auth = require('../routes/auth.js');
  var hasLogin = require('../routes/hasLogin.js');

  app.options('*', function(req, res){
    res.send(200); 
  });

  // Setup API blockade
  app.all('/UserHasLoggedIn', function(req, res, next) {
    if (req.isAuthenticated()) return next(); // passport
    return res.redirect('/');
  });

  app.get('/', routes.index);

  app.get('/auth/facebook', auth.auth);

  // user gets sent here after being authorized
  app.get('/UserHasLoggedIn', hasLogin.login);


  // app.get('/account', ensureAuthenticated, function(req, res){
  //   res.render('account', { user: req.user });
  // });

  // GET /auth/facebook
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Facebook authentication will involve
  //   redirecting the user to facebook.com.  After authorization, Facebook will
  //   redirect the user back to this application at /auth/facebook/callback
  app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res){ /*not called*/ });

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