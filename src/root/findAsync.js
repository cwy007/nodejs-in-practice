var fs = require('fs');
var join = require('path').join;

exports.findAsync = function(nameRe, startPath, cb) {
  var results = []; // Create an array to store the results
  var asyncOps = 0; // Keep track of the number of async operations
  var errored = false; // Keep track of whether an error has occurred

  function error(err) {
    if (!errored) {
      errored = true;
      cb(err); // Call the callback with the error object if an error occurs in any of the async operations
    }
  }

  // This function will search for files that match the regular expression nameRe
  // in the startPath directory and all its subdirectories. It will call the callback
  // with an array of file paths that match the regular expression.
  // The function uses the asyncOps variable to keep track of the number of async operations
  // that are currently in progress. When all async operations have completed, the function
  // will call the callback with the results array.
  // The finder function is recursive, so it will call itself for each subdirectory it encounters.
  function finder(path) {
    asyncOps++;

    fs.readdir(path, function(err, files) {
      if (err) return error(err);

      files.forEach(function(file) {
        var fpath = join(path, file);

        asyncOps++;
        fs.stat(fpath, function(err, stats) {
          if (err) return error(err);

          if (stats.isDirectory()) {
            finder(fpath);
          } else if (stats.isFile() && nameRe.test(file)) {
            results.push(fpath);
          }

          asyncOps--;
          if (asyncOps === 0) {
            cb(null, results);
          }
        });
      });

      asyncOps--;
      if (asyncOps === 0) {
        cb(null, results);
      }
    });

  }

  // Start the search from the startPath directory
  finder(startPath);
};
