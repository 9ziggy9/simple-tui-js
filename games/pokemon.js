const {pokePrint} = require("../lib/pokeart.js");

const inGreen = str => "\x1b[32m" + str + "\x1b[0m";

class Pokemon {
  constructor(name) {
    this.name = name;
    this.lvl = 1;
    this.hunger = 0;
    this.hp = 100;
    this.isAlive = true;
    this.evolutionStage = 0;
    this.lifeline = setInterval(() => {
      this.hunger += this.hunger === 100 ? 0 : 10;
      if (this.hunger === 100) this.hp -= this.hp === 0 ? 0 : 10;
      if (this.hp === 0) {
	this.die();
	clearInterval(this.lifeline);
      }
    }, 5000);
  }
  static feed = (pokemon) => pokemon.hunger -= pokemon.hunger === 0 ? 0 : 10;
  die = () => this.isAlive = false;
  info = () => {
    if (this.isAlive) {
      pokePrint(this.name);
    } else {
      pokePrint("dead");
    }
    console.table({
      name: this.name,
      lvl: this.lvl,
      hunger: this.hunger,
      hp: this.hp,
    });
  };
}

class PokeGame {
  constructor() {
    this.pokeList = [];
  }
  greet = () => {
    console.log("Hello!");
    console.log("Welcome to the Pokemon game");
  };
  catch = (pokemon) => {
    console.log(`\nYou got a wild ${pokemon}\n`);
    this.pokeList.push(new Pokemon(pokemon));
  };
  list = () => this.pokeList.forEach(pokemon => pokemon.info());
  subCommand = (cmd) => {
    const [op, arg] = cmd.split(" ");
    switch(op) {
    case "feed":
      let selectedPokemon = this.pokeList.find((pokemon) => pokemon.name === arg);
      Pokemon.feed(selectedPokemon);
      return true;
    case "help":
      console.log("\n");
      console.log(`${inGreen("list")}: list caught pokemon`);
      console.log(`${inGreen("catch <pokemon_name>")}: catch particular pokemon`);
      console.log(`${inGreen("quit")}: exit pokemon game`);
      console.log("\n");
      return true;
    case "list":
      this.list();
      return true;
    case "catch":
      this.catch(arg);
      return true;
    case "quit":
      console.log("\n");
      console.log("Leaving Pokemon game.");
      console.log("\n");
      this.pokeList.forEach(pokemon => clearInterval(pokemon.lifeline));
      return false;
    default:
      console.log("\n");
      console.log(`Unrecognized command: ${cmd}`);
      console.log("\n");
      return true;
    }
  };
}

module.exports = PokeGame;
