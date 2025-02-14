var fs = require('fs');
var join = require('path').join;

// This function will search for files that match the regular expression nameRe
// in the startPath directory and all its subdirectories. It will return an array
// of file paths that match the regular expression.
exports.findSync = function(nameRe, startPath) {
  // Create an array to store the results
  var results = [];

  // This function will search for files that match the regular expression nameRe
  function finder(path) {
    // Synchronously read the contents of a directory
    var files = fs.readdirSync(path);

    // Iterate over the files in the directory
    for (var i = 0; i < files.length; i++) {
      // Join the path and the file name
      var fpath = join(path, files[i]);
      // Get the file stats
      var stats = fs.statSync(fpath);
      // If the file is a directory, call the finder function recursively
      if (stats.isDirectory()) finder(fpath);
      // If the file is a regular file and matches the regular expression, add it to the results array
      if (stats.isFile() && nameRe.test(files[i])) results.push(fpath);
    }
  }

  // Start the search from the startPath directory
  finder(startPath);
  return results;
};
