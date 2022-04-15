function setup() {
  frameRate(30);

  var cnv = createCanvas(windowWidth / 1.3, windowHeight / 1.25);
  // position of canvas in window at center of window
  var x = (windowWidth - windowWidth / 1.3) / 2;
  var y = (windowHeight - windowHeight / 1.25) / 2;
  cnv.position(x, y);
  background(255, 255, 255);
}

window.addEventListener("resize", function () {
  resizeCanvas(windowWidth / 1.3, windowHeight / 1.25);
  x = (windowWidth - windowWidth / 1.3) / 2;
  y = (windowHeight - windowHeight / 1.25) / 2;
  clear();
});

new p5();
var width = windowWidth / 1.3;
var height = windowHeight / 1.2;
