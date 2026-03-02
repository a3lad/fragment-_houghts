function drawStart() {
  background(40);

  fill(255);
  textSize(42);
  text("FRAGMENTED THOUGHTS", width / 2, height / 3);

  textSize(18);
  text(
    "Assemble the correct sentence.\nSwipe away intrusive thoughts.",
    width / 2,
    height / 2,
  );

  fill(100);
  rect(width / 2 - 120, height - 180, 240, 60, 10);

  fill(255);
  textSize(22);
  text("START", width / 2, height - 150);
}

function handleStartClick() {
  if (
    mouseX > width / 2 - 120 &&
    mouseX < width / 2 + 120 &&
    mouseY > height - 180 &&
    mouseY < height - 120
  ) {
    currentLevel = 0;
    currentScreen = "game";
    startLevel();
  }
}
