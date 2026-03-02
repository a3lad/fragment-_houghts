let levels = [
  {
    scene: "coffee",
    correctSentence: "I would like a coffee please",
    fragments: ["coffee", "please", "would", "I", "like", "a"],
  },
  {
    scene: "grocery",
    correctSentence: "I will pay with card",
    fragments: ["card", "with", "I", "will", "pay"],
  },
];

let currentLevel = 0;

function startLevel() {
  selectedWords = [];
  timeLeft = 20;
  intrusiveThoughts = [];
  thoughtTimer = 0;

  shuffle(levels[currentLevel].fragments, true);
}
