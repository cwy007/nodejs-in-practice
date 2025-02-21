var fs = require('fs');
var tls = require('tls');
var os = require('os');
var path = require('path');

var options = {
  key: fs.readFileSync(path.join(__dirname, '/client.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/client-cert.pem')),
  ca: [fs.readFileSync(path.join(__dirname, '/server-cert.pem'))],
  serverName: os.hostname(),
}

var cleartestStream = tls.connect(8001, options, function() {
  console.log('connected:', cleartestStream.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(cleartestStream);
} );

cleartestStream.setEncoding('utf8');

cleartestStream.on('data', function(data) {
  console.log(data);
});
