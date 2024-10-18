function Bomb() {
  this.message = 'Boom!';
}

Bomb.prototype.explode = function() {
  console.log(this.message);
}

var bomb = new Bomb();

// Call .bind to ensure the method is bound correctly so it can access internal properties.
setTimeout(bomb.explode.bind(bomb), 1000);
