var stream = require('stream');

function HungryStream(options) {
  stream.Duplex.call(this, options);
  // Set the waiting flag to false
  this.waiting = false;
}

HungryStream.prototype = Object.create(stream.Duplex.prototype, {
  constructor: {
    value: HungryStream
  }
});

// The _write function is called when data is written to the stream
HungryStream.prototype._write = function(chunk, encoding, callback) {
  this.waiting = false;
  // Write the chunk to the console in green
  this.push('\u001b[32m' + chunk + '\u001b[39m');
  callback();
}

HungryStream.prototype._read = function(size) {
  // If the waiting flag is false, prompt the user for input
  if (!this.waiting) {
    // Prompt the user for input
    this.push('Feed me data! > ');
    this.waiting = true;
  }
}

var hungryStream = new HungryStream();
// Pipe the standard input stream to the HungryStream instance
// This will make the text green in the terminal
process.stdin.pipe(hungryStream).pipe(process.stdout);
