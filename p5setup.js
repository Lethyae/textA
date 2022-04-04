function setup() {
  frameRate(30);

  var cnv = createCanvas(windowWidth, windowHeight);
  // position of canvas in window
  var x = 0;
  var y = 0;
  cnv.position(x, y);
  background(0, 0, 0);
}

window.addEventListener("resize", function () {
  resizeCanvas(windowWidth, windowHeight);
  x = 0;
  y = 0;
  clear();
});

new p5();
var width = windowWidth;
var height = windowHeight;
