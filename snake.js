// playing field
let fields = [];
let field = {
  name: "",
  number: 0,
  type: "", // "empty","border", "head", "body", "gem", "powerUp"
  x: 0,
  y: 0,
};

// snake stats
let snake = []; // snake is an array of fields[], which contains a field
let score = 8;
// directions
let right = 0;
let left = 1;
let up = 2;
let down = 3;
let tempDirection = right;
let direction = right; // starting direction

// field types
let empty = "empty";
let border = "border";
let body = "body";
let head = "head";
let gem = "gem";

// game status
let gameOver = false;

let screen = 3; // start 0, how-to 1, options 2, game 3

let fieldSize = 21;

// options
let slow = 5;
let normal = 8;
let fast = 12;

let small = 18;
let medium = 22;
let big = 27;

let gameSize = small;
let snakeSpeed = normal;

// timer
// source: tea timer aus Vorlesung
let timerStart = new Date();
let countDownRunning = false;
let timeIsRunning = false;
let gameTimerStart = new Date();
let minutes = 0;
let seconds = 0;
let m = "";
let s = "";

let pebbleImage;
let music;
function preload() {
  pebbleImage = loadImage("images/Pebbles Portrait.png");

  //soundFormats("mp3", "ogg");
  // music = loadSound("sound/Snakes are just dragons too.mp3");
}

function getTime() {
  // returns elapsed time since game start as a string -> "minutes":"seconds"
  let currentTime = new Date();
  seconds = Math.floor((currentTime.getTime() - timerStart.getTime()) / 1000);

  if (seconds >= 60) {
    minutes += 1;
    timerStart = new Date(); // reset seconds
  }

  if (minutes < 10 && seconds < 10) {
    m = "0" + minutes.toString();
    s = "0" + seconds.toString();
  } else if (minutes < 10 && seconds >= 10) {
    m = "0" + minutes.toString();
    s = seconds.toString();
  } else if (minutes >= 10 && seconds < 10) {
    m = minutes.toString();
    s = "0" + seconds.toString();
  } else if (minutes >= 10 && seconds >= 10) {
    m = minutes.toString();
    s = seconds.toString();
  }

  let time = m + ":" + s;
  return time;
}

function runCountdown() {
  fill(255, 255, 255);
  textFont("Monaco", 100);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);

  if (getTime() === "00:00") {
    text(
      "3",
      gameSize * fieldSize - (1 / 2) * fieldSize,
      fields[0].y + fieldSize * ((1 / 2) * gameSize)
    );
  } else if (getTime() === "00:01") {
    text(
      "2",
      gameSize * fieldSize - (1 / 2) * fieldSize,
      fields[0].y + fieldSize * ((1 / 2) * gameSize)
    );
  } else if (getTime() === "00:02") {
    text(
      "1",
      gameSize * fieldSize - (1 / 2) * fieldSize,
      fields[0].y + fieldSize * ((1 / 2) * gameSize)
    );
  } else if (getTime() === "00:03") {
    text(
      "START",
      gameSize * fieldSize - (1 / 2) * fieldSize,
      fields[0].y + fieldSize * ((1 / 2) * gameSize)
    );
  } else if (getTime() === "00:04") {
    countDownRunning = false;
    timerStart = new Date();
  }
}

function optionScreen() {
  fill(10, 10, 10);

  rect(0, 0, width, height);
  fill(255, 255, 255);
  textFont("Monaco", height / 15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  text("PEBBLE'S OPTIONS", width / 2, height / 8);

  textSize(30);
  text("Snake Speed", width / 2, height / 4);
  text("Field Size", width / 2, height / 2.5);

  text("Note", width / 2, height / 1.75);

  fill(180, 180, 180); // gray
  textSize(23);

  text(
    "The combination of a fast snake speed and a small field\nmight be a little hard, but feel free to try ^-^",
    width / 2,
    height / 1.75 + 50
  );
  noStroke();

  // speed buttons
  if (snakeSpeed === normal) {
    fill("#528558"); // dark green
    button(width / 2 - 200, height / 3.5, 100, 40, "Slow");
    button(width / 2 + 100, height / 3.5, 100, 40, "Fast");

    fill("#e42256"); // magenta

    button(width / 2 - 50, height / 3.5, 100, 40, "Normal");
  } else if (snakeSpeed === slow) {
    fill("#528558"); // dark green
    button(width / 2 - 50, height / 3.5, 100, 40, "Normal");
    button(width / 2 + 100, height / 3.5, 100, 40, "Fast");

    fill("#e42256"); // magenta

    button(width / 2 - 200, height / 3.5, 100, 40, "Slow");
  } else if (snakeSpeed === fast) {
    fill("#528558"); // dark green
    button(width / 2 - 200, height / 3.5, 100, 40, "Slow");
    button(width / 2 - 50, height / 3.5, 100, 40, "Normal");

    fill("#e42256"); // magenta

    button(width / 2 + 100, height / 3.5, 100, 40, "Fast");
  }

  // size buttons
  if (gameSize === medium) {
    fill("#528558"); // dark green
    button(width / 2 - 200, height / 2.25, 100, 40, "Small");
    button(width / 2 + 100, height / 2.25, 100, 40, "Big");

    fill("#e42256"); // magenta

    button(width / 2 - 50, height / 2.25, 100, 40, "Normal");
  } else if (gameSize === small) {
    fill("#528558"); // dark green
    button(width / 2 - 50, height / 2.25, 100, 40, "Normal");
    button(width / 2 + 100, height / 2.25, 100, 40, "Big");

    fill("#e42256"); // magenta

    button(width / 2 - 200, height / 2.25, 100, 40, "Small");
  } else if (gameSize === big) {
    fill("#528558"); // dark green
    button(width / 2 - 200, height / 2.25, 100, 40, "Small");
    button(width / 2 - 50, height / 2.25, 100, 40, "Normal");

    fill("#e42256"); // magenta

    button(width / 2 + 100, height / 2.25, 100, 40, "Big");
  }
  fill("#7cc986"); // bright green

  button(width / 2 - 50, height / 1.3, 100, 40, "HOME"); // home button
}

function createNewField() {
  // only happens once when game screen is started
  fields.length = 0;
  snake.length = 0;
  score = 0;
  tempDirection = right;

  let counter = 0; // for field number
  // fill fields with field objects
  for (i = 0; i < gameSize; i++) {
    for (j = 0; j < gameSize; j++) {
      if (j > 0 && j < gameSize - 1 && i > 0 && i < gameSize - 1) {
        field = {
          name: j + " / " + i,
          number: counter,
          type: empty,
          x: fieldSize * j + width / 5.5,
          y: fieldSize * i + height / 8,
        };
        fields.push(field);
        counter++;
      } else {
        field = {
          name: j + " / " + i,
          number: counter,
          type: border,
          x: fieldSize * j + width / 5.5,
          y: fieldSize * i + height / 8,
        };
        fields.push(field);
        counter++;
      }
    }
  }
  snake.push(fields[gameSize * 5 + 5]);
  snake[0].type = head; // set initial head position

  createGem();
}
createNewField(); // to- do: remove this ( only for starting with screen 3 -> not required)

function drawGameField() {
  fill(10, 10, 10);

  noStroke();
  rect(0, 0, width, height);
  fill(90, 100, 100, 110);
  rect(fields[0].x, fields[0].y, gameSize * fieldSize, gameSize * fieldSize);
  gameStats();

  for (i = 0; i < fields.length; i++) {
    if (fields[i].type === empty) {
      // draw empty fields
      fill(0, 0, 0);

      square(fields[i].x, fields[i].y, 20);
    } else if (fields[i].type === border) {
      // border fields
      fill(255, 255, 255);
      square(fields[i].x, fields[i].y, 20);
    } else if (fields[i].type === head) {
      // snake head
      fill("#7cc986"); // bright green

      square(fields[i].x, fields[i].y, 20, 5);
    } else if (fields[i].type === body) {
      // snake head
      fill("#528558"); // dark green

      square(fields[i].x, fields[i].y, 20, 5);
    } else if (fields[i].type === gem) {
      // gem
      fill("#e42256"); // magenta
      square(fields[i].x, fields[i].y, 20, 5);
    }
    // to-do: power ups, obstacles (obstacles === border?)
  }
}

function collectGem() {
  score += 1;
  createGem();
}

function moveSnake() {
  if (countDownRunning === false) {
    if (direction === right) {
      for (fieldNr = 0; fieldNr < fields.length - 1; fieldNr++) {
        if (fields[fieldNr] === snake[0]) {
          // snake[0] is the current snake head

          if (
            fields[fieldNr + 1].type !== border &&
            fields[fieldNr + 1].type !== body
          ) {
            // next field isn't a border

            if (fields[fieldNr + 1].type === gem) {
              // next field is a gem
              collectGem();
            }

            fields[fieldNr + 1].type = head; // next field becomes head
            snake.unshift(fields[fieldNr + 1]); // next field is to snake[0]

            if (score === 0) {
              fields[fieldNr].type = empty; // current head becomes empty
            } else {
              fields[fieldNr].type = body; // current field becomes body
            }
            forgetSnakeParts();
          } else if (fields[fieldNr + 1].type === border) {
            // border has been reached
            //console.log("right border reached");
            gameOver = true;
          } else if (fields[fieldNr + 1].type === body) {
            // hit snake body
            // console.log("hit snake body");
            gameOver = true;
          }
          break;
        }
      }
    } else if (direction === left) {
      for (fieldNr = 0; fieldNr < fields.length - 1; fieldNr++) {
        if (fields[fieldNr] === snake[0]) {
          // snake[0] is the current snake head

          if (
            fields[fieldNr - 1].type !== border &&
            fields[fieldNr - 1].type !== body
          ) {
            // next field isn't a border

            if (fields[fieldNr - 1].type === gem) {
              // next field is a gem
              collectGem();
            }

            fields[fieldNr - 1].type = head; // next field becomes head
            snake.unshift(fields[fieldNr - 1]); // next field to snake[0]

            if (score === 0) {
              fields[fieldNr].type = empty; // current head becomes empty
            } else {
              fields[fieldNr].type = body; // current field becomes body
            }
            forgetSnakeParts();
          } else if (fields[fieldNr - 1].type === border) {
            // border has been reached
            //console.log("left border reached");
            gameOver = true;
          } else if (fields[fieldNr - 1].type === body) {
            // hit snake body
            // console.log("hit snake body");
            gameOver = true;
          }
          break;
        }
      }
    } else if (direction === down) {
      for (fieldNr = 0; fieldNr < fields.length - 1; fieldNr++) {
        if (fields[fieldNr] === snake[0]) {
          // snake[0] is the current snake head

          if (
            fields[fieldNr + gameSize].type !== border &&
            fields[fieldNr + gameSize].type !== body
          ) {
            // next field isn't a border

            if (fields[fieldNr + gameSize].type === gem) {
              // next field is a gem
              collectGem();
            }

            fields[fieldNr + gameSize].type = head; // next field becomes head
            snake.unshift(fields[fieldNr + gameSize]); // next field to snake[0]

            if (score === 0) {
              fields[fieldNr].type = empty; // current head becomes empty
            } else {
              fields[fieldNr].type = body; // current field becomes body
            }
            forgetSnakeParts();
          } else if (fields[fieldNr + gameSize].type === border) {
            // border has been reached
            //  console.log("bottom border reached");
            gameOver = true;
          } else if (fields[fieldNr + gameSize].type === body) {
            // hit snake body
            //  console.log("hit snake body");
            gameOver = true;
          }
          break;
        }
      }
    } else if (direction === up) {
      for (fieldNr = 0; fieldNr < fields.length - 1; fieldNr++) {
        if (fields[fieldNr] === snake[0]) {
          // snake[0] is the current snake head

          if (
            fields[fieldNr - gameSize].type !== border &&
            fields[fieldNr - gameSize].type !== body
          ) {
            // next field isn't a border

            if (fields[fieldNr - gameSize].type === gem) {
              // next field is a gem
              collectGem();
            }

            fields[fieldNr - gameSize].type = head; // next field becomes head
            snake.unshift(fields[fieldNr - gameSize]); // next field to snake[0]

            if (score === 0) {
              fields[fieldNr].type = empty; // current head becomes empty
            } else {
              fields[fieldNr].type = body; // current field becomes body
            }
            // remove old snake parts from array
            forgetSnakeParts();
          } else if (fields[fieldNr - gameSize].type === border) {
            // border has been reached
            //  console.log("top border reached");
            gameOver = true;
          } else if (fields[fieldNr - gameSize].type === body) {
            // hit snake body
            // console.log("hit snake body");
            gameOver = true;
          }
          break;
        }
      }
    }
  } else {
    runCountdown();
  }
}

function forgetSnakeParts() {
  // remove older snake parts from array
  for (snakeIndex = 0; snakeIndex < snake.length; snakeIndex++) {
    if (snakeIndex > score) {
      // if index is higher than score that part of snake needs to be forgotten
      snake[snakeIndex].type = empty;
      snake.pop(snakeIndex);
    }
  }
}

function keyPressed() {
  // reference source: https://stackoverflow.com/questions/51833745/how-to-make-time-buffering-for-keypressed-function-in-p5-js
  // tempDirection stores the pressed key
  // direction itself is only changed in function draw
  // -> snake can't reverse a direction when 2 keys are pressed in rapid succession
  if (keyIsDown(39) && direction !== left) {
    tempDirection = right;
  } else if (keyIsDown(37) && direction !== right) {
    tempDirection = left;
  } else if (keyIsDown(38) && direction !== down) {
    tempDirection = up;
  } else if (keyIsDown(40) && direction !== up) {
    tempDirection = down;
  }
}

function createGem() {
  let randomNr = Math.floor(random(0, gameSize * gameSize)); // generate random gem position

  while (fields[randomNr].type !== empty) {
    randomNr = Math.floor(random(0, gameSize * gameSize));
  }
  fields[randomNr].type = "gem";
}

function gameOverScreen() {
  drawGameField();
  fill(255, 255, 255);
  textFont("Monaco", 30);
  textStyle(BOLD);
  textAlign(LEFT, BOTTOM);

  text(
    "YOU LOST!",
    gameSize * fieldSize + width / 5.5 + fieldSize + 5,
    8 * fieldSize
  );

  textSize(20);
  textStyle(NORMAL);

  if (score === 0) {
    text(
      "You couldn't find a single gem :(\n \nTry again?",
      gameSize * fieldSize + width / 5.5 + fieldSize + 5,
      13 * fieldSize
    );
  }
  if (score !== 0 && score < 10) {
    text(
      "Well done :)\n\nYou collected " + score + " gems!",
      gameSize * fieldSize + width / 5.5 + fieldSize + 5,
      13 * fieldSize
    );
  }
  if (score !== 0 && score >= 10 && score < 25) {
    text(
      "Not bad. That's quite a few!\n\nYou collected " + score + " gems!",
      gameSize * fieldSize + width / 5.5 + fieldSize + 5,
      13 * fieldSize
    );
  }
  if (score !== 0 && score >= 25) {
    text(
      "Great! This will make a cool\ndragon hoard for Pebble :D\n\nYou collected " +
        score +
        " gems!",
      gameSize * fieldSize + width / 5.5 + fieldSize + 5,
      14 * fieldSize
    );
  }

  fill("#7cc986"); // bright green

  button(
    gameSize * fieldSize + width / 5.5 + fieldSize + 5,
    15 * fieldSize,
    100,
    40,
    "RETRY"
  );
  fill("#528558"); // dark green

  button(
    gameSize * fieldSize + width / 5.5 + fieldSize + 5,
    18 * fieldSize,
    100,
    40,
    "HOME"
  );
}

function mouseClicked() {
  if (screen === 0) {
    // home
    if (
      mouseX > width / 4 &&
      mouseX < width / 5.5 + width / 4 &&
      mouseY > height / 4 &&
      mouseY < height / 15 + height / 4
    ) {
      createNewField();
      screen = 3; // game
      countDownStarted = true;
      countDownRunning = true;
      timerStart = new Date();
      //  music.play();
    } else if (
      mouseX > width / 4 &&
      mouseX < width / 5.5 + width / 4 &&
      mouseY > height / 3 &&
      mouseY < height / 15 + height / 3
    ) {
      screen = 2; // options
    } else if (
      mouseX > width / 4 &&
      mouseX < width / 5.5 + width / 4 &&
      mouseY > height / 2.4 &&
      mouseY < height / 15 + height / 2.4
    ) {
      screen = 1; // how-to
    }
  }
  if (screen === 2) {
    // speed buttons
    if (
      // slow button
      mouseX > width / 2 - 200 &&
      (mouseX > width / 2 - 200) + 100 &&
      mouseY > height / 3.5 &&
      mouseY < height / 3.5 + 40
    ) {
      snakeSpeed = slow;
    }
    if (
      // normal button
      mouseX > width / 2 - 50 &&
      mouseX < width / 2 - 50 + 100 &&
      mouseY > height / 3.5 &&
      mouseY < height / 3.5 + 40
    ) {
      snakeSpeed = normal;
    }
    if (
      // fast button
      mouseX > width / 2 + 100 &&
      mouseX < width / 2 + 100 + 100 &&
      mouseY > height / 3.5 &&
      mouseY < height / 3.5 + 40
    ) {
      snakeSpeed = fast;
    }

    // size buttons
    if (
      // small button
      mouseX > width / 2 - 200 &&
      mouseX < width / 2 - 200 + 100 &&
      mouseY > height / 2.25 &&
      mouseY < height / 2.25 + 40
    ) {
      gameSize = small;
    } else if (
      // normal button (speed)
      mouseX > width / 2 - 50 &&
      mouseX < width / 2 - 50 + 100 &&
      mouseY > height / 2.25 &&
      mouseY < height / 2.35 + 40
    ) {
      gameSize = medium;
    } else if (
      mouseX > width / 2 + 100 &&
      mouseX < width / 2 + 100 + 100 &&
      mouseY > height / 2.25 &&
      mouseY < height / 2.25 + 40
    ) {
      gameSize = big;
    }

    // home button
    if (
      mouseX > width / 2 - 50 &&
      mouseX < width / 2 - 50 + 100 &&
      mouseY > height / 1.3 &&
      mouseY < height / 1.3 + 40
    ) {
      screen = 0;
    }
  }
  if (screen === 3) {
    // game
    //   gameSize * fieldSize + (1 / 15) * width + fieldSize * 3,
    //   15 * fieldSize
    if (
      gameOver === true &&
      mouseX >= gameSize * fieldSize + width / 5.5 + fieldSize + 5 &&
      mouseX <= gameSize * fieldSize + width / 5.5 + fieldSize + 5 + 100 &&
      mouseY >= 15 * fieldSize &&
      mouseY <= 15 * fieldSize + 40
    ) {
      // RETRY
      createNewField();
      gameOver = false;
      countDownStarted = true;
      timerStart = new Date();
      countDownRunning = true;
    } else if (
      mouseX >= gameSize * fieldSize + width / 5.5 + fieldSize + 5 &&
      mouseX <= gameSize * fieldSize + width / 5.5 + fieldSize + 5 + 100 &&
      mouseY >= 18 * fieldSize &&
      mouseY <= 18 * fieldSize + 40 &&
      gameOver === true
    ) {
      // HOME
      screen = 0;
      gameOver = false;
    }
  }
}

function gameStats() {
  // to-do: snake image
  // background box
  noStroke();
  fill(255, 255, 255);
  rect(
    gameSize * fieldSize + width / 5.5,
    fields[0].y,
    fieldSize * 15,
    fieldSize * gameSize - 1
  );
  fill(0, 0, 0);
  rect(
    gameSize * fieldSize + width / 5.5 + 5,
    fields[0].y + 5,
    fieldSize * 15 - 10,
    fieldSize * gameSize - 11
  );

  // text
  if (gameOver === false) {
    push();
    if (gameSize === medium) {
      scale(0.2);

      image(pebbleImage, fields[gameSize].x * 16, fields[gameSize].y * 9);
    } else if (gameSize === small) {
      scale(0.2);

      image(pebbleImage, 3100, 850);
    } else if (gameSize === big) {
      scale(0.2);
      image(pebbleImage, 4000, 1500);
    }
    pop();
    fill(255, 255, 255);
    textFont("Monaco", 21);
    textStyle(BOLD);
    textAlign(LEFT, BOTTOM);
    text(
      "SCORE",
      gameSize * fieldSize + width / 5.5 + fieldSize,
      fields[0].y + fieldSize * 2
    );
    text(
      "TIME",
      gameSize * fieldSize + width / 5.5 + fieldSize * 7,
      fields[0].y + fieldSize * 2
    );
    if (countDownRunning === false) {
      fill("#528558"); // dark green
      // score
      text(
        score,
        gameSize * fieldSize + width / 5.5 + fieldSize,
        fields[0].y + fieldSize * 3
      );
      // timer
      text(
        getTime(),
        gameSize * fieldSize + width / 5.5 + fieldSize * 7,
        fields[0].y + fieldSize * 3
      );
    }
  }
}

function button(x, y, width, height, label) {
  if (
    mouseX > x &&
    mouseX < x + width &&
    mouseY > y &&
    mouseY < y + height &&
    mouseIsPressed === true
  ) {
    rect(x + 5, y + 5, width, height, 5);
  } else {
    push();
    fill(80, 80, 80, 200);
    rect(x + 5, y + 5, width, height, 5);
    pop();
    rect(x, y, width, height, 5);
  }

  if (
    // mouse hovering over button
    mouseX > x &&
    mouseX < x + width &&
    mouseY > y &&
    mouseY < y + height - 5
  ) {
    push();
    textSize((height * 5) / 7);

    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    if (mouseIsPressed === false) {
      text(label, x + width / 2, y + height / 2);
    } else {
      text(label, x + width / 2 + 5, y + height / 2 + 5);
    }

    pop();
  } else {
    push();
    textSize((height * 5) / 7);
    textAlign(CENTER, CENTER);
    fill(0, 0, 0);
    text(label, x + width / 2, y + height / 2);
    pop();
  }
}

function homeScreen() {
  noStroke();
  // start screen
  fill(10, 10, 10);

  rect(0, 0, width, height);

  fill(255, 255, 255);
  textFont("Monaco", height / 15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  text("PEBBLE'S ADVENTURE", width / 2, height / 8);

  // start button
  fill("#7cc986"); // bright green

  button(width / 4, height / 4, width / 5.5, height / 15, "Play");

  fill("#528558"); // dark green

  // options button
  button(width / 4, height / 2.75, width / 5.5, height / 15, "Options");
  // how-to button
  button(width / 4, height / 2.1, width / 5.5, height / 15, "How-To");

  push();
  scale(0.25);
  image(pebbleImage, width * 2, 560);
  pop();
}

function draw() {
  clear();
  fill(0, 0, 0);
  rect(0, 0, width, height);

  if (screen === 0) {
    homeScreen();
  }

  if (screen === 1) {
    // tutorial screen
  }
  if (screen === 2) {
    // options screen
    optionScreen();
  }
  if (screen === 3) {
    // game screen

    frameRate(snakeSpeed);
    direction = tempDirection; // direction set according to last pressed key
    if (gameOver === false) {
      drawGameField();
      moveSnake();

      // to-do: deco
    } else if (gameOver === true) {
      gameOverScreen();
    }

    //console.log("\nSnake Length: " + snake.length + "\nScore: " + score);
  }
}

// to do: delayed game start ( timer 3 seconds?)

// timer copy paste here
// where do I put this???????
/*timeRunning = true;
let startOfTimer = new Date();

while (timeRunning === true) { 
  let pointInTime = new Date();
  let timeElapsed = pointInTime.getTime() - startOfTimer.getTime();

  let countDown = (startDelay - timeElapsed) / 1000;

  console.log(countDown);

  if (timeElapsed > startDelay) {
    timeRunning = false;
  }
}
*/
