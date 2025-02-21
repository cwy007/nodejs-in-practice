// a tcp server that uses tls for encryption
var fs =  require('fs');
var tls = require('tls');
var path = require('path');

var options = {
  key: fs.readFileSync(path.join(__dirname, '/server.pem')), // private key
  cert: fs.readFileSync(path.join(__dirname, '/server-cert.pem')), // public key
  ca: [fs.readFileSync(path.join(__dirname, '/client-cert.pem'))], // client as a certificate authority
  requestCert: true, // ensure client certificate are always required
};

var server = tls.createServer(options, function(cleartestStream) {
  // whenever a licent connects, show if server was able to verify the client certificates.
  var authorized = cleartestStream.authorized ? 'authorized' : 'unauthorized';
  console.log('connected:', authorized);
  cleartestStream.write('welcome!\n');
  cleartestStream.setEncoding('utf8');
  cleartestStream.pipe(cleartestStream);
} );

server.listen(8001, function() {
  console.log('server bound');
});
