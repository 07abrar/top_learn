function alertComputerWin(computerChoice, humanChoice) {
  alert(`Computer ${computerChoice}\nYou ${humanChoice}\nComputer beat you!`);
}

function alertHumanWin(computerChoice, humanChoice) {
  alert(`Computer ${computerChoice}\nYou ${humanChoice}\nYou beat computer!`);
}

function randomChoice() {
  const randomNumber = Math.random();
  let randomChoice = "";
  if (randomNumber >= 0 && randomNumber < 0.33) {
    randomChoice = "ROCK";
  } else if (randomNumber >= 0.33 && randomNumber < 0.66) {
    randomChoice = "PAPER";
  } else {
    randomChoice = "SCISSOR";
  }
  return randomChoice;
}

function getComputerChoice() {
  return randomChoice();
}

function getHumanChoice() {
  const valid = ["ROCK", "PAPER", "SCISSOR"];
  let humanChoice = prompt("Choose between Rock, Paper, Scissor").toUpperCase();
  if (humanChoice === null || humanChoice === "") {
    humanChoice = randomChoice();
    alert(`You randomly choose ${humanChoice}`);
    return humanChoice;
  } else if (!valid.includes(humanChoice)) {
    alert("Your choice is invalid!\nTry again");
    getHumanChoice();
  } else {
    alert(`You choose ${humanChoice}`);
    return humanChoice;
  }
}

function playGame() {
  let computerScore = 0;
  let humanScore = 0;

  function playRound(computerChoice, humanChoice) {
    if (computerChoice === humanChoice) {
      alert(`Computer ${computerChoice}\nYou ${humanChoice}\nTIE!`);
    } else {
      if (computerChoice === "ROCK") {
        if (humanChoice === "PAPER") {
          humanScore += 1;
          alertHumanWin(computerChoice, humanChoice);
        } else {
          computerScore += 1;
          alertComputerWin(computerChoice, humanChoice);
        }
      } else if (computerChoice === "PAPER") {
        if (humanChoice === "SCISSOR") {
          humanScore += 1;
          alertHumanWin(computerChoice, humanChoice);
        } else {
          computerScore += 1;
          alertComputerWin(computerChoice, humanChoice);
        }
      } else {
        // if computer choose scissor
        if (humanChoice === "ROCK") {
          humanScore += 1;
          alertHumanWin(computerChoice, humanChoice);
        } else {
          computerScore += 1;
          alertComputerWin(computerChoice, humanChoice);
        }
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(computerSelection, humanSelection);
    alert(`Computer score ${computerScore}\nHuman score ${humanScore}`);
    if (computerScore === 3) {
      break;
    } else if (humanScore === 3) {
      break;
    }
  }
  alert(
    `Final score\nComputer score : ${computerScore}\nHuman score : ${humanScore}`
  );
  if (computerScore > humanScore) {
    alert("Computer win");
  } else if (humanScore > computerScore) {
    alert("Human win");
  } else {
    alert("You tie!");
  }
}

playGame();
