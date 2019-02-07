import { setup } from './config/setup';
import { initializeControls } from './config/controls';
import entities from './beings/entities';
import * as DrawEntityUtil from './util/draw-util';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
setup(canvas);

const currentlyPressedKeys = {};
initializeControls(currentlyPressedKeys);

const draw = () => {
  const { player, basicEnemy } = entities;
  
  ctx.clearRect(0, 0, 800, 600);

  player.move(currentlyPressedKeys);
  DrawEntityUtil.drawBeing(player, ctx);

  basicEnemy.track(player);
  DrawEntityUtil.drawBeing(basicEnemy, ctx);
  
  requestAnimationFrame(draw);
};

draw();
