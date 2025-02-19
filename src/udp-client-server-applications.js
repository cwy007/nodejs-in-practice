// sending messages back to clients
// udp chat server
// udp chat client

var assert = require('assert');
var dgram = require('dgram');
var fs = require('fs');
var defaultSize = 16;
var port = 41234;

function Client(remoteIP) {
  var socket = dgram.createSocket('udp4');
  var readline = require('readline');
  var rl = readline.createInterface(process.stdin, process.stdout);

  socket.send(new Buffer.from('<JOIN>'), 0, 6, port, remoteIP);

  rl.setPrompt('Message> ');
  rl.prompt();

  rl.on('line', function(line) {
    sendData(line);
    rl.prompt();
  }).on('close', function() {
    process.exit(0);
  });

  // Listen for messages from the other users
  socket.on('message', function(msg, rinfo) {
    console.log('\n<', + rinfo.address + '>', msg.toString());
    rl.prompt();
  });

  function sendData(message) {
    socket.send(Buffer.from(message), 0, message.length, port, remoteIP, function(err, bytes) {
      console.log('Sent:', message);
      rl.prompt();
    });
  }
}

function Server() {
  var clients = [];
  var server = dgram.createSocket('udp4');

  server.on('message', function(msg, rinfo) {
    console.log('server message:', msg.toString());
    var clientId = rinfo.address + ':' + rinfo.port;

    msg = msg.toString();

    if (!clients[clientId]) {
      clients[clientId] = rinfo;
    }

    if (msg.match(/^</)) {
      console.log('Control message:', msg);
      return;
    }

    for (var client in clients) {
      if (client !== clientId) {
        client = clients[client];

        server.send(Buffer.from(msg), 0, msg.length, client.port, client.address, function(err, bytes) {
          if (err) console.error(err);
          console.log('Bytes sent:', bytes);
        });
      }
    }
  });

  server.on('listening', function() {
    console.log('Server ready:', server.address());
  });

  server.bind(port);
}

module.exports = {
  Client: Client,
  Server: Server
};

// In Node.js, module.parent is a property that refers to the parent module
// that required the current module. If the current module is the entry point of
// the application (i.e., it was run directly from the command line), module.parent
//  will be null.
// check if the script is being run directly from the command line
// This allows the script to be used both as a module and as a standalone application.
if (!module.parent) {
  switch (process.argv[2]) {
    case 'client':
      new Client(process.argv[3]);
      break;
    case 'server':
      new Server();
      break;
    default:
      console.error('Unknown option');
  }
}