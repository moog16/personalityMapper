var https = require('https');

module.exports = function(app) {
  var routes = require('../routes/index.js');
  var auth = require('../routes/auth.js');
  var hasLogin = require('../routes/hasLogin.js');

  app.options('*', function(req, res){
    res.send(200); 
  });

  // Setup API blockade
  // app.all('/UserHasLoggedIn', function(req, res, next) {
  //   if (req.isAuthenticated()) return next(); // passport
  //   return res.redirect('/');
  // });

  app.get('/', routes.index);

  app.get('/auth/facebook', auth.auth);

  // user gets sent here after being authorized
  app.get('/UserHasLoggedIn', hasLogin.login);


  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};