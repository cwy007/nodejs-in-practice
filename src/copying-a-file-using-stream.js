var fs = require('fs');

var readable = fs.createReadStream('src/original.txt');
var writable = fs.createWriteStream('src/copy.txt');

readable.pipe(writable);
