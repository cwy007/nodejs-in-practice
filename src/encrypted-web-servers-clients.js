// a basic http server that uses tls for encryption
var fs = require('fs');
var https = require('https');
var path = require('path');

var options = {
  key: fs.readFileSync(path.join(__dirname, '/server.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/server-cert.pem')),
  ca: [fs.readFileSync(path.join(__dirname, '/client-cert.pem'))],
  requestCert: true,
}

var server = https.createServer(options, function(req, res) {
  var authorized = req.socket.authorized ? 'authorized' : 'unauthorized';
  console.log('Connected:', authorized);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Welcome! You are ' + authorized + '\n');
  res.end();
}
);

server.listen(8001, function() {
  console.log('Server listening on port 8001');
} );
