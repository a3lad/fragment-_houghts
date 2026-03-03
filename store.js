let words = [];
let arranged = [];
let timer;
let intrusiveSystem;

function startStoreLevel() {
  let sentence = levels[currentLevel].sentence.split(" ");

  words = shuffle([...sentence], true);
  arranged = [];

  timer = levels[currentLevel].timeLimit;

  intrusiveSystem = new IntrusiveSystem(levels[currentLevel].intrusiveRate);
}

function drawStore() {
  drawStoreBackground();
  // TIMER COUNTDOWN
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }

  if (timer <= 0) {
    gameState = "fail";
  }

  // CHECK WIN
  if (words.length === 0 && timer > 0) {
    gameState = "world";
    currentLevel++;

    if (currentLevel >= levels.length) {
      gameState = "success";
    }
  }

  drawCafeBackground();

  fill(0);
  textSize(16);
  text("Time: " + timer, 20, 20);

  for (let i = 0; i < words.length; i++) {
    fill("#d0f4ff");
    rect(50 + i * 90, 200, 80, 40, 5);
    fill(0);
    textAlign(CENTER, CENTER);
    text(words[i], 90 + i * 90, 220);
  }

  for (let i = 0; i < arranged.length; i++) {
    fill("#baffc9");
    rect(50 + i * 90, 300, 80, 40, 5);
    fill(0);
    text(arranged[i], 90 + i * 90, 320);
  }

  intrusiveSystem.update();
  intrusiveSystem.display();
}

function drawCafeBackground() {
  // Wall
  background("#ffe8d6");

  // Floor
  fill("#e0c097");
  rect(0, height - 150, width, 150);

  // Counter
  fill("#8d6e63");
  rect(0, height - 220, width, 70);

  // Menu Board
  fill("#3e2723");
  rect(width / 2 - 150, 40, 300, 120);

  fill("#ffffff");
  textAlign(CENTER);
  textSize(14);
  text("MENU", width / 2, 70);
  text("Latte", width / 2, 95);
  text("Cappuccino", width / 2, 115);
  text("Tea", width / 2, 135);

  // Coffee Cup on Counter
  drawCoffeeCup(width / 2, height - 250);

  // Ceiling Lights
  drawLights();
}

function drawCoffeeCup(x, y) {
  push();
  translate(x, y);

  // Cup body
  fill("#ffffff");
  rect(-15, -20, 30, 30, 5);

  // Handle
  noFill();
  stroke("#ffffff");
  strokeWeight(4);
  arc(18, -5, 20, 20, -PI / 2, PI / 2);

  // Coffee
  noStroke();
  fill("#6f4e37");
  rect(-12, -18, 24, 8);

  pop();
}

function drawLights() {
  for (let i = 100; i < width; i += 200) {
    fill("#fff8dc");
    ellipse(i, 20, 30, 30);

    // light glow
    fill(255, 255, 200, 100);
    ellipse(i, 20, 60, 60);
  }
}

function mousePressed() {
  if (gameState === "store") {
    for (let i = 0; i < words.length; i++) {
      if (
        mouseX > 50 + i * 90 &&
        mouseX < 130 + i * 90 &&
        mouseY > 200 &&
        mouseY < 240
      ) {
        arranged.push(words[i]);
        words.splice(i, 1);
        break;
      }
    }

    intrusiveSystem.handleClick(mouseX, mouseY);
  }
}
