// Listing 2.20 Keeping a timer alive until the program cleanly exits
function monitor() {
  console.log(process.memoryUsage());
}

var id = setInterval(monitor, 1000);
// Tell Node to stop the interval when the program has finished the long-running operation.
id.unref();

setTimeout(() => {
  console.log('Done!');
}, 5000);
