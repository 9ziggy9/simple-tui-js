const {pokePrint} = require("../lib/pokeart.js");

const inGreen = str => "\x1b[32m" + str + "\x1b[0m";

class Pokemon {
  constructor(name) {
    this.name = name;
    this.lvl = 1;
    this.hunger = 0;
    this.hp = 100;
    this.isAlive = true;
    this.stage = -1;
    this.lifeline = setInterval(() => {
      this.hunger += this.hunger === 100 ? 0 : 10;
      if (this.hunger === 100) this.hp -= this.hp === 0 ? 0 : 10;
      if (this.hp === 0) {
	this.die();
      }
    }, 5000);
  }

  static pokeInfo = {
    "pikachu": ["raichu"],
    "squirtle": ["blastoise"],
    "charmander": ["charmeleon", "charizard"],
    "bulbasaur": [],
  };

  eat = () => this.hunger -= this.hunger === 0 ? 0 : 10;

  evolve = () => {
    let newStage = this.stage + 1;
    let oldPokemon = Object.entries(Pokemon.pokeInfo)
	.map(pair => [pair[0], ...pair[1]])
	.find(e => e.includes(this.name))[0];
    let evolutions = Pokemon.pokeInfo[oldPokemon];
    if (newStage > evolutions.length) {
      console.log("Can't evolve!");
    } else {
      this.stage = newStage;
      this.name = evolutions[newStage];
      this.hp *= 2;
      console.log("\n");
      console.log(`${oldPokemon} evolved into ${this.name}`);
      console.log("\n");
    }
  };

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

  takeToPokeCenter = () => {
    this.pokeList.forEach(pokemon => {
      pokemon.isAlive = true;
      pokemon.hp = 100;
      pokemon.hunger = 0;
    });
  }

  killall = () => {
    this.pokeList.forEach(pokemon => {
      pokemon.isAlive = false;
      pokemon.hp = 0;
    });
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
    case "killall":
      this.killall();
      return true;
    case "pokecenter":
      this.takeToPokeCenter();
      return true;
    case "evolve":
      let evolvePokemon = this.pokeList.find((pokemon) => pokemon.name === arg);
      evolvePokemon.evolve();
      return true;
    case "feed":
      let selectedPokemon = this.pokeList.find((pokemon) => pokemon.name === arg);
      selectedPokemon.eat();
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
      if (!(Object.keys(Pokemon.pokeInfo).some(p => p === arg))) {
	console.log("Pokemon doesn't exist OR has to be evolved to.");
	return true;
      }
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
