// a simple tcp server
const net = require('net');
var clients = 0;

var server = net.createServer(function(client) {
  clients++;
  var clientId = clients;
  console.log('Client connected:', clientId);

  client.on('end', function() {
    console.log('Client disconnected:', clientId);
  });

  // send a welcome message to the client
  client.write('Welcome client: ' + clientId + '\n');
  // pipe the client to itself
  client.pipe(client);
});

server.listen(8000, function() {
  console.log('Server started on port 8000');
});
