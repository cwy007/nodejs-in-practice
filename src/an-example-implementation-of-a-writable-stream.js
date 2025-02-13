var stream = require('stream');

function GreenStream(options) {
  stream.Writable.call(this, options);
}

GreenStream.prototype = Object.create(stream.Writable.prototype, {
  constructor: {
    value: GreenStream
  }
});

GreenStream.prototype._write = function(chunk, encoding, callback) {
  // Write the chunk to the console in green
  // process.stdout.write('u001b[32m' + chunk + 'u001b[39m');
  process.stdout.write('\u001b[32m' + chunk + '\u001b[39m');
  callback();
}

// Pipe the standard input stream to the GreenStream instance
// This will make the text green in the terminal
process.stdin.pipe(new GreenStream());
// This will make the text green in the terminal
// when you run the script and type something in the terminal
