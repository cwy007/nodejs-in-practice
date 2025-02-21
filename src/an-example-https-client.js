var fs = require('fs');
var https  = require('https');
var os = require('os');
var path = require('path');

var options = {
  key: fs.readFileSync(path.join(__dirname, '/client.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/client-cert.pem')),
  ca: [fs.readFileSync(path.join(__dirname, '/server-cert.pem'))],
  servername: os.hostname(),
  port: 8001,
  path: '/',
  method: 'GET',
}

var req = https.request(options, function(res) {
  console.log('HTTP headers:', res.headers);
  res.on('data', function(data) {
    console.log('Body:', data.toString());
    process_params.stdout.write(data);
  });
});

req.end();

req.on('error', function(e) {
  console.error(e);
}
);
