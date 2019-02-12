import entities from './beings/entities';

import * as GameUtil from './engine/setup';
import update from './engine/update';
import draw from './engine/draw';

const canvas = document.querySelector('canvas');
const ctx = GameUtil.setup(canvas);

const currentlyPressedKeys = {};
GameUtil.initializeControls(currentlyPressedKeys);

const gameLoop = () => {
  const { player } = entities.beings.friendlies;

  player.controls(currentlyPressedKeys);

  update();
  draw(ctx);
  
  requestAnimationFrame(gameLoop);
};

gameLoop();
