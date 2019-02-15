import * as GameSetup from './engine/setup';
import update from './engine/update';
import draw from './engine/draw';

const canvas = document.querySelector('canvas');
const ctx = GameSetup.setup(canvas);

GameSetup.initializeControls();

const gameLoop = () => {
  update();
  draw(ctx);
  
  requestAnimationFrame(gameLoop);
};

document.addEventListener('DOMContentLoaded', gameLoop);
