function setup() {
  frameRate(30);

  var cnv = createCanvas(1200, 800);
  // position of canvas in window
  var x = (windowWidth - 1200) / 2;
  var y = 0;
  cnv.position(x, y);
  background(0, 0, 0);

  // source: https://github.com/processing/p5.js/wiki/Positioning-your-canvas
}

window.addEventListener("resize", function () {
  resizeCanvas(1200, 800);
  x = (windowWidth - 1200) / 2;
  y = 0;
  clear();
});

new p5();
var width = 1200;
var height = 800;
