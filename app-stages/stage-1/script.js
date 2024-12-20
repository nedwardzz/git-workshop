class RockPaperScissorsGame {
    constructor() {
        this.choices = ["rock", "paper", "scissors"];
        this.playerScore = 0;
        this.computerScore = 0;
        this.playerWins = 0;
        this.computerWins = 0;
        this.round = 1;
        this.totalRounds = 5;
        this.nextRoundButton = document.getElementById("next-round");
        this.playAgainButton = document.getElementById("play-again");
        this.choiceButtons = document.querySelectorAll(".choice");
        this.playerChoiceDisplay = document.getElementById("player-choice");
        this.computerChoiceDisplay = document.getElementById("computer-choice");
        this.resultDiv = document.getElementById("result");
        this.roundsRemainingDiv = document.getElementById("rounds-remaining");
        this.playerOverallWinsDiv = document.getElementById("player-overall-wins");
        this.computerOverallWinsDiv = document.getElementById("computer-overall-wins");

        this.init();
    }

    init() {
        this.addEventListeners();
    }

    addEventListeners() {
        this.choiceButtons.forEach(button => {
            button.addEventListener("click", () => {
                if (this.nextRoundButton.classList.contains("hidden")) {
                    const playerChoice = button.dataset.choice;
                    this.playRound(playerChoice);
                }
            });
        });

        this.nextRoundButton.addEventListener("click", () => {
            this.nextRoundButton.classList.add("hidden");
            this.enableChoiceButtons();
            if (this.round <= this.totalRounds) {
                this.updateRoundInfo();
            }
        });

        this.playAgainButton.addEventListener("click", () => {
            this.playAgainButton.classList.add("hidden");
            this.resetGame();
        });
    }

    playRound(playerChoice) {
        const computerChoice = this.getComputerChoice();
        const result = this.determineWinner(playerChoice, computerChoice);
        this.displayChoices(playerChoice, computerChoice);
        this.displayResult(playerChoice, computerChoice, result);
        this.updateScore(result);
        this.disableChoiceButtons();

        if (this.round < this.totalRounds) {
            this.nextRoundButton.classList.remove("hidden");
        } else {
            this.displayFinalWinner();
        }
        this.round++;
    }

    getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    }

    determineWinner(player, computer) {
        if (player === computer) return "draw";
        if (
            (player === "rock" && computer === "scissors") ||
            (player === "paper" && computer === "rock") ||
            (player === "scissors" && computer === "paper")
        ) {
            return "player";
        } else {
            return "computer";
        }
    }

    displayChoices(playerChoice, computerChoice) {
        this.updateTextElement(this.playerChoiceDisplay, `Player chose: ${playerChoice}`);
        this.updateTextElement(this.computerChoiceDisplay, `Computer chose: ${computerChoice}`);
    }

    displayResult(playerChoice, computerChoice, result) {
        if (result === "draw") {
            this.updateTextElement(this.resultDiv, `It's a draw! Both chose ${playerChoice}.`);
        } else if (result === "player") {
            this.updateTextElement(this.resultDiv, `You win! ${playerChoice} beats ${computerChoice}.`);
        } else {
            this.updateTextElement(this.resultDiv, `You lose! ${computerChoice} beats ${playerChoice}.`);
        }
    }

    updateScore(result) {
        if (result === "player") {
            this.playerScore++;
        } else if (result === "computer") {
            this.computerScore++;
        }
        this.updateTextElement(document.getElementById("player-score"), `Player Score: ${this.playerScore}`);
        this.updateTextElement(document.getElementById("computer-score"), `Computer Score: ${this.computerScore}`);
    }

    updateRoundInfo() {
        this.updateTextElement(document.getElementById("round-info"), `Round: ${this.round}`);
        if (this.totalRounds - this.round + 1 === 1) {
            this.updateTextElement(this.roundsRemainingDiv, "Last Round!", "#ff0000");
            this.roundsRemainingDiv.classList.add("last-round");
        } else {
            this.updateTextElement(this.roundsRemainingDiv, `Rounds Remaining: ${this.totalRounds - this.round + 1}`);
            this.roundsRemainingDiv.classList.remove("last-round");
        }
    }

    displayFinalWinner() {
        this.disableChoiceButtons();
        let resultMessage = "";
        let resultColor = "";

        if (this.playerScore > this.computerScore) {
            resultMessage = `Game over! You win with a score of ${this.playerScore} to ${this.computerScore}.`;
            this.playerWins++;

            // Uncomment the 2 lines below for Feature 1
            //document.body.classList.add("win-background");
            //resultColor = "#155724";
        } else if (this.computerScore > this.playerScore) {
            resultMessage = `Game over! The computer wins with a score of ${this.computerScore} to ${this.playerScore}.`;
            this.computerWins++;

            // Uncomment the 2 lines below for Feature 1
            //document.body.classList.add("loss-background");
            //resultColor = "#721c24";
        } else {
            resultMessage = `Game over! It's a tie with a score of ${this.playerScore} to ${this.computerScore}.`;

            // Uncomment the 2 lines below for Feature 1
            //document.body.classList.add("draw-background");
            //resultColor = "#856404";
        }
        this.updateTextElement(this.resultDiv, resultMessage);
        this.updateTextElement(this.roundsRemainingDiv, "Game Over!", resultColor);
        this.updateOverallWins();
        this.playAgainButton.classList.remove("hidden");
    }

    updateOverallWins() {
        this.updateTextElement(this.playerOverallWinsDiv, `Player Wins: ${this.playerWins}`);
        this.updateTextElement(this.computerOverallWinsDiv, `Computer Wins: ${this.computerWins}`);
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 1;
        this.updateRoundInfo();
        this.updateTextElement(document.getElementById("player-score"), `Player Score: ${this.playerScore}`);
        this.updateTextElement(document.getElementById("computer-score"), `Computer Score: ${this.computerScore}`);
        this.updateTextElement(this.resultDiv, `New game! First to ${this.totalRounds} rounds wins.`);
        this.enableChoiceButtons();
        document.body.classList.remove("win-background", "loss-background", "draw-background");
        this.roundsRemainingDiv.style.color = "";
        this.nextRoundButton.classList.add("hidden");
        this.playAgainButton.classList.add("hidden");
    }

    updateTextElement(element, text, color = "") {
        element.textContent = text;
        if (color) {
            element.style.color = color;
        } else {
            element.style.color = "";
        }
    }

    disableChoiceButtons() {
        this.choiceButtons.forEach(button => button.disabled = true);
    }

    enableChoiceButtons() {
        this.choiceButtons.forEach(button => button.disabled = false);
    }
}

// Initialize the game
document.addEventListener("DOMContentLoaded", () => {
    new RockPaperScissorsGame();
});