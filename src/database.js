var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

var Database = function (path) {
  this.path = path;

  this._records = {};
  this._writeStream = fs.createWriteStream(this.path, {
    encoding: 'utf8',
    flags: 'a',
  });

  this._load();
}

Database.prototype = Object.create(EventEmitter.prototype);

Database.prototype._load = function () {
  var stream = fs.createReadStream(this.path, { encoding: 'utf8' });
  var database = this;

  var data = '';
  // When the stream is readable, read the data and split it into records
  // Each record is a JSON object on a new line
  // The last record may be incomplete, so we save it for later
  stream.on('readable', function () {
    data += stream.read();
    var records = data.split('\n');
    data = records.pop();

    records.forEach(function (record) {
      try {
        var json = JSON.parse(record);
        if (json.value === null) {
          delete database._records[json.key];
        } else {
          database._records[json.key] = json.value;
        }
      } catch (e) {
        database.emit('error', 'Error parsing: ' + record);
      }
    });
  });

  // When the stream ends, emit a 'load' event
  stream.on('end', function () {
    database.emit('load');
  });
}

Database.prototype.set = function (key, value, cb) {
  var toWrite = JSON.stringify({ key: key, value: value }) + '\n';
  if (value === null) {
    delete this._records[key];
  } else {
    this._records[key] = value;
  }

  this._writeStream.write(toWrite, cb);
}

Database.prototype.get = function (key) {
  return this._records[key] || null;
}

Database.prototype.del = function (key, cb) {
  this.set(key, null, cb);
}

module.exports = Database;
