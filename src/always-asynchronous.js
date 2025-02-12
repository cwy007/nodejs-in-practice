// Listing 2.23 Creating the illusion of an always asynchronous API
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var content;

function readFileIfRequired(cb) {
  // If the content hasn't been read into memory, read is asynchronously.
  if (!content) {
    fs.readFile(__filename, 'utf8', function(err, data) {
      content = data;
      console.log('readFileIfRequired: readFile');
      cb(err, content);
    })
  } else {
    // If the content has been read, pass the cached version to the callback,
    // but first use process.nextTick to ensure the callback is execured later.
    process.nextTick(function() {
      console.log('readFileIfRequired: cached');
      cb(null, content);
    });
  }
}

readFileIfRequired(function(err, data) {
  console.log('1. Length:', data.length);

  readFileIfRequired(function(err, data2) {
    console.log('2. Length:', data2.length);
  });

  console.log('Reading file again...');
});

console.log('Reading file...');
