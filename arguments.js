// Listing 2.14 Manipulating command-line arguments

// This is a simple object used to model the valid arguments.
var args = {
  '-h': displayHelp,
  '-r': readFile,
}

function displayHelp() {
  console.log('Argument processor:', args);
}

function readFile(file) {
  console.log('Reading:', file);
  // Pipe out file through the standard output stream.
  require('fs').createReadStream(file).pipe(process.stdout);
}

if (process.argv.length > 0) {
  process.argv.forEach(function(arg, index) {
    if (args[arg]) {
      // Call a mathching method from the arg parameter model, and slice the full
      // list of arguments to effectively support passing options from command-line flags.
      args[arg].apply(this, process.argv.slice(index + 1));
    }
  })
}
