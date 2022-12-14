const inGreen = str => "\x1b[32m" + str + "\x1b[0m";

async function commandHandler(cmd, prompt) {
  const [op, arg] = cmd.split(" ");
  switch(op) {
  case "guess":
    console.log("TODO: make guessing game");
    console.log("User provided argument: ", arg);
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
