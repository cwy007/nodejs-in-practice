var util = require('util')
var events = require('events')

function MusicPlayer() {
  events.EventEmitter.call(this);
}

util.inherits(MusicPlayer, events.EventEmitter);

var musicPlayer = new MusicPlayer();

musicPlayer.on('play', function(track) {
  this.emit('error', 'unable to play!');
});
// listening for an error event.
musicPlayer.on('error', function(err) {
  console.error('Error: ', err);
});

setTimeout(() => {
  musicPlayer.emit('play', 'Little Comets - Jennifer');
}, 1000);
