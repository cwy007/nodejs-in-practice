var http = require('http');
var fs = require('fs');
var zlib = require('zlib');

http.createServer(function(req, res) {
  // Set the header so the browser knows that the content is compressed.
  res.writeHead(200, { 'content-encoding': 'gzip' });

  // Use two calls to pipe, compress and stream the file back to the client.
  fs.createReadStream(__dirname + '/test.js')
    .pipe(zlib.createGzip())
    .pipe(res); // Data is piped from the file to the response object.
}).listen(8000);
