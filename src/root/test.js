var finder = require('./fs-find-sync');
var findAsync = require('./findAsync');

// try {
//   var results = finder.findSync(/file.*/, 'src/root');
//   console.log('results', results);
// } catch (error) {
//   console.log(error);
// }

findAsync.findAsync(/file.*/, 'src/root', function(err, results) {
  if (err) return console.error(err);
  console.log('results', results);
});
