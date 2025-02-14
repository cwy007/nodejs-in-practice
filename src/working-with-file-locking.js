var fs = require('fs');

fs.writeFile('src/config.lock', process.pid, { flag: 'wx' }, function(err) {
  if (err) {
    console.error('File is locked by another process');
    return;
  }

  console.log('Lock acquired');
  setTimeout(function() {
    fs.unlink('src/config.lock', function(err) {
      if (err) {
        console.error('Error releasing lock');
        return;
      }

      console.log('Lock released');
    });
  }, 5000);
});
