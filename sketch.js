let player;

function setup() {
  createCanvas(800, 600);
  player = new Player();
  textFont("Patrick Hand"); // 👈 ADD THIS
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "characterSelect") {
    drawCharacterSelect();
  } else if (gameState === "world") {
    drawWorld();
    player.move();
    player.display();
    checkBuildingEntry(player);
  } else if (gameState === "store") {
    drawStore();
  } else if (gameState === "fail") {
    drawFailScreen();
  } else if (gameState === "success") {
    drawSuccessScreen();
  }
}

function keyPressed() {
  if (gameState === "start" && key === " ") {
    gameState = "characterSelect";
  } else if (gameState === "characterSelect") {
    if (key === "1") {
      selectedCharacter = "boy";
      player.setCharacter("boy");
      gameState = "world";
    }
    if (key === "2") {
      selectedCharacter = "girl";
      player.setCharacter("girl");
      gameState = "world";
    }
    if (key === "3") {
      selectedCharacter = "unisex";
      player.setCharacter("unisex");
      gameState = "world";

      if (gameState === "fail" && key === " ") {
        gameState = "characterSelect";
        currentLevel = 0;
      }

      if (gameState === "success" && key === " ") {
        gameState = "start";
        currentLevel = 0;
      }
    }
  }
}
