function drawWin() {
  background(30);

  fill(255);
  textSize(40);
  text("You made it through.", width / 2, height / 2 - 40);

  textSize(18);
  text("Notice how difficult that felt.", width / 2, height / 2 + 10);

  fill(100);
  rect(width / 2 - 120, height - 180, 240, 60, 10);

  fill(255);
  text("RESTART", width / 2, height - 150);
}

function handleWinClick() {
  if (
    mouseX > width / 2 - 120 &&
    mouseX < width / 2 + 120 &&
    mouseY > height - 180 &&
    mouseY < height - 120
  ) {
    currentScreen = "start";
  }
}
