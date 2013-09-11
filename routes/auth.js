var graph = require('fbgraph');

var conf = {
  client_id:      '631478983538917',
  client_secret:  '73182dc701059fd63f401e5b68773bd4',
  scope:          'email, user_about_me, user_location, publish_stream',
  redirect_uri:   'http://goom-server.nodejitsu.com:3000/auth/facebook'
};

exports.auth = function(req, res) {
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
};