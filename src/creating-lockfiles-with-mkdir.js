var fs = require('fs');

fs.mkdir('config.lock', function(err) {
  if (err) return console.error('Directory is locked by another process');
  fs.writeFile('config.lock/' + process.pid, '', function(err) {
    if (err) return console.error(err);
  });

  console.log('Lock acquired');
  setTimeout(function() {
    fs.unlink('config.lock/' + process.pid, function(err) {
      if (err) return console.error('Error releasing lock');
      fs.rmdir('config.lock', function(err) {
        if (err) return console.error(err);
        console.log('Lock released');
      });
    });
  }, 5000);
});
