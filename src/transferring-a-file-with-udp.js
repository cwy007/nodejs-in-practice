// set up a udp server
const dgram = require('dgram');

// create a udp server
const server = dgram.createSocket('udp4');

// bind the server to port 4000
server.bind(4000);
