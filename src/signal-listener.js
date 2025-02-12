// Listing 2.16 Adding a listener for a POSIX signal

// Read from stdin so the program will run until CTRL-C is pressed or it's killed.
process.stdin.resume();

// Binding a listener to SIGHUP signal.
process.on('SIGHUP', function() {
  console.log('Reloading configuration...');
});

// the PID is displayed so you can use it to send signals using the kill command.
console.log('PID:', process.pid);
