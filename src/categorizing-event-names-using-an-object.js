var util = require('util');
var events = require('events');

function MusicPlayer() {
  events.EventEmitter.call(this);
  this.on(MusicPlayer.events.play, this.play.bind(this));
}

// the object used to store the event list is aliased to e for convenience.
const e = MusicPlayer.events = {
  play: 'play',
  pause: 'pause',
  stop: 'stop',
  ff: 'ff',
  rw: 'rw'
}

util.inherits(MusicPlayer, events.EventEmitter);

MusicPlayer.prototype.play = function() {
  this.playing = true;
  console.log('Music started');
}

var musicPlayer = new MusicPlayer();

// When adding new listeners, users of the class can refer to the event list object.
// rather than writing the event name as a string.
musicPlayer.on(e.play, function() {
  console.log('Received play event');
});

musicPlayer.emit(e.play);
