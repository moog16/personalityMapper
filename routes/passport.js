var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = "631478983538917"
var FACEBOOK_APP_SECRET = "73182dc701059fd63f401e5b68773bd4";

module.exports = function(app) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://goom-server.nodejitsu.com:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        
        // To keep the example simple, the user's Facebook profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Facebook account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  ));
};