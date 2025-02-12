var express = require('express');
var app = express();

app.on('hello-alert', function() {
  console.log('Hello, alert!');
});

app.get('/', function(req, res) {
  // The app object is also available in the request object.
  res.app.emit('hello-alert');
  res.send('Hello, World!');
});

app.listen(3000);
