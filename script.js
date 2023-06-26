"use strict";

const sliderDiv = document.querySelector(".sliderDiv");
const slider = document.getElementById("slider");

const enterRounds = document.getElementById("enter-rounds");
const play = document.getElementById("play");
const card = document.getElementById("card");

const roundTag = document.getElementById("round");
const currentRound = document.querySelector(".current-round");
const totalRounds = document.querySelector(".total-rounds");
const roundResult = document.querySelector("#round-result");
const yourScoreMaintain = document.querySelector(".your-score");
const oppScoreMaintain = document.querySelector(".opp-score");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissor = document.getElementById("scissor");

const nextRound = document.querySelector(".next-round");

const resultDiv = document.getElementById("result-section");
const finalResult = document.getElementById("final-result");
const resultDesc = document.querySelector(".result-description");
const resultButton = document.querySelector(".result-button");
const fontAwesome = document.querySelector(".hideMe");
const resultDetails = document.querySelector(".result-details");

let valueSlider = 1;
let value = 0;
let randomNumber = 0;
let roundsPlayed = 0;
let no_of_rounds = 1;
let yourChoice = "";
let compChoice = "";
let compScore = 0;
let playerScore = 0;
let resultButtonClicked = false;

slider.addEventListener("input", handleSliderInput);
function handleSliderInput() {
	valueSlider = parseInt(slider.value);
	if (valueSlider % 2 === 0) {
		valueSlider = valueSlider + 1; // Increment value to the next odd number
		slider.value = valueSlider;
	}
	sliderDiv.innerHTML = `No. of rounds: ${valueSlider}`;
}

play.addEventListener("click", () => {
	card.style.display = "flex";
	enterRounds.style.display = "none";
	no_of_rounds = valueSlider;
	totalRounds.innerHTML = `${no_of_rounds}`;
	if (roundsPlayed + 1 === no_of_rounds) {
		nextRound.innerHTML = "Result";
	}
});

currentRound.innerHTML = `${roundsPlayed + 1}`;
totalRounds.innerHTML = `${no_of_rounds}`;
nextRound.addEventListener("click", nextRoundFn);

resultButton.addEventListener("click", resultDetailsFn);

function nextRoundFn() {
	noNextRound: if (value === 0) {
		break noNextRound;
	} else if (roundsPlayed < no_of_rounds) {
		roundResult.innerHTML = "";
		roundsPlayed++;

		currentRound.innerHTML = `${roundsPlayed + 1}`;
		value = 0;

		if (roundsPlayed >= no_of_rounds) {
			rock.disabled = true;
			paper.disabled = true;
			scissor.disabled = true;
		}

		// Remove the event listener for nextRound button after all rounds are played
		if (roundsPlayed === no_of_rounds) {
			nextRound.removeEventListener("click", nextRoundFn);
		}

		if (roundsPlayed + 1 === no_of_rounds) {
			nextRound.innerHTML = "Result";
		}
	}

	// Check if all rounds have been played
	if (roundsPlayed === no_of_rounds) {
		card.style.display = "none";

		resultDiv.style.display = "flex";
		if (compScore < playerScore) {
			finalResult.innerHTML = "YOU WON";
			resultDesc.innerHTML = "Well Done!";
		} else if (compScore > playerScore) {
			finalResult.innerHTML = "YOU LOST";
			resultDesc.innerHTML = "Better luck next time!";
		} else if (compScore === playerScore) {
			finalResult.innerHTML = "IT'S A DRAW";
			resultDesc.innerHTML = "Good Effort!";
		}
	}

	yourScoreMaintain.innerHTML = `You: ${playerScore}`;
	oppScoreMaintain.innerHTML = `Computer: ${compScore}`;

}

rock.addEventListener("click", rockChoice);
paper.addEventListener("click", paperChoice);
scissor.addEventListener("click", scissorChoice);

function rockChoice() {
	if (value === 0) {
		value = 1;
		playRound();
	}
}

function paperChoice() {
	if (value === 0) {
		value = 2;
		playRound();
	}
}

function scissorChoice() {
	if (value === 0) {
		value = 3;
		playRound();
	}
}

function playRound() {
	if (value !== 0) {
		randomNumber = Math.floor(Math.random() * 3) + 1;
		validate();
		choiceDisplay();

		yourScoreMaintain.innerHTML = `You: ${playerScore} (${yourChoice})`;
		oppScoreMaintain.innerHTML = `Computer: ${compScore} (${compChoice})`;
	}
}

function validate() {
	if (value === randomNumber) {
		roundResult.innerHTML = "Tie!";
	} else if (
		(value === 1 && randomNumber === 2) ||
		(value === 2 && randomNumber === 3) ||
		(value === 3 && randomNumber === 1)
	) {
		roundResult.innerText = "You Lose!";
		compScore++;
	} else if (
		(value === 1 && randomNumber === 3) ||
		(value === 2 && randomNumber === 1) ||
		(value === 3 && randomNumber === 2)
	) {
		roundResult.innerText = "You Win!";
		playerScore++;
	}
}

function choiceDisplay() {
	if (value === 1) {
		yourChoice = "Rock";
	} else if (value === 2) {
		yourChoice = "Paper";
	} else if (value === 3) {
		yourChoice = "Scissor";
	}

	if (randomNumber === 1) {
		compChoice = "Rock";
	} else if (randomNumber === 2) {
		compChoice = "Paper";
	} else if (randomNumber === 3) {
		compChoice = "Scissor";
	}
}

function resultDetailsFn() {
	if (!resultButtonClicked) {
		resultButtonClicked = true;
		fontAwesome.classList.remove("fa-angle-down");
		fontAwesome.classList.add("fa-angle-up");
		resultDetails.style.display = "flex";
		resultDetails.innerHTML = `<div>Rounds Won: ${playerScore}</div>
		<div>Rounds Lost: ${compScore}</div>
		<div>Rounds Tied: ${no_of_rounds - playerScore - compScore}</div><br>
		<div>Rounds Played: ${no_of_rounds}</div>`;
	} else {
		resultButtonClicked = false;
		fontAwesome.classList.remove("fa-angle-up");
		fontAwesome.classList.add("fa-angle-down");
		resultDetails.style.display = "none";
	}
}
