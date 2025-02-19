var assert = require('assert');
var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World\n');
  res.end();
});

server.listen(9000, function() {
  console.log('Server listening on port 8000');
});

var req = http.request({
  hostname: 'localhost',
  port: 8000, function(res) {
    console.log('HTTP headers:', res.headers);
    res.on('data', function(data) {
      console.log('Body:', data.toString());
      assert.equal(data.toString(), 'Hello World\n');
      assert.equal(200, res.statusCode);
      server.unref();
    });
  }})

req.end();
