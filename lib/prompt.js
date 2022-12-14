const readline = require('readline');

class Prompt {
  constructor() {
    this.rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
    });
  }
  question = (response) => {
    return new Promise((resolve, reject) => {
      this.rl.question(response, (answer) => {
	resolve(answer);
      });
    });
  };
  close = () => this.rl.close();
}

module.exports = Prompt;
