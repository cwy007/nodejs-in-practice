var util = require('util')
var events = require('events')
var AudioDevice = {
  play: function(track) {
    // Stub: Trigger playback through iTunes, mpg123, etc.
  },

  stop: function() {
  }
};

function MusicPlayer() {
  // The class's state can be configured, and then EventEmitter's constructor can
  // be called as required.
  this.playing = false;
  events.EventEmitter.call(this);
}
// the inherits method copies the methods from one prototype into another.
// this is the general pattern for creating classes based on EventEmitter.
util.inherits(MusicPlayer, events.EventEmitter);

var musicPlayer = new MusicPlayer();

musicPlayer.on('play', function(track) {
  this.playing = true;
  AudioDevice.play(track);
});
musicPlayer.on('stop', function() {
  this.playing = false;
  AudioDevice.stop();
});

// New listeners can be added as needed.
musicPlayer.on('play', function(track) {
  console.log('Track now playing:', track);
});

// The emit method is used to trigger events.
musicPlayer.emit('play', 'The Roots - The Fire');

setTimeout(function() {
  musicPlayer.emit('stop');
}, 1000);

// Removing listeners
// A reference to the listener is required to be able to remove it.
function play(track) {
  this.playing = true;
}
musicPlayer.on('play', play);
musicPlayer.removeListener('play', play);

// util.inherits
// Object.create

// once
musicPlayer.once('play', () => {
  this.audioFirstStarted = new Date();
});
