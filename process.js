// Run with
// cat file.txt | node process.js

// Tell the stream we're ready to start reading.
process.stdin.resume();
process.stdin.setEncoding('utf8');

// This callback transforms the data in chunks when they're available.
process.stdin.on('data', function(text) {
  process.stdout.write(text.toUpperCase());
});
