let currentScreen = "start";

function setup() {
  createCanvas(900, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(30);

  if (currentScreen === "start") {
    drawStart();
  } else if (currentScreen === "game") {
    drawGame();
  } else if (currentScreen === "win") {
    drawWin();
  }
}

function mousePressed() {
  if (currentScreen === "start") {
    handleStartClick();
  } else if (currentScreen === "game") {
    handleGameClick(); // ← clicking fragments
    startSwipe(mouseX, mouseY); // ← begin swipe
  } else if (currentScreen === "win") {
    handleWinClick();
  }
}

function mouseReleased() {
  if (currentScreen === "game") {
    endSwipe(mouseX, mouseY);
  }
}
