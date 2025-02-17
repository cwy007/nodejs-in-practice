var fs = require('fs');
var path = require('path');

fs.watch(path.join(__dirname, '/watchdir'), console.log);
fs.watchFile(path.join(__dirname, '/watchdir'), console.log);
