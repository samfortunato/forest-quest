# Forest Quest

A game inspired by classic top-down "2.5D" RPGs such as The Legend of Zelda. Walk around, swing your sword, and attack enemies.

## Screenshots

![Forest Quest title screen screenshot](http://samfortunato.com/aa/forest-quest/screenshots/screenshot-title-screen.png)

![Forest Quest gameplay screenshot](http://samfortunato.com/aa/forest-quest/screenshots/screenshot-gameplay.png)

## About

### Controls

* Arrow keys to move
* Shift to attack
* Spacebar to jump

### Overview

* Custom engine written in JavaScript
* Music and sound
* Animation
* Title screen/menu

### In-depth

Forest Quest is a JavaScript game with a custom engine built from the ground up. Multiple classes and methods were created to perform all necessary functions, such as handling game state, audio, movement, and collision.

The concept of finite state machines were implemented for various objects, such as the game state and the player. With finite state machines, objects have an internal state, and will execute certain behaviors once per frame based on that internal state. The state is influenced by player action (moving arrow keys, navigating through a menu, etc.), or by events in-game (e.g. an enemy hitting the player will change the player's state to `HURT`). Using internal state in this way was a great way to easily define and customize an object's behavior.

## Technologies

* JavaScript
* HTML5 Canvas
* Webpack to bundle files
* Gamepad API for controller support (controls mapped to PS3 controller)

## Possible Future Features

* Scrolling maps
* New areas
* In-game menu/inventory
* NPCs (non-player characters) to interact with
* Dialog boxes/sign posts

## Credits

Tileset and player/enemy graphics were created by [First Seed Material](http://web.archive.org/web/20140214073503/http://www.tekepon.net/fsm/).

Music is from the game [*Deltarune*](https://www.deltarune.com/), and is &copy; Toby Fox.

Some sound effects borrowed from [*Pokemon Red and Blue*](https://www.sounds-resource.com/game_boy_gbc/pokemonredblueyellow/) and [*Pokemon Gold and Silver*](https://www.sounds-resource.com/game_boy_gbc/pokemongoldsilvercrystal/), which are &copy; Nintendo/Game Freak.
