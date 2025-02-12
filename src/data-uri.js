var fs = require('fs');
var mime = 'image/jpg';
var encoding = 'base64';
var data = fs.readFileSync('./data-uri.jpg').toString(encoding);
var uri = 'data:' + mime + ';' + encoding + ',' + data;
console.log(uri.slice(0, 30));

const newData = uri.split(',')[1];
var buf = Buffer.from(newData, 'base64');
fs.writeFileSync('./data-uri-new.jpg', buf);
