var stream = require('stream');
var util = require('util');

function MemoryStream(options) {
  options = options || {};
  options.objectMode = true;
  stream.Readable.call(this, options);
}

util.inherits(MemoryStream, stream.Readable);

MemoryStream.prototype._read = function(size) {
  setTimeout(() => {
    this.push(process.memoryUsage());
  }, 1000);
}

var memoryStream = new MemoryStream();
memoryStream.on('readable', function() {
  var output = memoryStream.read();
  console.log('Type: %s, Output: %j', typeof output, output);
});
