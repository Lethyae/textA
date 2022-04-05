let middleX = width / 2;
let middleY = height / 2;

function mainMenu() {
  background(0, 0, 0);

  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("Welcome", middleX, height / 10);
}

function draw() {
  clear();
  mainMenu();
}
