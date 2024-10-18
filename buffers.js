// Allocate 255 bytes
// var buf = new Buffer(255);
var buf = Buffer.alloc(255);
// Write integer 23 to the first byte.
buf[0] = 23;
console.log('buf', buf);

var fs = require('fs');
fs.readFile(__filename, 'utf8', function(err, buf) {
  console.log('isBuffer 1', Buffer.isBuffer(buf)); // false
});
fs.readFile(__filename, function(err, buf) {
  console.log('isBuffer 2', Buffer.isBuffer(buf)); // true
});

fs.readFile('./names.txt', function(err, buf) {
  console.log('buf2', buf);
  // toString by default will convert data into a UTF-8 encoded string.
  console.log('buf toString :', buf.toString());
  console.log('buf toString :', buf.toString('ascii'));
});

var user = 'johnny';
var pass = 'c-bad';
var authstring = user + ':' + pass;
var buf = new Buffer(authstring);
console.log('buf isBuffer-->', Buffer.isBuffer(buf), buf);
console.log('buf base64', buf.toString('base64'));
