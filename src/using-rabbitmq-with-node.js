var rabbitHub = require('rabbitmq-nodejs-client');
var subHub = rabbitHub.create({ task: 'sub', channel: 'myChannel' });
var pubHub = rabbitHub.create({ task: 'pub', channel: 'myChannel' });

subHub.on('connection', function(hub) {
  hub.on('message', function(message) {
    console.log('Message:', message);
  }.bind(this));
});
subHub.connect();

pubHub.on('connection', function(hub) {
  hub.send('Hello, World!');
});
pubHub.connect();
