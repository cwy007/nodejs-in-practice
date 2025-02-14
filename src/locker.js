var fs = require('fs');
var hasLock = false;
var lockDir = 'config.lock';

exports.lock = function(cb) {
  if (hasLock) return cb();
  fs.mkdir(lockDir, function(err) {
    if (err) return cb('Directory is locked by another process');
    fs.writeFile(lockDir + '/' + process.pid, '', function(err) {
      if (err) return cb(err);
    });

    hasLock = true;
    cb();
  });
};

exports.unlock = function(cb) {
  if (!hasLock) return cb();
  fs.unlink(lockDir + '/' + process.pid, function(err) {
    if (err) return cb('Error releasing lock');
    fs.rmdir(lockDir, function(err) {
      if (err) return cb(err);
      hasLock = false;
      cb();
    });
  });
}

process.on('exit', function() {
  if (hasLock) {
    fs.unlinkSync(lockDir + '/' + process.pid);
    fs.rmdirSync(lockDir);
    console.log('Lock released');
  }
});
