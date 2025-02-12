// Listing 2.15 Returning meaningful exit status codes
var args = {
  '-h': displayHelp,
  '-r': readFile,
}

function displayHelp() {
  console.log('Argument processor:', args);
}

function readFile(file) {
  if (file && file.length) {
    console.log('Reading:', file);
    require('fs').createReadStream(file).pipe(process.stdout);
  } else {
    // Both console.error and process.exit are used to correctly indicate an error occurred.
    console.error('A file must be provided with the -r option');
    process.exit(1); // 非0的退出码表示进程有报错
  }
}

if (process.argv.length > 0) {
  process.argv.forEach(function(arg, index) {
    if (args[arg]) {
      args[arg].apply(this, process.argv.slice(index + 1));
    }
  });
}
