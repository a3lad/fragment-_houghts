let words = [];
let arranged = [];
let timer;
let intrusiveSystem;

function startStoreLevel() {
  let sentence = levels[currentLevel].sentence.split(" ");
  words = shuffle([...sentence]);
  arranged = [];
  timer = levels[currentLevel].timeLimit;
  intrusiveSystem = new IntrusiveSystem(levels[currentLevel].intrusiveRate);
}

function drawStore() {
  background("#fff4dc");
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
