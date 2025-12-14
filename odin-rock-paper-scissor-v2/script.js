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
  winner: null,
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

function buildComputerPlayGround() {
  const computerPlayGroundWrapper = createElement("div", {
    className: "computer-play-ground",
  });
  const computerScore = buildScore("computer-score", "COMPUTER");
  computerPlayGroundWrapper.append(computerScore);
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

function onHumanChoice() {
  if (gameState.state === "ended") return;

  // Simulate result (random winner)
  const humanWins = Math.random() > 0.5;

  if (humanWins) {
    gameState.humanScore += 1;
  } else {
    gameState.computerScore += 1;
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

  if (gameState.state === "idle") {
    announceBoardWrapper.append(startButton);
    return;
  }

  if (gameState.state === "playing") {
    statusText.textContent = "GAME START!";
    announceBoardWrapper.append(statusText);
    return;
  }

  if (gameState.state === "match-point") {
    statusText.textContent = "MATCH POINT!";
    announceBoardWrapper.append(statusText);
    return;
  }

  if (gameState.state === "ended") {
    statusText.textContent = `${gameState.winner} WIN!`;
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

  if (gameState.state === "idle") {
    document.getElementById("start-button").style.display = "block";
    document.getElementById("rematch-button").style.display = "none";
  } else if (gameState.state === "playing") {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("status-text").textContent = "GAME STARTED!";
    document.getElementById("rematch-button").style.display = "none";
  } else if (gameState.state === "match-point") {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("status-text").textContent = "MATCH POINT!";
    document.getElementById("rematch-button").style.display = "none";
  } else if (gameState.state === "ended") {
    document.getElementById("start-button").style.display = "none";
    document.getElementById(
      "status-text"
    ).textContent = `${gameState.winner} WIN`;
    document.getElementById("rematch-button").style.display = "block";
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
