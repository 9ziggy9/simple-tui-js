const Prompt = require('./lib/prompt.js');
const { commandHandler } = require('./runtime.js');

const prompt = new Prompt();

async function run() {
  let running = true;
  while (running) {
    const command = await prompt.question(">>> ");
    running = await commandHandler(command, prompt);
  }
  console.log("Good bye!");
  prompt.close();
}

run();
