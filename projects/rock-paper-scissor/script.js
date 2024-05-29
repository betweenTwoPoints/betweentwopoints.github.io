// Helper functions
// Return array of multiple elements by id
function getMultipleElementsById(...params) {
  const eleArray = [];
  for (const element of params) {
    eleArray.push(document.getElementById(element));
  }
  return eleArray;
}
// Adding multiple event listeners
function addMultipleEventListener(eventType, target, ...params) {
  for (const element of params) {
    element.addEventListener(eventType, target);
  }
}

// Assigning elements to constants
const [
  playerScoreEl,
  playerChoiceEl,
  computerScoreEl,
  computerChoiceEl,
  resultText,
  playerRock,
  playerPaper,
  playerScissors,
  playerLizard,
  playerSpock,
  computerRock,
  computerPaper,
  computerScissors,
  computerLizard,
  computerSpock,
] = getMultipleElementsById(
  "playerScore",
  "playerChoice",
  "computerScore",
  "computerChoice",
  "resultText",
  "playerRock",
  "playerPaper",
  "playerScissors",
  "playerLizard",
  "playerSpock",
  "computerRock",
  "computerPaper",
  "computerScissors",
  "computerLizard",
  "computerSpock"
);

const allGameIcons = document.querySelectorAll(".far");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected");
  });
}

function resetAll() {
  resetSelected();
  playerScoreEl.textContent = 0;
  playerScoreNumber = 0;
  computerScoreEl.textContent = 0;
  computerScoreNumber = 0;
  resultText.textContent = "Choose a sign!";
}

// Random computer choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = "rock";
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = "paper";
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = "scissors";
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = "lizard";
  } else {
    computerChoice = "spock";
  }
}

// Add selected styling and computer choice
function displayComputerChoice() {
  // Add 'selected' styling and computerChoice
  switch (computerChoice) {
    case "rock":
      computerRock.classList.add("selected");
      computerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      computerPaper.classList.add("selected");
      computerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      computerScissors.classList.add("selected");
      computerChoiceEl.textContent = " --- Scissors";
      break;
    case "lizard":
      computerLizard.classList.add("selected");
      computerChoiceEl.textContent = " --- Lizard";
      break;
    case "spock":
      computerSpock.classList.add("selected");
      computerChoiceEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}

// Check result, increase scores, update resultText
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.includes(computerChoice)) {
      resultText.textContent = "You won!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = "You lost.";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// Call functions to process turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// Passing player selection value and styling icons
function select(playerChoice) {
  checkResult(playerChoice);
  // Add 'selected' styling and playerChoice
  switch (playerChoice) {
    case "rock":
      playerRock.classList.add("selected");
      playerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      playerPaper.classList.add("selected");
      playerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      playerScissors.classList.add("selected");
      playerChoiceEl.textContent = " --- Scissors";
      break;
    case "lizard":
      playerLizard.classList.add("selected");
      playerChoiceEl.textContent = " --- Lizard";
      break;
    case "spock":
      playerSpock.classList.add("selected");
      playerChoiceEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}
