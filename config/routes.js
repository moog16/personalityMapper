var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var graph = require('fbgraph');
var https = require('https');

module.exports = function(app) {
  var routes = require('../routes/index.js');

  var conf = {
    client_id:      '631478983538917',
    client_secret:  '73182dc701059fd63f401e5b68773bd4',
    scope:          'email, user_about_me, user_location, publish_stream',
    redirect_uri:   'http://goom-server.nodejitsu.com:3000/auth/facebook'
  };

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
  app.get('/', routes.index);

  app.get('/auth/facebook', function(req, res) {

    // we don't have a code yet
    // so we'll redirect to the oauth dialog
    if (!req.query.code) {
      var authUrl = graph.getOauthUrl({
          "client_id":     conf.client_id
        , "redirect_uri":  conf.redirect_uri
        , "scope":         conf.scope
      });

      if (!req.query.error) { //checks whether a user denied the app facebook login/permissions
        res.redirect(authUrl);
      } else {  //req.query.error == 'access_denied'
        res.send('access denied');
      }
      return;
    }

    graph.authorize({
        "client_id":      conf.client_id,
        "redirect_uri":   conf.redirect_uri,
        "client_secret":  conf.client_secret,
        "code":           req.query.code
    }, function (err, facebookRes) {
      res.redirect('/UserHasLoggedIn');
    });
  });


  // user gets sent here after being authorized
  app.get('/UserHasLoggedIn', function(req, res) {
    var options = {
        timeout:  3000
      , pool:     { maxSockets:  Infinity }
      , headers:  { connection:  "keep-alive" }
    };

    graph
      .setOptions(options)
      .get("1043010258?fields=id,name,friends.fields(name)", function(err, res) {
        console.log(res);
        // for(var i=0; i<res.friends.data.length; i++) {
        //   console.log(res.friends.data[i].name);
        // }
      });

    res.render("../routes/index", { title: "Logged In" });
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