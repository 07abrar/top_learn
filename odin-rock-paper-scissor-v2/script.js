const container = document.querySelector("#container");
if (!container) {
  throw new Error("#container not found");
}

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

function buildScore(label, value) {
  return createElement("div", {
    className: "score",
    text: `${label}:${value}`,
  });
}

function buildTitle() {
  const wrapper = createElement("div", { className: "web-title" });
  const title = createElement("h1", { text: "ROCK PAPER SCISSORS" });
  wrapper.appendChild(title);
  return wrapper;
}

function buildAnnounceBoard() {
  const wrapper = createElement("div", { className: "announce-board" });
  const startButton = createElement("button", {
    id: "start-button",
    text: "START",
  });
  wrapper.appendChild(startButton);
  return wrapper;
}

function buildHumanChoice() {
  const wrapper = createElement("div", { className: "human-choice" });
  const images = [
    { src: "./images/rock.png", alt: "Rock" },
    { src: "./images/paper.png", alt: "Paper" },
    { src: "./images/scissors.png", alt: "Scissors" },
  ].map((img) => createImage({ ...img, height: 100 }));
  wrapper.append(...images);
  return wrapper;
}

function buildHumanPlayGround() {
  const humanTempScore = 5;
  const humanPlayGroundWrapper = createElement("div", {
    className: "human-play-ground",
  });
  const humanScore = buildScore("YOU", String(humanTempScore));
  humanPlayGroundWrapper.append(humanScore, buildHumanChoice());
  return humanPlayGroundWrapper;
}

function buildComputerPlayGround() {
  const computerTempScore = 0;
  const computerPlayGroundWrapper = createElement("div", {
    className: "computer-play-ground",
  });
  const computerScore = buildScore("COMPUTER", String(computerTempScore));
  computerPlayGroundWrapper.append(computerScore);
  return computerPlayGroundWrapper;
}

function buildPlayGround() {
  const wrapper = createElement("div", { className: "play-ground" });
  wrapper.append(buildHumanPlayGround(), buildComputerPlayGround());
  return wrapper;
}

container.append(buildTitle(), buildAnnounceBoard(), buildPlayGround());
