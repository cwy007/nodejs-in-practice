var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
  console.log('Error ' + err);
});

// the monitor event emitted by the redis module for tracking when various internal
// activities occur. This is useful for debugging and monitoring.
client.on('monitor', function(time, args) {
  console.log(time + ': ' + args);
});

client.on('ready', function() {
  console.log('Redis is ready');
  // Start app here
});
