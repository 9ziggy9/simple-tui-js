# pokeman
Pokeman project for June 6th 2022 cohort at AppAcademy. Intended as a fun after hours project on Thursdays for students who are looking for some recreational programming.
###### USAGE
To run
```bash
node main.mjs
```
Available commands can be listed with
``` console
>>> help
```

#### UPDATES
- 06/16/2022: Implemented creation of pokemans via closure; simple getter/setter methods on encapsulated variables.
- 06/23/2022: Created runtime which interfaces with readline to do stuff; pokemans can be caught, allowed to starve, or fed.

#### TODOS
- [OPEN] Find more pokemon ascii art and extend pokePrint().
- [OPEN] Create global object containing default pokemon information, extend pokemonEncounter() so that a random pokemon name is drawn when users run "catch". Global object should contain probability of catching a given pokemon when throwing pokeball.
- [OPEN] Using Math.random(); draw random number and compare it to pokemon catch probability to determine if pokemon is caught.
- [OPEN] Find persistent data solution, be it via writing to simple json file or applying simple SQLite DB.
