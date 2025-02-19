var dgram = require('dgram');
var fs = require('fs');
var port = 41230;
var defaultSize = 16;

function Client(remoteIP) {
  // Create a readable stream from the current file
  var inStream = fs.createReadStream(__filename);
  // Create a new UDP socket
  var socket = dgram.createSocket('udp4');

  // Listen for readable events on the stream
  // When the stream is readable, send data
  // When the stream ends, unref the socket
  inStream.on('readable', function() {
    sendData();
  });

  function sendData() {
    // Read the next chunk of data from the stream
    var message = inStream.read(defaultSize);
    // If there is no more data, close the socket
    if (!message) {
      return socket.unref();
    }

    // Send the data to the remote server
    socket.send(message, 0, message.length, port, remoteIP, function() {
      console.log(`Sending packet to ${remoteIP}:${port}`);
      // Continue sending data
      sendData();
    });
  }
}

// The server is a simple UDP server that listens for messages
// on the specified port and writes the messages to the console
function Server() {
  var socket = dgram.createSocket('udp4');

  socket.on('message', function(msg) {
    process.stdout.write(msg.toString());
  });

  socket.on('listening', function() {
    console.log('Server ready: ', socket.address());
  });

  socket.bind(port);
}

// If the first argument is 'client', create a new client
// If the first argument is 'server', create a new server
if (process.argv[2] === 'client') {
  new Client(process.argv[3]);
} else {
  new Server();
}
