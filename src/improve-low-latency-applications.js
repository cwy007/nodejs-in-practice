// turning off Nagle's algorithm
const net = require('net');

var server = net.createServer(function(c) {
  c.setNoDelay(true);
  c.write('12345654323456', 'binary');
  console.log('server connected');

  c.on('end', function() {
    console.log('server disconnected');
    server.unref(); // allow the server to exit when no connections are active
  });

  c.on('data', function(data) {
    process.stdout.write(data.toString()); // echo to console
    c.write(data.toString()); // echo back
  });
});

server.listen(8124, function() {
  console.log('server bound');
});
