const GuessingGame = require("./games/guessingGame.js");
const PokeGame = require("./games/pokemon.js");

const inGreen = str => "\x1b[32m" + str + "\x1b[0m";

async function commandHandler(cmd, prompt) {
  const [op, arg] = cmd.split(" ");
  switch(op) {
  case "pokemon":
    let pokeGame = new PokeGame();
    pokeGame.greet();
    let pokeSub = true;
    while (pokeSub) {
      const cmd = await prompt.question("--> ");
      pokeSub = pokeGame.subCommand(cmd);
    }
    return true;
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
    console.log(`${inGreen("pokemon")}: play Pokemon tamagachi clone`);
    console.log("\n");
    return true;
  case "quit": return false;
  default:
    console.log(`Unrecognized command: ${cmd}`);
    return true;
}
}

module.exports = {
  commandHandler
};
