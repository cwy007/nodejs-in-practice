var fs = require('fs');
// Cause an error by trying to read a file that doesn't exist
var stream = fs.createReadStream('not-found.txt');

// Use the events API to attach an error handler
stream.on('error', function(err) {
  console.trace();
  console.error('Stack:', err.stack);
  console.error('An error occurred:', err);
});
