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
    .get("me?fields=id,name,friends.fields(name)", function(err, res) {
      console.log(res.friends.data);
      //instead of console.log....res.send
      d = res.friends.data;
      // for(var i=0; i<res.friends.data.length; i++) {
      //   console.log(res.friends.data[i].name);
      // }
    });

  res.render("index", { title: "Logged In", names: d });
};