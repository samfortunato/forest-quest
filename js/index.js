import { initializeControls, keypressListener } from './config/controls';
import { drawBeing } from './util/draw-util';

import Player from './beings/player';
import BasicEnemy from './beings/basic-enemy';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundColor = 'grey';

const currentlyPressedKeys = {};
initializeControls(currentlyPressedKeys);

const player = new Player();
const basicEnemy = new BasicEnemy();

const draw = () => {
  ctx.clearRect(0, 0, 800, 600);

  drawBeing(ctx, player);

  basicEnemy.track(player);
  drawBeing(ctx, basicEnemy);

  keypressListener(player, currentlyPressedKeys);
  
  requestAnimationFrame(draw);
};

draw();
