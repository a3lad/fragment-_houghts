let selectedWords = [];
let timeLeft = 20;

let intrusiveThoughts = [];
let thoughtTimer = 0;

// Swipe variables
let swipeStartX = 0;
let swipeStartY = 0;

function drawGame() {
  // Scene switch
  if (levels[currentLevel].scene === "coffee") {
    drawCoffeeShopBackground();
  } else {
    drawGroceryStoreBackground();
  }

  fill(0);
  textSize(20);
  text("Level " + (currentLevel + 1), width / 2, 40);
  text("Time: " + floor(timeLeft), width - 100, 40);

  timeLeft -= deltaTime / 1000;

  if (timeLeft <= 0) {
    currentScreen = "start";
    currentLevel = 0;
  }

  drawFragments();
  drawSelectedSentence();

  generateIntrusiveThoughts();
  updateIntrusiveThoughts();
  drawIntrusiveThoughts();
}

//////////////////////////////////////////////////
// SWIPE LOGIC
//////////////////////////////////////////////////

function startSwipe(x, y) {
  swipeStartX = x;
  swipeStartY = y;
}

function endSwipe(x, y) {
  let swipeDist = dist(swipeStartX, swipeStartY, x, y);

  if (swipeDist > 40) {
    for (let i = intrusiveThoughts.length - 1; i >= 0; i--) {
      let t = intrusiveThoughts[i];

      let d = distToSegment(t.x, t.y, swipeStartX, swipeStartY, x, y);

      if (d < t.size / 2) {
        intrusiveThoughts.splice(i, 1);
      }
    }
  }
}

function distToSegment(px, py, x1, y1, x2, y2) {
  let A = px - x1;
  let B = py - y1;
  let C = x2 - x1;
  let D = y2 - y1;

  let dot = A * C + B * D;
  let lenSq = C * C + D * D;
  let param = dot / lenSq;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  return dist(px, py, xx, yy);
}

//////////////////////////////////////////////////
// INTRUSIVE THOUGHTS
//////////////////////////////////////////////////

function generateIntrusiveThoughts() {
  thoughtTimer += deltaTime;

  let spawnSpeed = levels[currentLevel].scene === "grocery" ? 1200 : 2000;

  if (thoughtTimer > spawnSpeed) {
    intrusiveThoughts.push({
      x: random(100, width - 100),
      y: random(100, height * 0.45),
      text: random([
        "They’re watching you",
        "You sound weird",
        "Hurry up",
        "You messed up",
        "Everyone noticed",
      ]),
      size: random(90, 130),
      dx: random(-0.5, 0.5),
      dy: random(-0.5, 0.5),
    });

    thoughtTimer = 0;
  }
}

function updateIntrusiveThoughts() {
  for (let t of intrusiveThoughts) {
    t.x += t.dx;
    t.y += t.dy;
  }
}

function drawIntrusiveThoughts() {
  for (let t of intrusiveThoughts) {
    fill(200, 0, 0, 180);
    ellipse(t.x, t.y, t.size);

    fill(255);
    textSize(14);
    text(t.text, t.x, t.y);
  }

  if (intrusiveThoughts.length > 6) {
    fill(255, 0, 0, 60);
    rect(0, 0, width, height);
  }
}

//////////////////////////////////////////////////
// FRAGMENTS
//////////////////////////////////////////////////

function drawFragments() {
  let fragments = levels[currentLevel].fragments;

  for (let i = 0; i < fragments.length; i++) {
    let x = 80 + i * 110;
    let y = 520;

    fill(240);
    rect(x, y, 100, 40, 10);

    fill(0);
    text(fragments[i], x + 50, y + 20);
  }
}

function handleGameClick() {
  let fragments = levels[currentLevel].fragments;

  for (let i = 0; i < fragments.length; i++) {
    let x = 80 + i * 110;
    let y = 520;

    if (mouseX > x && mouseX < x + 100 && mouseY > y && mouseY < y + 40) {
      selectedWords.push(fragments[i]);
    }
  }
}

function drawSelectedSentence() {
  fill(0);
  textSize(24);
  text(selectedWords.join(" "), width / 2, 350);

  if (selectedWords.join(" ") === levels[currentLevel].correctSentence) {
    currentLevel++;

    if (currentLevel >= levels.length) {
      currentScreen = "win";
    } else {
      startLevel();
    }
  }
}

//////////////////////////////////////////////////
// BACKGROUNDS
//////////////////////////////////////////////////

function drawCoffeeShopBackground() {
  background(201, 169, 120);
  fill(120, 80, 50);
  rect(0, height * 0.65, width, height * 0.35);
  fill(100, 60, 30);
  rect(0, height * 0.5, width, 120);
}

function drawGroceryStoreBackground() {
  background(220);
  fill(180);
  rect(0, height * 0.65, width, height * 0.35);
  fill(60);
  rect(0, height * 0.5, width, 80);
  fill(100);
  rect(width - 250, height * 0.45, 250, 150);
}
