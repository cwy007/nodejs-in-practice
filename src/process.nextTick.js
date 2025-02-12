// Listing 2.22 Triggering events inside process.nextTick
var EventEmitter = require('events').EventEmitter;

function complexOperation() {
  var events = new EventEmitter();

  // The event will now be emmitted when the listener is ready.
  process.nextTick(function() {
    events.emit('success');
  });

  // events.emit('success'); // 错误写法，触发事件时监听函数还没有设置好


  return events;
}

complexOperation().on('success', function() {
  console.log('success!');
});
