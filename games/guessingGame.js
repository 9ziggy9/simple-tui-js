class GuessingGame {
  constructor(max) {
    this.answer = Math.ceil(max * Math.random());
    this.range = max;
    this.lastGuess = null;
  }
  checkAnswer = (guess) => {
    if (guess === this.answer) {
      console.log("\n");
      console.log("You win!");
      console.log(`You correctly guessed the answer of ${guess}`);
      console.log("\n");
      return false;
    }
    if (Math.abs(this.lastGuess - this.answer) > Math.abs(guess - this.answer)) {
      console.log("Getting warmer... ");
    }
    if (Math.abs(this.lastGuess - this.answer) < Math.abs(guess - this.answer)) {
      console.log("Getting colder... ");
    }
    this.lastGuess = guess;
    return true;
  };
  greet = () => {
    console.log(this.answer);
    console.log("\n");
    console.log("Welcome to the Guessing Game.");
    console.log(`Guess a number between 1 and ${this.range}`);
    console.log("\n");
  };
  quit = () => {
    console.log("\n");
    console.log("Thanks for playing Guessing Game!");
    console.log("The answer was", this.answer);
    console.log("Goodbye");
    console.log("\n");
    return false;
  }
}

module.exports = GuessingGame;
