var stream = require('stream');
var util = require('util');
var fs = require('fs');

function JSONLineParser(source) {
  // Always ensure the constructor's parent is called
  stream.Readable.call(this);
  this._source = source;
  this._buffer = '';
  this._foundLineEnd = false;

  source.on('readable', function() {
    // Ensure the _read function is called only once
    // Call read() to start pushing data into the stream
    // This will trigger the _read function to be called
    // again when the stream is ready for more data
    // This is a common pattern in Node.js streams
    // See: https://nodejs.org/api/stream.html#stream_readable_read_size_1
    this.read();
  }.bind(this));
}

util.inherits(JSONLineParser, stream.Readable);

JSONLineParser.prototype._read = function(size) {
  var chunk;
  var line;
  var lineIndex;
  var result;

  // If there is no more data in the buffer, read from the source
  // and add it to the buffer
  // This is a common pattern in Node.js streams
  if (this._buffer.length === 0) {
    chunk = this._source.read();
    this._buffer += chunk;
  }

  // Find the first newline in the buffer
  lineIndex = this._buffer.indexOf('\n');
  if (lineIndex !== -1) {
    // Extract the line from the buffer
    line = this._buffer.slice(0, lineIndex);
    // console.log('line', line)
    if (line) {
      // result = JSON.parse(line);
      result = line;
      // Remove the line from the buffer
      this._buffer = this._buffer.slice(lineIndex + 1);
      // Emit the object
      this.emit('object', result);
      // Push the object to the stream
      this.push(util.inspect(result));
    } else {
      // Empty line, just skip it
      this._buffer = this._buffer.slice(1); // Skip the newline
    }
  }
}

var input = fs.createReadStream(__dirname + '/json-lines.txt', {
  encoding: 'utf8',
});
var jsonLineReader = new JSONLineParser(input);

jsonLineReader.on('object', function(obj) {
  console.log('Object: ', obj);
});
