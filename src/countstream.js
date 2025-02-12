var Writable = require('stream').Writable;
var util = require('util');

module.exports = CountStream;

util.inherits(CountStream, Writable);

/**
 * A writable stream that counts List 1.1
 * @param {string} matchText
 * @param {*} options
 */
function CountStream(matchText, options) {
  Writable.call(this, options);
  this.count = 0;
  this.matcher = new RegExp(matchText, 'ig');
}

CountStream.prototype._write = function(chunk, encoding, cb) {
  // console.log('chunk.toString()', chunk.toString())
  var matches = chunk.toString().match(this.matcher);
  if (matches) {
    this.count += matches.length;
  }
  cb();
}

CountStream.prototype.end = function() {
  this.emit('total', this.count);
}
