var redis = require('redis');
var client1 = redis.createClient();
var client2 = redis.createClient();

var msg_count = 0;

client1.on('subscribe', function(channel, count) {
  client2.publish('a nice channel', 'I am sending a message.');
  client2.publish('a nice channel', 'I am sending a second message.');
  client2.publish('a nice channel', 'I am sending my last message.');
});

client1.on('message', function(channel, message) {
  console.log('client1 channel ' + channel + ': ' + message);
  msg_count += 1;
  if (msg_count === 3) {
    client1.unsubscribe();
    // Be sure to close client connectoins when using the Redis module.
    client1.end();
    client2.end();
  }
});

client1.subscribe('channel');
