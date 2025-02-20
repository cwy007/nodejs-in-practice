var http = require('http');
var url = require('url');

// create standard http server instance
http.createServer(function(req, res) {
  console.log('start request', req.url);
  var options = url.parse(req.url);
  options.headers = req.headers;

  // create request that copies the original request
  var proxyRequest = http.request(options, function(proxyResponse) {
    // listen for data; then write it back to browser
    proxyResponse.on('data', function(chunk) {
      console.log('proxyResponse length', chunk.length);
      res.write(chunk, 'binary');
    });

    // track when proxied request has finished
    proxyResponse.on('end', function() {
      console.log('proxyResponse end');
      res.end();
    });

    // send headers to the browser
    res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
  });

  // capture data from browser to the server
  req.on('data', function(chunk) {
    console.log('in request length', chunk.length);
    proxyRequest.write(chunk, 'binary');
  });

  // track when original request ends
  req.on('end', function() {
    console.log('in request end');
    proxyRequest.end();
  });

// Listen for connections from local browsers
}).listen(8080);
