var signals = require('signals');
var myObject = {
  started: new signals.Signal(),
};

function onStarted(param1, params2) {
  console.log('Started:', param1, params2);
}

// Add a listener to the signal
myObject.started.add(onStarted);
// Dispatch the signal
myObject.started.dispatch('param1', 'param2');
