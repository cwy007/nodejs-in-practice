var locker = require('./locker');

locker.lock(function(err) {
  if (err) return console.error(err);

  console.log('Lock acquired');
  setTimeout(function() {
    locker.unlock(function(err) {
      if (err) return console.error(err);
      console.log('Lock released');
    });
  }, 5000);
});
