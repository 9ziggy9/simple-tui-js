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

const inGreen = str => "\x1b[32m" + str + "\x1b[0m";

async function commandHandler(cmd, prompt) {
  const [op, arg] = cmd.split(" ");
  switch(op) {
  case "guess":
    let game = new GuessingGame(arg ? Number(arg) : 10);
    game.greet();
    let subRunning = true;
    while (subRunning) {
      const guess = await prompt.question("--> ");
      if (guess === "quit") subRunning = game.quit();
      else subRunning = game.checkAnswer(Number(guess));
    }
    return true;
  case "help":
    console.log("\n");
    console.log("AVAILABLE COMMANDS:");
    console.log(`${inGreen("quit")}: exit the game`);
    console.log(`${inGreen("guess <max num>")}: play Nth guessing game`);
    console.log("\n");
    return true;
  case "quit": return false;
  default:
    console.log(cmd);
    return cmd;
}
}

module.exports = {
  commandHandler
};
