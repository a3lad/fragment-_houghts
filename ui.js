function drawStartScreen() {
  background("#ffeefc");
  textAlign(CENTER);
  textSize(32);
  text("Pixel Land Explorer", width / 2, 200);
  textSize(16);
  text("Press SPACE to Start", width / 2, 300);
}

function drawCharacterSelect() {
  background("#e6f7ff");
  textAlign(CENTER);
  text("Choose Your Character", width / 2, 100);

  text("1 - Boy", width / 2, 200);
  text("2 - Girl", width / 2, 240);
  text("3 - Unisex", width / 2, 280);
}
