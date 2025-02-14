var finder = require('./fs-find-sync');

try {
  var results = finder.findSync(/file.*/, 'src/root');
  console.log('results', results);
} catch (error) {
  console.log(error);
}