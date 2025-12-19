// ROOT CONTAINER
const container = document.querySelector("#container");
if (!container) {
  throw new Error("#container not found");
}

// GAME STATES
const gameState = {
  state: "idle", // "idle"|"playing"|"match-point"|"ended"
  humanScore: 0,
  computerScore: 0,
  currentComputerChoice: null,
  winner: null,
};

// COMPUTER`S CHOICE IMAGE DIRECTORY
const computerChoice = {
  Rock: { src: "./images/rock_retro.png", alt: "Rock" },
  Paper: { src: "./images/paper_retro.png", alt: "Paper" },
  Scissors: { src: "./images/scissors_retro.png", alt: "Scissors" },
};

// DOM HELPERS
function createElement(tag, { className, text, id, attrs } = {}) {
  const el = document.createElement(tag);

  if (className) el.className = className;
  if (text) el.textContent = text;
  if (id) el.id = id;
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }

  return el;
}

function createImage({ src, alt, height }) {
  return createElement("img", {
    attrs: { src, alt, height },
  });
}

function buildScore(id, label) {
  return createElement("div", {
    id: id,
    className: "score",
    text: `${label}:0`,
  });
}

// UI BUILDERS
function buildTitle() {
  const wrapper = createElement("div", { className: "web-title" });
  const title = createElement("h1", { text: "ROCK PAPER SCISSORS" });
  wrapper.appendChild(title);
  return wrapper;
}

function buildStartButton() {
  return createElement("button", {
    id: "start-button",
    text: "START",
  });
}

function buildStatusText() {
  return createElement("p", {
    id: "status-text",
    text: "",
  });
}

function buildRematchButton() {
  return createElement("button", {
    id: "rematch-button",
    text: "REMATCH",
  });
}

function buildHumanChoice() {
  const wrapper = createElement("div", { className: "human-choice" });
  const images = [
    { src: "./images/rock.png", alt: "Rock" },
    { src: "./images/paper.png", alt: "Paper" },
    { src: "./images/scissors.png", alt: "Scissors" },
  ].map((img) => createImage({ ...img, height: 100 }));

  images.forEach((image) => image.addEventListener("click", onHumanChoice));
  wrapper.append(...images);
  return wrapper;
}

function buildHumanPlayGround() {
  const humanPlayGroundWrapper = createElement("div", {
    className: "human-play-ground",
  });
  const humanScore = buildScore("human-score", "YOU");
  humanPlayGroundWrapper.append(humanScore, buildHumanChoice());
  return humanPlayGroundWrapper;
}

function buildComputerChoice() {
  const wrapper = createElement("div", { className: "computer-choice" });
  const computerChoiceImage = createElement("img", {
    id: "computer-choice-image",
  });
  wrapper.appendChild(computerChoiceImage);
  return wrapper;
}

function buildComputerPlayGround() {
  const computerPlayGroundWrapper = createElement("div", {
    className: "computer-play-ground",
  });
  const computerScore = buildScore("computer-score", "COMPUTER");
  computerPlayGroundWrapper.append(computerScore, buildComputerChoice());
  return computerPlayGroundWrapper;
}

function buildPlayGround() {
  const wrapper = createElement("div", { className: "play-ground" });
  wrapper.append(buildHumanPlayGround(), buildComputerPlayGround());
  return wrapper;
}

// GAME LOGIC
function startGame() {
  gameState.state = "playing";
  gameState.humanScore = 0;
  gameState.computerScore = 0;
  gameState.winner = null;
  render();
}

function getComputerChoice() {
  const randomNumber = Math.random();
  let randomChoice = "";
  if (randomNumber >= 0 && randomNumber < 0.33) {
    randomChoice = "Rock";
  } else if (randomNumber >= 0.33 && randomNumber < 0.66) {
    randomChoice = "Paper";
  } else {
    randomChoice = "Scissors";
  }
  return randomChoice;
}

function getWinner(humanChoice, computerChoice) {
  gameState.currentComputerChoice = computerChoice;

  if (computerChoice === humanChoice) {
    return "Draw";
  } else {
    if (humanChoice === "Rock") {
      if (computerChoice === "Paper") {
        return "Computer";
      } else {
        return "Human";
      }
    } else if (humanChoice === "Paper") {
      if (computerChoice === "Scissors") {
        return "Computer";
      } else {
        return "Human";
      }
    } else {
      // if human choose scissors
      if (computerChoice === "Rock") {
        return "Computer";
      } else {
        return "Human";
      }
    }
  }
}

function onHumanChoice(event) {
  if (gameState.state === "ended") return;

  const humanChoice = event.currentTarget.attributes.alt.value;
  const computerChoice = getComputerChoice();
  const winner = getWinner(humanChoice, computerChoice);

  if (winner === "Human") {
    gameState.humanScore += 1;
  } else if (winner === "Computer") {
    gameState.computerScore += 1;
  } else {
    // TODO: Add something here
  }

  // Determine state transitions
  if (gameState.humanScore === 5) {
    gameState.state = "ended";
    gameState.winner = "HUMAN";
  } else if (gameState.computerScore === 5) {
    gameState.state = "ended";
    gameState.winner = "COMPUTER";
  } else if (gameState.humanScore === 4 || gameState.computerScore === 4) {
    gameState.state = "match-point";
  } else {
    gameState.state = "playing";
  }

  render();
}

// RENDER
function renderAnnounceBoard() {
  announceBoardWrapper.innerHTML = "";
  statusText.classList.remove(
    "status-playing",
    "status-match-point",
    "status-win",
    "status-lose"
  );

  if (gameState.state === "idle") {
    announceBoardWrapper.append(startButton);
    return;
  }

  if (gameState.state === "playing") {
    statusText.textContent = "GAME START!";
    statusText.classList.add("status-playing");
    announceBoardWrapper.append(statusText);
    return;
  }

  if (gameState.state === "match-point") {
    statusText.textContent = "MATCH POINT!";
    statusText.classList.add("status-match-point");
    announceBoardWrapper.append(statusText);
    return;
  }

  if (gameState.state === "ended") {
    statusText.textContent = `${gameState.winner} WIN!`;
    const statusClass =
      gameState.winner === "HUMAN" ? "status-win" : "status-lose";
    statusText.classList.add(statusClass);
    announceBoardWrapper.append(statusText, rematchButton);
    return;
  }
}

function render() {
  document.getElementById(
    "human-score"
  ).textContent = `YOU:${gameState.humanScore}`;
  document.getElementById(
    "computer-score"
  ).textContent = `COMPUTER:${gameState.computerScore}`;

  renderAnnounceBoard();

  const currentComputerChoice = gameState.currentComputerChoice;
  const imageData = computerChoice[currentComputerChoice];
  const imageEl = document.getElementById("computer-choice-image");
  if (imageData) {
    imageEl.src = imageData.src;
    imageEl.alt = imageData.alt;
    imageEl.height = "100";
  }
}

// INITIAL BOOTSTRAP
const startButton = buildStartButton();
const statusText = buildStatusText();
const rematchButton = buildRematchButton();
const announceBoardWrapper = createElement("div", {
  className: "announce-board",
});

startButton.addEventListener("click", startGame);
rematchButton.addEventListener("click", startGame);

container.append(buildTitle(), announceBoardWrapper, buildPlayGround());

render();
