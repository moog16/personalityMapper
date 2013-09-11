var mongoose = require('mongoose');

module.exports = function(app) {
  //  Setup DB Connection
  var dblink = app.set('db-uri');
  mongoose.connect(dblink);
  
  // Setup models
  mongoose.model('User', require('../models/User.js'));
};
  