const container = document.querySelector("#container");

const webTitleDiv = document.createElement("div");
webTitleDiv.className = "web-title";

const webTitle = document.createElement("h1");
webTitle.textContent = "ROCK PAPER SCISSORS";

webTitleDiv.appendChild(webTitle);
container.appendChild(webTitleDiv);

const announceBoardDiv = document.createElement("div");
announceBoardDiv.className = "announce-board";

const startButton = document.createElement("button");
startButton.textContent = "START";
startButton.id = "start-button";

announceBoardDiv.appendChild(startButton);
container.appendChild(announceBoardDiv);

const playGroundDiv = document.createElement("div");
playGroundDiv.className = "play-ground";

// Human play ground
const humanPlayGround = document.createElement("div");
humanPlayGround.className = "human-play-ground";

const humanTempScore = String(5);
const humanScore = document.createElement("div");
humanScore.textContent = "YOU :" + humanTempScore;
humanPlayGround.appendChild(humanScore);

const humanChoice = document.createElement("div");
humanChoice.className = "human-choice";
humanPlayGround.append(humanChoice);

// Computer play ground
const computerPlayGround = document.createElement("div");
computerPlayGround.className = "computer-play-ground";

const computerTempScore = String(0);
const computerScore = document.createElement("div");
computerScore.textContent = "COMPUTER :" + computerTempScore;
computerPlayGround.appendChild(computerScore);

const computerChoice = document.createElement("div");
computerChoice.className = "human-choice";
computerPlayGround.append(computerChoice);

playGroundDiv.append(humanPlayGround, computerPlayGround);
container.appendChild(playGroundDiv);

// TODO : add images for rock paper scissor under playground
