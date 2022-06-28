/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function shuffle(arr) {
  //Fisher-Yates - https://bost.ocks.org/mike/shuffle/
  for (let i = arr.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

class Game {
  constructor() {
    this.str = "";
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference = function () {
    let absolute_num = Math.abs(this.playersGuess - this.winningNumber);
    return absolute_num;
  };

  isLower = function () {
    if (this.playersGuess < this.winningNumber) {
      return true;
    } else {
      return false;
    }
  };

  playersGuessSubmission = function (guessNum) {
    if (typeof guessNum !== "number" || guessNum < 1 || guessNum > 100) {
      throw "That is an invalid guess.";
    } else {
      this.playersGuess = guessNum;
    }

    return this.checkGuess();
  };
}

Game.prototype.checkGuess = function () {
  if (this.playersGuess === this.winningNumber) {
    this.str = "You Win!";
  } else if (this.pastGuesses.includes(this.playersGuess)) {
    this.str = "You have already guessed that number.";
  } else {
    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length === 5) {
      this.str = "You Lose.";
    } else if (this.difference() < 10) {
      this.str = "You're burning up!";
    } else if (this.difference() < 25) {
      this.str = "You're lukewarm.";
    } else if (this.difference() < 50) {
      this.str = "You're a bit chilly.";
    } else {
      this.str = "You're ice cold!";
    }
  }

  document.querySelector(".interaction").innerHTML = this.str;

  document.querySelector(
    `.guess-list li:nth-child(${this.pastGuesses.length})`
  ).innerHTML = this.playersGuess;

  return this.str;
};

Game.prototype.provideHint = function () {
  let hintArray = [
    this.winningNumber,
    generateWinningNumber(),
    generateWinningNumber(),
  ];

  return shuffle(hintArray);
};

const newGame = () => {
  let game = new Game();
  return game;
};

const playGame = () => {
  let game = newGame();

  const button = document.querySelector(".btn");

  button.addEventListener("click", function () {
    const playerGuess = +document.querySelector("input").value;

    document.querySelector("input").value = "";

    game.playersGuessSubmission(playerGuess);
  });
};

playGame();
