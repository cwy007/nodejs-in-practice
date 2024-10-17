// List 1.3 Using the CountStream class
var assert = require('assert');
var fs = require('fs');
var CountStream = require('./countstream');

var countStream = new CountStream('example');
var passed = 0;

countStream.on('total', function(count) {
  assert.equal(count, 1);
  passed++;
});

fs.createReadStream(__filename).pipe(countStream);

process.on('exit', function() {
  console.log('Assertions passed:', passed);
});
