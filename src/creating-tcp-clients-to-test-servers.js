// creating tcp clients to test servers
var assert = require('assert');
var net = require('net');
var clients = 0;
var expectedAssertions = 2;

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

  runTest(1, function() {
    runTest(2, function() {
      console.log('All tests passed');
      server.close();
    });
  });
});

function runTest(expectedid, done) {
  var client = net.connect(8000);

  client.on('data', function(data) {
    console.log('Received:', data.toString());
    assert.equal(data.toString(), 'Welcome client: ' + expectedid + '\n');
    expectedAssertions--;
    client.end();
  });

  client.on('end', done);
}