var graph = require('fbgraph');

exports.login = function(req, res) {
  var options = {
      timeout:  3000,
      pool:     { maxSockets:  Infinity },
      headers:  { connection:  "keep-alive" }
  };

  var d;
  graph
    .setOptions(options)
    .get("me?fields=id,name,friends.fields(name)", function(err, FBres) {
      console.log(FBres.friends.data);
    });

  res.render("index", { title: "Logged In"});
};