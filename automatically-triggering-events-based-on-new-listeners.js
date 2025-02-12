var util = require('util')
var events = require('events')

function Pulsar(speed, times) {
  events.EventEmitter.call(this);

  var self = this; // Store the context of the Pulsar object.
  this.speed = speed;
  this.times = times;

  this.on('newListener', function(name, listener) {
    if (name === 'pulse') {
      self.start(); // Start the pulse if an event listener is added to the 'pulse' event.
    }
  });
}

util.inherits(Pulsar, events.EventEmitter);

Pulsar.prototype.start = function() {
  var self = this; // Store the context of the Pulsar object.

  var id = setInterval(function() {
    self.emit('pulse');
    if (--self.times === 0) {
      clearInterval(id);
    }
  }, this.speed);
};

var pulsar = new Pulsar(500, 5);

// Display a dot on each pulse
pulsar.on('pulse', function() {
  console.log('.');
});
