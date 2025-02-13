var stream = require('stream');
var Readable = stream.Readable;
var util = require('util');

function MemoryStream(interval) {
  // The older API required thar calsses inherited from the stream module and set
  // the readable property to true to indicate that the stream is readable
  // This is no longer necessary in the new API
  // stream.call(this);
  this.readable = true;

  setInterval(function() {
    var data = process.memoryUsage();
    data.date = new Date();

    // The older API required that the data be emitted as a string
    // The data event is emitted with some example values.
    // mark wure strings or Buffer instances are used.
    this.emit('data', JSON.stringify(data) + '\n');
  }.bind(this), interval);
}

util.inherits(MemoryStream, stream);

var memoryStream = new MemoryStream(250);
// The older API required that the stream be wrapped in a Readable stream
// before it could be piped to another stream
// This is no longer necessary in the new API
var wrappedStream = new Readable().wrap(memoryStream);

// The older API required that the stream be piped to process.stdout
// This is no longer necessary in the new API
wrappedStream.pipe(process.stdout);

