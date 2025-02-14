// List 1.2 Using the CountStream class
var CountStream = require('./countstream');
var countStream = new CountStream('book');
var http = require('http');

http.get('http://www.manning.com', function(res) {
  res.pipe(countStream);
});

countStream.on('total', function(count) {
  console.log('Total matches:', count);
});
