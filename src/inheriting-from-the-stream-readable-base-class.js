var Readable = require('stream').Readable;

function MyStream(options) {
  // Call the parent constructor
  // and be sure to pass any options to is as well.
  Readable.call(this, options);
}

// Inherit from the Readable stream
// and specify the constructor
// to be the MyStream function
// instead of the Readable function.
// This is important because
// the Readable constructor
// is not the same as the MyStream constructor.
// If you don't specify the constructor,
// the constructor will default to the Readable constructor.
// This will cause the instanceof operator
// to return false when checking if an object
// is an instance of MyStream.
// By specifying the constructor,
// the instanceof operator will return true.
// This is because the instanceof operator
// checks the constructor property
// of the prototype chain.
// If the constructor property
// is set to the MyStream constructor,
// the instanceof operator will return true.
// If the constructor property
// is set to the Readable constructor,
// the instanceof operator will return false.
// This is why it's important to set the constructor property
// to the MyStream constructor.
// This will ensure that the instanceof operator
// will return true when checking if an object
// is an instance of MyStream.
// This is important because the instanceof operator
// is used by many libraries and frameworks
// to determine the type of an object.
// If the instanceof operator returns false,
// it can cause bugs and unexpected behavior
// in your code.
// By setting the constructor property
// to the MyStream constructor,
// you can avoid these bugs and unexpected behavior.
// This is why it's important to set the constructor property
// to the MyStream constructor.
MyStream.prototype = Object.create(Readable.prototype, {
  constructor: {
    value: MyStream
  }
});
