var fs = require('fs');
var stream = require('stream');

function CSVParser(options) {
  stream.Transform.call(this, options);

  // These properties are used to track the state of the parser
  this.value = '';
  this.headers = [];
  this.values = [];
  this.line = 0;
}

CSVParser.prototype = Object.create(stream.Transform.prototype, {
  constructor: {
    value: CSVParser
  }
});

// The _flush function is called when there is no more data
// to be read from the read stream

CSVParser.prototype.toObject = function() {
  var i;
  var obj = {};
  for (i = 0; i < this.headers.length; i++) {
    obj[this.headers[i]] = this.values[i];
  }
  return obj;
}

/**
 * addValue
 * // Add the value to the headers or values array
 * // depending on the line number
 */
CSVParser.prototype.addValue = function() {
  if (this.line === 0) {
    this.headers.push(this.value);
  } else {
    this.values.push(this.value);
  }
  this.value = '';
}

// The _transform function is called when data is received
CSVParser.prototype._transform = function(chunk, encoding, done) {
  var c;
  var i;

  chunk = chunk.toString();

  // Loop through each character in the chunk
  // and process it accordingly
  for (i = 0; i < chunk.length; i++) {
    c = chunk.charAt(i);
    if (c === ',') {
      // If the character is a comma, add the value
      this.addValue();
    } else if (c === '\n') {
      // If the character is a newline, add the value
      this.addValue();
      // If the line number is greater than 0, push the object
      if (this.line > 0) {
        // Push the object to the stream
        this.push(JSON.stringify(this.toObject()) + '\n');
      }
      // Reset the values arrays
      this.values = [];
      // Increment the line number
      this.line++;
    } else {
      // Add the character to the value
      this.value += c;
    }
  }

  // Call the done function to signal that the processing is done
  done();
}

var parser = new CSVParser();
fs.createReadStream(__dirname + '/sample.csv').pipe(parser).pipe(process.stdout);

// {"col1":"row1col1","col2":"row1col2","col3":"row1col3"}
// {"col1":"row2col1","col2":"row2col2","col3":"row2col3"}
// {"col1":"row3col1","col2":"row3col2","col3":"row3col3"}
