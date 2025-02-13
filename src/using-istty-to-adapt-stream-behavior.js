var stream = require('stream');
var util = require('util');

function MemoryStream() {
  this.isTTY = process.stdout.isTTY;
  stream.Readable.call(this);
}

util.inherits(MemoryStream, stream.Readable);

MemoryStream.prototype._read = function() {
  var text = JSON.stringify(process.memoryUsage()) + '\n';
  if (this.isTTY) {
    this.push("\u001b[32m" + text + "\u001b[39m");
  } else {
    this.push(text);
  }
};

// function OutputStream() {
//   stream.Writable.call(this);
//   this.on('pipe', function(dest) {
//     dest.isTTY = this.isTTY;
//   }.bind(this));
// }

// util.inherits(OutputStream, stream.Writable);

// OutputStream.prototype._write = function(chunk, encoding, cb) {
//   if (this.isTTY) {
//     process.stdout.write("\u001b[32m" + chunk + "\u001b[39m");
//   } else {
//     process.stdout.write(chunk);
//   }
//   cb();
// }

var memoryStream = new MemoryStream();


// memoryStream.pipe(new OutputStream())
memoryStream.pipe(process.stdout);
