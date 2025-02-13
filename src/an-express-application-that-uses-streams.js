var stream = require('stream');
var util = require('util');
var express = require('express');
var app = express();

// Create a custom Readable stream
function StatStream(limit) {
  // Call the parent constructor
  stream.Readable.call(this);
  // Set the limit of the stream
  this.limit = limit;
}

util.inherits(StatStream, stream.Readable);

// Implement the _read method to push data to the read queue
StatStream.prototype._read = function(size) {
  if (this.limit === 0) {
    this.push(null);
  } else {
    // Push the memory usage to the read queue
    this.push(util.inspect(process.memoryUsage()));
    this.push('\n');
    // Decrement the limit
    this.limit--;
  }
}

// Create an Express application that uses the StatStream
app.get('/', function(req, res) {
  var statStream = new StatStream(10);
  statStream.pipe(res);
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
