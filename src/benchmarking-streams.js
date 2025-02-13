var fs = require('fs');
var zlib = require('zlib');

function benchStream(inSize, outSize) {
  var time = process.hrtime();
  var watermark = process.memoryUsage().rss; // Resident Set Size
  var input = fs.createReadStream('/usr/share/dict/words', { bufferSize: inSize });
  var gzip = zlib.createGzip({ chunkSize: outSize });
  var output = fs.createWriteStream(__dirname + '/out.gz', { bufferSize: inSize });

  var memoryCheck = setInterval(function() {
    var rss = process.memoryUsage().rss;
    if (rss > watermark) {
      watermark = rss;
    }
  }, 50);

  var diff = process.hrtime(time);
  input.on('end', function() {
    var memoryEnd = process.memoryUsage().rss;
    clearInterval(memoryCheck);
    console.log([
      inSize,
      outSize,
      (diff[0] * 1e9 + time[1]) / 1e6,
      watermark / 1024,
    ].join('\t'));
  });

  input.pipe(gzip).pipe(output);

  return input;
}

console.log('file size, gzip size, ms, RSS');

var fileSize = 128;
var zipSize = 5024;

function run(times) {
  benchStream(fileSize, zipSize).on('end', function() {
    times--;
    fileSize *= 2;
    zipSize *= 2;

    if (times > 0) {
      run(times);
    }
  });
}

run(10);